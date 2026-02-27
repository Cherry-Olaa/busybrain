// src/pages/admin/StaffManagement.tsx
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
  Key,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Search
} from "lucide-react";

interface Staff {
  _id: string;
  fullName: string;
  username: string;
  role: string;
  assignedClasses: string[];
  createdAt: string;
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [filteredStaff, setFilteredStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [editForm, setEditForm] = useState({
    fullName: "",
    username: "",
    assignedClasses: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const { toast } = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStaff();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = staff.filter(s => 
        s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.assignedClasses?.some(c => c.includes(searchTerm))
      );
      setFilteredStaff(filtered);
    } else {
      setFilteredStaff(staff);
    }
  }, [searchTerm, staff]);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/admin/staff/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStaff(res.data);
      setFilteredStaff(res.data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to fetch staff",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!selectedStaff) return;
    
    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(
        `/admin/staff/${selectedStaff._id}/reset-password`,
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Success",
        description: `Password reset for ${selectedStaff.fullName}`
      });

      setShowResetModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setSelectedStaff(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to reset password",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditStaff = async () => {
    if (!selectedStaff) return;

    setSubmitting(true);
    try {
      const assignedClassesArray = editForm.assignedClasses
        .split(',')
        .map(c => c.trim())
        .filter(c => c);

      await axios.put(
        `/admin/staff/${selectedStaff._id}`,
        {
          fullName: editForm.fullName,
          username: editForm.username,
          assignedClasses: assignedClassesArray
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Success",
        description: "Staff details updated successfully"
      });

      setShowEditModal(false);
      setSelectedStaff(null);
      fetchStaff(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update staff",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openResetModal = (staff: Staff) => {
    setSelectedStaff(staff);
    setNewPassword("");
    setConfirmPassword("");
    setShowResetModal(true);
  };

  const openEditModal = (staff: Staff) => {
    setSelectedStaff(staff);
    setEditForm({
      fullName: staff.fullName,
      username: staff.username,
      assignedClasses: staff.assignedClasses?.join(', ') || ''
    });
    setShowEditModal(true);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users className="text-[#0b92bf]" />
                Staff Management
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Manage staff accounts and reset passwords
              </p>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
              <Input
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 text-white border-white/20"
              />
            </div>
          </div>

          <Card className="bg-white/5 border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0b92bf]/20">
                  <tr>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Username</th>
                    <th className="p-3 text-left">Assigned Classes</th>
                    <th className="p-3 text-left">Joined</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((member) => (
                    <tr key={member._id} className="border-t border-white/10 hover:bg-white/5">
                      <td className="p-3 font-medium">{member.fullName}</td>
                      <td className="p-3">{member.username}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {member.assignedClasses?.map((cls, i) => (
                            <span key={i} className="px-2 py-1 bg-[#0b92bf]/20 rounded text-xs">
                              {cls}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-white/60 text-sm">{formatDate(member.createdAt)}</td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditModal(member)}
                            className="text-blue-400 hover:text-blue-300"
                            title="Edit Staff"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openResetModal(member)}
                            className="text-yellow-400 hover:text-yellow-300"
                            title="Reset Password"
                          >
                            <Key size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStaff.length === 0 && (
              <div className="text-center py-12 text-white/40">
                <Users size={48} className="mx-auto mb-4 opacity-40" />
                <p>No staff members found</p>
              </div>
            )}
          </Card>
        </div>

        {/* Reset Password Modal */}
        {showResetModal && selectedStaff && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-[#041d29] border-white/10 w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Reset Password</h2>
              <p className="text-white/60 mb-4">
                Reset password for <span className="text-white font-medium">{selectedStaff.fullName}</span>
              </p>

              <div className="space-y-4">
                <div>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 bg-white/10 text-white border-white/20"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 bg-white/10 text-white border-white/20"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowResetModal(false);
                      setSelectedStaff(null);
                    }}
                    className="border-white/20 text-white"
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleResetPassword}
                    disabled={submitting}
                    className="bg-[#0b92bf] hover:bg-[#0a7ca3]"
                  >
                    {submitting ? (
                      <Loader2 size={16} className="animate-spin mr-2" />
                    ) : (
                      <Key size={16} className="mr-2" />
                    )}
                    Reset Password
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Edit Staff Modal */}
        {showEditModal && selectedStaff && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="bg-[#041d29] border-white/10 w-full max-w-md p-6">
              <h2 className="text-xl font-bold mb-4">Edit Staff Details</h2>

              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="mt-1 bg-white/10 text-white border-white/20"
                  />
                </div>

                <div>
                  <Label>Username</Label>
                  <Input
                    value={editForm.username}
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    className="mt-1 bg-white/10 text-white border-white/20"
                  />
                </div>

                <div>
                  <Label>Assigned Classes (comma separated)</Label>
                  <Input
                    value={editForm.assignedClasses}
                    onChange={(e) => setEditForm({ ...editForm, assignedClasses: e.target.value })}
                    className="mt-1 bg-white/10 text-white border-white/20"
                    placeholder="e.g., 25/BBS, 26/SCI"
                  />
                  <p className="text-xs text-white/40 mt-1">
                    Enter classes separated by commas
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedStaff(null);
                    }}
                    className="border-white/20 text-white"
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEditStaff}
                    disabled={submitting}
                    className="bg-[#0b92bf] hover:bg-[#0a7ca3]"
                  >
                    {submitting ? (
                      <Loader2 size={16} className="animate-spin mr-2" />
                    ) : (
                      <Save size={16} className="mr-2" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}