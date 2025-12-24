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

interface RecentResult {
    _id: string;          // result id
    studentId: string;    // ✅ REQUIRED
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
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            try {
                // Fetch staff dashboard stats
                const res = await fetch("https://api.busybrainschools.com/api/staff/dashboard/stats", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed to fetch stats");

                const data = await res.json();
                setStats(data);
            } catch (err: any) {
                toast({ title: "Error", description: err.message, variant: "destructive" });
            }
        })();
    }, [toast, token]);

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <StaffSidebar />

            <main className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Staff Dashboard</h1>
                    <Link to="/staff/results">
                        <button className="px-4 py-2 bg-[#0b92bf] rounded">Upload Results</button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Card className="p-4 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
                        <div className="text-sm text-[#9fb6c2]">My Students</div>
                        <div className="text-2xl font-bold">{stats?.myStudents ?? "—"}</div>
                    </Card>
                    <Card className="p-4 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
                        <div className="text-sm text-[#9fb6c2]">Results Today</div>
                        <div className="text-2xl font-bold">{stats?.resultsToday ?? "—"}</div>
                    </Card>
                </div>

                {/* Recent Results */}
                <Card className="p-4 bg-white/5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Recent Results</h2>
                    </div>

                    <div className="space-y-2">
                        {stats?.recentResults && stats.recentResults.length > 0 ? (
                            stats.recentResults.map((r) => (
                                <div
                                    key={r._id}
                                    className="flex items-center justify-between bg-white/3 p-3 rounded"
                                >
                                    <div>
                                        <div className="font-medium">{r.studentName}</div>
                                        <div className="text-sm text-[#cfe7ee]">
                                            {r.admissionNumber} - {r.session} ({r.term})
                                        </div>
                                    </div>

                                    {/* ✅ View Result Button for this student */}
                                    <Link
                                        to={`/staff/view-results/${r.studentId}`}
                                        className="px-3 py-1 text-sm bg-[#0b92bf] rounded hover:opacity-90"
                                    >
                                        View Result
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-[#9fb6c2]">No recent results found</div>
                        )}
                    </div>
                </Card>
            </main>
        </div>
    );
}