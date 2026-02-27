// src/pages/admin/ResultUpload.tsx
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/api";
import { Plus, Trash2, Save, Loader2, Search } from "lucide-react";

interface Subject {
    _id: string;
    name: string;
    code: string;
}

interface ResultItem {
    subjectId: string;  // Now using subjectId
    subjectName: string;
    classWork: number | "";
    homeWork: number | "";
    ca: number | "";
    exam: number | "";
}

export default function ResultUpload() {
    const [form, setForm] = useState({
        studentId: "",  // Will store the actual MongoDB _id after lookup
        admissionNumber: "", // For user input
        term: "",
        academicYear: new Date().getFullYear().toString(),
        results: [] as ResultItem[],
    });
    
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [studentLookupLoading, setStudentLookupLoading] = useState(false);
    const [studentFound, setStudentFound] = useState(false);
    const [studentName, setStudentName] = useState("");
    
    const [newResult, setNewResult] = useState<ResultItem>({
        subjectId: "",
        subjectName: "",
        classWork: "",
        homeWork: "",
        ca: "",
        exam: "",
    });
    
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const terms = ["First", "Second", "Third"];
    const academicYears = ["2024", "2025", "2026", "2027"];

    // Fetch subjects on mount
    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const res = await axios.get("/subjects", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSubjects(res.data);
        } catch (error: any) {
            toast({
                title: "Error",
                description: "Failed to fetch subjects",
                variant: "destructive"
            });
        }
    };
    const lookupStudent = async () => {
        if (!form.admissionNumber) {
            toast({ title: "Error", description: "Please enter admission number", variant: "destructive" });
            return;
        }
    
        setStudentLookupLoading(true);
        try {
            // Use query parameter instead of path parameter
            const res = await axios.get(`/students/by-admission`, {
                params: { admissionNumber: form.admissionNumber },
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setForm({
                ...form,
                studentId: res.data._id
            });
            setStudentName(`${res.data.firstName} ${res.data.lastName}`);
            setStudentFound(true);
            
            toast({
                title: "Success",
                description: `Student found: ${res.data.firstName} ${res.data.lastName}`,
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.msg || "Student not found",
                variant: "destructive"
            });
            setStudentFound(false);
            setForm({ ...form, studentId: "" });
        } finally {
            setStudentLookupLoading(false);
        }
    };
    // Handle subject selection
    const handleSubjectSelect = (subjectId: string) => {
        const subject = subjects.find(s => s._id === subjectId);
        if (subject) {
            setSelectedSubject(subjectId);
            setNewResult({
                ...newResult,
                subjectId: subjectId,
                subjectName: subject.name
            });
        }
    };

    // Helper function to handle new result input changes
    const handleNewResultChange = (field: keyof ResultItem, value: string) => {
        // For numeric fields, we want to keep empty string or convert to number
        if (field === 'classWork' || field === 'homeWork' || field === 'ca' || field === 'exam') {
            setNewResult({
                ...newResult,
                [field]: value === "" ? "" : Number(value)
            });
        } else {
            // For text fields (subjectName), keep as string
            setNewResult({
                ...newResult,
                [field]: value
            });
        }
    };

    // Generic input change for main form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const addResult = () => {
        if (
            !newResult.subjectId ||
            !newResult.subjectName ||
            newResult.classWork === "" ||
            newResult.homeWork === "" ||
            newResult.ca === "" ||
            newResult.exam === ""
        ) {
            toast({
                title: "Error",
                description: "All subject fields are required",
                variant: "destructive",
            });
            return;
        }

        setForm({
            ...form,
            results: [
                ...form.results,
                {
                    subjectId: newResult.subjectId,
                    subjectName: newResult.subjectName,
                    classWork: Number(newResult.classWork),
                    homeWork: Number(newResult.homeWork),
                    ca: Number(newResult.ca),
                    exam: Number(newResult.exam),
                },
            ],
        });

        setNewResult({ 
            subjectId: "",
            subjectName: "",
            classWork: "", 
            homeWork: "",
            ca: "", 
            exam: "" 
        });
        setSelectedSubject("");
    };

    const removeResult = (index: number) => {
        const updated = [...form.results];
        updated.splice(index, 1);
        setForm({ ...form, results: updated });
    };

    const calculateTotal = (item: ResultItem): number => {
        return Number(item.classWork) + Number(item.homeWork) + Number(item.ca) + Number(item.exam);
    };

    const calculateGrade = (total: number): string => {
        if (total >= 85) return 'A';
        if (total >= 70) return 'B';
        if (total >= 60) return 'C';
        if (total >= 50) return 'D';
        if (total >= 40) return 'E';
        return 'F';
    };

    const submitSingleResult = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.studentId) {
            toast({ title: "Error", description: "Please lookup and verify student first", variant: "destructive" });
            return;
        }
        if (!form.term) {
            toast({ title: "Error", description: "Term is required", variant: "destructive" });
            return;
        }
        if (form.results.length === 0) {
            toast({ title: "Error", description: "At least one subject result is required", variant: "destructive" });
            return;
        }

        setLoading(true);
        try {
            // Prepare results with calculated totals and grades
            const processedResults = form.results.map(item => ({
                subjectId: item.subjectId,  // Send subjectId, not name
                classWork: Number(item.classWork),
                homeWork: Number(item.homeWork),
                ca: Number(item.ca),
                exam: Number(item.exam),
                total: calculateTotal(item),
                grade: calculateGrade(calculateTotal(item))
            }));

            const payload = {
                studentId: form.studentId,  // Send MongoDB _id
                term: form.term,
                session: form.academicYear,  // Backend expects 'session' not 'academicYear'
                results: processedResults
            };

            console.log("Submitting result:", payload);

            const res = await axios.post("/result/single", payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast({ 
                title: "Success! 🎉", 
                description: `Result uploaded successfully for ${form.results.length} subjects`,
                variant: "default" 
            });
            
            // Reset form
            setForm({ 
                studentId: "",
                admissionNumber: "", 
                term: "", 
                academicYear: new Date().getFullYear().toString(),
                results: [] 
            });
            setStudentFound(false);
            setStudentName("");
            
        } catch (err: any) {
            console.error("Upload error:", err);
            
            if (err.response?.status === 401) {
                toast({ 
                    title: "Session Expired", 
                    description: "Your session has expired. Please login again.", 
                    variant: "destructive" 
                });
                localStorage.clear();
                navigate("/login");
            } else {
                toast({ 
                    title: "Error", 
                    description: err.response?.data?.msg || err.message || "Failed to upload result",
                    variant: "destructive" 
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Upload Results</h1>

                    <Card className="p-6 bg-white/5 text-white mb-6 border-white/10">
                        <h2 className="text-lg font-semibold mb-4">Single Student Result</h2>
                        
                        <form onSubmit={submitSingleResult} className="space-y-6">
                            {/* Student Lookup */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <Label htmlFor="admissionNumber">Admission Number</Label>
                                    <div className="flex gap-2">
                                        <Input 
                                            id="admissionNumber" 
                                            name="admissionNumber" 
                                            value={form.admissionNumber} 
                                            onChange={handleChange} 
                                            placeholder="e.g., 25/BBS/001"
                                            className="mt-1 bg-white/10 border-white/20 text-white flex-1"
                                            disabled={studentFound}
                                        />
                                        <Button 
                                            type="button"
                                            onClick={lookupStudent}
                                            disabled={studentLookupLoading || !form.admissionNumber || studentFound}
                                            className="mt-1 bg-[#0b92bf] hover:bg-[#0a7ca3]"
                                        >
                                            {studentLookupLoading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                                        </Button>
                                    </div>
                                </div>

                                {studentFound && (
                                    <div className="md:col-span-1">
                                        <Label>Student Name</Label>
                                        <div className="mt-1 p-2 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                                            {studentName}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Term and Academic Year */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="term">Term</Label>
                                    <select
                                        id="term"
                                        name="term"
                                        value={form.term}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-white/10 text-white border-white/20"
                                        required
                                    >
                                        <option value="">Select Term</option>
                                        {terms.map(term => (
                                            <option key={term} value={term}>{term} Term</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Label htmlFor="academicYear">Academic Year</Label>
                                    <select
                                        id="academicYear"
                                        name="academicYear"
                                        value={form.academicYear}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-white/10 text-white border-white/20"
                                        required
                                    >
                                        {academicYears.map(year => (
                                            <option key={year} value={year}>
                                                {year}/{parseInt(year) + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Subject Selection */}
                            {studentFound && (
                                <div>
                                    <h3 className="font-semibold mb-3">Add Subject Result</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-3">
                                        <div className="md:col-span-2">
                                            <select
                                                value={selectedSubject}
                                                onChange={(e) => handleSubjectSelect(e.target.value)}
                                                className="w-full p-2 rounded bg-white/10 text-white border-white/20"
                                            >
                                                <option value="">Select Subject</option>
                                                {subjects.map(subject => (
                                                    <option key={subject._id} value={subject._id}>
                                                        {subject.name} ({subject.code})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <Input
                                            type="number"
                                            placeholder="CW (10%)"
                                            value={newResult.classWork}
                                            onChange={(e) => handleNewResultChange('classWork', e.target.value)}
                                            className="bg-white/10 border-white/20 text-white"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="HW (10%)"
                                            value={newResult.homeWork}
                                            onChange={(e) => handleNewResultChange('homeWork', e.target.value)}
                                            className="bg-white/10 border-white/20 text-white"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="CA (20%)"
                                            value={newResult.ca}
                                            onChange={(e) => handleNewResultChange('ca', e.target.value)}
                                            className="bg-white/10 border-white/20 text-white"
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Exam (60%)"
                                            value={newResult.exam}
                                            onChange={(e) => handleNewResultChange('exam', e.target.value)}
                                            className="bg-white/10 border-white/20 text-white"
                                        />
                                        <Button 
                                            type="button" 
                                            onClick={addResult}
                                            disabled={!selectedSubject}
                                            className="bg-[#0b92bf] hover:bg-[#0a7ca3]"
                                        >
                                            <Plus size={16} className="mr-2" />
                                            Add
                                        </Button>
                                    </div>

                                    {/* List of added results */}
                                    {form.results.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <h4 className="text-sm font-medium text-white/60">Added Subjects:</h4>
                                            {form.results.map((r, i) => {
                                                const total = calculateTotal(r);
                                                const grade = calculateGrade(total);
                                                return (
                                                    <div key={i} className="flex items-center justify-between bg-white/10 p-3 rounded-lg">
                                                        <div className="flex-1 grid grid-cols-7 gap-2 text-sm">
                                                            <span className="font-medium col-span-2">{r.subjectName}</span>
                                                            <span className="text-center">CW: {r.classWork}</span>
                                                            <span className="text-center">HW: {r.homeWork}</span>
                                                            <span className="text-center">CA: {r.ca}</span>
                                                            <span className="text-center">Exam: {r.exam}</span>
                                                            <span className="text-center font-bold">Total: {total}</span>
                                                            <span className={`text-center px-2 py-1 rounded ${
                                                                grade === 'A' ? 'bg-green-500/20 text-green-400' :
                                                                grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                                                                grade === 'C' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                grade === 'D' ? 'bg-orange-500/20 text-orange-400' :
                                                                'bg-red-500/20 text-red-400'
                                                            }`}>
                                                                {grade}
                                                            </span>
                                                        </div>
                                                        <Button 
                                                            type="button" 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => removeResult(i)}
                                                            className="text-red-400 hover:text-red-300 ml-2"
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    onClick={() => navigate("/admin/results")}
                                    className="text-white/60 hover:text-white"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    disabled={loading || form.results.length === 0 || !studentFound}
                                    className="bg-[#0b92bf] hover:bg-[#0a7ca3]"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin mr-2" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} className="mr-2" />
                                            Submit Result ({form.results.length} subjects)
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </main>
        </div>
    );
}