// // src/pages/StudentDashboard.tsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import axios from "@/lib/api";
// import {
//     BookOpen,
//     Award,
//     TrendingUp,
//     Calendar,
//     ChevronDown,
//     ChevronUp,
//     LogOut,
//     Filter
// } from "lucide-react";

// interface Student {
//     _id: string;
//     studentId: string;
//     firstName: string;
//     lastName: string;
//     admissionNumber: string;
//     session: string;
//     gender?: string;
// }

// interface SubjectRef {
//     _id: string;
//     name: string;
//     code: string;
// }

// interface ResultItem {
//     subjectId: SubjectRef;
//     classWork: number;
//     homeWork: number;
//     ca: number;
//     exam: number;
//     total: number;
//     grade: string;
//     comment?: string;
// }

// interface Result {
//     _id: string;
//     studentId: string;
//     session: string;
//     term: string;
//     results: ResultItem[];
//     overallTotal: number;
//     average: number;
//     positionInClass?: number;
//     remarks?: string;
//     createdAt: string;
// }

// interface GroupedResults {
//     [session: string]: Result[];
// }

// export default function StudentDashboard() {
//     const navigate = useNavigate();
//     const { toast } = useToast();

//     const [student, setStudent] = useState<Student | null>(null);
//     const [results, setResults] = useState<Result[]>([]);
//     const [groupedResults, setGroupedResults] = useState<GroupedResults>({});
//     const [loading, setLoading] = useState(true);
//     const [selectedSession, setSelectedSession] = useState<string>("");
//     const [selectedTerm, setSelectedTerm] = useState<string>("");
//     const [displayedResult, setDisplayedResult] = useState<Result | null>(null);
//     const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

//     const token = localStorage.getItem("token");

//     // Extract info from admission number (25/BBS/001)
//     const parseAdmission = (adm?: string) => {
//         if (!adm) return { year: "", schoolType: "" };
//         const [year, type] = adm.split("/");
//         return {
//             year: `20${year}`,
//             schoolType:
//                 type === "BBS"
//                     ? "Basic School"
//                     : type === "BBC"
//                         ? "College"
//                         : "Unknown",
//         };
//     };

//     // Format gender for display
//     const formatGender = (g?: string) => {
//         if (!g) return "N/A";
//         if (g.toLowerCase() === "male") return "Male";
//         if (g.toLowerCase() === "female") return "Female";
//         return g;
//     };

//     // Get available sessions (from student's enrollment year onwards)
//     const getAvailableSessions = () => {
//         if (!student) return [];
        
//         const startYear = parseInt(student.session.split('/')[0]);
//         const currentYear = new Date().getFullYear();
//         const sessions = [];
        
//         for (let year = startYear; year <= currentYear + 1; year++) {
//             sessions.push(year.toString());
//         }
        
//         return sessions;
//     };

//     // Get terms for a specific session
//     const getTermsForSession = (session: string) => {
//         return results
//             .filter(r => r.session === session)
//             .map(r => r.term)
//             .filter((value, index, self) => self.indexOf(value) === index)
//             .sort((a, b) => {
//                 const termOrder = { "First": 1, "Second": 2, "Third": 3 };
//                 return termOrder[a as keyof typeof termOrder] - termOrder[b as keyof typeof termOrder];
//             });
//     };

//     // Group results by session
//     useEffect(() => {
//         const grouped = results.reduce((acc: GroupedResults, result) => {
//             if (!acc[result.session]) {
//                 acc[result.session] = [];
//             }
//             acc[result.session].push(result);
//             return acc;
//         }, {});
        
//         // Sort results within each session by term
//         Object.keys(grouped).forEach(session => {
//             grouped[session].sort((a, b) => {
//                 const termOrder = { "First": 1, "Second": 2, "Third": 3 };
//                 return termOrder[a.term as keyof typeof termOrder] - termOrder[b.term as keyof typeof termOrder];
//             });
//         });
        
//         setGroupedResults(grouped);
//     }, [results]);

//     // Set default selections when results are loaded
//     useEffect(() => {
//         if (Object.keys(groupedResults).length > 0) {
//             // Get the latest session
//             const sessions = Object.keys(groupedResults).sort().reverse();
//             if (sessions.length > 0) {
//                 const latestSession = sessions[0];
//                 setSelectedSession(latestSession);
                
