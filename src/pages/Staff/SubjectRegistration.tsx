// src/pages/staff/SubjectRegistration.tsx
import { useEffect, useState } from "react";
import StaffSidebar from "@/components/Staff/StaffSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import { 
    Save, 
    Loader2, 
    Users, 
    BookOpen,
    CheckCircle2,
    XCircle,
    AlertCircle
} from "lucide-react";

interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    admissionNumber: string;
}

interface Subject {
    _id: string;
    name: string;
    code: string;
}

interface ClassGroup {
    name: string;
    students: Student[];
}

interface RegistrationResponse {
    _id: string;
    studentId: Student | string;
    subjectId: string;
    academicYear: string;
    term: string;
    class: string;
}

interface ClassSubjectResponse {
    subjects: Array<{
        _id: string;
        subjectId: Subject;
        className: string;
        term: string;
        academicYear: string;
    }>;
    grouped: any;
}

export default function SubjectRegistration() {
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    // State
    const [classes, setClasses] = useState<ClassGroup[]>([]);
    const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]); // ✅ Renamed for clarity
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTerm, setSelectedTerm] = useState("First");
    const [academicYear, setAcademicYear] = useState(new Date().getFullYear().toString());
    const [students, setStudents] = useState<Student[]>([]);
    const [registeredStudents, setRegisteredStudents] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [noSubjectsOffered, setNoSubjectsOffered] = useState(false);

    const terms = ["First", "Second", "Third"];
    const academicYears = ["2024", "2025", "2026"];

    // Fetch initial data
    useEffect(() => {
        fetchData();
    }, []);

    // Load students when class changes
    useEffect(() => {
        if (selectedClass) {
            loadClassStudents();
        }
    }, [selectedClass]);

    // ✅ NEW: Load available subjects when class and term are selected
    useEffect(() => {
        if (selectedClass && selectedTerm) {
            loadAvailableSubjects();
        }
    }, [selectedClass, selectedTerm, academicYear]);

    // Load registered students when subject/class/term changes
    useEffect(() => {
        if (selectedClass && selectedSubject && selectedTerm) {
            loadRegisteredStudents();
        }
    }, [selectedClass, selectedSubject, selectedTerm, academicYear]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch students grouped by class
            const studentsRes = await axios.get("/staff/students", {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Group students
            const grouped = groupStudentsByClass(studentsRes.data);
            setClasses(grouped);

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.msg || "Failed to load data",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    // ✅ NEW: Load only subjects offered in this class
    const loadAvailableSubjects = async () => {
        try {
            const res = await axios.get<ClassSubjectResponse>("/staff/class-subjects", {
                params: {
                    className: selectedClass,
                    term: selectedTerm,
                    academicYear
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Extract subjects from the response
            const subjects = res.data.subjects.map(item => item.subjectId);
            
            if (subjects.length === 0) {
                setNoSubjectsOffered(true);
                setAvailableSubjects([]);
                toast({
                    title: "No Subjects",
                    description: "No subjects have been assigned to this class for this term. Please contact admin.",
                    variant: "destructive"
                });
            } else {
                setNoSubjectsOffered(false);
                setAvailableSubjects(subjects);
            }
            
        } catch (error) {
            console.error("Failed to load subjects:", error);
            setNoSubjectsOffered(true);
            toast({
                title: "Error",
                description: "Failed to load available subjects",
                variant: "destructive"
            });
        }
    };

    const groupStudentsByClass = (students: Student[]): ClassGroup[] => {
        const groups = new Map<string, Student[]>();
        
        students.forEach(student => {
            const className = student.admissionNumber.split('/').slice(0, 2).join('/');
            if (!groups.has(className)) {
                groups.set(className, []);
            }
            groups.get(className)!.push(student);
        });

        return Array.from(groups.entries())
            .map(([name, students]) => ({
                name,
                students: students.sort((a, b) => 
                    `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
                )
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    };

    const loadClassStudents = () => {
        const classGroup = classes.find(c => c.name === selectedClass);
        if (classGroup) {
            setStudents(classGroup.students);
        }
    };

    const loadRegisteredStudents = async () => {
        try {
            const res = await axios.get<RegistrationResponse[]>("/subject-registrations", {
                params: {
                    class: selectedClass,
                    subjectId: selectedSubject,
                    term: selectedTerm,
                    academicYear
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const registered = new Set(
                res.data.map((r: RegistrationResponse) => {
                    return typeof r.studentId === 'object' && r.studentId !== null 
                        ? (r.studentId as Student)._id 
                        : r.studentId as string;
                })
            );
            
            setRegisteredStudents(registered);
            
            if (students.length > 0) {
                const allRegistered = students.every(s => registered.has(s._id));
                setSelectAll(allRegistered);
            }
        } catch (error) {
            console.error("Failed to load registrations:", error);
        }
    };

    const handleStudentToggle = (studentId: string) => {
        const newRegistered = new Set(registeredStudents);
        if (newRegistered.has(studentId)) {
            newRegistered.delete(studentId);
        } else {
            newRegistered.add(studentId);
        }
        setRegisteredStudents(newRegistered);
        setSelectAll(students.length > 0 && students.every(s => newRegistered.has(s._id)));
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setRegisteredStudents(new Set());
        } else {
            setRegisteredStudents(new Set(students.map(s => s._id)));
        }
        setSelectAll(!selectAll);
    };

    const saveRegistrations = async () => {
        if (!selectedClass || !selectedSubject || !selectedTerm) {
            toast({
                title: "Error",
                description: "Please select class, subject, and term",
                variant: "destructive"
            });
            return;
        }

        setSaving(true);
        try {
            const payload = {
                class: selectedClass,
                subjectId: selectedSubject,
                term: selectedTerm,
                academicYear,
                studentIds: Array.from(registeredStudents)
            };

            await axios.post("/subject-registrations/bulk", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast({
                title: "Success! 🎉",
                description: `Registered ${registeredStudents.size} students for ${availableSubjects.find(s => s._id === selectedSubject)?.name}`,
            });

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.msg || "Failed to save registrations",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <StaffSidebar />
            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                            <BookOpen className="text-[#0b92bf]" size={32} />
                            Subject Registration
                        </h1>
                        <p className="text-white/60 mt-1">
                            Register students for subjects each term
                        </p>
                    </div>

                    {/* Selection Card */}
                    <Card className="p-6 bg-white/5 border-white/10 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <Label className="text-white/80">Class</Label>
                                <select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20 focus:border-[#0b92bf] outline-none"
                                >
                                    <option value="">-- Select Class --</option>
                                    {classes.map(cls => (
                                        <option key={cls.name} value={cls.name}>
                                            {cls.name} ({cls.students.length} students)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label className="text-white/80">Subject</Label>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20 focus:border-[#0b92bf] outline-none"
                                    disabled={availableSubjects.length === 0}
                                >
                                    <option value="">-- Select Subject --</option>
                                    {availableSubjects.map(subject => (
                                        <option key={subject._id} value={subject._id}>
                                            {subject.name} ({subject.code})
                                        </option>
                                    ))}
                                </select>
                                {noSubjectsOffered && (
                                    <p className="text-xs text-yellow-400 mt-1">
                                        No subjects assigned to this class. Contact admin.
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label className="text-white/80">Term</Label>
                                <select
                                    value={selectedTerm}
                                    onChange={(e) => setSelectedTerm(e.target.value)}
                                    className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20 focus:border-[#0b92bf] outline-none"
                                >
                                    {terms.map(term => (
                                        <option key={term} value={term}>{term} Term</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label className="text-white/80">Academic Year</Label>
                                <select
                                    value={academicYear}
                                    onChange={(e) => setAcademicYear(e.target.value)}
                                    className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20 focus:border-[#0b92bf] outline-none"
                                >
                                    {academicYears.map(year => (
                                        <option key={year} value={year}>
                                            {year}/{parseInt(year) + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Card>

                    {/* No Subjects Warning */}
                    {noSubjectsOffered && selectedClass && (
                        <Card className="p-4 bg-yellow-500/10 border-yellow-500/20 mb-6">
                            <div className="flex items-center gap-2 text-yellow-400">
                                <AlertCircle size={20} />
                                <p>No subjects have been assigned to this class for {selectedTerm} term. Please contact the admin.</p>
                            </div>
                        </Card>
                    )}

                    {/* Student List */}
                    {selectedClass && selectedSubject && availableSubjects.length > 0 && (
                        <Card className="p-6 bg-white/5 border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <Users size={20} />
                                    {availableSubjects.find(s => s._id === selectedSubject)?.name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm">
                                        <span className="text-white/60">Selected: </span>
                                        <span className="font-bold text-[#0b92bf]">
                                            {registeredStudents.size}/{students.length}
                                        </span>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleSelectAll}
                                        className="text-white border-white/20"
                                    >
                                        {selectAll ? "Deselect All" : "Select All"}
                                    </Button>
                                </div>
                            </div>

                            <div className="border border-white/10 rounded-lg overflow-hidden max-h-[500px] overflow-y-auto">
                                <table className="w-full">
                                    <thead className="sticky top-0 bg-[#0b1a24]">
                                        <tr className="bg-[#0b92bf]/20">
                                            <th className="p-3 text-left w-12">#</th>
                                            <th className="p-3 text-left">Admission No.</th>
                                            <th className="p-3 text-left">Student Name</th>
                                            <th className="p-3 text-left">Status</th>
                                            <th className="p-3 text-left w-20">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => {
                                            const isRegistered = registeredStudents.has(student._id);
                                            return (
                                                <tr 
                                                    key={student._id}
                                                    className={`border-t border-white/10 hover:bg-white/5 transition-colors
                                                        ${isRegistered ? 'bg-green-500/5' : ''}`}
                                                >
                                                    <td className="p-3">{index + 1}</td>
                                                    <td className="p-3 font-mono text-sm">{student.admissionNumber}</td>
                                                    <td className="p-3">
                                                        {student.firstName} {student.lastName}
                                                    </td>
                                                    <td className="p-3">
                                                        {isRegistered ? (
                                                            <span className="flex items-center text-green-400">
                                                                <CheckCircle2 size={16} className="mr-1" />
                                                                Registered
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center text-white/40">
                                                                <XCircle size={16} className="mr-1" />
                                                                Not Registered
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        <Checkbox
                                                            checked={isRegistered}
                                                            onCheckedChange={() => handleStudentToggle(student._id)}
                                                            className="data-[state=checked]:bg-[#0b92bf]"
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end mt-6">
                                <Button
                                    onClick={saveRegistrations}
                                    disabled={saving}
                                    className="bg-[#0b92bf] hover:bg-[#0a7ca3] px-8"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin mr-2" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} className="mr-2" />
                                            Save Registrations ({registeredStudents.size} students)
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}