// // src/pages/staff/StaffDashboard.tsx
// import { useEffect, useState } from "react";
// import StaffSidebar from "@/components/Staff/StaffSidebar";
// import { Card } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { Link } from "react-router-dom";

// interface RecentResult {
//     _id: string;          // result id
//     studentId: string;    // ✅ REQUIRED
//     studentName: string;
//     admissionNumber: string;
//     session: string;
//     term: string;
// }

// interface Stats {
//     myStudents: number;
//     resultsToday: number;
//     recentResults: RecentResult[];
// }

// export default function StaffDashboard() {
//     const [stats, setStats] = useState<Stats | null>(null);
//     const { toast } = useToast();
//     const token = localStorage.getItem("token");

//     useEffect(() => {
//         (async () => {
//             try {
//                 // Fetch staff dashboard stats
//                 const res = await fetch("https://api.busybrainschool.com//api/staff/dashboard/stats", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 if (!res.ok) throw new Error("Failed to fetch stats");

//                 const data = await res.json();
//                 setStats(data);
//             } catch (err: any) {
//                 toast({ title: "Error", description: err.message, variant: "destructive" });
//             }
//         })();
//     }, [toast, token]);

//     return (
//         <div className="flex min-h-screen bg-[#041d29] text-white">
//             <StaffSidebar />

//             <main className="flex-1 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                     <h1 className="text-2xl font-bold">Staff Dashboard</h1>
//                     <Link to="/staff/results">
//                         <button className="px-4 py-2 bg-[#0b92bf] rounded">Upload Results</button>
//                     </Link>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <Card className="p-4 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
//                         <div className="text-sm text-[#9fb6c2]">My Students</div>
//                         <div className="text-2xl font-bold">{stats?.myStudents ?? "—"}</div>
//                     </Card>
//                     <Card className="p-4 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
//                         <div className="text-sm text-[#9fb6c2]">Results Today</div>
//                         <div className="text-2xl font-bold">{stats?.resultsToday ?? "—"}</div>
//                     </Card>
//                 </div>

//                 {/* Recent Results */}
//                 <Card className="p-4 bg-white/5">
//                     <div className="flex items-center justify-between mb-3">
//                         <h2 className="text-lg font-semibold">Recent Results</h2>
//                         <Link to="/staff/view-results" className="text-sm text-[#0b92bf] hover:underline">
//                             View Result
//                         </Link>
//                     </div>

//                     <div className="space-y-2">
//                         {stats?.recentResults && stats.recentResults.length > 0 ? (
//                             stats.recentResults.map((r) => (
//                                 <div
//                                     key={r._id}
//                                     className="flex items-center justify-between bg-white/3 p-3 rounded"
//                                 >
//                                     <div>
//                                         <div className="font-medium">{r.studentName}</div>
//                                         <div className="text-sm text-[#cfe7ee]">
//                                             {r.admissionNumber} - {r.session} ({r.term})
//                                         </div>
//                                     </div>

//                                 </div>
//                             ))
//                         ) : (
//                             <div className="text-sm text-[#9fb6c2]">No recent results found</div>
//                         )}
//                     </div>
//                 </Card>
//             </main>
//         </div>
//     );
// }
// src/pages/staff/StaffDashboard.tsx
import { useEffect, useState } from "react";
import StaffSidebar from "@/components/Staff/StaffSidebar";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import axios from "@/lib/api"; // ✅ Use axios like your other components

interface RecentResult {
    _id: string;
    studentId: string;
    studentName: string;
    admissionNumber: string;
    session: string;
    term: string;
}

interface Stats {
    myStudents: number;
    resultsToday: number;
    recentResults: RecentResult[];
}

export default function StaffDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            // ✅ Use axios with relative path (your api.ts will add localhost:4000)
            const res = await axios.get("/staff/dashboard/stats");
            
            console.log("Dashboard stats:", res.data);
            setStats(res.data);
        } catch (err: any) {
            console.error("Error fetching stats:", err);
            toast({ 
                title: "Error", 
                description: err.response?.data?.message || "Failed to fetch stats", 
                variant: "destructive" 
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#041d29] text-white">
                <StaffSidebar />
                <main className="flex-1 p-6 flex items-center justify-center">
                    <div className="text-white/60">Loading dashboard...</div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <StaffSidebar />

            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Staff Dashboard</h1>
                            <p className="text-white/60 text-sm mt-1">
                                Welcome back! Here's your overview.
                            </p>
                        </div>
                        <Link to="/staff/bulk-results">
                            <button className="px-4 py-2 bg-[#0b92bf] rounded hover:bg-[#0a7ca3] transition-colors">
                                Bulk Upload Results
                            </button>
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <Card className="p-6 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
                            <div className="text-sm text-[#9fb6c2] mb-1">My Students</div>
                            <div className="text-3xl font-bold text-[#0b92bf]">{stats?.myStudents ?? 0}</div>
                        </Card>
                        <Card className="p-6 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
                            <div className="text-sm text-[#9fb6c2] mb-1">Results Today</div>
                            <div className="text-3xl font-bold text-[#0b92bf]">{stats?.resultsToday ?? 0}</div>
                        </Card>
                    </div>

                    {/* Recent Results */}
                    <Card className="p-6 bg-white/5 border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Recent Results</h2>
                            <span className="text-xs text-white/40">Last 5 uploads</span>
                        </div>

                        <div className="space-y-3">
                            {stats?.recentResults && stats.recentResults.length > 0 ? (
                                stats.recentResults.map((r) => (
                                    <div
                                        key={r._id}
                                        className="flex items-center justify-between bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <div>
                                            <div className="font-medium text-white">{r.studentName}</div>
                                            <div className="text-sm text-[#9fb6c2] mt-1">
                                                {r.admissionNumber} • {r.session} • {r.term} Term
                                            </div>
                                        </div>

                                        <Link
                                            to={`/staff/view-results/${r.studentId}`}
                                            className="px-4 py-2 text-sm bg-[#0b92bf] rounded hover:bg-[#0a7ca3] transition-colors"
                                        >
                                            View Result
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-white/40">
                                    <p>No recent results found</p>
                                    <p className="text-sm mt-2">
                                        Upload your first result using the bulk upload feature.
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <Link to="/staff/subject-registration">
                            <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                <h3 className="font-semibold text-[#0b92bf] text-lg">📚 Subject Registration</h3>
                                <p className="text-sm text-[#9fb6c2] mt-2">
                                    Register students for subjects each term
                                </p>
                            </Card>
                        </Link>
                        <Link to="/staff/bulk-results">
                            <Card className="p-6 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                <h3 className="font-semibold text-[#0b92bf] text-lg">📊 Bulk Result Upload</h3>
                                <p className="text-sm text-[#9fb6c2] mt-2">
                                    Upload results for all students at once
                                </p>
                            </Card>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}