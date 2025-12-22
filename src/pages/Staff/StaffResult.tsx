// src/pages/staff/StaffResult.tsx
import { useEffect, useState } from "react";
import StaffSidebar from "@/components/Staff/StaffSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";

interface ResultItem {
    subject: string;
    ca: number | "";
    exam: number | "";
}

interface Student {
    _id: string;
    firstName: string;
    lastName?: string;
    admissionNumber: string;
}

export default function StaffResult() {
    const [students, setStudents] = useState<Student[]>([]);
    const [form, setForm] = useState({
        studentId: "",
        term: "",
        results: [] as ResultItem[],
    });
    const [newResult, setNewResult] = useState<ResultItem>({
        subject: "",
        ca: "",
        exam: "",
    });
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    // Fetch students for this staff
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/staff/students", { headers: { Authorization: `Bearer ${token}` } });
                setStudents(res.data);
            } catch (err: any) {
                toast({ title: "Error", description: err.message, variant: "destructive" });
            }
        })();
    }, [token, toast]);

    const handleResultChange = (index: number, field: keyof ResultItem, value: string) => {
        const updated = [...form.results];
        if (field === "subject") updated[index].subject = value;
        else if (field === "ca") updated[index].ca = Number(value);
        else if (field === "exam") updated[index].exam = Number(value);
        setForm({ ...form, results: updated });
    };

    const addResult = () => {
        if (
            !newResult.subject ||
            newResult.ca === "" ||
            newResult.exam === ""
        ) {
            toast({
                title: "Error",
                description: "Subject, CA and Exam are required",
                variant: "destructive",
            });
            return;
        }

        setForm({
            ...form,
            results: [
                ...form.results,
                {
                    subject: newResult.subject,
                    ca: Number(newResult.ca),
                    exam: Number(newResult.exam),
                },
            ],
        });

        setNewResult({ subject: "", ca: "", exam: "" });
    };
    const removeResult = (index: number) => {
        const updated = [...form.results];
        updated.splice(index, 1);
        setForm({ ...form, results: updated });
    };

    const submitResult = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.studentId || !form.results.length) {
            toast({ title: "Error", description: "Student and results are required", variant: "destructive" });
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(
                "/staff/results",
                {
                    studentId: form.studentId,
                    term: form.term,
                    results: form.results,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast({ title: "Success", description: `Result ${res.data.msg}` });
            setForm({ studentId: "", term: "", results: [] });
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <StaffSidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Upload Student Results</h1>

                <Card className="p-6 bg-white/5 text-white mb-6">
                    <form onSubmit={submitResult} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="studentId">Select Student</Label>
                            <select
                                id="studentId"
                                name="studentId"
                                value={form.studentId}
                                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                                className="w-full p-2 rounded text-black"
                                required
                            >
                                <option value="">-- Select Student --</option>
                                {students.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.firstName} {s.lastName || ""} ({s.admissionNumber})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="term">Term</Label>
                            <Input
                                id="term"
                                name="term"
                                value={form.term}
                                onChange={(e) => setForm({ ...form, term: e.target.value })}
                                placeholder="e.g. First"
                                required
                            />
                        </div>

                        {/* Results Inputs */}
                        <div className="md:col-span-2">
                            <h3 className="font-semibold mb-2">Add Subject Result</h3>
                            <div className="flex gap-2 mb-2">
                                <Input
                                    placeholder="Subject"
                                    value={newResult.subject}
                                    onChange={(e) => setNewResult({ ...newResult, subject: e.target.value })}
                                />
                                <Input
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="CA"
                                    value={newResult.ca}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setNewResult({
                                            ...newResult,
                                            ca: value === "" ? "" : Number(value),
                                        });
                                    }}
                                />
                                <Input
                                    type="number"
                                    inputMode="numeric"
                                    placeholder="Exam"
                                    value={newResult.exam}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setNewResult({
                                            ...newResult,
                                            exam: value === "" ? "" : Number(value),
                                        });
                                    }}
                                />
                                <Button type="button" onClick={addResult}>
                                    Add
                                </Button>
                            </div>

                            {/* List of added results */}
                            {form.results.map((r, i) => (
                                <div key={i} className="flex gap-2 mb-1 items-center">
                                    <span>
                                        {r.subject} - CA: {r.ca}, Exam: {r.exam}
                                    </span>
                                    <Button type="button" variant="destructive" onClick={() => removeResult(i)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="md:col-span-2 flex gap-3 justify-end mt-2">
                            <Button type="submit" style={{ background: "#0b92bf" }} disabled={loading}>
                                {loading ? "Submitting..." : "Submit Result"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
}