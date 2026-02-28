// src/pages/admin/JobManagement.tsx
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/api";
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Users,
  Filter,
  Search,
  Loader2,
  Clock,
  MapPin,
  Calendar,
  AlertCircle
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  description: string;
  isActive: boolean;
  isUrgent: boolean;
  applicationsCount: number;
  views: number;
  applicationDeadline?: string;
  createdAt: string;
}

export default function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [departments, setDepartments] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [processing, setProcessing] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, filterStatus, filterDepartment, jobs]);
// src/pages/admin/JobManagement.tsx - Fixed fetchJobs function

const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Job[]>("/jobs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Now TypeScript knows res.data is Job[]
      setJobs(res.data);
      
      // Extract unique departments - filter out undefined/null values
      const depts = [...new Set(
        res.data
          .map((job: Job) => job.department)
          .filter((dept): dept is string => !!dept) // Remove undefined/null
      )];
      
      setDepartments(depts);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to fetch jobs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const filterJobs = () => {
    let filtered = [...jobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(job => 
        filterStatus === "active" ? job.isActive : !job.isActive
      );
    }

    // Department filter
    if (filterDepartment !== "all") {
      filtered = filtered.filter(job => job.department === filterDepartment);
    }

    setFilteredJobs(filtered);
  };

  const handleToggleStatus = async (job: Job) => {
    setProcessing(true);
    try {
      await axios.patch(`/jobs/${job._id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: `Job ${job.isActive ? 'deactivated' : 'activated'} successfully`
      });

      fetchJobs(); // Refresh list
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update job status",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteJob = async () => {
    if (!selectedJob) return;

    setProcessing(true);
    try {
      await axios.delete(`/jobs/${selectedJob._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: "Job deleted successfully"
      });

      setShowDeleteModal(false);
      fetchJobs(); // Refresh list
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to delete job",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
      setSelectedJob(null);
    }
  };

  const getStatusBadge = (isActive: boolean, isUrgent: boolean) => {
    return (
      <div className="flex gap-2">
        {isUrgent && (
          <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertCircle size={12} />
            Urgent
          </span>
        )}
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
          isActive 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {isActive ? 'Active' : 'Closed'}
        </span>
      </div>
    );
  };

  const formatDate = (date?: string) => {
    if (!date) return 'No deadline';
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Briefcase className="text-[#0b92bf]" />
                Job Management
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Create and manage job vacancies
              </p>
            </div>
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="bg-[#0b92bf] hover:bg-[#0a7ca3]"
            >
              <Plus size={16} className="mr-2" />
              Create New Job
            </Button>
          </div>

          {/* Filters */}
          <Card className="p-4 bg-white/5 border-white/10 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 text-white border-white/20"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 rounded bg-white/10 text-white border-white/20"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Closed</option>
              </select>

              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="px-3 py-2 rounded bg-white/10 text-white border-white/20"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </Card>

          {/* Jobs Table */}
          <Card className="bg-white/5 border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0b92bf]/20">
                  <tr>
                    <th className="p-3 text-left">Job Title</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Location</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-center">Applications</th>
                    <th className="p-3 text-left">Deadline</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job._id} className="border-t border-white/10 hover:bg-white/5">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-xs text-white/40">Views: {job.views}</p>
                        </div>
                      </td>
                      <td className="p-3">{job.department}</td>
                      <td className="p-3">
                        <span className="flex items-center gap-1 text-sm">
                          <MapPin size={14} className="text-white/40" />
                          {job.location}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-[#0b92bf]/20 rounded text-xs">
                          {job.type}
                        </span>
                      </td>
                      <td className="p-3">{getStatusBadge(job.isActive, job.isUrgent)}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                          {job.applicationsCount}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="flex items-center gap-1 text-sm text-white/60">
                          <Calendar size={14} />
                          {formatDate(job.applicationDeadline)}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                            className="text-blue-400 hover:text-blue-300"
                            title="Edit Job"
                          >
                            <Edit size={16} />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleStatus(job)}
                            disabled={processing}
                            className={job.isActive ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'}
                            title={job.isActive ? 'Close Job' : 'Reopen Job'}
                          >
                            {job.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedJob(job);
                              setShowDeleteModal(true);
                            }}
                            className="text-red-400 hover:text-red-300"
                            title="Delete Job"
                          >
                            <Trash2 size={16} />
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/admin/jobs/${job._id}/applications`)}
                            className="text-purple-400 hover:text-purple-300"
                            title="View Applications"
                          >
                            <Users size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 text-white/40">
                <Briefcase size={48} className="mx-auto mb-4 opacity-40" />
                <p>No jobs found</p>
              </div>
            )}
          </Card>

          {/* Summary */}
          <div className="mt-4 text-sm text-white/40">
            Total: {filteredJobs.length} jobs
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-[#041d29] border-white/10 w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Delete Job</h2>
            <p className="text-white/60 mb-4">
              Are you sure you want to delete "{selectedJob.title}"? This action cannot be undone.
              {selectedJob.applicationsCount > 0 && (
                <span className="block mt-2 text-yellow-400">
                  ⚠️ This job has {selectedJob.applicationsCount} application(s). They will also be deleted.
                </span>
              )}
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedJob(null);
                }}
                className="border-white/20 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteJob}
                disabled={processing}
                className="bg-red-500 hover:bg-red-600"
              >
                {processing ? <Loader2 size={16} className="animate-spin mr-2" /> : null}
                Delete Job
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}