// src/pages/admin/RegisterClassSubject.tsx
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
    Save,
    Loader2,
    BookOpen,
    Plus,
    Trash2,
    Edit
} from "lucide-react";

interface Subject {
    _id: string;
    name: string;
    code: string;
}

interface ClassSubject {
    _id: string;
    className: string;
    subjectId: Subject;
    academicYear: string;
    term: string;
}

export default function RegisterClassSubject() {
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    // State
    const [classes, setClasses] = useState<string[]>([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedTerm, setSelectedTerm] = useState("First");
    const [academicYear, setAcademicYear] = useState(new Date().getFullYear().toString());
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [assignedSubjects, setAssignedSubjects] = useState<ClassSubject[]>([]);

    // Form state for new subject
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const terms = ["First", "Second", "Third"];
    const academicYears = ["2024", "2025", "2026"];

    useEffect(() => {
        fetchClasses();
    }, []);

    useEffect(() => {
        if (selectedClass) {
            loadAssignedSubjects();
        }
    }, [selectedClass, selectedTerm, academicYear]);

    const fetchClasses = async () => {
        setLoading(true);
        try {
            const studentsRes = await axios.get("/admin/student/list", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const uniqueClasses = new Set<string>(
                studentsRes.data.map((s: any) =>
                    s.admissionNumber.split('/').slice(0, 2).join('/')
                )
            );

            setClasses(Array.from(uniqueClasses).sort());

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.msg || "Failed to load classes",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const loadAssignedSubjects = async () => {
        try {
            const res = await axios.get("/admin/class-subjects", {
                params: {
                    className: selectedClass,
                    academicYear,
                    term: selectedTerm
                },
                headers: { Authorization: `Bearer ${token}` }
            });

            setAssignedSubjects(res.data?.classSubjects || []);

        } catch (error) {
            console.error("Error loading assigned subjects:", error);
            setAssignedSubjects([]); // Set empty array on error
        }
    };

    const handleSubmitSubject = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!subjectName || !subjectCode) {
            toast({
                title: "Error",
                description: "Please fill in all fields",
                variant: "destructive"
            });
            return;
        }

        setSaving(true);
        try {
            if (editingId) {
                // Update existing subject
                await axios.put(`/subjects/${editingId}`, {
                    name: subjectName,
                    code: subjectCode.toUpperCase()
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                toast({
                    title: "Success",
                    description: "Subject updated successfully"
                });
            } else {
                // Create and assign in one call using your new endpoint
                await axios.post("/admin/class-subjects/create-and-assign", {
                    className: selectedClass,
                    subjectName: subjectName,
                    subjectCode: subjectCode.toUpperCase(),
                    academicYear,
                    term: selectedTerm,
                    isCompulsory: true
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                toast({
                    title: "Success! 🎉",
                    description: `Subject ${subjectName} created and assigned to ${selectedClass}`
                });
            }

            // Reset form
            setSubjectName("");
            setSubjectCode("");
            setEditingId(null);

            // Reload assigned subjects
            await loadAssignedSubjects();

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.msg || "Failed to save subject",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (item: ClassSubject) => {
        if (item.subjectId) {
            setSubjectName(item.subjectId.name);
            setSubjectCode(item.subjectId.code);
            setEditingId(item.subjectId._id);
        } else {
            toast({
                title: "Error",
                description: "Cannot edit: Subject data is incomplete",
                variant: "destructive"
            });
        }
    };

    const handleDelete = async (subjectId: string) => {
        if (!subjectId) return;

        try {
            await axios.delete(`/subjects/${subjectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast({
                title: "Success",
                description: "Subject deleted successfully"
            });

            await loadAssignedSubjects();

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.msg || "Failed to delete subject",
                variant: "destructive"
            });
        }
    };

    const handleRemoveFromClass = async (classSubjectId: string) => {
        try {
            await axios.delete(`/admin/class-subjects/${classSubjectId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast({
                title: "Success",
                description: "Subject removed from class"
            });

            await loadAssignedSubjects();

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.msg || "Failed to remove subject",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                            <BookOpen className="text-[#0b92bf]" size={32} />
                            Register Class Subjects
                        </h1>
                        <p className="text-white/60 mt-1">
                            Create new subjects and assign them to classes
                        </p>
                    </div>

                    {/* Selection Bar */}
                    <Card className="p-6 bg-white/5 border-white/10 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label>Class</Label>
                                <select
                                    value={selectedClass}
                                    onChange={(e) => setSelectedClass(e.target.value)}
                                    className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20"
                                >
                                    <option value="">-- Select Class --</option>
                                    {classes.map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label>Term</Label>
                                <select
                                    value={selectedTerm}
                                    onChange={(e) => setSelectedTerm(e.target.value)}
                                    className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20"
                                >
                                    {terms.map(term => (
                                        <option key={term} value={term}>{term} Term</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label>Academic Year</Label>
                                <select
                                    value={academicYear}
                                    onChange={(e) => setAcademicYear(e.target.value)}
                                    className="w-full mt-1 p-3 rounded bg-white/10 text-white border-white/20"
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

                    {selectedClass ? (
                        <>
                            {/* Form to create new subject */}
                            <Card className="p-6 bg-white/5 border-white/10 mb-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Plus size={20} className="text-[#0b92bf]" />
                                    {editingId ? "Edit Subject" : "Create New Subject"}
                                </h2>

                                <form onSubmit={handleSubmitSubject} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label>Subject Name</Label>
                                            <Input
                                                value={subjectName}
                                                onChange={(e) => setSubjectName(e.target.value)}
                                                placeholder="e.g., Mathematics Readiness"
                                                className="mt-1 bg-white/10 text-white border-white/20"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label>Subject Code</Label>
                                            <Input
                                                value={subjectCode}
                                                onChange={(e) => setSubjectCode(e.target.value.toUpperCase())}
                                                placeholder="e.g., MATH"
                                                className="mt-1 bg-white/10 text-white border-white/20 uppercase"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        {editingId && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    setSubjectName("");
                                                    setSubjectCode("");
                                                    setEditingId(null);
                                                }}
                                                className="border-white/20 text-white"
                                            >
                                                Cancel
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            disabled={saving}
                                            className="bg-[#0b92bf] hover:bg-[#0a7ca3]"
                                        >
                                            {saving ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin mr-2" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={18} className="mr-2" />
                                                    {editingId ? "Update Subject" : "Create & Assign Subject"}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Card>

                            {/* List of assigned subjects */}
                            <Card className="p-6 bg-white/5 border-white/10">
                                <h2 className="text-xl font-semibold mb-4">
                                    Subjects for {selectedClass} - {selectedTerm} Term
                                </h2>

                                {assignedSubjects.length === 0 ? (
                                    <div className="text-center py-8 text-white/40">
                                        <p>No subjects assigned yet. Create your first subject above.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {assignedSubjects.map((item) => {
                                            // Safety check for subjectId
                                            const subject = item.subjectId;

                                            return (
                                                <div
                                                    key={item._id}
                                                    className="flex items-center justify-between bg-white/10 p-3 rounded-lg"
                                                >
                                                    <div>
                                                        <span className="font-medium">
                                                            {subject?.name || 'Unknown Subject'}
                                                        </span>
                                                        <span className="text-sm text-white/40 ml-2">
                                                            ({subject?.code || 'N/A'})
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => subject && handleEdit(item)}
                                                            disabled={!subject}
                                                            className={`${subject ? 'text-blue-400 hover:text-blue-300' : 'text-gray-600 cursor-not-allowed'}`}
                                                        >
                                                            <Edit size={16} />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleRemoveFromClass(item._id)}
                                                            className="text-yellow-400 hover:text-yellow-300"
                                                        >
                                                            Remove from Class
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => subject && handleDelete(subject._id)}
                                                            disabled={!subject}
                                                            className={`${subject ? 'text-red-400 hover:text-red-300' : 'text-gray-600 cursor-not-allowed'}`}
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </Card>
                        </>
                    ) : (
                        <Card className="p-12 bg-white/5 text-center text-white/40 border-white/10">
                            <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
                            <h3 className="text-xl mb-2">Select a class to begin</h3>
                            <p>Choose a class above to start registering subjects</p>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}