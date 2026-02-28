// pages/ApplyJob.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
  ChevronLeft,
  Loader2,
  Upload,
  CheckCircle,
  Briefcase
} from "lucide-react";

export default function ApplyJob() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
    coverLetter: '',
    portfolio: '',
    linkedIn: ''
  });
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    fetchJob();
  }, [slug]);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`/jobs/public/${slug}`);
      setJob(res.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load job details",
        variant: "destructive"
      });
      navigate("/careers");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      toast({
        title: "Error",
        description: "Please upload your resume",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    const formDataToSend = new FormData();
    
    formDataToSend.append('jobId', job._id);
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });
    formDataToSend.append('resume', resume);

    try {
      const res = await axios.post('/jobs/apply', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });

      navigate(`/careers/${slug}/success`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to submit application",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          to={`/careers/${slug}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ChevronLeft size={20} />
          Back to Job Details
        </Link>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-amber-500" />
            <h1 className="text-2xl font-bold">Apply for {job?.title}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email *</Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Phone *</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Resume/CV *</Label>
              <div className="mt-1 flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="flex-1"
                />
                {resume && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
            </div>

            <div>
              <Label>Work Experience *</Label>
              <Textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Briefly describe your relevant work experience..."
                className="mt-1"
              />
            </div>

            <div>
              <Label>Education *</Label>
              <Textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                rows={2}
                placeholder="Your highest qualification and institution..."
                className="mt-1"
              />
            </div>

            <div>
              <Label>Skills</Label>
              <Input
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., Teaching, Communication, First Aid (comma separated)"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Cover Letter (Optional)</Label>
              <Textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us why you're interested in this position..."
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Portfolio (Optional)</Label>
                <Input
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label>LinkedIn (Optional)</Label>
                <Input
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-amber-500 hover:bg-amber-600 py-6 text-lg"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}