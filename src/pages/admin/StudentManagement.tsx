// src/pages/admin/StudentManagement.tsx
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
  Users,
  Search,
  Loader2,
  CheckCircle2,
  XCircle,
  UserX,
  UserCheck,
  Filter
} from "lucide-react";

interface Student {
  _id: string;
  admissionNumber: string;
  studentId: string;
  firstName: string;
  lastName?: string;
  session?: string;
  isActive: boolean;
  status?: string;
  deactivatedAt?: string;
}

export default function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInactive, setShowInactive] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const { toast } = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStudents();
  }, [showInactive]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = students.filter(s => 
        s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // Use different endpoints based on whether we want inactive students
      const endpoint = showInactive ? "/students/all" : "/students";
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch students",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (studentId: string) => {
    setProcessingId(studentId);
    try {
      await axios.patch(`/students/${studentId}/deactivate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: "Student deactivated successfully"
      });

      // Refresh the list
      fetchStudents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to deactivate student",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  const handleReactivate = async (studentId: string) => {
    setProcessingId(studentId);
    try {
      await axios.patch(`/students/${studentId}/reactivate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: "Student reactivated successfully"
      });

      // Refresh the list
      fetchStudents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to reactivate student",
        variant: "destructive"
      });
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#041d29] text-white">
        <AdminSidebar />
        <main className="flex-1 p-6 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#0b92bf]" size={40} />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#041d29] text-white">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users className="text-[#0b92bf]" />
                Student Management
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Manage student accounts and activation status
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInactive(!showInactive)}
                className={`border-white/20 ${showInactive ? 'bg-[#0b92bf]/20 text-[#0b92bf]' : 'text-white'}`}
              >
                <Filter size={16} className="mr-2" />
                {showInactive ? "Showing All" : "Active Only"}
              </Button>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 text-white border-white/20"
                />
              </div>
            </div>
          </div>

          <Card className="bg-white/5 border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0b92bf]/20">
                  <tr>
                    <th className="p-3 text-left">Admission No.</th>
                    <th className="p-3 text-left">Student ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Session</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id} className="border-t border-white/10 hover:bg-white/5">
                      <td className="p-3 font-mono text-sm">{student.admissionNumber}</td>
                      <td className="p-3 font-mono text-sm">{student.studentId}</td>
                      <td className="p-3">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="p-3">{student.session || '—'}</td>
                      <td className="p-3">
                        {student.isActive ? (
                          <span className="flex items-center text-green-400">
                            <CheckCircle2 size={16} className="mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="flex items-center text-yellow-400">
                            <XCircle size={16} className="mr-1" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          {student.isActive ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeactivate(student._id)}
                              disabled={processingId === student._id}
                              className="text-yellow-400 hover:text-yellow-300"
                              title="Deactivate Student"
                            >
                              {processingId === student._id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <UserX size={16} />
                              )}
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReactivate(student._id)}
                              disabled={processingId === student._id}
                              className="text-green-400 hover:text-green-300"
                              title="Reactivate Student"
                            >
                              {processingId === student._id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <UserCheck size={16} />
                              )}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12 text-white/40">
                <Users size={48} className="mx-auto mb-4 opacity-40" />
                <p>No students found</p>
              </div>
            )}
          </Card>

          <div className="mt-4 text-sm text-white/40">
            Total: {students.length} student{students.length !== 1 ? 's' : ''} 
            ({students.filter(s => s.isActive).length} active, {students.filter(s => !s.isActive).length} inactive)
          </div>
        </div>
      </main>
    </div>
  );
}