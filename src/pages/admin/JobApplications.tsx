// src/pages/admin/JobApplications.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
  Users,
  Download,
  Eye,
  Filter,
  Search,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  UserX,
  Mail,
  Phone,
  FileText,
  Star
} from "lucide-react";

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  skills: string[];
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  resumeUrl: string;
  coverLetter?: string;
  portfolio?: string;
  linkedIn?: string;
  expectedSalary?: number;
  startDate?: string;
  notes?: string;
  createdAt: string;
}

export default function JobApplications() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, statusFilter, applications]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/jobs/${jobId}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(res.data.applications);
      
      // Get job title from first application if available
      if (res.data.applications.length > 0) {
        setJobTitle(res.data.applications[0].jobId?.title || '');
      } else {
        // Fetch job details separately
        const jobRes = await axios.get(`/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobTitle(jobRes.data.title);
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to fetch applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    if (searchTerm) {
      filtered = filtered.filter(app =>
        `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApps(filtered);
  };

  const updateStatus = async (appId: string, status: Application['status']) => {
    setUpdating(true);
    try {
      await axios.patch(`/jobs/application/${appId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Success",
        description: "Application status updated"
      });

      fetchApplications(); // Refresh
      setShowDetailsModal(false);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update status",
        variant: "destructive"
      });
    } finally {
      setUpdating(false);
    }
  };

  const downloadResume = async (appId: string) => {
    try {
      const response = await axios.get(`/jobs/application/${appId}/resume`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      reviewed: 'bg-blue-500/20 text-blue-400',
      shortlisted: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400',
      hired: 'bg-purple-500/20 text-purple-400'
    };

    const icons = {
      pending: <Clock size={14} />,
      reviewed: <Eye size={14} />,
      shortlisted: <CheckCircle2 size={14} />,
      rejected: <XCircle size={14} />,
      hired: <Star size={14} />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/admin/jobs">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <ArrowLeft size={20} className="mr-1" />
                Back to Jobs
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users className="text-[#0b92bf]" />
                Applications
              </h1>
              <p className="text-white/60 text-sm mt-1">
                {jobTitle} • {applications.length} total applications
              </p>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-4 bg-white/5 border-white/10 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <Input
                  placeholder="Search applicants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 text-white border-white/20"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded bg-white/10 text-white border-white/20"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          </Card>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <Card
                key={app._id}
                className="bg-white/5 border-white/10 hover:border-[#0b92bf]/30 transition-all cursor-pointer"
                onClick={() => {
                  setSelectedApp(app);
                  setShowDetailsModal(true);
                }}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">
                        {app.firstName} {app.lastName}
                      </h3>
                      <p className="text-sm text-white/60">{app.email}</p>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className="space-y-2 text-sm text-white/60">
                    <p className="flex items-center gap-2">
                      <Phone size={14} />
                      {app.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <FileText size={14} />
                      {app.experience}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {app.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-[#0b92bf]/20 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {app.skills.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded text-xs">
                        +{app.skills.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 text-xs text-white/40">
                    Applied: {formatDate(app.createdAt)}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12 text-white/40">
              <Users size={48} className="mx-auto mb-4 opacity-40" />
              <p>No applications found</p>
            </div>
          )}
        </div>
      </main>

      {/* Application Details Modal */}
      {showDetailsModal && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-[#041d29] border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedApp.firstName} {selectedApp.lastName}
                  </h2>
                  <p className="text-white/60">{jobTitle}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetailsModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <XCircle size={20} />
                </Button>
              </div>

              {/* Status Update */}
              <div className="bg-white/5 p-4 rounded-lg mb-6">
                {/* <Label>Update Status</Label> */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {(['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'] as const).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      onClick={() => updateStatus(selectedApp._id, status)}
                      disabled={updating || selectedApp.status === status}
                      className={`${
                        selectedApp.status === status
                          ? 'bg-[#0b92bf]'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-white/40 text-xs">Email</p>
                  <a href={`mailto:${selectedApp.email}`} className="text-[#0b92bf] hover:underline">
                    {selectedApp.email}
                  </a>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Phone</p>
                  <a href={`tel:${selectedApp.phone}`} className="text-white">
                    {selectedApp.phone}
                  </a>
                </div>
                {selectedApp.linkedIn && (
                  <div>
                    <p className="text-white/40 text-xs">LinkedIn</p>
                    <a href={selectedApp.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#0b92bf] hover:underline">
                      View Profile
                    </a>
                  </div>
                )}
                {selectedApp.portfolio && (
                  <div>
                    <p className="text-white/40 text-xs">Portfolio</p>
                    <a href={selectedApp.portfolio} target="_blank" rel="noopener noreferrer" className="text-[#0b92bf] hover:underline">
                      View Portfolio
                    </a>
                  </div>
                )}
              </div>

              {/* Resume */}
              <div className="mb-6">
                <Button
                  onClick={() => downloadResume(selectedApp._id)}
                  className="bg-[#0b92bf]"
                >
                  <Download size={16} className="mr-2" />
                  Download Resume
                </Button>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-white/40 text-xs">Experience</p>
                  <p className="text-white">{selectedApp.experience}</p>
                </div>

                <div>
                  <p className="text-white/40 text-xs">Education</p>
                  <p className="text-white">{selectedApp.education}</p>
                </div>

                <div>
                  <p className="text-white/40 text-xs">Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedApp.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-white/10 rounded text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedApp.coverLetter && (
                  <div>
                    <p className="text-white/40 text-xs">Cover Letter</p>
                    <p className="text-white mt-1 whitespace-pre-wrap">{selectedApp.coverLetter}</p>
                  </div>
                )}

                {selectedApp.expectedSalary && (
                  <div>
                    <p className="text-white/40 text-xs">Expected Salary</p>
                    <p className="text-white">₦{selectedApp.expectedSalary.toLocaleString()}</p>
                  </div>
                )}

                {selectedApp.startDate && (
                  <div>
                    <p className="text-white/40 text-xs">Available From</p>
                    <p className="text-white">{formatDate(selectedApp.startDate)}</p>
                  </div>
                )}

                {selectedApp.notes && (
                  <div>
                    <p className="text-white/40 text-xs">Notes</p>
                    <p className="text-white mt-1 p-3 bg-yellow-500/10 rounded">
                      {selectedApp.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}