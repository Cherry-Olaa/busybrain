// src/pages/admin/EditStudent.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
    ArrowLeft,
    Save,
    Loader2,
    User,
    Calendar,
    Hash,
    BookOpen,
    Upload
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
}

export default function EditStudent() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const token = localStorage.getItem("token");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [student, setStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        admissionNumber: "",
        studentId: "",
        dob: "",
        gender: "",
        session: "",
        classId: "",
    });
    const [passportFile, setPassportFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const currentYear = new Date().getFullYear();
    const sessions = Array.from({ length: 7 }, (_, i) => (currentYear - 3 + i).toString());
    const genders = ["Male", "Female", "Other"];

    useEffect(() => {
        if (id) {
            fetchStudent();
        }
    }, [id]);

    const fetchStudent = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudent(res.data);
            
            // Format date for input (YYYY-MM-DD)
            const formattedDob = res.data.dob ? res.data.dob.split('T')[0] : '';
            
            setFormData({
                firstName: res.data.firstName || "",
                lastName: res.data.lastName || "",
                admissionNumber: res.data.admissionNumber || "",
                studentId: res.data.studentId || "",
                dob: formattedDob,
                gender: res.data.gender || "",
                session: res.data.session || "",
                classId: res.data.classId || "",
            });

            if (res.data.passportUrl) {
                setPreviewUrl(res.data.passportUrl);
            }
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to fetch student data",
                variant: "destructive"
            });
            navigate("/admin/students");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPassportFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.firstName || !formData.admissionNumber) {
            toast({
                title: "Error",
                description: "First name and admission number are required",
                variant: "destructive"
            });
            return;
        }

        setSaving(true);
        try {
            const formDataToSend = new FormData();
            
            // Append all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataToSend.append(key, value);
            });

            // Append passport file if selected
            if (passportFile) {
                formDataToSend.append("passport", passportFile);
            }

            const res = await axios.put(`/admin/student/${id}`, formDataToSend, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            toast({
                title: "Success",
                description: "Student updated successfully"
            });

            // Navigate back to student details
            navigate(`/admin/students/${id}`);
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to update student",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[#041d29] text-white">
                <AdminSidebar />
                <main className="flex-1 p-6 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="animate-spin text-[#0b92bf] mx-auto mb-4" size={40} />
                        <p className="text-white/60">Loading student data...</p>
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
                        <p className="text-white/40 mb-4">The student you're trying to edit doesn't exist.</p>
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
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <Link to={`/admin/students/${id}`}>
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                                <ArrowLeft size={20} className="mr-1" />
                                Back to Details
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Edit Student</h1>
                    </div>

                    <Card className="bg-white/5 border-white/10 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Passport Upload */}
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full bg-[#0b92bf]/20 flex items-center justify-center overflow-hidden">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={40} className="text-[#0b92bf]" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor="passport">Passport Photo</Label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Input
                                            id="passport"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="bg-white/10 text-white border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0b92bf] file:text-white hover:file:bg-[#0a7ca3]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Form Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* First Name */}
                                <div>
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 bg-white/10 text-white border-white/20"
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="mt-1 bg-white/10 text-white border-white/20"
                                    />
                                </div>

                                {/* Admission Number */}
                                <div>
                                    <Label htmlFor="admissionNumber">Admission Number *</Label>
                                    <Input
                                        id="admissionNumber"
                                        name="admissionNumber"
                                        value={formData.admissionNumber}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 bg-white/10 text-white border-white/20 font-mono"
                                    />
                                </div>

                                {/* Student ID */}
                                <div>
                                    <Label htmlFor="studentId">Student ID</Label>
                                    <Input
                                        id="studentId"
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        className="mt-1 bg-white/10 text-white border-white/20 font-mono"
                                        readOnly
                                    />
                                    <p className="text-xs text-white/40 mt-1">Student ID cannot be changed</p>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input
                                        id="dob"
                                        name="dob"
                                        type="date"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="mt-1 bg-white/10 text-white border-white/20"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <Label htmlFor="gender">Gender</Label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-white/10 text-white border-white/20"
                                    >
                                        <option value="">Select Gender</option>
                                        {genders.map(gender => (
                                            <option key={gender} value={gender.toLowerCase()}>{gender}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Session */}
                                <div>
                                    <Label htmlFor="session">Session</Label>
                                    <select
                                        id="session"
                                        name="session"
                                        value={formData.session}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded bg-white/10 text-white border-white/20"
                                    >
                                        <option value="">Select Session</option>
                                        {sessions.map(session => (
                                            <option key={session} value={session}>
                                                {session}/{parseInt(session) + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Class ID (optional) */}
                                <div>
                                    <Label htmlFor="classId">Class ID</Label>
                                    <Input
                                        id="classId"
                                        name="classId"
                                        value={formData.classId}
                                        onChange={handleChange}
                                        placeholder="e.g., 25/BBS"
                                        className="mt-1 bg-white/10 text-white border-white/20"
                                    />
                                </div>
                            </div>

                            {/* Status Display (read-only) */}
                            <div className="bg-white/10 p-4 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="text-white/60">Status:</span>
                                    <span className={student.isActive ? 'text-green-400' : 'text-yellow-400'}>
                                        {student.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-xs text-white/40 mt-1">
                                    To change student status, use the deactivate/reactivate buttons on the details page.
                                </p>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate(`/admin/students/${id}`)}
                                    className="border-white/20 text-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-[#0b92bf] hover:bg-[#0a7ca3]"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin mr-2" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} className="mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Help Section */}
                    <Card className="mt-6 bg-white/5 border-white/10 p-4">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <BookOpen size={16} className="text-[#0b92bf]" />
                            Editing Guide
                        </h3>
                        <ul className="text-sm text-white/60 space-y-1 list-disc list-inside">
                            <li>Fields marked with * are required</li>
                            <li>Student ID cannot be changed as it's a system identifier</li>
                            <li>Upload a new passport photo to update the student's picture</li>
                            <li>To change student status (active/inactive), use the buttons on the details page</li>
                        </ul>
                    </Card>
                </div>
            </main>
        </div>
    );
}