//                 // Get the latest term in that session
//                 const terms = getTermsForSession(latestSession);
//                 if (terms.length > 0) {
//                     const latestTerm = terms[terms.length - 1];
//                     setSelectedTerm(latestTerm);
                    
//                     // Find and set the displayed result
//                     const result = groupedResults[latestSession].find(r => r.term === latestTerm);
//                     if (result) {
//                         setDisplayedResult(result);
//                     }
//                 }
//             }
//         }
//     }, [groupedResults]);

//     // Update displayed result when selections change
//     useEffect(() => {
//         if (selectedSession && selectedTerm && groupedResults[selectedSession]) {
//             const result = groupedResults[selectedSession].find(r => r.term === selectedTerm);
//             setDisplayedResult(result || null);
//         }
//     }, [selectedSession, selectedTerm, groupedResults]);

//     // Fetch student & results
//     useEffect(() => {
//         if (!token) return;

//         const fetchData = async () => {
//             try {
//                 // Fetch student info
//                 const studentRes = await axios.get("/students/me", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setStudent(studentRes.data);

//                 // Fetch results for this student
//                 const resultsRes = await axios.get(`/results/student/${studentRes.data._id}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 console.log("All results:", resultsRes.data);
//                 setResults(resultsRes.data);

//             } catch (err: any) {
//                 toast({
//                     title: "Error",
//                     description: err.response?.data?.msg || "Failed to load data",
//                     variant: "destructive",
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [token]);

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate("/");
//     };

//     const toggleSection = (sectionId: string) => {
//         const newExpanded = new Set(expandedSections);
//         if (newExpanded.has(sectionId)) {
//             newExpanded.delete(sectionId);
//         } else {
//             newExpanded.add(sectionId);
//         }
//         setExpandedSections(newExpanded);
//     };

//     const calculatePercentage = (score: number, max: number): string => {
//         return ((score / max) * 100).toFixed(1);
//     };

