// src/pages/staff/Settings.tsx
import { useState, useEffect } from "react";
import StaffSidebar from "@/components/Staff/StaffSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";

export default function Settings() {
    const [form, setForm] = useState({
        fullName: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    // fetch current staff profile
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get("/staff/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setForm((prev) => ({ ...prev, fullName: res.data.fullName }));
            } catch (err: any) {
                toast({ title: "Error", description: err.message, variant: "destructive" });
            }
        })();
    }, [token, toast]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            return toast({ title: "Error", description: "New passwords do not match", variant: "destructive" });
        }

        setLoading(true);
        try {
            const res = await axios.put(
                "/staff/update",
                {
                    fullName: form.fullName,
                    currentPassword: form.currentPassword,
                    newPassword: form.newPassword,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toast({ title: "Success", description: "Profile updated successfully" });
            setForm({ ...form, currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <StaffSidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>

                <Card className="p-6 bg-white/5 text-white">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                value={form.currentPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={form.newPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3">
                            <Button type="submit" style={{ background: "#0b92bf" }} disabled={loading}>
                                {loading ? "Updating..." : "Update Settings"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
}