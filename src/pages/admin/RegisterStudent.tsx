// src/pages/admin/RegisterStudent.tsx
import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterStudent() {
    const [form, setForm] = useState({
        admissionNumber: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        session: "",
        classId: "",
    });
    const [passport, setPassport] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setPassport(f);
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fd = new FormData();
            fd.append("admissionNumber", form.admissionNumber);
            fd.append("firstName", form.firstName);
            fd.append("lastName", form.lastName || "");
            if (form.dob) fd.append("dob", form.dob);
            if (form.gender) fd.append("gender", form.gender);
            if (form.session) fd.append("session", form.session);
            if (form.classId) fd.append("classId", form.classId);
            if (passport) fd.append("passport", passport);

            const res = await fetch("https://api.busybrainschool.com//api/admin/student/create", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` }, // fetch will set content-type automatically for FormData
                body: fd,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || data.msg || "Failed to create");

            toast({ title: "Student Registered", description: "Initial password returned in response" });
            // optionally navigate to students list
            navigate("/admin/students");
        } catch (err: any) {
            toast({ title: "Error", description: err.message, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Register New Student</h1>

                <Card className="p-6 bg-white/5 text-white">
                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="admissionNumber">Admission Number</Label>
                            <Input id="admissionNumber" name="admissionNumber" value={form.admissionNumber} onChange={handleChange} placeholder="e.g. 25/BBS/001" required />
                        </div>

                        <div>
                            <Label htmlFor="firstName">First name</Label>
                            <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
                        </div>

                        <div>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} />
                        </div>

                        <div>
                            <Label htmlFor="dob">Date of birth</Label>
                            <Input id="dob" name="dob" value={form.dob} onChange={handleChange} type="date" />
                        </div>

                        <div>
                            <Label htmlFor="gender">Gender</Label>
                            <select id="gender" name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 rounded bg-white/5">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="session">Session</Label>
                            <Input id="session" name="session" value={form.session} onChange={handleChange} placeholder="e.g. 2024/2025" />
                        </div>

                        {/* <div>
                            <Label htmlFor="classId">Class (optional)</Label>
                            <Input id="classId" name="classId" value={form.classId} onChange={handleChange} placeholder="classId (optional)" />
                        </div> */}

                        {/* <div className="md:col-span-2">
                            <Label htmlFor="passport">Passport (photo)</Label>
                            <input id="passport" name="passport" type="file" accept="image/*" onChange={handleFile} />
                        </div> */}

                        <div className="md:col-span-2 flex gap-3 justify-end">
                            <Button type="button" variant="ghost" onClick={() => navigate("/admin/students")}>Cancel</Button>
                            <Button type="submit" style={{ background: "#0b92bf" }} disabled={loading}>
                                {loading ? "Registering..." : "Register Student"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </main>
        </div>
    );
}