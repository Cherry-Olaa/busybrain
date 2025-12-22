// src/pages/admin/StaffList.tsx
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import { Link } from "react-router-dom";

interface Staff {
    _id: string;
    fullName: string;
    username: string;
    role: string;
}

export default function StaffList() {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/admin/staff/list", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStaffList(res.data);
            } catch (err: any) {
                toast({ title: "Error", description: err.message, variant: "destructive" });
            } finally {
                setLoading(false);
            }
        })();
    }, [token, toast]);

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Staff List</h1>
                    <Link to="/admin/create-staff">
                        <Button style={{ background: "#0b92bf" }}>Create Staff</Button>
                    </Link>
                </div>

                {loading ? (
                    <div>Loading staff...</div>
                ) : staffList.length === 0 ? (
                    <div>No staff found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {staffList.map((s) => (
                            <Card key={s._id} className="p-4 bg-white/5">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">{s.fullName}</div>
                                        <div className="text-sm text-[#9fb6c2]">{s.username}</div>
                                        <div className="text-sm text-[#cfe7ee]">Role: {s.role}</div>
                                    </div>
                                    {/* Optional: Actions like edit/delete can go here */}
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}