// src/pages/staff/StaffViewStudentResult.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StaffSidebar from "@/components/Staff/StaffSidebar";
import axios from "@/lib/api";
import { 
    ChevronLeft, 
    Download, 
    Calendar,
    BookOpen,
    Award,
    TrendingUp,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SubjectRef {
    _id: string;
    name: string;
    code: string;
}

interface ResultItem {
    subjectId: SubjectRef;
    classWork: number;
    homeWork: number;
    ca: number;
    exam: number;
    total: number;
    grade: string;
    comment?: string;
}

interface Result {
    _id: string;
    studentId: {
        _id: string;
        firstName: string;
        lastName: string;
        admissionNumber: string;
        session: string;
    };
    session: string;
    term: string;
    results: ResultItem[];
    overallTotal: number;
    average: number;
    positionInClass?: number;
    remarks?: string;
    createdAt: string;
}

interface GroupedResults {
    [session: string]: Result[];
}

export default function StaffViewStudentResult() {
    const { studentId } = useParams();
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    const [student, setStudent] = useState<any>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [groupedResults, setGroupedResults] = useState<GroupedResults>({});
    const [loading, setLoading] = useState(true);
    const [selectedSession, setSelectedSession] = useState<string>("");
    const [selectedTerm, setSelectedTerm] = useState<string>("");
    const [displayedResult, setDisplayedResult] = useState<Result | null>(null);

    useEffect(() => {
        if (!token || !studentId) return;

        fetchStudentAndResults();
    }, [studentId, token]);

    const fetchStudentAndResults = async () => {
        setLoading(true);
        try {
            // First fetch student details to get enrollment session
            const studentRes = await axios.get(`/students/${studentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudent(studentRes.data);

            // Then fetch all results for this student
            const resultsRes = await axios.get(`/staff/results/student/${studentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Student results:", resultsRes.data);
            setResults(resultsRes.data);

        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.msg || "Failed to fetch data",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Group results by session
    useEffect(() => {
        if (results.length > 0) {
            const grouped = results.reduce((acc: GroupedResults, result) => {
                if (!acc[result.session]) {
                    acc[result.session] = [];
                }
                acc[result.session].push(result);
                return acc;
            }, {});

            // Sort results within each session by term
            Object.keys(grouped).forEach(session => {
                grouped[session].sort((a, b) => {
                    const termOrder = { "First": 1, "Second": 2, "Third": 3 };
                    return termOrder[a.term as keyof typeof termOrder] - termOrder[b.term as keyof typeof termOrder];
                });
            });

            setGroupedResults(grouped);

            // Set default selections to the latest session and term
            const sessions = Object.keys(grouped).sort().reverse();
            if (sessions.length > 0) {
                const latestSession = sessions[0];
                setSelectedSession(latestSession);
                
                const latestTerm = grouped[latestSession][grouped[latestSession].length - 1].term;
                setSelectedTerm(latestTerm);
            }
        }
    }, [results]);

    // Update displayed result when selections change
    useEffect(() => {
        if (selectedSession && selectedTerm && groupedResults[selectedSession]) {
            const result = groupedResults[selectedSession].find(r => r.term === selectedTerm);
            setDisplayedResult(result || null);
        }
    }, [selectedSession, selectedTerm, groupedResults]);

    // Get available sessions (from enrollment year onwards)
    const getAvailableSessions = () => {
        if (!student) return [];
        
        const startYear = parseInt(student.session.split('/')[0]);
        const currentYear = new Date().getFullYear();
        const sessions = [];
        
        for (let year = startYear; year <= currentYear + 1; year++) {
            sessions.push(year.toString());
        }
        
        return sessions;
    };

    // Get terms for a specific session
    const getTermsForSession = (session: string) => {
        if (!groupedResults[session]) return [];
        return groupedResults[session].map(r => r.term);
    };

    const calculatePercentage = (score: number, max: number): string => {
        return ((score / max) * 100).toFixed(1);
    };

    const getGradeColor = (grade: string): string => {
        const colors = {
            'A': 'text-green-600 bg-green-100',
            'B': 'text-blue-600 bg-blue-100',
            'C': 'text-yellow-600 bg-yellow-100',
            'D': 'text-orange-600 bg-orange-100',
            'E': 'text-red-600 bg-red-100',
            'F': 'text-red-700 bg-red-200'
        };
        return colors[grade as keyof typeof colors] || 'text-gray-600 bg-gray-100';
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#041d29] text-white">
                <StaffSidebar />
                <main className="flex-1 p-6 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b92bf] mx-auto mb-4"></div>
                        <p className="text-white/60">Loading student results...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <StaffSidebar />
            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header with navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Link to="/staff">
                                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                                    <ChevronLeft size={20} className="mr-1" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold text-white">
                                {student?.firstName} {student?.lastName}'s Results
                            </h1>
                        </div>
                        
                        {/* Filter controls */}
                        {Object.keys(groupedResults).length > 0 && (
                            <div className="flex gap-3">
                                <select
                                    value={selectedSession}
                                    onChange={(e) => {
                                        setSelectedSession(e.target.value);
                                        // Reset term when session changes
                                        const terms = getTermsForSession(e.target.value);
                                        if (terms.length > 0) {
                                            setSelectedTerm(terms[terms.length - 1]);
                                        }
                                    }}
                                    className="px-3 py-2 rounded bg-white/10 text-white border-white/20 text-sm"
                                >
                                    {Object.keys(groupedResults).sort().reverse().map(session => (
                                        <option key={session} value={session}>
                                            Session {session}/{parseInt(session) + 1}
                                        </option>
                                    ))}
                                </select>

                                {selectedSession && (
                                    <select
                                        value={selectedTerm}
                                        onChange={(e) => setSelectedTerm(e.target.value)}
                                        className="px-3 py-2 rounded bg-white/10 text-white border-white/20 text-sm"
                                    >
                                        {getTermsForSession(selectedSession).map(term => (
                                            <option key={term} value={term}>
                                                {term} Term
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Student Info Summary */}
                    {student && (
                        <Card className="mb-6 bg-gradient-to-r from-[#0b92bf]/20 to-transparent border-white/10 p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-white/40 text-xs">Admission No.</p>
                                    <p className="font-medium">{student.admissionNumber}</p>
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs">Enrollment Session</p>
                                    <p className="font-medium">{student.session}</p>
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs">Total Results</p>
                                    <p className="font-medium">{results.length}</p>
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs">Sessions Available</p>
                                    <p className="font-medium">{Object.keys(groupedResults).length}</p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {!displayedResult ? (
                        <Card className="p-12 bg-white/5 border-white/10 text-center">
                            <BookOpen size={48} className="mx-auto mb-4 text-white/20" />
                            <h3 className="text-xl text-white/60 mb-2">No Results Found</h3>
                            <p className="text-white/40">
                                No results available for this student.
                            </p>
                        </Card>
                    ) : (
                        <Card className="bg-white/5 border-white/10 overflow-hidden">
                            {/* Term Header */}
                            <div className="bg-[#0b92bf]/20 px-6 py-4 border-b border-white/10">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">
                                            {displayedResult.term} Term Report
                                        </h2>
                                        <p className="text-white/60 text-sm">
                                            Academic Year: {displayedResult.session}/{parseInt(displayedResult.session) + 1}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-[#0b92bf]">
                                            {displayedResult.average}%
                                        </div>
                                        <p className="text-white/60 text-sm">Average</p>
                                    </div>
                                </div>
                            </div>

                            {/* Student Info */}
                            <div className="px-6 py-3 bg-white/5 border-b border-white/10">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-white/40 text-xs">Student Name</p>
                                        <p className="text-white font-medium">
                                            {displayedResult.studentId?.firstName} {displayedResult.studentId?.lastName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Admission No.</p>
                                        <p className="text-white font-medium">
                                            {displayedResult.studentId?.admissionNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Overall Total</p>
                                        <p className="text-white font-medium">{displayedResult.overallTotal}</p>
                                    </div>
                                    {displayedResult.positionInClass && (
                                        <div>
                                            <p className="text-white/40 text-xs">Class Position</p>
                                            <p className="text-white font-medium">{displayedResult.positionInClass}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Results Table */}
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-2 text-white/60">Subject</th>
                                                <th className="text-center py-3 px-2 text-white/60">CW (10%)</th>
                                                <th className="text-center py-3 px-2 text-white/60">HW (10%)</th>
                                                <th className="text-center py-3 px-2 text-white/60">CA (20%)</th>
                                                <th className="text-center py-3 px-2 text-white/60">Exam (60%)</th>
                                                <th className="text-center py-3 px-2 text-white/60">Total</th>
                                                <th className="text-center py-3 px-2 text-white/60">Grade</th>
                                                <th className="text-left py-3 px-2 text-white/60">Comment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {displayedResult.results.map((item, index) => (
                                                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                                                    <td className="py-3 px-2 font-medium">
                                                        {item.subjectId?.name || item.subjectId?.code}
                                                    </td>
                                                    <td className="text-center py-3 px-2">
                                                        <span className="text-white">{item.classWork}</span>
                                                        <span className="text-white/40 text-xs ml-1">
                                                            ({calculatePercentage(item.classWork, 10)}%)
                                                        </span>
                                                    </td>
                                                    <td className="text-center py-3 px-2">
                                                        <span className="text-white">{item.homeWork}</span>
                                                        <span className="text-white/40 text-xs ml-1">
                                                            ({calculatePercentage(item.homeWork, 10)}%)
                                                        </span>
                                                    </td>
                                                    <td className="text-center py-3 px-2">
                                                        <span className="text-white">{item.ca}</span>
                                                        <span className="text-white/40 text-xs ml-1">
                                                            ({calculatePercentage(item.ca, 20)}%)
                                                        </span>
                                                    </td>
                                                    <td className="text-center py-3 px-2">
                                                        <span className="text-white">{item.exam}</span>
                                                        <span className="text-white/40 text-xs ml-1">
                                                            ({calculatePercentage(item.exam, 60)}%)
                                                        </span>
                                                    </td>
                                                    <td className="text-center py-3 px-2 font-bold">
                                                        {item.total}
                                                    </td>
                                                    <td className="text-center py-3 px-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(item.grade)}`}>
                                                            {item.grade}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-2 text-white/80">
                                                        {item.comment || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Remarks */}
                                {displayedResult.remarks && (
                                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                                        <p className="text-white/60 text-sm">Teacher's Remark</p>
                                        <p className="text-white mt-1">{displayedResult.remarks}</p>
                                    </div>
                                )}

                                {/* Summary Stats */}
                                <div className="mt-4 grid grid-cols-3 gap-4">
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-[#0b92bf] mb-1">
                                            <Award size={16} />
                                            <span className="text-xs">Total Subjects</span>
                                        </div>
                                        <p className="text-xl font-bold">{displayedResult.results.length}</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-green-400 mb-1">
                                            <TrendingUp size={16} />
                                            <span className="text-xs">Overall Total</span>
                                        </div>
                                        <p className="text-xl font-bold">{displayedResult.overallTotal}</p>
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-lg">
                                        <div className="flex items-center gap-2 text-yellow-400 mb-1">
                                            <Calendar size={16} />
                                            <span className="text-xs">Average</span>
                                        </div>
                                        <p className="text-xl font-bold">{displayedResult.average}%</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Other Sessions Summary */}
                    {Object.keys(groupedResults).length > 1 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Filter size={16} className="text-[#0b92bf]" />
                                Other Sessions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {Object.entries(groupedResults)
                                    .filter(([session]) => session !== selectedSession)
                                    .map(([session, sessionResults]) => (
                                        <Card
                                            key={session}
                                            className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-colors cursor-pointer"
                                            onClick={() => {
                                                setSelectedSession(session);
                                                setSelectedTerm(sessionResults[sessionResults.length - 1].term);
                                            }}
                                        >
                                            <h4 className="font-semibold text-[#0b92bf]">
                                                Session {session}/{parseInt(session) + 1}
                                            </h4>
                                            <p className="text-sm text-white/60 mt-1">
                                                {sessionResults.length} Term{sessionResults.length > 1 ? 's' : ''}
                                            </p>
                                            <div className="flex gap-2 mt-2">
                                                {sessionResults.map(r => (
                                                    <span
                                                        key={r.term}
                                                        className="text-xs px-2 py-1 bg-white/10 rounded"
                                                    >
                                                        {r.term}
                                                    </span>
                                                ))}
                                            </div>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}