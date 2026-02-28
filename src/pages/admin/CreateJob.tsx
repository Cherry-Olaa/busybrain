// src/pages/admin/CreateJob.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
  ArrowLeft,
  Save,
  Loader2,
  Briefcase,
  Plus,
  X,
  AlertCircle
} from "lucide-react";

interface JobForm {
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  applicationDeadline: string;
  isUrgent: boolean;
}

export default function CreateJob() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<JobForm>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    description: '',
    requirements: [],
    responsibilities: [],
    benefits: [],
    salaryMin: '',
    salaryMax: '',
    salaryCurrency: 'NGN',
    applicationDeadline: '',
    isUrgent: false
  });

  const [newRequirement, setNewRequirement] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const currencies = ['NGN', 'USD', 'GBP', 'EUR'];

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

// In CreateJob.tsx, update the fetchJob function:

const fetchJob = async () => {
    setLoading(true);
    try {
      // Make sure this endpoint matches your backend
      const res = await axios.get(`/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const job = res.data;
      setForm({
        title: job.title || '',
        department: job.department || '',
        location: job.location || '',
        type: job.type || 'Full-time',
        experience: job.experience || '',
        description: job.description || '',
        requirements: job.requirements || [],
        responsibilities: job.responsibilities || [],
        benefits: job.benefits || [],
        salaryMin: job.salary?.min?.toString() || '',
        salaryMax: job.salary?.max?.toString() || '',
        salaryCurrency: job.salary?.currency || 'NGN',
        applicationDeadline: job.applicationDeadline ? job.applicationDeadline.split('T')[0] : '',
        isUrgent: job.isUrgent || false
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to fetch job",
        variant: "destructive"
      });
      navigate("/admin/jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setForm({
        ...form,
        requirements: [...form.requirements, newRequirement.trim()]
      });
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setForm({
      ...form,
      requirements: form.requirements.filter((_, i) => i !== index)
    });
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setForm({
        ...form,
        responsibilities: [...form.responsibilities, newResponsibility.trim()]
      });
      setNewResponsibility('');
    }
  };

  const removeResponsibility = (index: number) => {
    setForm({
      ...form,
      responsibilities: form.responsibilities.filter((_, i) => i !== index)
    });
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setForm({
        ...form,
        benefits: [...form.benefits, newBenefit.trim()]
      });
      setNewBenefit('');
    }
  };

  const removeBenefit = (index: number) => {
    setForm({
      ...form,
      benefits: form.benefits.filter((_, i) => i !== index)
    });
  };

  const validateForm = (): boolean => {
    if (!form.title) {
      toast({ title: "Error", description: "Job title is required", variant: "destructive" });
      return false;
    }
    if (!form.department) {
      toast({ title: "Error", description: "Department is required", variant: "destructive" });
      return false;
    }
    if (!form.location) {
      toast({ title: "Error", description: "Location is required", variant: "destructive" });
      return false;
    }
    if (!form.description) {
      toast({ title: "Error", description: "Job description is required", variant: "destructive" });
      return false;
    }
    if (form.requirements.length === 0) {
      toast({ title: "Error", description: "At least one requirement is required", variant: "destructive" });
      return false;
    }
    if (form.responsibilities.length === 0) {
      toast({ title: "Error", description: "At least one responsibility is required", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    try {
      const payload: any = {
        title: form.title,
        department: form.department,
        location: form.location,
        type: form.type,
        experience: form.experience,
        description: form.description,
        requirements: form.requirements,
        responsibilities: form.responsibilities,
        isUrgent: form.isUrgent
      };

      // Add optional fields
      if (form.benefits.length > 0) payload.benefits = form.benefits;
      
      if (form.salaryMin || form.salaryMax) {
        payload.salary = {
          min: form.salaryMin ? parseInt(form.salaryMin) : undefined,
          max: form.salaryMax ? parseInt(form.salaryMax) : undefined,
          currency: form.salaryCurrency
        };
      }

      if (form.applicationDeadline) payload.applicationDeadline = form.applicationDeadline;

      const url = id ? `/jobs/${id}` : '/jobs';
      const method = id ? 'put' : 'post';

      const res = await axios[method](url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: res.data.message
      });

      navigate("/admin/jobs");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to save job",
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
          <Loader2 className="animate-spin text-[#0b92bf]" size={40} />
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
            <Link to="/admin/jobs">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                <ArrowLeft size={20} className="mr-1" />
                Back to Jobs
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {id ? 'Edit Job' : 'Create New Job'}
            </h1>
          </div>

          <Card className="p-6 bg-white/5 border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Job Title *</Label>
                  <Input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g., Primary School Teacher"
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <div>
                  <Label>Department *</Label>
                  <Input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="e.g., Academic"
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <div>
                  <Label>Location *</Label>
                  <Input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g., Ilorin"
                    className="mt-1 bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <div>
                  <Label>Job Type *</Label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full mt-1 p-2 rounded bg-white/10 text-white border-white/20"
                  >
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Experience Required</Label>
                  <Input
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="e.g., 2-3 years"
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div>
                  <Label>Application Deadline</Label>
                  <Input
                    name="applicationDeadline"
                    type="date"
                    value={form.applicationDeadline}
                    onChange={handleChange}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              {/* Urgent Flag */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isUrgent"
                  checked={form.isUrgent}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-white/20 bg-white/10"
                />
                <Label>Mark as Urgent</Label>
              </div>

              {/* Description */}
              <div>
                <Label>Job Description *</Label>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the role, responsibilities, and ideal candidate..."
                  className="mt-1 bg-white/10 border-white/20 text-white"
                  required
                />
              </div>

              {/* Requirements */}
              <div>
                <Label>Requirements *</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Add a requirement"
                    className="bg-white/10 border-white/20 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRequirement())}
                  />
                  <Button type="button" onClick={addRequirement} className="bg-[#0b92bf]">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {form.requirements.map((req, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/10 p-2 rounded">
                      <span className="text-sm">{req}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRequirement(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <Label>Responsibilities *</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    placeholder="Add a responsibility"
                    className="bg-white/10 border-white/20 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addResponsibility())}
                  />
                  <Button type="button" onClick={addResponsibility} className="bg-[#0b92bf]">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {form.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/10 p-2 rounded">
                      <span className="text-sm">{resp}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeResponsibility(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits (Optional) */}
              <div>
                <Label>Benefits (Optional)</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Add a benefit"
                    className="bg-white/10 border-white/20 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                  />
                  <Button type="button" onClick={addBenefit} className="bg-[#0b92bf]">
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  {form.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/10 p-2 rounded">
                      <span className="text-sm">{benefit}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBenefit(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salary (Optional) */}
              <div>
                <Label>Salary Range (Optional)</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <Input
                    name="salaryMin"
                    value={form.salaryMin}
                    onChange={handleChange}
                    placeholder="Min"
                    type="number"
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Input
                    name="salaryMax"
                    value={form.salaryMax}
                    onChange={handleChange}
                    placeholder="Max"
                    type="number"
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <select
                    name="salaryCurrency"
                    value={form.salaryCurrency}
                    onChange={handleChange}
                    className="p-2 rounded bg-white/10 text-white border-white/20"
                  >
                    {currencies.map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/admin/jobs")}
                  className="text-white/60 hover:text-white"
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
                      {id ? 'Update Job' : 'Create Job'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}