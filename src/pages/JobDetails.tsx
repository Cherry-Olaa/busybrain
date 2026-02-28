// pages/JobDetails.tsx
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/api";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Award,
  ChevronLeft,
  Loader2,
  CheckCircle,
  XCircle,
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
  requirements: string[];
  responsibilities: string[];
  benefits?: string[];
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  applicationDeadline?: string;
  isUrgent: boolean;
  views: number;
  createdAt: string;
}

export default function JobDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, [slug]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/jobs/public/${slug}`);
      setJob(res.data);
    } catch (error: any) {
      console.error("Error fetching job:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load job details",
        variant: "destructive"
      });
      navigate("/careers");
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (salary?: Job['salary']) => {
    if (!salary || (!salary.min && !salary.max)) return "Not specified";
    
    const currency = salary.currency || 'NGN';
    const formatNumber = (num?: number) => {
      if (!num) return '';
      return new Intl.NumberFormat('en-NG').format(num);
    };

    if (salary.min && salary.max) {
      return `${currency} ${formatNumber(salary.min)} - ${formatNumber(salary.max)}`;
    } else if (salary.min) {
      return `${currency} ${formatNumber(salary.min)}+`;
    } else if (salary.max) {
      return `Up to ${currency} ${formatNumber(salary.max)}`;
    }
    return "Not specified";
  };

  const formatDate = (date?: string) => {
    if (!date) return "No deadline";
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isDeadlinePassed = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <Link to="/careers">
            <Button className="bg-amber-500 hover:bg-amber-600">
              Back to Careers
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const deadlinePassed = isDeadlinePassed(job.applicationDeadline);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to All Jobs
        </Link>

        {/* Job Header */}
        <Card className="p-6 mb-6 relative overflow-hidden">
          {job.isUrgent && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
              <AlertCircle size={16} className="inline mr-1" />
              Urgent Hire
            </div>
          )}
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <p className="text-lg text-amber-600 mb-4">{job.department}</p>
              
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin size={16} className="text-amber-500" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Briefcase size={16} className="text-amber-500" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock size={16} className="text-amber-500" />
                  {job.experience}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <DollarSign size={16} className="text-amber-500" />
                  {formatSalary(job.salary)}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-500 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Deadline: {formatDate(job.applicationDeadline)}
              </div>
              {deadlinePassed && (
                <div className="text-red-500 text-sm font-medium">
                  Applications Closed
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Job Description */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Job Description</h2>
          <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
        </Card>

        {/* Responsibilities */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Key Responsibilities</h2>
          <ul className="space-y-2">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex gap-2 text-gray-600">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Requirements */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements.map((item, index) => (
              <li key={index} className="flex gap-2 text-gray-600">
                <CheckCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {job.benefits.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <Award size={16} className="text-amber-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Apply Button */}
        <div className="text-center">
          <Link to={`/apply/${job.slug}`}>
            <Button
              size="lg"
              disabled={deadlinePassed}
              className={`bg-amber-500 hover:bg-amber-600 text-white px-12 py-6 text-lg ${
                deadlinePassed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {deadlinePassed ? 'Applications Closed' : 'Apply for this Position'}
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            {job.views} people have viewed this position
          </p>
        </div>
      </div>
    </div>
  );
}