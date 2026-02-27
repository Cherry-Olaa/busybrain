// src/pages/staff/StaffBulkResultUpload.tsx
import { useEffect, useState } from "react";
import StaffSidebar from "@/components/Staff/StaffSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
    Search,
    Save,
    Loader2,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Users,
    BookOpen,
    FileText,
    Calendar
} from "lucide-react";

interface Subject {
    _id: string;
    name: string;
    code: string;
}

interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    admissionNumber: string;
    session: string;
}

interface RegisteredStudent {
    studentId: Student;
    subjectId: string;
    class: string;
    term: string;
    academicYear: string;
}

interface ResultEntry {
    studentId: string;
    admissionNumber: string;
    studentName: string;
    classWork: number | "";
    homeWork: number | "";
    ca: number | "";
    exam: number | "";
    total?: number;
    grade?: string;
}

interface StaffProfile {
    _id: string;
    fullName: string;
    username: string;
    role: string;
    assignedClasses: string[];
}

export default function StaffBulkResultUpload() {
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    // State
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [selectedTerm, setSelectedTerm] = useState("First");
    const [academicYear, setAcademicYear] = useState(new Date().getFullYear().toString());
    const [entries, setEntries] = useState<ResultEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const [classInfo, setClassInfo] = useState({ name: "", population: 0 });
    const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);
    const [fetchingProfile, setFetchingProfile] = useState(true);

    const terms = ["First", "Second", "Third"];
    const academicYears = ["2024", "2025", "2026", "2027"];

    // Fetch subjects and staff profile on mount
    useEffect(() => {
        fetchStaffProfile();
        fetchSubjects();
    }, []);

    const fetchStaffProfile = async () => {
        setFetchingProfile(true);
        try {
            const res = await axios.get("/staff/me", {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Staff profile:", res.data);
            setStaffProfile(res.data);
        } catch (error: any) {
            console.error("Failed to fetch staff profile:", error);
            toast({
                title: "Error",
                description: "Failed to load staff profile",
                variant: "destructive"
            });
        } finally {
            setFetchingProfile(false);
        }
    };

    const fetchSubjects = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/subjects", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubjects(res.data);
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.msg || "Failed to fetch subjects",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    // Load registered students when subject is selected
    const loadRegisteredStudents = async () => {
        if (!selectedSubject) {
            toast({
                title: "Error",
                description: "Please select a subject",
                variant: "destructive"
            });
            return;
        }

        if (!staffProfile) {
            toast({
                title: "Error",
                description: "Staff profile not loaded",
                variant: "destructive"
            });
            return;
        }

        // Check if assignedClasses exists and has at least one class
        if (!staffProfile.assignedClasses || staffProfile.assignedClasses.length === 0) {
            toast({
                title: "Error",
                description: "No classes assigned to you. Please contact admin.",
                variant: "destructive"
            });
            return;
        }

        setLoading(true);
        try {
            const assignedClass = staffProfile.assignedClasses[0];
            console.log("Assigned class:", assignedClass);
            console.log("Searching with:", {
                class: assignedClass,
                subjectId: selectedSubject._id,
                term: selectedTerm,
                academicYear
            });
            
            // Get registered students for this subject
            const res = await axios.get("/subject-registrations", {
                params: {
                    class: assignedClass,
                    subjectId: selectedSubject._id,
                    term: selectedTerm,
                    academicYear
                },
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Registered students response:", res.data);

            // Check if response has data
            if (!res.data || res.data.length === 0) {
                toast({
                    title: "No Students",
                    description: `No students registered for ${selectedSubject.name} in ${selectedTerm} term, ${academicYear} academic year.`,
                    variant: "default"
                });
                setEntries([]);
                setClassInfo({
                    name: assignedClass,
                    population: 0
                });
                setLoading(false);
                return;
            }

            setEntries(
                res.data.map((reg: RegisteredStudent) => ({
                    studentId: reg.studentId._id,
                    admissionNumber: reg.studentId.admissionNumber,
                    studentName: `${reg.studentId.firstName} ${reg.studentId.lastName}`.trim(),
                    classWork: "",
                    homeWork: "",
                    ca: "",
                    exam: ""
                }))
            );

            setClassInfo({
                name: res.data[0]?.class || assignedClass,
                population: res.data.length
            });

            setCurrentStep(2);
        } catch (error: any) {
            console.error("Error loading registered students:", error);
            
            if (error.response?.status === 404) {
                toast({
                    title: "No Registrations",
                    description: "No subject registrations found. Please contact admin.",
                    variant: "default"
                });
            } else {
                toast({
                    title: "Error",
                    description: error.response?.data?.msg || "Failed to load registered students",
                    variant: "destructive"
                });
            }
        } finally {
            setLoading(false);
        }
    };

    // Update entry
    const updateEntry = (index: number, field: keyof ResultEntry, value: string) => {
        const updated = [...entries];
        const numValue = value === "" ? "" : Number(value);
        
        // Validate range based on field
        let maxValue = 100;
        if (field === 'classWork' || field === 'homeWork') maxValue = 10;
        if (field === 'ca') maxValue = 20;
        if (field === 'exam') maxValue = 60;
        
        if (numValue !== "" && (numValue < 0 || numValue > maxValue)) {
            toast({
                title: "Invalid Score",
                description: `${field} must be between 0 and ${maxValue}`,
                variant: "destructive",
                duration: 2000
            });
            return;
        }

        updated[index] = {
            ...updated[index],
            [field]: numValue
        };

        // Calculate total if all fields are filled
        if (
            updated[index].classWork !== "" &&
            updated[index].homeWork !== "" &&
            updated[index].ca !== "" &&
            updated[index].exam !== ""
        ) {
            const total = 
                Number(updated[index].classWork) +
                Number(updated[index].homeWork) +
                Number(updated[index].ca) +
                Number(updated[index].exam);
            
            updated[index].total = total;
            updated[index].grade = calculateGrade(total);
        } else {
            updated[index].total = undefined;
            updated[index].grade = undefined;
        }

        setEntries(updated);
    };

    const calculateGrade = (total: number): string => {
        if (total >= 85) return 'A';
        if (total >= 70) return 'B';
        if (total >= 60) return 'C';
        if (total >= 50) return 'D';
        if (total >= 40) return 'E';
        return 'F';
    };

    // Quick fill
    const quickFill = (field: keyof ResultEntry, value: string) => {
        if (!value) return;
        
        const numValue = Number(value);
        
        let maxValue = 100;
        if (field === 'classWork' || field === 'homeWork') maxValue = 10;
        if (field === 'ca') maxValue = 20;
        if (field === 'exam') maxValue = 60;
        
        if (isNaN(numValue) || numValue < 0 || numValue > maxValue) {
            toast({
                title: "Invalid Score",
                description: `${field} must be between 0 and ${maxValue}`,
                variant: "destructive"
            });
            return;
        }

        const updated = entries.map(entry => {
            const newEntry = { ...entry, [field]: numValue };
            
            if (
                newEntry.classWork !== "" &&
                newEntry.homeWork !== "" &&
                newEntry.ca !== "" &&
                newEntry.exam !== ""
            ) {
                newEntry.total = 
                    Number(newEntry.classWork) +
                    Number(newEntry.homeWork) +
                    Number(newEntry.ca) +
                    Number(newEntry.exam);
                newEntry.grade = calculateGrade(newEntry.total);
            }
            
            return newEntry;
        });

        setEntries(updated);
        
        toast({
            title: "Success",
            description: `All ${field} scores set to ${value}`,
        });
    };

    // Validate entries
    const validateEntries = (): boolean => {
        const incomplete = entries.filter(e => 
            e.classWork === "" || 
            e.homeWork === "" || 
            e.ca === "" || 
            e.exam === ""
        );

        if (incomplete.length > 0) {
            toast({
                title: "Validation Error",
                description: `${incomplete.length} students have incomplete scores`,
                variant: "destructive"
            });
            return false;
        }

        return true;
    };

    // Submit results
const submitResults = async () => {
    if (!validateEntries()) return;
    if (!selectedSubject) return;
    if (!staffProfile) return;

    setSubmitting(true);
    try {
        const assignedClass = staffProfile.assignedClasses[0];

        // ✅ Send individual scores, not combined
        const payload = {
            class: assignedClass,
            subjectId: selectedSubject._id,
            subjectCode: selectedSubject.code,
            term: selectedTerm,
            academicYear,
            entries: entries.map(e => ({
                studentId: e.studentId,
                classWork: Number(e.classWork),  // 0-10
                homeWork: Number(e.homeWork),    // 0-10
                ca: Number(e.ca),                 // 0-20
                exam: Number(e.exam)               // 0-60
            }))
        };

        console.log("Submitting payload with individual scores:", payload);

        const res = await axios.post("/staff/results/bulk", payload, {
            headers: { Authorization: `Bearer ${token}` }
        });

        toast({
            title: "Success! 🎉",
            description: res.data.message || `Uploaded results for ${entries.length} students`,
        });

        // Reset form
        setCurrentStep(1);
        setSelectedSubject(null);
        setEntries([]);
        setClassInfo({ name: "", population: 0 });

    } catch (error: any) {
        console.error("Submit error:", error.response?.data || error);
        toast({
            title: "Error",
            description: error.response?.data?.msg || "Failed to submit results",
            variant: "destructive"
        });
    } finally {
        setSubmitting(false);
    }
};
    // Filter entries
    const filteredEntries = entries.filter(entry =>
        entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.admissionNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate stats
    const completedEntries = entries.filter(e => 
        e.classWork !== "" && e.homeWork !== "" && e.ca !== "" && e.exam !== ""
    ).length;

    if (fetchingProfile) {
        return (
            <div className="flex min-h-screen bg-[#041d29] text-white">
                <StaffSidebar />
                <main className="flex-1 p-6 flex items-center justify-center">
                    <Loader2 className="animate-spin text-[#0b92bf]" size={40} />
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <StaffSidebar />
            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                            <FileText className="text-[#0b92bf]" size={32} />
                            Bulk Result Upload
                        </h1>
                        <p className="text-white/60 mt-1">
                            Upload results for all students offering a subject
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {[
                                { step: 1, label: "Select Subject & Term" },
                                { step: 2, label: "Enter Scores" },
                                { step: 3, label: "Review & Submit" }
                            ].map((step) => (
                                <div key={step.step} className="flex-1">
                                    <div className="flex items-center">
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                                            ${currentStep > step.step ? 'bg-green-500' : 
                                              currentStep === step.step ? 'bg-[#0b92bf]' : 'bg-white/20'}
                                        `}>
                                            {currentStep > step.step ? <CheckCircle2 size={16} /> : step.step}
                                        </div>
                                        {step.step < 3 && (
                                            <div className={`
                                                flex-1 h-1 mx-2
                                                ${currentStep > step.step ? 'bg-green-500' : 'bg-white/20'}
                                            `} />
                                        )}
                                    </div>
                                    <p className="text-sm mt-2 text-white/60">{step.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 1: Select Subject, Term, and Academic Year */}
                    {currentStep === 1 && (
                        <Card className="p-8 bg-white/5 border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="text-[#0b92bf]" size={24} />
                                <h2 className="text-xl font-semibold">Select Subject, Term & Academic Year</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
                                <div>
                                    <Label className="text-white/80">Subject</Label>
                                    <select
                                        value={selectedSubject?._id || ""}
                                        onChange={(e) => {
                                            const subject = subjects.find(s => s._id === e.target.value);
                                            setSelectedSubject(subject || null);
                                        }}
                                        className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20 focus:border-[#0b92bf] outline-none"
                                    >
                                        <option value="">-- Select Subject --</option>
                                        {subjects.map(subject => (
                                            <option key={subject._id} value={subject._id}>
                                                {subject.name} ({subject.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label className="text-white/80">Term</Label>
                                    <select
                                        value={selectedTerm}
                                        onChange={(e) => setSelectedTerm(e.target.value)}
                                        className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20 focus:border-[#0b92bf] outline-none"
                                    >
                                        {terms.map(term => (
                                            <option key={term} value={term}>
                                                {term} Term
                                            </option>
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

                            <div className="flex justify-end mt-8">
                                <Button
                                    onClick={loadRegisteredStudents}
                                    disabled={!selectedSubject || loading}
                                    className="bg-[#0b92bf] hover:bg-[#0a7ca3] px-8"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin mr-2" />
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            Continue
                                            <ChevronRight size={18} className="ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Step 2: Enter Scores */}
                    {currentStep === 2 && entries.length > 0 && (
                        <Card className="p-6 bg-white/5 border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <Users size={20} />
                                        {selectedSubject?.name} - {selectedTerm} Term ({academicYear}/{parseInt(academicYear) + 1})
                                    </h2>
                                    <p className="text-white/60 text-sm mt-1">
                                        Class: {classInfo.name} • Population: {classInfo.population} students
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => quickFill('classWork', '10')}
                                        className="text-white border-white/20"
                                    >
                                        Set CW 10
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => quickFill('homeWork', '10')}
                                        className="text-white border-white/20"
                                    >
                                        Set HW 10
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => quickFill('ca', '20')}
                                        className="text-white border-white/20"
                                    >
                                        Set CA 20
                                    </Button>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-white/10 rounded-lg p-3">
                                    <div className="text-sm text-white/60">Total Students</div>
                                    <div className="text-2xl font-bold">{entries.length}</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3">
                                    <div className="text-sm text-white/60">Completed</div>
                                    <div className="text-2xl font-bold">{completedEntries}</div>
                                    <div className="w-full bg-white/20 h-1 mt-2 rounded-full">
                                        <div 
                                            className="bg-green-400 h-full rounded-full transition-all"
                                            style={{ width: entries.length ? `${(completedEntries/entries.length)*100}%` : '0%' }}
                                        />
                                    </div>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                                    <Input
                                        placeholder="Search students..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-white/10 text-white border-white/20"
                                    />
                                </div>
                            </div>

                            {/* Scores Table */}
                            <div className="overflow-x-auto border border-white/10 rounded-lg max-h-[500px] overflow-y-auto">
                                <table className="w-full">
                                    <thead className="sticky top-0 bg-[#0b1a24] z-10">
                                        <tr className="bg-[#0b92bf]/20">
                                            <th className="p-3 text-left">#</th>
                                            <th className="p-3 text-left">Admission No.</th>
                                            <th className="p-3 text-left">Student Name</th>
                                            <th className="p-3 text-center">CW (10%)</th>
                                            <th className="p-3 text-center">HW (10%)</th>
                                            <th className="p-3 text-center">CA (20%)</th>
                                            <th className="p-3 text-center">Exam (60%)</th>
                                            <th className="p-3 text-center">Total</th>
                                            <th className="p-3 text-center">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEntries.map((entry, index) => (
                                            <tr key={entry.studentId} className="border-t border-white/10 hover:bg-white/5">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3 font-mono text-sm">{entry.admissionNumber}</td>
                                                <td className="p-3">{entry.studentName}</td>
                                                <td className="p-3">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        value={entry.classWork}
                                                        onChange={(e) => updateEntry(index, 'classWork', e.target.value)}
                                                        className="w-16 text-center bg-white/10 text-white border-white/20 mx-auto"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="10"
                                                        value={entry.homeWork}
                                                        onChange={(e) => updateEntry(index, 'homeWork', e.target.value)}
                                                        className="w-16 text-center bg-white/10 text-white border-white/20 mx-auto"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="20"
                                                        value={entry.ca}
                                                        onChange={(e) => updateEntry(index, 'ca', e.target.value)}
                                                        className="w-16 text-center bg-white/10 text-white border-white/20 mx-auto"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        max="60"
                                                        value={entry.exam}
                                                        onChange={(e) => updateEntry(index, 'exam', e.target.value)}
                                                        className="w-16 text-center bg-white/10 text-white border-white/20 mx-auto"
                                                    />
                                                </td>
                                                <td className="p-3 text-center font-bold">
                                                    {entry.total || '-'}
                                                </td>
                                                <td className="p-3 text-center">
                                                    {entry.grade && (
                                                        <span className={`
                                                            px-2 py-1 rounded text-sm font-medium
                                                            ${entry.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                                                              entry.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                                                              entry.grade === 'C' ? 'bg-yellow-500/20 text-yellow-400' :
                                                              entry.grade === 'D' ? 'bg-orange-500/20 text-orange-400' :
                                                              'bg-red-500/20 text-red-400'}
                                                        `}>
                                                            {entry.grade}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentStep(1)}
                                    className="text-white border-white/20"
                                >
                                    <ChevronLeft size={18} className="mr-2" />
                                    Back
                                </Button>
                                <Button
                                    onClick={() => setCurrentStep(3)}
                                    disabled={completedEntries !== entries.length || entries.length === 0}
                                    className="bg-[#0b92bf] hover:bg-[#0a7ca3]"
                                >
                                    Review & Submit
                                    <ChevronRight size={18} className="ml-2" />
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Step 2 - No Students */}
                    {currentStep === 2 && entries.length === 0 && (
                        <Card className="p-12 bg-white/5 text-center text-white/40 border-white/10">
                            <Users size={48} className="mx-auto mb-4 opacity-40" />
                            <h3 className="text-xl mb-2">No Students Found</h3>
                            <p className="mb-2">
                                No students are registered for {selectedSubject?.name} in {selectedTerm} term, {academicYear} academic year.
                            </p>
                            <p className="text-sm text-white/20">
                                Try selecting a different academic year or term.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentStep(1)}
                                className="mt-4 border-white/20 text-white"
                            >
                                <ChevronLeft size={18} className="mr-2" />
                                Back to Selection
                            </Button>
                        </Card>
                    )}

                    {/* Step 3: Review & Submit */}
                    {currentStep === 3 && (
                        <Card className="p-6 bg-white/5 border-white/10">
                            <h2 className="text-xl font-semibold mb-6">Review Results</h2>

                            {/* Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-[#0b92bf]/20 border border-[#0b92bf]/30 rounded-lg p-4">
                                    <div className="text-[#0b92bf] text-sm">Subject</div>
                                    <div className="text-lg font-bold">{selectedSubject?.name}</div>
                                </div>
                                <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                                    <div className="text-purple-400 text-sm">Term</div>
                                    <div className="text-lg font-bold">{selectedTerm} Term</div>
                                </div>
                                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                                    <div className="text-green-400 text-sm">Students</div>
                                    <div className="text-lg font-bold">{entries.length}</div>
                                </div>
                                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                                    <div className="text-yellow-400 text-sm">Academic Year</div>
                                    <div className="text-lg font-bold">{academicYear}/{parseInt(academicYear) + 1}</div>
                                </div>
                            </div>

                            {/* Preview Table */}
                            <div className="overflow-x-auto border border-white/10 rounded-lg max-h-[400px] overflow-y-auto mb-6">
                                <table className="w-full">
                                    <thead className="sticky top-0 bg-[#0b1a24]">
                                        <tr className="bg-[#0b92bf]/20">
                                            <th className="p-3 text-left">Admission No.</th>
                                            <th className="p-3 text-left">Student Name</th>
                                            <th className="p-3 text-center">CW</th>
                                            <th className="p-3 text-center">HW</th>
                                            <th className="p-3 text-center">CA</th>
                                            <th className="p-3 text-center">Exam</th>
                                            <th className="p-3 text-center">Total</th>
                                            <th className="p-3 text-center">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {entries.slice(0, 5).map((entry) => (
                                            <tr key={entry.studentId} className="border-t border-white/10">
                                                <td className="p-3 font-mono text-sm">{entry.admissionNumber}</td>
                                                <td className="p-3">{entry.studentName}</td>
                                                <td className="p-3 text-center">{entry.classWork}</td>
                                                <td className="p-3 text-center">{entry.homeWork}</td>
                                                <td className="p-3 text-center">{entry.ca}</td>
                                                <td className="p-3 text-center">{entry.exam}</td>
                                                <td className="p-3 text-center font-bold">{entry.total}</td>
                                                <td className="p-3 text-center">
                                                    <span className={`
                                                        px-2 py-1 rounded text-sm font-medium
                                                        ${entry.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                                                          entry.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                                                          entry.grade === 'C' ? 'bg-yellow-500/20 text-yellow-400' :
                                                          entry.grade === 'D' ? 'bg-orange-500/20 text-orange-400' :
                                                          'bg-red-500/20 text-red-400'}
                                                    `}>
                                                        {entry.grade}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {entries.length > 5 && (
                                            <tr>
                                                <td colSpan={8} className="p-3 text-center text-white/40">
                                                    ... and {entries.length - 5} more students
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentStep(2)}
                                    className="text-white border-white/20"
                                >
                                    <ChevronLeft size={18} className="mr-2" />
                                    Back to Edit
                                </Button>
                                <Button
                                    onClick={submitResults}
                                    disabled={submitting}
                                    className="bg-green-600 hover:bg-green-700 px-8"
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin mr-2" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={18} className="mr-2" />
                                            Submit Results ({entries.length} students)
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

// // src/pages/staff/StaffResult.tsx
// import { useEffect, useState } from "react";
// import StaffSidebar from "@/components/Staff/StaffSidebar";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import axios from "@/lib/api";

// interface ResultItem {
//     subject: string;
//     ca: number | "";
//     exam: number | "";
// }

// interface Student {
//     _id: string;
//     firstName: string;
//     lastName?: string;
//     admissionNumber: string;
// }

// export default function StaffResult() {
//     const [students, setStudents] = useState<Student[]>([]);
//     const [form, setForm] = useState({
//         studentId: "",
//         term: "",
//         results: [] as ResultItem[],
//     });
//     const [newResult, setNewResult] = useState<ResultItem>({
//         subject: "",
//         ca: "",
//         exam: "",
//     });
//     const [loading, setLoading] = useState(false);
//     const { toast } = useToast();
//     const token = localStorage.getItem("token");

//     // Fetch students for this staff
//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await axios.get("/staff/students", { headers: { Authorization: `Bearer ${token}` } });
//                 setStudents(res.data);
//             } catch (err: any) {
//                 toast({ title: "Error", description: err.message, variant: "destructive" });
//             }
//         })();
//     }, [token, toast]);

//     const handleResultChange = (index: number, field: keyof ResultItem, value: string) => {
//         const updated = [...form.results];
//         if (field === "subject") updated[index].subject = value;
//         else if (field === "ca") updated[index].ca = Number(value);
//         else if (field === "exam") updated[index].exam = Number(value);
//         setForm({ ...form, results: updated });
//     };

//     const addResult = () => {
//         if (
//             !newResult.subject ||
//             newResult.ca === "" ||
//             newResult.exam === ""
//         ) {
//             toast({
//                 title: "Error",
//                 description: "Subject, CA and Exam are required",
//                 variant: "destructive",
//             });
//             return;
//         }

//         setForm({
//             ...form,
//             results: [
//                 ...form.results,
//                 {
//                     subject: newResult.subject,
//                     ca: Number(newResult.ca),
//                     exam: Number(newResult.exam),
//                 },
//             ],
//         });

//         setNewResult({ subject: "", ca: "", exam: "" });
//     };
//     const removeResult = (index: number) => {
//         const updated = [...form.results];
//         updated.splice(index, 1);
//         setForm({ ...form, results: updated });
//     };

//     const submitResult = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!form.studentId || !form.results.length) {
//             toast({ title: "Error", description: "Student and results are required", variant: "destructive" });
//             return;
//         }
//         setLoading(true);
//         try {
//             const res = await axios.post(
//                 "/staff/results",
//                 {
//                     studentId: form.studentId,
//                     term: form.term,
//                     results: form.results,
//                 },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             toast({ title: "Success", description: `Result ${res.data.msg}` });
//             setForm({ studentId: "", term: "", results: [] });
//         } catch (err: any) {
//             toast({ title: "Error", description: err.message, variant: "destructive" });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-[#041d29] text-white">
//             <StaffSidebar />
//             <main className="flex-1 p-6">
//                 <h1 className="text-2xl font-bold mb-4">Upload Student Results</h1>

//                 <Card className="p-6 bg-white/5 text-white mb-6">
//                     <form onSubmit={submitResult} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <Label htmlFor="studentId">Select Student</Label>
//                             <select
//                                 id="studentId"
//                                 name="studentId"
//                                 value={form.studentId}
//                                 onChange={(e) => setForm({ ...form, studentId: e.target.value })}
//                                 className="w-full p-2 rounded text-black"
//                                 required
//                             >
//                                 <option value="">-- Select Student --</option>
//                                 {students.map((s) => (
//                                     <option key={s._id} value={s._id}>
//                                         {s.firstName} {s.lastName || ""} ({s.admissionNumber})
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <Label htmlFor="term">Term</Label>
//                             <Input
//                                 id="term"
//                                 name="term"
//                                 value={form.term}
//                                 onChange={(e) => setForm({ ...form, term: e.target.value })}
//                                 placeholder="e.g. First"
//                                 required
//                             />
//                         </div>

//                         {/* Results Inputs */}
//                         <div className="md:col-span-2">
//                             <h3 className="font-semibold mb-2">Add Subject Result</h3>
//                             <div className="flex gap-2 mb-2">
//                                 <Input
//                                     placeholder="Subject"
//                                     value={newResult.subject}
//                                     onChange={(e) => setNewResult({ ...newResult, subject: e.target.value })}
//                                 />
//                                 <Input
//                                     type="number"
//                                     inputMode="numeric"
//                                     placeholder="CA"
//                                     value={newResult.ca}
//                                     onChange={(e) => {
//                                         const value = e.target.value;
//                                         setNewResult({
//                                             ...newResult,
//                                             ca: value === "" ? "" : Number(value),
//                                         });
//                                     }}
//                                 />
//                                 <Input
//                                     type="number"
//                                     inputMode="numeric"
//                                     placeholder="Exam"
//                                     value={newResult.exam}
//                                     onChange={(e) => {
//                                         const value = e.target.value;
//                                         setNewResult({
//                                             ...newResult,
//                                             exam: value === "" ? "" : Number(value),
//                                         });
//                                     }}
//                                 />
//                                 <Button type="button" onClick={addResult}>
//                                     Add
//                                 </Button>
//                             </div>

//                             {/* List of added results */}
//                             {form.results.map((r, i) => (
//                                 <div key={i} className="flex gap-2 mb-1 items-center">
//                                     <span>
//                                         {r.subject} - CA: {r.ca}, Exam: {r.exam}
//                                     </span>
//                                     <Button type="button" variant="destructive" onClick={() => removeResult(i)}>
//                                         Remove
//                                     </Button>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="md:col-span-2 flex gap-3 justify-end mt-2">
//                             <Button type="submit" style={{ background: "#0b92bf" }} disabled={loading}>
//                                 {loading ? "Submitting..." : "Submit Result"}
//                             </Button>
//                         </div>
//                     </form>
//                 </Card>
//             </main>
//         </div>
//     );
// }