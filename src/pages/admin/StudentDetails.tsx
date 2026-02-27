// src/pages/admin/StudentDetails.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
    ArrowLeft,
    User,
    Mail,
    Calendar,
    Hash,
    BookOpen,
    Award,
    TrendingUp,
    Download,
    Edit,
    UserX,
    UserCheck,
    Loader2,
    ChevronDown,
    ChevronUp,
    FileText
} from "lucide-react";

interface Student {
    _id: string;
    admissionNumber: string;
    studentId: string;
    firstName: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    session?: string;
    classId?: string;
    passportUrl?: string;
    isActive: boolean;
    createdAt: string;
}

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
    studentId: string;
    session: string;
    term: string;
    results: ResultItem[];
    overallTotal: number;
    average: number;
    positionInClass?: number;
    remarks?: string;
    createdAt: string;
}

export default function StudentDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    const [student, setStudent] = useState<Student | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [groupedResults, setGroupedResults] = useState<Record<string, Result[]>>({});
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
    const [selectedTerm, setSelectedTerm] = useState<string>("");

    useEffect(() => {
        if (id) {
            fetchStudentData();
        }
    }, [id]);

    const fetchStudentData = async () => {
        setLoading(true);
        try {
            // Fetch student details
            const studentRes = await axios.get(`/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudent(studentRes.data);

            // Fetch student results
            const resultsRes = await axios.get(`/results/student/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Group results by session
            const grouped = resultsRes.data.reduce((acc: Record<string, Result[]>, result: Result) => {
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

            setResults(resultsRes.data);
            setGroupedResults(grouped);

            // Auto-expand the latest session
            const sessions = Object.keys(grouped).sort().reverse();
            if (sessions.length > 0) {
                setExpandedSessions(new Set([sessions[0]]));
            }

        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to fetch student data",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeactivate = async () => {
        if (!student) return;
        
        const confirmed = window.confirm(
            "Are you sure you want to deactivate this student? They will no longer be able to login."
        );

        if (!confirmed) return;

        setProcessing(true);
        try {
            await axios.patch(`/students/${student._id}/deactivate`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast({
                title: "Success",
                description: "Student deactivated successfully"
            });

            // Refresh student data
            fetchStudentData();
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to deactivate student",
                variant: "destructive"
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleReactivate = async () => {
        if (!student) return;
        
        const confirmed = window.confirm(
            "Are you sure you want to reactivate this student? They will be able to login again."
        );

        if (!confirmed) return;

        setProcessing(true);
        try {
            await axios.patch(`/students/${student._id}/reactivate`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast({
                title: "Success",
                description: "Student reactivated successfully"
            });

            // Refresh student data
            fetchStudentData();
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to reactivate student",
                variant: "destructive"
            });
        } finally {
            setProcessing(false);
        }
    };

    const toggleSession = (session: string) => {
        const newExpanded = new Set(expandedSessions);
        if (newExpanded.has(session)) {
            newExpanded.delete(session);
        } else {
            newExpanded.add(session);
        }
        setExpandedSessions(newExpanded);
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

    const formatDate = (date?: string) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#041d29] text-white">
                <AdminSidebar />
                <main className="flex-1 p-6 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="animate-spin text-[#0b92bf] mx-auto mb-4" size={40} />
                        <p className="text-white/60">Loading student details...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="flex min-h-screen bg-[#041d29] text-white">
                <AdminSidebar />
                <main className="flex-1 p-6">
                    <Card className="p-12 bg-white/5 border-white/10 text-center">
                        <User size={48} className="mx-auto mb-4 text-white/20" />
                        <h2 className="text-xl text-white/60 mb-2">Student Not Found</h2>
                        <p className="text-white/40 mb-4">The student you're looking for doesn't exist or has been deleted.</p>
                        <Button onClick={() => navigate("/admin/students")} className="bg-[#0b92bf] hover:bg-[#0a7ca3]">
                            Back to Students List
                        </Button>
                    </Card>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Header with navigation */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <Link to="/admin/students">
                                <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                                    <ArrowLeft size={20} className="mr-1" />
                                    Back to List
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold">Student Details</h1>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/admin/students/edit/${student._id}`)}
                                className="border-white/20 text-white"
                            >
                                <Edit size={16} className="mr-2" />
                                Edit
                            </Button>
                            
                            {student.isActive ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDeactivate}
                                    disabled={processing}
                                    className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                                >
                                    {processing ? (
                                        <Loader2 size={16} className="animate-spin mr-2" />
                                    ) : (
                                        <UserX size={16} className="mr-2" />
                                    )}
                                    Deactivate
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleReactivate}
                                    disabled={processing}
                                    className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                                >
                                    {processing ? (
                                        <Loader2 size={16} className="animate-spin mr-2" />
                                    ) : (
                                        <UserCheck size={16} className="mr-2" />
                                    )}
                                    Reactivate
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Student Profile Card */}
                    <Card className="bg-gradient-to-r from-[#0b92bf]/20 to-transparent border-white/10 mb-6">
                        <div className="p-6">
                            <div className="flex items-start gap-6">
                                {/* Profile Image */}
                                <div className="w-24 h-24 rounded-full bg-[#0b92bf]/20 flex items-center justify-center overflow-hidden">
                                    {student.passportUrl ? (
                                        <img src={student.passportUrl} alt={student.firstName} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={40} className="text-[#0b92bf]" />
                                    )}
                                </div>

                                {/* Student Info */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-white/40 text-xs">Full Name</p>
                                        <p className="font-medium text-lg">{student.firstName} {student.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Admission Number</p>
                                        <p className="font-medium font-mono">{student.admissionNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Student ID</p>
                                        <p className="font-medium font-mono">{student.studentId}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Session</p>
                                        <p className="font-medium">{student.session || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Gender</p>
                                        <p className="font-medium">{student.gender || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Date of Birth</p>
                                        <p className="font-medium">{formatDate(student.dob)}</p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Status</p>
                                        <p className={`font-medium ${student.isActive ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {student.isActive ? 'Active' : 'Inactive'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-xs">Registered On</p>
                                        <p className="font-medium">{formatDate(student.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Results Section */}
                    <Card className="bg-white/5 border-white/10">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Award className="text-[#0b92bf]" size={20} />
                                Academic Results
                            </h2>

                            {Object.keys(groupedResults).length === 0 ? (
                                <div className="text-center py-12 text-white/40">
                                    <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
                                    <p>No results found for this student.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {Object.entries(groupedResults)
                                        .sort(([a], [b]) => b.localeCompare(a))
                                        .map(([session, sessionResults]) => (
                                            <Card key={session} className="bg-white/10 border-white/20 overflow-hidden">
                                                {/* Session Header */}
                                                <div
                                                    className="bg-[#0b92bf]/20 p-4 cursor-pointer hover:bg-[#0b92bf]/30 transition-colors"
                                                    onClick={() => toggleSession(session)}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="text-lg font-semibold">
                                                                Session {session}/{parseInt(session) + 1}
                                                            </h3>
                                                            <p className="text-sm text-white/60">
                                                                {sessionResults.length} Term{sessionResults.length > 1 ? 's' : ''}
                                                            </p>
                                                        </div>
                                                        {expandedSessions.has(session) ? (
                                                            <ChevronUp size={20} className="text-white/60" />
                                                        ) : (
                                                            <ChevronDown size={20} className="text-white/60" />
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Expanded Results */}
                                                {expandedSessions.has(session) && (
                                                    <div className="p-4">
                                                        {sessionResults.map((result) => (
                                                            <div key={result._id} className="mb-6 last:mb-0">
                                                                <h4 className="font-semibold text-[#0b92bf] mb-3">
                                                                    {result.term} Term
                                                                </h4>
                                                                
                                                                <div className="overflow-x-auto">
                                                                    <table className="w-full text-sm">
                                                                        <thead>
                                                                            <tr className="border-b border-white/20">
                                                                                <th className="text-left py-2 px-2 text-white/60">Subject</th>
                                                                                <th className="text-center py-2 px-2 text-white/60">CW</th>
                                                                                <th className="text-center py-2 px-2 text-white/60">HW</th>
                                                                                <th className="text-center py-2 px-2 text-white/60">CA</th>
                                                                                <th className="text-center py-2 px-2 text-white/60">Exam</th>
                                                                                <th className="text-center py-2 px-2 text-white/60">Total</th>
                                                                                <th className="text-center py-2 px-2 text-white/60">Grade</th>
                                                                                <th className="text-left py-2 px-2 text-white/60">Comment</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {result.results.map((item, idx) => (
                                                                                <tr key={idx} className="border-b border-white/10 hover:bg-white/5">
                                                                                    <td className="py-2 px-2 font-medium">
                                                                                        {item.subjectId?.name || item.subjectId?.code}
                                                                                    </td>
                                                                                    <td className="text-center py-2 px-2">{item.classWork}</td>
                                                                                    <td className="text-center py-2 px-2">{item.homeWork}</td>
                                                                                    <td className="text-center py-2 px-2">{item.ca}</td>
                                                                                    <td className="text-center py-2 px-2">{item.exam}</td>
                                                                                    <td className="text-center py-2 px-2 font-bold">{item.total}</td>
                                                                                    <td className="text-center py-2 px-2">
                                                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(item.grade)}`}>
                                                                                            {item.grade}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td className="py-2 px-2 text-white/80">{item.comment || '-'}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>

                                                                {/* Result Summary */}
                                                                <div className="mt-3 grid grid-cols-3 gap-4">
                                                                    <div className="bg-white/5 p-2 rounded">
                                                                        <p className="text-xs text-white/40">Overall Total</p>
                                                                        <p className="font-bold">{result.overallTotal}</p>
                                                                    </div>
                                                                    <div className="bg-white/5 p-2 rounded">
                                                                        <p className="text-xs text-white/40">Average</p>
                                                                        <p className="font-bold">{result.average}%</p>
                                                                    </div>
                                                                    {result.positionInClass && (
                                                                        <div className="bg-white/5 p-2 rounded">
                                                                            <p className="text-xs text-white/40">Position</p>
                                                                            <p className="font-bold">{result.positionInClass}</p>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {result.remarks && (
                                                                    <div className="mt-3 p-3 bg-white/5 rounded">
                                                                        <p className="text-xs text-white/40">Teacher's Remark</p>
                                                                        <p className="text-sm mt-1">{result.remarks}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </Card>
                                        ))}
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <Link to={`/admin/results?studentId=${student._id}`}>
                            <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <FileText className="text-[#0b92bf]" size={20} />
                                    <div>
                                        <h3 className="font-semibold">Upload Results</h3>
                                        <p className="text-sm text-white/60">Add new results for this student</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        <Link to={`/admin/students/edit/${student._id}`}>
                            <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <Edit className="text-[#0b92bf]" size={20} />
                                    <div>
                                        <h3 className="font-semibold">Edit Details</h3>
                                        <p className="text-sm text-white/60">Update student information</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                        <Card className="p-4 bg-white/5 border-white/10">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="text-[#0b92bf]" size={20} />
                                <div>
                                    <h3 className="font-semibold">Performance</h3>
                                    <p className="text-sm text-white/60">Average: {results.length > 0 
                                        ? (results.reduce((acc, r) => acc + r.average, 0) / results.length).toFixed(1) 
                                        : 'N/A'}%
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}