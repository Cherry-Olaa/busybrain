import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StaffSidebar from "@/components/Staff/StaffSidebar";

interface SubjectRef {
    _id: string;
    name: string;
    code: string;
}

interface ResultItem {
    subjectId?: SubjectRef;
    ca: number;
    exam: number;
    total: number;
    grade: string;
    comment?: string;
}

interface Result {
    _id: string;
    session: string;
    term: string;
    results: ResultItem[];
    overallTotal: number;
    average: number;
}

export default function StaffViewStudentResult() {
    const { studentId } = useParams(); // passed from staff dashboard
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token || !studentId) return;

        (async () => {
            try {
                const res = await fetch(
                    `https://api.busybrainschools.com/api/staff/results/student/${studentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Unable to fetch student results");

                const data: Result[] = await res.json();
                setResults(data);
            } catch (err: any) {
                toast({
                    title: "Error",
                    description: err.message,
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [studentId, token]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#041d29] text-white">
                Loading results...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <StaffSidebar />

            <main className="flex-1 p-6">
                <Card className="bg-white text-black p-5">
                    <h2 className="text-xl font-bold mb-4">Student Academic Results</h2>

                    {results.length === 0 ? (
                        <p>No results found for this student.</p>
                    ) : (
                        results.map((res) => (
                            <div key={res._id} className="mb-6">
                                <h3 className="font-semibold text-lg mb-2">
                                    {res.term} — {res.session}
                                </h3>

                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-300 text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-2 border">Subject</th>
                                                <th className="p-2 border">CA</th>
                                                <th className="p-2 border">Exam</th>
                                                <th className="p-2 border">Total</th>
                                                <th className="p-2 border">Grade</th>
                                                <th className="p-2 border">Comment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {res.results.map((item, i) => (
                                                <tr key={i}>
                                                    <td className="p-2 border">
                                                        {item.subjectId?.name ||
                                                            item.subjectId?.code ||
                                                            "—"}
                                                    </td>
                                                    <td className="p-2 border">{item.ca}</td>
                                                    <td className="p-2 border">{item.exam}</td>
                                                    <td className="p-2 border">{item.total}</td>
                                                    <td className="p-2 border">{item.grade}</td>
                                                    <td className="p-2 border">{item.comment}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="mt-2 font-semibold">
                                        Overall: {res.overallTotal} | Average: {res.average}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </Card>
            </main>
        </div>
    );
}