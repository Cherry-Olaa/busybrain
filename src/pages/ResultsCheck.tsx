// src/pages/student/StudentResults.tsx
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";

interface ResultItem {
    subjectId: { name: string; code: string };
    ca: number;
    exam: number;
    total: number;
    grade: string;
    comment: string;
}

interface StudentResult {
    _id: string;
    session: string;
    term: string;
    results: ResultItem[];
    overallTotal: number;
    average: number;
}

export default function StudentResults() {
    const [results, setResults] = useState<StudentResult[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/results", { headers: { Authorization: `Bearer ${token}` } });
            setResults(res.data);
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const downloadPdf = async () => {
        try {
            const res = await axios.get("/results/pdf", {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob", // important for file download
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `results.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        }
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white p-6">
            <main className="flex-1">
                <h1 className="text-2xl font-bold mb-6">My Results</h1>

                {/* <Button className="mb-4" style={{ background: "#0b92bf" }} onClick={downloadPdf}>
                    Download PDF
                </Button> */}

                {loading ? (
                    <div>Loading...</div>
                ) : results.length > 0 ? (
                    results.map((res) => (
                        <Card key={res._id} className="mb-4 p-4 bg-white/5 text-white">
                            <div className="mb-2 font-semibold">
                                {res.session} — {res.term}
                            </div>

                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="px-2 py-1">Subject</th>
                                        <th className="px-2 py-1">CA</th>
                                        <th className="px-2 py-1">Exam</th>
                                        <th className="px-2 py-1">Total</th>
                                        <th className="px-2 py-1">Grade</th>
                                        <th className="px-2 py-1">Comment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {res.results.map((r, idx) => (
                                        <tr key={idx} className="border-b border-white/10">
                                            <td className="px-2 py-1">{r.subjectId.name}</td>
                                            <td className="px-2 py-1">{r.ca ?? 0}</td>
                                            <td className="px-2 py-1">{r.exam ?? 0}</td>
                                            <td className="px-2 py-1">{r.total}</td>
                                            <td className="px-2 py-1">{r.grade}</td>
                                            <td className="px-2 py-1">{r.comment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-2 text-right">
                                <span className="font-semibold mr-4">Overall: {res.overallTotal}</span>
                                <span className="font-semibold">Average: {res.average}</span>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div>No results found</div>
                )}
            </main>
        </div>
    );
}