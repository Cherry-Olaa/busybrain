
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/api";

interface ResultItem {
    subject: string;
    ca: number | "";
    exam: number | "";
}
export default function ResultUpload() {
    const [form, setForm] = useState({
        studentId: "",
        session: "",
        term: "",
        results: [] as ResultItem[],
    });
    // const [newResult, setNewResult] = useState<ResultItem>({ subject: "", ca: 0, exam: 0 });
    const [newResult, setNewResult] = useState<ResultItem>({
        subject: "",
        ca: "",
        exam: "",
    });
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Generic input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleResultChange = (index: number, field: keyof ResultItem, value: string) => {
        const updated = [...form.results];
        if (field === "subject") updated[index].subject = value;
        else if (field === "ca") updated[index].ca = Number(value);
        else if (field === "exam") updated[index].exam = Number(value);
        setForm({ ...form, results: updated });
    };


    // const handleResultChange = (index: number, field: keyof ResultItem, value: string) => {
    //     const updated = [...form.results];
    //     updated[index][field] = field === "subject" ? value : Number(value);
    //     setForm({ ...form, results: updated });
    // };

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

    const submitSingleResult = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.studentId || !form.results.length) {
            toast({ title: "Error", description: "Student ID and results are required", variant: "destructive" });
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/result/single", {
                admissionNumber: form.studentId, // 👈 THIS IS THE FIX
                session: form.session,
                term: form.term,
                results: form.results,
            }, { headers: { Authorization: `Bearer ${token}` } });
            toast({ title: "Success", description: `Result ${res.data.msg}` });
            setForm({ studentId: "", session: "", term: "", results: [] });
        } catch (err: any) {
            console.error(err);
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Upload Results</h1>

                <Card className="p-6 bg-white/5 text-white mb-6">
                    <h2 className="text-lg font-semibold mb-3">Single Student Result</h2>
                    <form onSubmit={submitSingleResult} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="studentId">Admission Number</Label>
                            <Input id="studentId" name="studentId" value={form.studentId} onChange={handleChange} required />
                        </div>

                        <div>
                            <Label htmlFor="session">Session</Label>
                            <Input id="session" name="session" value={form.session} onChange={handleChange} placeholder="e.g. 2024/2025" />
                        </div>

                        <div>
                            <Label htmlFor="term">Term</Label>
                            <Input id="term" name="term" value={form.term} onChange={handleChange} placeholder="e.g. First" />
                        </div>

                        {/* Results Inputs */}
                        <div className="md:col-span-2">
                            <h3 className="font-semibold mb-2">Add Subject Result</h3>
                            <div className="flex gap-2 mb-2">
                                <Input placeholder="Subject" value={newResult.subject} onChange={e => setNewResult({ ...newResult, subject: e.target.value })} />
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
                                <Button type="button" onClick={addResult}>Add</Button>
                            </div>

                            {/* List of added results */}
                            {form.results.map((r, i) => (
                                <div key={i} className="flex gap-2 mb-1 items-center">
                                    <span>{r.subject} - CA: {r.ca}, Exam: {r.exam}</span>
                                    <Button type="button" variant="destructive" onClick={() => removeResult(i)}>Remove</Button>
                                </div>
                            ))}
                        </div>

                        <div className="md:col-span-2 flex gap-3 justify-end mt-2">
                            <Button type="button" variant="ghost" onClick={() => navigate("/admin/results")}>Cancel</Button>
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