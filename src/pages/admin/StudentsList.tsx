// src/pages/admin/StudentsList.tsx
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/api";
import { 
    Search, 
    Eye, 
    Trash2, 
    UserX, 
    UserCheck, 
    Loader2,
    Filter,
    Download,
    CheckCircle2,
    XCircle
} from "lucide-react";

interface Student {
    _id: string;
    admissionNumber: string;
    studentId?: string;
    firstName: string;
    lastName?: string;
    session?: string;
    classId?: string;
    isActive: boolean;
}

export default function StudentsList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showInactive, setShowInactive] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);
    
    const { toast } = useToast();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchStudents();
    }, [showInactive]); // Re-fetch when filter changes

    useEffect(() => {
        filterStudents();
    }, [searchTerm, students]);

    const filterStudents = () => {
        let filtered = [...students];
        
        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(s => 
                s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.session?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply active/inactive filter
        if (!showInactive) {
            filtered = filtered.filter(s => s.isActive === true);
        }
        
        setFilteredStudents(filtered);
    };

    const fetchStudents = async () => {
        setLoading(true);
        try {
            // Use the same endpoint as StudentManagement
            const endpoint = showInactive ? "/students/all" : "/students";
            const res = await axios.get(endpoint, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            console.log("API Response:", res.data);
            setStudents(res.data);
            setFilteredStudents(res.data);
        } catch (err: any) {
            console.error(err);
            toast({ 
                title: "Error", 
                description: err.response?.data?.message || err.message || "Failed to fetch students", 
                variant: "destructive" 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeactivate = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to deactivate this student? They will no longer be able to login."
        );

        if (!confirmed) return;

        setProcessingId(id);
        try {
            // Use the same endpoint as StudentManagement
            await axios.patch(`/students/${id}/deactivate`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Success",
                description: "Student deactivated successfully",
            });

            // Refresh the list
            fetchStudents();
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to deactivate student",
                variant: "destructive",
            });
        } finally {
            setProcessingId(null);
        }
    };

    const handleReactivate = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to reactivate this student? They will be able to login again."
        );

        if (!confirmed) return;

        setProcessingId(id);
        try {
            // Use the same endpoint as StudentManagement
            await axios.patch(`/students/${id}/reactivate`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Success",
                description: "Student reactivated successfully",
            });

            // Refresh the list
            fetchStudents();
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.message || "Failed to reactivate student",
                variant: "destructive",
            });
        } finally {
            setProcessingId(null);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "⚠️ PERMANENT ACTION\n\nAre you sure you want to permanently delete this student? This will:\n" +
            "• Delete all student records\n" +
            "• Delete all academic results\n" +
            "• Remove all associated data\n\n" +
            "This action CANNOT be undone!"
        );

        if (!confirmed) return;

        setProcessingId(id);
        try {
            // Keep this as admin/student since it's a different endpoint
            await axios.delete(`/admin/student/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast({
                title: "Deleted",
                description: "Student permanently deleted",
            });

            // Refresh the list
            fetchStudents();
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.msg || "Delete failed",
                variant: "destructive",
            });
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? (
            <span className="inline-flex items-center text-green-400">
                <CheckCircle2 size={16} className="mr-1" />
                Active
            </span>
        ) : (
            <span className="inline-flex items-center text-yellow-400">
                <XCircle size={16} className="mr-1" />
                Inactive
            </span>
        );
    };

    const exportToCSV = () => {
        const headers = ['Admission Number', 'Student ID', 'First Name', 'Last Name', 'Session', 'Status'];
        const csvData = filteredStudents.map(s => [
            s.admissionNumber,
            s.studentId || '',
            s.firstName,
            s.lastName || '',
            s.session || '',
            s.isActive ? 'Active' : 'Inactive'
        ]);
        
        const csvContent = [headers, ...csvData]
            .map(row => row.join(','))
            .join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="flex min-h-screen bg-[#041d29] text-white">
            <AdminSidebar />
            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <span className="text-[#0b92bf]">📋</span>
                                Students List
                            </h1>
                            <p className="text-white/60 text-sm mt-1">
                                Manage student accounts and activation status
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={exportToCSV}
                                className="border-white/20 text-white"
                                disabled={filteredStudents.length === 0}
                            >
                                <Download size={16} className="mr-2" />
                                Export CSV
                            </Button>
                            <Button 
                                style={{ background: "#0b92bf" }} 
                                onClick={() => navigate("/admin/register-student")}
                                className="hover:bg-[#0a7ca3]"
                            >
                                Register Student
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <Card className="p-4 bg-white/5 border-white/10 mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                                <Input
                                    placeholder="Search by name, admission number, student ID, or session..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white/10 text-white border-white/20"
                                />
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setShowInactive(!showInactive)}
                                className={`border-white/20 ${showInactive ? 'bg-[#0b92bf]/20 text-[#0b92bf]' : 'text-white'}`}
                            >
                                <Filter size={16} className="mr-2" />
                                {showInactive ? "Showing All" : "Active Only"}
                            </Button>
                        </div>
                    </Card>

                    {/* Students Table */}
                    <Card className="bg-white/5 border-white/10 overflow-hidden">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="animate-spin text-[#0b92bf]" size={32} />
                            </div>
                        ) : filteredStudents.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-[#0b92bf]/20">
                                        <tr>
                                            <th className="p-3">Admission No.</th>
                                            <th className="p-3">Student ID</th>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Session</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.map((s) => (
                                            <tr key={s._id} className="border-t border-white/10 hover:bg-white/5">
                                                <td className="p-3 font-mono text-sm">{s.admissionNumber}</td>
                                                <td className="p-3 font-mono text-sm">{s.studentId || '-'}</td>
                                                <td className="p-3 font-medium">
                                                    {s.firstName} {s.lastName || ""}
                                                </td>
                                                <td className="p-3">{s.session || "-"}</td>
                                                <td className="p-3">{getStatusBadge(s.isActive)}</td>
                                                <td className="p-3">
                                                    <div className="flex justify-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => navigate(`/admin/students/${s._id}`)}
                                                            className="text-blue-400 hover:text-blue-300"
                                                            title="View Details"
                                                        >
                                                            <Eye size={16} />
                                                        </Button>
                                                        
                                                        {s.isActive ? (
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleDeactivate(s._id)}
                                                                disabled={processingId === s._id}
                                                                className="text-yellow-400 hover:text-yellow-300"
                                                                title="Deactivate Student"
                                                            >
                                                                {processingId === s._id ? (
                                                                    <Loader2 size={16} className="animate-spin" />
                                                                ) : (
                                                                    <UserX size={16} />
                                                                )}
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => handleReactivate(s._id)}
                                                                disabled={processingId === s._id}
                                                                className="text-green-400 hover:text-green-300"
                                                                title="Reactivate Student"
                                                            >
                                                                {processingId === s._id ? (
                                                                    <Loader2 size={16} className="animate-spin" />
                                                                ) : (
                                                                    <UserCheck size={16} />
                                                                )}
                                                            </Button>
                                                        )}
                                                        
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleDelete(s._id)}
                                                            disabled={processingId === s._id}
                                                            className="text-red-400 hover:text-red-300"
                                                            title="Permanently Delete"
                                                        >
                                                            {processingId === s._id ? (
                                                                <Loader2 size={16} className="animate-spin" />
                                                            ) : (
                                                                <Trash2 size={16} />
                                                            )}
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-white/40">
                                <p className="text-lg">No students found</p>
                                <p className="text-sm mt-2">Try adjusting your filters or register a new student</p>
                            </div>
                        )}
                    </Card>

                    {/* Summary */}
                    <div className="mt-4 text-sm text-white/40">
                        Total: {students.length} student{students.length !== 1 ? 's' : ''} 
                        ({students.filter(s => s.isActive).length} active, {students.filter(s => !s.isActive).length} inactive)
                    </div>
                </div>
            </main>
        </div>
    );
}