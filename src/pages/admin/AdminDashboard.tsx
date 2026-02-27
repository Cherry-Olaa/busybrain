// src/pages/admin/AdminDashboard.tsx
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import axios from "@/lib/api";
import { Users, UserCog, FileText, TrendingUp, Loader2 } from "lucide-react";

interface Stats {
    students: number;
    staff: number;
    resultsToday: number;
    recentStudents: { _id: string; admissionNumber: string; firstName: string; lastName?: string }[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Try to fetch dashboard stats
            let statsData: Stats = { students: 0, staff: 0, resultsToday: 0, recentStudents: [] };
            
            try {
                const statsRes = await axios.get("/admin/dashboard/stats", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                statsData = statsRes.data;
            } catch (statsError) {
                console.log("Dashboard stats endpoint not available, using fallback");
                // Fallback: fetch recent students
                const studentsRes = await axios.get("/admin/student/list?limit=10", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                statsData.recentStudents = studentsRes.data;
                statsData.students = studentsRes.data.length;
            }

            setStats(statsData);
        } catch (err: any) {
            toast({ 
                title: "Error", 
                description: err.response?.data?.message || err.message || "Failed to load dashboard", 
                variant: "destructive" 
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#041d29] text-white">
                <AdminSidebar />
                <main className="flex-1 p-6 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="animate-spin h-12 w-12 text-[#0b92bf] mx-auto mb-4" />
                        <p className="text-white/60">Loading dashboard...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#041d29] text-white overflow-hidden">
            {/* Fixed Sidebar - doesn't scroll */}
            <div className="h-full overflow-hidden flex-shrink-0">
                <AdminSidebar />
            </div>
            
            {/* Scrollable Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                                <p className="text-white/60 text-sm mt-1">Welcome back, Administrator</p>
                            </div>
                            <div className="flex gap-3">
                                <Link to="/admin/register-student">
                                    <Button style={{ background: "#0b92bf" }} className="px-4 hover:bg-[#0a7ca3]">
                                        Register Student
                                    </Button>
                                </Link>
                                <Link to="/admin/students">
                                    <Button variant="outline" className="px-4 border-[#0b92bf] text-[#0b92bf] hover:bg-[#0b92bf]/10">
                                        View All Students
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <Card className="p-6 bg-gradient-to-br from-[#0b92bf]/20 to-transparent border border-[#0b92bf]/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-[#0b92bf]/20 rounded-lg">
                                        <Users className="text-[#0b92bf]" size={20} />
                                    </div>
                                    <div className="text-sm text-[#9fb6c2]">Total Students</div>
                                </div>
                                <div className="text-3xl font-bold">{stats?.students ?? 0}</div>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-500/20 rounded-lg">
                                        <UserCog className="text-purple-400" size={20} />
                                    </div>
                                    <div className="text-sm text-[#9fb6c2]">Total Staff</div>
                                </div>
                                <div className="text-3xl font-bold">{stats?.staff ?? 0}</div>
                            </Card>

                            <Card className="p-6 bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-500/20 rounded-lg">
                                        <FileText className="text-green-400" size={20} />
                                    </div>
                                    <div className="text-sm text-[#9fb6c2]">Results Today</div>
                                </div>
                                <div className="text-3xl font-bold">{stats?.resultsToday ?? 0}</div>
                            </Card>
                        </div>

                        {/* Recent Students */}
                        <Card className="p-6 bg-white/5 border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="text-[#0b92bf]" size={20} />
                                    <h2 className="text-lg font-semibold">Recently Registered Students</h2>
                                </div>
                                <Link to="/admin/students" className="text-sm text-[#0b92bf] hover:underline">
                                    View all
                                </Link>
                            </div>

                            {stats?.recentStudents && stats.recentStudents.length > 0 ? (
                                <div className="space-y-2">
                                    {stats.recentStudents.map((student, index) => (
                                        <div 
                                            key={student._id} 
                                            className="flex items-center justify-between bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-white/40 w-6">{index + 1}.</span>
                                                <div>
                                                    <div className="font-medium">
                                                        {student.firstName} {student.lastName || ""}
                                                    </div>
                                                    <div className="text-sm text-[#9fb6c2]">
                                                        {student.admissionNumber}
                                                    </div>
                                                </div>
                                            </div>
                                            <Link 
                                                to={`/admin/students/${student._id}`}
                                                className="text-xs px-3 py-1 bg-[#0b92bf]/20 text-[#0b92bf] rounded hover:bg-[#0b92bf]/30 transition-colors"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-white/40">
                                    <Users size={40} className="mx-auto mb-3 opacity-40" />
                                    <p>No recent students found</p>
                                </div>
                            )}
                        </Card>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <Link to="/admin/class-subjects">
                                <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                    <h3 className="font-semibold text-[#0b92bf] mb-1">Class Subjects</h3>
                                    <p className="text-sm text-white/60">Manage subjects per class</p>
                                </Card>
                            </Link>
                            <Link to="/admin/results">
                                <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                    <h3 className="font-semibold text-[#0b92bf] mb-1">Upload Results</h3>
                                    <p className="text-sm text-white/60">Add or update student results</p>
                                </Card>
                            </Link>
                            <Link to="/admin/staff-management">
                                <Card className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                    <h3 className="font-semibold text-[#0b92bf] mb-1">Staff Management</h3>
                                    <p className="text-sm text-white/60">Manage staff accounts</p>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}