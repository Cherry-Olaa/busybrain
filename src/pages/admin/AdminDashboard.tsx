// src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Stats {
    students: number;
    staff: number;
    resultsToday: number;
    recentStudents: { _id: string; admissionNumber: string; firstName: string; lastName?: string }[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            try {
                const [sRes, studentsRes] = await Promise.all([
                    fetch("https://api.busybrainschools.com/api/admin/dashboard/stats", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("https://api.busybrainschools.com/api/admin/student/list?limit=10", { headers: { Authorization: `Bearer ${token}` } }),
                ]);

                // If your backend doesn't have dashboard/stats, the code below gracefully falls back.
                let statsData: any = { students: 0, staff: 0, resultsToday: 0, recentStudents: [] };

                if (sRes.ok) {
                    statsData = await sRes.json();
                } else {
                    // fallback minimal stats: use studentsRes length
                    if (studentsRes.ok) {
                        const ss = await studentsRes.json();
                        statsData.students = ss.length;
                        statsData.recentStudents = ss.slice(0, 10);
                    }
                }

                setStats(statsData);
            } catch (err: any) {
                toast({ title: "Error", description: err.message, variant: "destructive" });
            }
        })();
    }, [toast]);

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-3">
                        <Link to="/admin/register-student">
                            <Button style={{ background: "#0b92bf" }} className="px-4">Register Student</Button>
                        </Link>
                        <Link to="/admin/students">
                            <Button variant="outline" className="px-4 border-[#0b92bf] text-[#0b92bf]">Students</Button>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
                        <div className="text-sm text-[#9fb6c2]">Total Students</div>
                        <div className="text-2xl font-bold">{stats?.students ?? "—"}</div>
                    </Card>
                    <Card className="p-4 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
                        <div className="text-sm text-[#9fb6c2]">Total Staff</div>
                        <div className="text-2xl font-bold">{stats?.staff ?? "—"}</div>
                    </Card>
                    <Card className="p-4 bg-[#0b92bf]/10 border border-[#0b92bf]/20">
                        <div className="text-sm text-[#9fb6c2]">Results Today</div>
                        <div className="text-2xl font-bold">{stats?.resultsToday ?? "—"}</div>
                    </Card>
                </div>

                {/* Recent Students */}
                <Card className="p-4 bg-white/5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Recently Registered</h2>
                        <Link to="/admin/students" className="text-sm text-[#0b92bf] hover:underline">View all</Link>
                    </div>

                    <div className="space-y-2">
                        {stats?.recentStudents && stats.recentStudents.length > 0 ? (
                            stats.recentStudents.map((s) => (
                                <div key={s._id} className="flex items-center justify-between bg-white/3 p-3 rounded">
                                    <div>
                                        <div className="font-medium">{s.firstName} {s.lastName || ""}</div>
                                        <div className="text-sm text-[#cfe7ee]">{s.admissionNumber}</div>
                                    </div>
                                    <div className="text-sm">{/* action placeholder */}</div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-[#9fb6c2]">No recent students found</div>
                        )}
                    </div>
                </Card>
            </main>
        </div>
    );
}