//     const getGradeColor = (grade: string): string => {
//         const colors = {
//             'A': 'text-green-600 bg-green-100',
//             'B': 'text-blue-600 bg-blue-100',
//             'C': 'text-yellow-600 bg-yellow-100',
//             'D': 'text-orange-600 bg-orange-100',
//             'E': 'text-red-600 bg-red-100',
//             'F': 'text-red-700 bg-red-200'
//         };
//         return colors[grade as keyof typeof colors] || 'text-gray-600 bg-gray-100';
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-[#041d29] text-white">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b92bf] mx-auto mb-4"></div>
//                     <p className="text-white/60">Loading your dashboard...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!student) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-[#041d29] text-white">
//                 Unable to load dashboard. Please login again.
//             </div>
//         );
//     }

//     const { year, schoolType } = parseAdmission(student.admissionNumber);
//     const availableSessions = getAvailableSessions();
//     const currentSessionTerms = selectedSession ? getTermsForSession(selectedSession) : [];

//     return (
//         <div className="min-h-screen bg-[#041d29] p-6 text-white">
//             {/* Header */}
//             <div className="flex justify-between items-center mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold">Welcome, {student.firstName}!</h1>
//                     <p className="text-white/60 text-sm mt-1">Student Dashboard</p>
//                 </div>
//                 <Button
//                     onClick={handleLogout}
//                     variant="outline"
//                     className="border-white/20 text-white hover:bg-white/10"
//                 >
//                     <LogOut size={16} className="mr-2" />
//                     Logout
//                 </Button>
//             </div>

//             {/* Profile Card */}
//             <Card className="mb-6 bg-gradient-to-r from-[#0b92bf] to-[#086d8f] text-white border-0">
//                 <div className="p-6">
//                     <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//                         <BookOpen size={20} />
//                         Student Profile
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         <div>
//                             <p className="text-white/70 text-sm">Full Name</p>
//                             <p className="font-medium">{student.firstName} {student.lastName}</p>
//                         </div>
//                         <div>
//                             <p className="text-white/70 text-sm">Admission Number</p>
//                             <p className="font-medium font-mono">{student.admissionNumber}</p>
//                         </div>
//                         <div>
//                             <p className="text-white/70 text-sm">Student ID</p>
//                             <p className="font-medium font-mono">{student.studentId}</p>
//                         </div>
//                         <div>
//                             <p className="text-white/70 text-sm">Current Session</p>
//                             <p className="font-medium">{student.session}</p>
//                         </div>
//                         <div>
//                             <p className="text-white/70 text-sm">Gender</p>
//                             <p className="font-medium">{formatGender(student.gender)}</p>
//                         </div>
//                         <div>
//                             <p className="text-white/70 text-sm">Entry Year</p>
//                             <p className="font-medium">{year}</p>
//                         </div>
//                         <div>
//                             <p className="text-white/70 text-sm">School Type</p>
//                             <p className="font-medium">{schoolType}</p>
//                         </div>
//                     </div>
//                 </div>
//             </Card>

//             {/* Results Section */}
//             <Card className="bg-white/5 border-white/10">
//                 <div className="p-6">
//                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                         <h2 className="text-xl font-bold text-white flex items-center gap-2">
//                             <Award className="text-[#0b92bf]" size={20} />
//                             Academic Results
//                         </h2>

//                         {/* Filter Controls */}
//                         {Object.keys(groupedResults).length > 0 && (
//                             <div className="flex gap-3">
//                                 <select
//                                     value={selectedSession}
//                                     onChange={(e) => {
//                                         setSelectedSession(e.target.value);
//                                         // Reset term when session changes
//                                         const terms = getTermsForSession(e.target.value);
//                                         if (terms.length > 0) {
//                                             setSelectedTerm(terms[terms.length - 1]);
//                                         }
//                                     }}
//                                     className="px-3 py-2 rounded bg-white/10 text-white border-white/20 text-sm"
//                                 >
//                                     {Object.keys(groupedResults).sort().reverse().map(session => (
//                                         <option key={session} value={session}>
//                                             Session {session}/{parseInt(session) + 1}
//                                         </option>
//                                     ))}
//                                 </select>

//                                 {selectedSession && currentSessionTerms.length > 0 && (
//                                     <select
//                                         value={selectedTerm}
//                                         onChange={(e) => setSelectedTerm(e.target.value)}
//                                         className="px-3 py-2 rounded bg-white/10 text-white border-white/20 text-sm"
//                                     >
//                                         {currentSessionTerms.map(term => (
//                                             <option key={term} value={term}>
//                                                 {term} Term
//                                             </option>
//                                         ))}
//                                     </select>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {!displayedResult ? (
//                         <div className="text-center py-12 text-white/40">
//                             <BookOpen size={48} className="mx-auto mb-4 opacity-40" />
//                             <p className="text-lg">No results available.</p>
//                             <p className="text-sm mt-2">Check back later for your academic records.</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-6">
//                             {/* Full Result Display */}
//                             <Card className="bg-white/10 border-white/20 overflow-hidden">
//                                 {/* Result Header */}
//                                 <div className="bg-[#0b92bf]/20 p-6 border-b border-white/10">
//                                     <div className="flex justify-between items-center">
//                                         <div>
//                                             <h3 className="text-2xl font-bold text-white">
//                                                 {displayedResult.term} Term Report
//                                             </h3>
//                                             <p className="text-white/60 text-sm mt-1">
//                                                 Session: {displayedResult.session}/{parseInt(displayedResult.session) + 1}
//                                             </p>
//                                         </div>
//                                         <div className="text-right">
//                                             <div className="text-3xl font-bold text-[#0b92bf]">
//                                                 {displayedResult.average}%
//                                             </div>
//                                             <p className="text-white/60 text-sm">Overall Average</p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Student Info Summary */}
//                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 border-b border-white/10">
//                                     <div>
//                                         <p className="text-white/40 text-xs">Student Name</p>
//                                         <p className="font-medium">{student.firstName} {student.lastName}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-white/40 text-xs">Admission No.</p>
//                                         <p className="font-medium font-mono">{student.admissionNumber}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-white/40 text-xs">Total Subjects</p>
//                                         <p className="font-medium">{displayedResult.results.length}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-white/40 text-xs">Overall Total</p>
//                                         <p className="font-medium">{displayedResult.overallTotal}</p>
//                                     </div>
//                                 </div>

//                                 {/* Results Table */}
//                                 <div className="p-6">
//                                     <div className="overflow-x-auto">
//                                         <table className="w-full text-sm">
//                                             <thead>
//                                                 <tr className="border-b border-white/20">
//                                                     <th className="text-left py-3 px-2 text-white/60">Subject</th>
//                                                     <th className="text-center py-3 px-2 text-white/60">CW (10%)</th>
//                                                     <th className="text-center py-3 px-2 text-white/60">HW (10%)</th>
//                                                     <th className="text-center py-3 px-2 text-white/60">CA (20%)</th>
//                                                     <th className="text-center py-3 px-2 text-white/60">Exam (60%)</th>
//                                                     <th className="text-center py-3 px-2 text-white/60">Total</th>
//                                                     <th className="text-center py-3 px-2 text-white/60">Grade</th>
//                                                     <th className="text-left py-3 px-2 text-white/60">Comment</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {displayedResult.results.map((item, index) => (
//                                                     <tr key={index} className="border-b border-white/10 hover:bg-white/5">
//                                                         <td className="py-3 px-2 font-medium">
//                                                             {item.subjectId?.name || item.subjectId?.code}
//                                                         </td>
//                                                         <td className="text-center py-3 px-2">
//                                                             <span>{item.classWork}</span>
//                                                             <span className="text-white/40 text-xs ml-1">
//                                                                 ({calculatePercentage(item.classWork, 10)}%)
//                                                             </span>
//                                                         </td>
//                                                         <td className="text-center py-3 px-2">
//                                                             <span>{item.homeWork}</span>
//                                                             <span className="text-white/40 text-xs ml-1">
//                                                                 ({calculatePercentage(item.homeWork, 10)}%)
//                                                             </span>
//                                                         </td>
//                                                         <td className="text-center py-3 px-2">
//                                                             <span>{item.ca}</span>
//                                                             <span className="text-white/40 text-xs ml-1">
//                                                                 ({calculatePercentage(item.ca, 20)}%)
//                                                             </span>
//                                                         </td>
//                                                         <td className="text-center py-3 px-2">
//                                                             <span>{item.exam}</span>
//                                                             <span className="text-white/40 text-xs ml-1">
//                                                                 ({calculatePercentage(item.exam, 60)}%)
//                                                             </span>
//                                                         </td>
//                                                         <td className="text-center py-3 px-2 font-bold">
//                                                             {item.total}
//                                                         </td>
//                                                         <td className="text-center py-3 px-2">
//                                                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(item.grade)}`}>
//                                                                 {item.grade}
//                                                             </span>
//                                                         </td>
//                                                         <td className="py-3 px-2 text-white/80">
//                                                             {item.comment || '-'}
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>

//                                     {/* Teacher's Remark */}
//                                     {displayedResult.remarks && (
//                                         <div className="mt-6 p-4 bg-white/5 rounded-lg">
//                                             <p className="text-white/60 text-sm">Teacher's Remark</p>
//                                             <p className="text-white mt-2">{displayedResult.remarks}</p>
//                                         </div>
//                                     )}

//                                     {/* Position in Class */}
//                                     {displayedResult.positionInClass && (
//                                         <div className="mt-4 text-right">
//                                             <p className="text-sm text-white/60">
//                                                 Class Position: <span className="text-[#0b92bf] font-bold">{displayedResult.positionInClass}</span>
//                                             </p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </Card>

//                             {/* Other Results Summary */}
//                             {Object.keys(groupedResults).length > 1 && (
//                                 <div className="mt-8">
//                                     <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                                         <Filter size={16} className="text-[#0b92bf]" />
//                                         Other Results
//                                     </h3>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                                         {Object.entries(groupedResults)
//                                             .filter(([session]) => session !== selectedSession)
//                                             .map(([session, sessionResults]) => (
//                                                 <Card
//                                                     key={session}
//                                                     className="bg-white/5 border-white/10 p-4 hover:bg-white/10 transition-colors cursor-pointer"
//                                                     onClick={() => {
//                                                         setSelectedSession(session);
//                                                         const terms = getTermsForSession(session);
//                                                         if (terms.length > 0) {
//                                                             setSelectedTerm(terms[terms.length - 1]);
//                                                         }
//                                                     }}
//                                                 >
//                                                     <h4 className="font-semibold text-[#0b92bf]">
//                                                         Session {session}/{parseInt(session) + 1}
//                                                     </h4>
//                                                     <p className="text-sm text-white/60 mt-1">
//                                                         {sessionResults.length} Term{sessionResults.length > 1 ? 's' : ''}
//                                                     </p>
//                                                     <div className="flex gap-2 mt-2">
//                                                         {sessionResults.map(r => (
//                                                             <span
//                                                                 key={r.term}
//                                                                 className="text-xs px-2 py-1 bg-white/10 rounded"
//                                                             >
//                                                                 {r.term}
//                                                             </span>
//                                                         ))}
//                                                     </div>
//                                                 </Card>
//                                             ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </Card>

//             {/* Coming Soon Section */}
//             <Card className="mt-6 bg-gradient-to-r from-[#0b92bf]/20 to-transparent border-white/10">
//                 <div className="p-6 text-center">
//                     <h2 className="text-xl font-bold text-[#0b92bf] mb-2">Assignments & Quizzes</h2>
//                     <p className="text-white/60">This feature is coming soon. Stay tuned!</p>
//                 </div>
//             </Card>
//         </div>
//     );
// }
// src/pages/StudentDashboard.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import StudentSidebar from "@/components/Student/StudentSidebar";
import {
    BookOpen,
    Award,
    TrendingUp,
    Calendar,
    ChevronDown,
    ChevronUp,
    LogOut,
    Filter,
    Star,
    Heart,
    Sparkles,
    Smile,
    Moon,
    Sun,
    GraduationCap,
    Trophy,
    Clock,
    Menu,
    X
} from "lucide-react";

interface Student {
    _id: string;
    studentId: string;
    firstName: string;
    lastName: string;
    admissionNumber: string;
    session: string;
    gender?: string;
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

interface GroupedResults {
    [session: string]: Result[];
}

export default function StudentDashboard() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [student, setStudent] = useState<Student | null>(null);
    const [results, setResults] = useState<Result[]>([]);
    const [groupedResults, setGroupedResults] = useState<GroupedResults>({});
    const [loading, setLoading] = useState(true);
    const [selectedSession, setSelectedSession] = useState<string>("");
    const [selectedTerm, setSelectedTerm] = useState<string>("");
    const [displayedResult, setDisplayedResult] = useState<Result | null>(null);
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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

    // Get available sessions (from student's enrollment year onwards)
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
        return results
            .filter(r => r.session === session)
            .map(r => r.term)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort((a, b) => {
                const termOrder = { "First": 1, "Second": 2, "Third": 3 };
                return termOrder[a as keyof typeof termOrder] - termOrder[b as keyof typeof termOrder];
            });
    };

    // Group results by session
    useEffect(() => {
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
    }, [results]);

    // Set default selections when results are loaded
    useEffect(() => {
        if (Object.keys(groupedResults).length > 0) {
            // Get the latest session
            const sessions = Object.keys(groupedResults).sort().reverse();
            if (sessions.length > 0) {
                const latestSession = sessions[0];
                setSelectedSession(latestSession);
                
                // Get the latest term in that session
                const terms = getTermsForSession(latestSession);
                if (terms.length > 0) {
                    const latestTerm = terms[terms.length - 1];
                    setSelectedTerm(latestTerm);
                    
                    // Find and set the displayed result
                    const result = groupedResults[latestSession].find(r => r.term === latestTerm);
                    if (result) {
                        setDisplayedResult(result);
                    }
                }
            }
        }
    }, [groupedResults]);

    // Update displayed result when selections change
    useEffect(() => {
        if (selectedSession && selectedTerm && groupedResults[selectedSession]) {
            const result = groupedResults[selectedSession].find(r => r.term === selectedTerm);
            setDisplayedResult(result || null);
        }
    }, [selectedSession, selectedTerm, groupedResults]);

    // Fetch student & results
    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                // Fetch student info
                const studentRes = await axios.get("/students/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStudent(studentRes.data);

                // Fetch results for this student
                const resultsRes = await axios.get(`/results/student/${studentRes.data._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                console.log("All results:", resultsRes.data);
                setResults(resultsRes.data);

            } catch (err: any) {
                toast({
                    title: "Error",
                    description: err.response?.data?.msg || "Failed to load data",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const toggleSection = (sectionId: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        } else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
    };

    const calculatePercentage = (score: number, max: number): string => {
        return ((score / max) * 100).toFixed(1);
    };

    const getGradeColor = (grade: string): string => {
        const colors = {
            'A': 'bg-green-100 text-green-700 border-green-300',
            'B': 'bg-blue-100 text-blue-700 border-blue-300',
            'C': 'bg-yellow-100 text-yellow-700 border-yellow-300',
            'D': 'bg-orange-100 text-orange-700 border-orange-300',
            'E': 'bg-red-100 text-red-700 border-red-300',
            'F': 'bg-red-200 text-red-800 border-red-400'
        };
        return colors[grade as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-300';
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent mx-auto mb-4"></div>
                        <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-ping" />
                    </div>
                    <p className="text-gray-600 font-medium">Loading your dashboard...</p>
                    <Smile className="w-6 h-6 text-yellow-500 mx-auto mt-2 animate-bounce" />
                </div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100">
                <Card className="p-8 bg-white/90 backdrop-blur-sm border-2 border-yellow-200">
                    <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                    <p className="text-gray-600">Unable to load dashboard. Please login again.</p>
                    <Button 
                        onClick={() => navigate("/login")}
                        className="mt-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
                    >
                        Go to Login
                    </Button>
                </Card>
            </div>
        );
    }

    const { year, schoolType } = parseAdmission(student.admissionNumber);
    const availableSessions = getAvailableSessions();
    const currentSessionTerms = selectedSession ? getTermsForSession(selectedSession) : [];

    return (
        <div className="flex h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
            {/* Fixed Sidebar for desktop */}
            <div className="hidden md:block h-full overflow-hidden flex-shrink-0">
                <StudentSidebar />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="bg-white/90 backdrop-blur-sm border-2 border-yellow-200 rounded-lg shadow-lg"
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            {/* Mobile sidebar overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-64 h-full overflow-hidden" onClick={e => e.stopPropagation()}>
                        <StudentSidebar />
                    </div>
                </div>
            )}

            {/* Scrollable Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm border-b-2 border-yellow-200 sticky top-0 z-30">
                    <div className="px-4 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3 ml-12 md:ml-0">
                                <div className="relative">
                                    <img 
                                        src="/logo-watermark.png" 
                                        alt="logo" 
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-400"
                                    />
                                    <Sparkles className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                                </div>
                                <div>
                                    <h1 className="text-lg md:text-xl font-bold text-gray-800">Welcome, {student.firstName}!</h1>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <GraduationCap className="w-3 h-3" />
                                        Student Dashboard
                                        <Smile className="w-3 h-3 text-yellow-500" />
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 text-sm md:text-base"
                            >
                                <LogOut size={16} className="mr-2" />
                                <span className="hidden sm:inline">Logout</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="p-4 md:p-6">
                    {/* Profile Card */}
                    <Card className="mb-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white border-0 shadow-xl">
                        <div className="p-4 md:p-6">
                            <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                                <Star className="w-4 h-4 md:w-5 md:h-5" />
                                Student Profile
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3">
                                    <p className="text-white/70 text-xs">Full Name</p>
                                    <p className="font-medium text-sm md:text-base">{student.firstName} {student.lastName}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3">
                                    <p className="text-white/70 text-xs">Admission Number</p>
                                    <p className="font-medium font-mono text-sm md:text-base">{student.admissionNumber}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3">
                                    <p className="text-white/70 text-xs">Student ID</p>
                                    <p className="font-medium font-mono text-sm md:text-base">{student.studentId}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3">
                                    <p className="text-white/70 text-xs">Current Session</p>
                                    <p className="font-medium text-sm md:text-base">{student.session}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3">
                                    <p className="text-white/70 text-xs">Gender</p>
                                    <p className="font-medium text-sm md:text-base">{formatGender(student.gender)}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3">
                                    <p className="text-white/70 text-xs">Entry Year</p>
                                    <p className="font-medium text-sm md:text-base">{year}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3">
                                    <p className="text-white/70 text-xs">School Type</p>
                                    <p className="font-medium text-sm md:text-base">{schoolType}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Results Section */}
                    <Card className="bg-white/90 backdrop-blur-sm border-2 border-yellow-200 shadow-xl">
                        <div className="p-4 md:p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <Trophy className="text-amber-500" size={20} />
                                    My Academic Results
                                    <Sparkles className="w-4 h-4 text-yellow-500" />
                                </h2>

                                {/* Filter Controls */}
                                {Object.keys(groupedResults).length > 0 && (
                                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                                        <select
                                            value={selectedSession}
                                            onChange={(e) => {
                                                setSelectedSession(e.target.value);
                                                const terms = getTermsForSession(e.target.value);
                                                if (terms.length > 0) {
                                                    setSelectedTerm(terms[terms.length - 1]);
                                                }
                                            }}
                                            className="px-3 py-2 rounded-xl border-2 border-yellow-200 bg-white text-gray-700 focus:border-amber-500 focus:ring-amber-500 text-sm w-full sm:w-auto"
                                        >
                                            {Object.keys(groupedResults).sort().reverse().map(session => (
                                                <option key={session} value={session}>
                                                    Session {session}/{parseInt(session) + 1}
                                                </option>
                                            ))}
                                        </select>

                                        {selectedSession && currentSessionTerms.length > 0 && (
                                            <select
                                                value={selectedTerm}
                                                onChange={(e) => setSelectedTerm(e.target.value)}
                                                className="px-3 py-2 rounded-xl border-2 border-yellow-200 bg-white text-gray-700 focus:border-amber-500 focus:ring-amber-500 text-sm w-full sm:w-auto"
                                            >
                                                {currentSessionTerms.map(term => (
                                                    <option key={term} value={term}>
                                                        {term} Term
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                )}
                            </div>

                            {!displayedResult ? (
                                <div className="text-center py-8 md:py-12 text-gray-500">
                                    <BookOpen size={40} className="mx-auto mb-4 text-gray-400" />
                                    <p className="text-base md:text-lg">No results available yet.</p>
                                    <p className="text-xs md:text-sm mt-2">Keep working hard! Your results will appear here.</p>
                                    <Smile className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 mx-auto mt-4" />
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Full Result Display */}
                                    <Card className="bg-gradient-to-br from-white to-amber-50 border-2 border-yellow-200 overflow-hidden">
                                        {/* Result Header */}
                                        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-4 md:p-6">
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-white">
                                                        {displayedResult.term} Term Report
                                                    </h3>
                                                    <p className="text-white/80 text-xs md:text-sm mt-1 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                                                        Session: {displayedResult.session}/{parseInt(displayedResult.session) + 1}
                                                    </p>
                                                </div>
                                                <div className="text-left sm:text-right">
                                                    <div className="text-2xl md:text-3xl font-bold text-white">
                                                        {displayedResult.average}%
                                                    </div>
                                                    <p className="text-white/80 text-xs md:text-sm">Overall Average</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Student Info Summary */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-4 bg-amber-50/50">
                                            <div>
                                                <p className="text-gray-500 text-xs">Student Name</p>
                                                <p className="font-medium text-gray-800 text-sm md:text-base">{student.firstName} {student.lastName}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs">Admission No.</p>
                                                <p className="font-medium font-mono text-gray-800 text-sm md:text-base">{student.admissionNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs">Total Subjects</p>
                                                <p className="font-medium text-gray-800 text-sm md:text-base">{displayedResult.results.length}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-xs">Overall Total</p>
                                                <p className="font-medium text-gray-800 text-sm md:text-base">{displayedResult.overallTotal}</p>
                                            </div>
                                        </div>

                                        {/* Results Table */}
                                        <div className="p-3 md:p-6">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-xs md:text-sm">
                                                    <thead>
                                                        <tr className="bg-amber-100">
                                                            <th className="text-left py-2 md:py-3 px-1 md:px-2 text-gray-700 font-semibold">Subject</th>
                                                            <th className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-700 font-semibold">CW</th>
                                                            <th className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-700 font-semibold">HW</th>
                                                            <th className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-700 font-semibold">CA</th>
                                                            <th className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-700 font-semibold">Exam</th>
                                                            <th className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-700 font-semibold">Total</th>
                                                            <th className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-700 font-semibold">Grade</th>
                                                            <th className="text-left py-2 md:py-3 px-1 md:px-2 text-gray-700 font-semibold">Comment</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {displayedResult.results.map((item, index) => (
                                                            <tr key={index} className="border-b border-gray-200 hover:bg-amber-50/50">
                                                                <td className="py-2 md:py-3 px-1 md:px-2 font-medium text-gray-800">
                                                                    {item.subjectId?.name || item.subjectId?.code}
                                                                </td>
                                                                <td className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-600">
                                                                    {item.classWork}
                                                                </td>
                                                                <td className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-600">
                                                                    {item.homeWork}
                                                                </td>
                                                                <td className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-600">
                                                                    {item.ca}
                                                                </td>
                                                                <td className="text-center py-2 md:py-3 px-1 md:px-2 text-gray-600">
                                                                    {item.exam}
                                                                </td>
                                                                <td className="text-center py-2 md:py-3 px-1 md:px-2 font-bold text-gray-800">
                                                                    {item.total}
                                                                </td>
                                                                <td className="text-center py-2 md:py-3 px-1 md:px-2">
                                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getGradeColor(item.grade)}`}>
                                                                        {item.grade}
                                                                    </span>
                                                                </td>
                                                                <td className="py-2 md:py-3 px-1 md:px-2 text-gray-600 text-xs">
                                                                    {item.comment || '-'}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* Teacher's Remark */}
                                            {displayedResult.remarks && (
                                                <div className="mt-4 md:mt-6 p-3 md:p-4 bg-amber-50 rounded-xl border border-amber-200">
                                                    <p className="text-amber-800 text-xs md:text-sm font-medium">Teacher's Remark</p>
                                                    <p className="text-gray-700 text-sm md:text-base mt-1">{displayedResult.remarks}</p>
                                                </div>
                                            )}

                                            {/* Position in Class */}
                                            {displayedResult.positionInClass && (
                                                <div className="mt-4 text-right">
                                                    <p className="text-xs md:text-sm text-gray-600">
                                                        Class Position: <span className="text-amber-600 font-bold">{displayedResult.positionInClass}</span>
                                                        <Trophy className="inline w-3 h-3 md:w-4 md:h-4 ml-1 text-yellow-500" />
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </Card>

                                    {/* Other Results Summary */}
                                    {Object.keys(groupedResults).length > 1 && (
                                        <div className="mt-6 md:mt-8">
                                            <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
                                                <Filter size={16} className="text-amber-500" />
                                                Other Results
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {Object.entries(groupedResults)
                                                    .filter(([session]) => session !== selectedSession)
                                                    .map(([session, sessionResults]) => (
                                                        <Card
                                                            key={session}
                                                            className="bg-white border-2 border-yellow-200 p-3 md:p-4 hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer group"
                                                            onClick={() => {
                                                                setSelectedSession(session);
                                                                const terms = getTermsForSession(session);
                                                                if (terms.length > 0) {
                                                                    setSelectedTerm(terms[terms.length - 1]);
                                                                }
                                                            }}
                                                        >
                                                            <h4 className="font-semibold text-amber-600 group-hover:text-amber-700 text-sm md:text-base">
                                                                Session {session}/{parseInt(session) + 1}
                                                            </h4>
                                                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                                                                {sessionResults.length} Term{sessionResults.length > 1 ? 's' : ''}
                                                            </p>
                                                            <div className="flex gap-2 mt-2">
                                                                {sessionResults.map(r => (
                                                                    <span
                                                                        key={r.term}
                                                                        className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full"
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
                            )}
                        </div>
                    </Card>

                    {/* Coming Soon Section */}
                    <Card className="mt-6 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-yellow-300">
                        <div className="p-4 md:p-6 text-center">
                            <div className="flex justify-center gap-2 mb-2">
                                <Clock className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                            </div>
                            <h2 className="text-lg md:text-xl font-bold text-amber-800 mb-2">Assignments & Quizzes</h2>
                            <p className="text-amber-600 text-sm md:text-base">This feature is coming soon. Stay tuned!</p>
                            <div className="flex justify-center gap-1 mt-3">
                                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}