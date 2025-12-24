

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Student {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    admissionNumber: string; // e.g. 25/BBS/001
    session: string;
    gender?: string; // "male" | "female" | undefined
}

interface SubjectRef {
    _id: string;
    name: string;
    code: string;
}

interface ResultItem {
    subjectId?: SubjectRef; // optional because sometimes populate may fail
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

export default function StudentDashboard() {
    const navigate = useNavigate();
    const { toast } = useToast();

    const [student, setStudent] = useState<Student | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // Extract info from admission number (25/BBS/001)
    const parseAdmission = (adm?: string) => {
        if (!adm) return { year: "", schoolType: "" };
        const [year, type] = adm.split("/");
        return {
            year: `20${year}`,
            schoolType:
                type === "BBS"
                    ? "Basic School"
                    : type === "BBC"
                        ? "College"
                        : "Unknown",
        };
    };

    // Format gender for display
    const formatGender = (g?: string) => {
        if (!g) return "N/A";
        if (g.toLowerCase() === "male") return "Male";
        if (g.toLowerCase() === "female") return "Female";
        return g;
    };

    // Fetch student & results
    useEffect(() => {
        if (!token) return;

        (async () => {
            try {
                // Fetch student info
                const res = await fetch("https://api.busybrainschool.com//api/students/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error("Unable to fetch student data");
                const data: Student = await res.json();
                setStudent(data);

                // Fetch results for this student
                const rRes = await fetch(
                    `https://api.busybrainschool.com//api/results?studentId=${data._id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (!rRes.ok) throw new Error("Unable to fetch results");
                const rData: Result[] = await rRes.json();

                // Filter results by current session
                const currentSessionResults = rData.filter(
                    (r) => r.session === data.session
                );

                setResults(currentSessionResults);
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
    }, [token]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#041d29] text-white text-lg">
                Loading...
            </div>
        );
    }

    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#041d29] text-white">
                Unable to load dashboard
            </div>
        );
    }

    const { year, schoolType } = parseAdmission(student.admissionNumber);

    return (
        <div className="min-h-screen bg-[#041d29] p-6 text-white">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Welcome, {student.firstName}</h1>
                <Button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600"
                >
                    Logout
                </Button>
            </div>

            {/* Profile */}
            <Card className="mt-6 bg-[#0b92bf] text-white p-5">
                <h2 className="text-xl font-bold mb-3">Student Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p>
                        <strong>Name:</strong> {student.firstName} {student.lastName}
                    </p>
                    <p>
                        <strong>Admission Number:</strong> {student.admissionNumber}
                    </p>
                    <p>
                        <strong>Student ID:</strong> {student.studentId}
                    </p>
                    <p>
                        <strong>Session:</strong> {student.session}
                    </p>
                    <p>
                        <strong>Gender:</strong> {formatGender(student.gender)}
                    </p>
                    <p>
                        <strong>Entry Year:</strong> {year}
                    </p>
                    <p>
                        <strong>School Type:</strong> {schoolType}
                    </p>
                </div>
            </Card>

            {/* Results */}
            <Card className="mt-6 bg-white text-black p-5">
                <h2 className="text-xl font-bold mb-4">Academic Results</h2>
                {results.length === 0 ? (
                    <p>No results available for your current session.</p>
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
                                        {res.results.map((item, index) => (
                                            <tr key={index}>
                                                <td className="p-2 border">{item.subjectId?.name || item.subjectId?.code || "—"}</td>
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

            {/* Coming Soon */}
            <Card className="mt-6 bg-[#0b92bf] text-white p-5 text-center">
                <h2 className="text-xl font-bold">Assignments & Quiz</h2>
                <p className="opacity-80 mt-2">Coming soon...</p>
            </Card>
        </div>
    );
}