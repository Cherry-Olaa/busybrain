// src/pages/admin/StudentsList.tsx
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/api";

interface Student {
    _id: string;
    admissionNumber: string;
    firstName: string;
    lastName?: string;
    session?: string;
    classId?: string;
}

export default function StudentsList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const res = await axios.get("/admin/student/list?limit=500", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStudents(res.data);
            } catch (err: any) {
                console.error(err);
                toast({ title: "Error", description: err.message, variant: "destructive" });
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, [token, toast]);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this student? This will also delete all results."
        );

        if (!confirmed) return;

        try {
            await axios.delete(`/admin/student/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setStudents(prev => prev.filter(s => s._id !== id));

            toast({
                title: "Deleted",
                description: "Student removed successfully",
            });
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.msg || "Delete failed",
                variant: "destructive",
            });
        }
    };


    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Students List</h1>
                    <Button style={{ background: "#0b92bf" }} onClick={() => navigate("/admin/register-student")}>
                        Register Student
                    </Button>
                </div>

                <Card className="p-4 bg-white/5">
                    {loading ? (
                        <div className="text-sm text-[#9fb6c2]">Loading...</div>
                    ) : students.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="p-2">Admission No</th>
                                        <th className="p-2">Name</th>
                                        <th className="p-2">Session</th>
                                        <th className="p-2">Actions</th>
                                        {/* <th className="p-2">Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((s) => (
                                        <tr key={s._id} className="border-b border-white/10 hover:bg-white/5">
                                            <td className="p-2">{s.admissionNumber}</td>
                                            <td className="p-2">{s.firstName} {s.lastName || ""}</td>
                                            <td className="p-2">{s.session || "-"}</td>
                                            {/* <td className="p-2">{s.classId || "-"}</td> */}
                                            <td className="p-2 flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(s._id)}
                                                >
                                                    Delete
                                                </Button>
                                                {/* <Button size="sm" variant="ghost" disabled>
                                                  
                                                    Edit
                                                </Button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-sm text-[#9fb6c2]">No students found</div>
                    )}
                </Card>
            </main>
        </div>
    );
}