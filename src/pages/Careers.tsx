// pages/Careers.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header"; // Add this import
import Footer from "@/components/Footer"; // Add this if you want footer too

import axios from "@/lib/api";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Search,
  ChevronRight,
  Building2,
  Loader2,
  Award,
  Users,
  Target,
  Heart,
  Mail,
  Home
} from "lucide-react";

interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  isUrgent: boolean;
  applicationDeadline?: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
}

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({
    totalJobs: 0,
    urgentJobs: 0,
    departments: 0
  });

  useEffect(() => {
    fetchJobs();
  }, [selectedDepartment, selectedType, search]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedDepartment !== "all") params.append("department", selectedDepartment);
      if (selectedType !== "all") params.append("type", selectedType);
      if (search) params.append("search", search);

      const res = await axios.get(`/jobs/public?${params.toString()}`);
      setJobs(res.data.jobs);
      setDepartments(res.data.departments);
      
      // Calculate stats
      setStats({
        totalJobs: res.data.jobs.length,
        urgentJobs: res.data.jobs.filter((j: Job) => j.isUrgent).length,
        departments: res.data.departments.length
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatSalary = (job: Job) => {
    if (!job.salary || (!job.salary.min && !job.salary.max)) return null;
    
    const currency = job.salary.currency || 'NGN';
    if (job.salary.min && job.salary.max) {
      return `${currency} ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}`;
    } else if (job.salary.min) {
      return `${currency} ${job.salary.min.toLocaleString()}+`;
    } else if (job.salary.max) {
      return `Up to ${currency} ${job.salary.max.toLocaleString()}`;
    }
    return null;
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Full-time':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Part-time':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Contract':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Internship':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header /> {/* Add Header here */}
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white pt-24 md:pt-28"> {/* Added padding-top to account for fixed header */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Optional Back to Home button - you can add this if you want */}
            <div className="mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"
              >
                <Home size={16} />
                Back to Home
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers at Busy Brain Schools, Ilorin</h1>
            <p className="text-xl text-amber-400 font-semibold mb-4">Join Our Team of Passionate Educators</p>
            
            <div className="flex items-center justify-center gap-2 text-slate-300 mb-8">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="text-lg">Ilorin, Kwara State</span>
            </div>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
              Busy Brain Schools is a faith-driven institution committed to raising disciplined, future-ready students. 
              We integrate academic excellence, moral values, and digital literacy to nurture confident learners and 
              responsible leaders.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-400">{stats.totalJobs}</div>
                <div className="text-sm text-slate-300">Open Positions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-400">{stats.urgentJobs}</div>
                <div className="text-sm text-slate-300">Urgent Hires</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-400">{stats.departments}</div>
                <div className="text-sm text-slate-300">Departments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Work With Us Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Work With Us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center shadow-md hover:shadow-xl transition-all border-2 border-slate-200 hover:border-amber-400 bg-white">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">Competitive Salary</h3>
              <p className="text-sm text-slate-700">Attractive compensation packages that value your expertise</p>
            </Card>

            <Card className="p-6 text-center shadow-md hover:shadow-xl transition-all border-2 border-slate-200 hover:border-amber-400 bg-white">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">Professional Development</h3>
              <p className="text-sm text-slate-700">Continuous learning opportunities and career growth</p>
            </Card>

            <Card className="p-6 text-center shadow-md hover:shadow-xl transition-all border-2 border-slate-200 hover:border-amber-400 bg-white">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">Supportive Environment</h3>
              <p className="text-sm text-slate-700">Structured and supportive work environment that nurtures growth</p>
            </Card>

            <Card className="p-6 text-center shadow-md hover:shadow-xl transition-all border-2 border-slate-200 hover:border-amber-400 bg-white">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">Purpose-Driven</h3>
              <p className="text-sm text-slate-700">Opportunity to grow in a purpose-driven institution</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content - Current Openings */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Current Openings</h2>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                type="text"
                placeholder="Search by job title, department, or keywords..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-700">
            Showing <span className="font-semibold text-slate-900">{jobs.length}</span> {jobs.length === 1 ? 'position' : 'positions'}
          </p>
          {selectedDepartment !== 'all' || selectedType !== 'all' || search ? (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedDepartment('all');
                setSelectedType('all');
                setSearch('');
              }}
              className="text-slate-700 hover:text-slate-900"
            >
              Clear Filters
            </Button>
          ) : null}
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
            <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No positions available</h3>
            <p className="text-slate-700">Check back later for new opportunities</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map(job => (
              <Card key={job._id} className="group hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-amber-300 overflow-hidden bg-white">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left side - Job Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {job.title}
                        </h2>
                        {job.isUrgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full border border-red-200">
                            Urgent
                          </span>
                        )}
                      </div>
                      
                      <p className="text-slate-700 text-sm mb-3">{job.department}</p>
                      
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                          <MapPin size={14} className="text-slate-500" />
                          {job.location}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 text-sm px-3 py-1 rounded-full border ${getTypeColor(job.type)}`}>
                          <Briefcase size={14} />
                          {job.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                          <Clock size={14} className="text-slate-500" />
                          {job.experience}
                        </span>
                        {formatSalary(job) && (
                          <span className="inline-flex items-center gap-1.5 text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                            <DollarSign size={14} className="text-slate-500" />
                            {formatSalary(job)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right side - Action */}
                    <div className="flex items-center gap-4">
                      {job.applicationDeadline && (
                        <div className="text-right hidden lg:block">
                          <p className="text-xs text-slate-500">Deadline</p>
                          <p className="text-sm font-medium text-slate-800">
                            {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      )}
                      <Link to={`/careers/${job.slug}`}>
                        <Button className="bg-white text-slate-700 border border-slate-300 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all group">
                          View Details
                          <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* How to Apply Section */}
      <div className="bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How to Apply</h2>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                  <Mail className="w-10 h-10 text-amber-600" />
                </div>
              </div>
              <p className="text-lg text-slate-800 mb-4">
                Ready to join our team? Here's how:
              </p>
              <p className="text-slate-700 mb-6">
                Browse our current openings above, click on any position that interests you, 
                and submit your application through our online portal. Make sure to have your 
                CV/resume and relevant documents ready.
              </p>
              <p className="text-sm text-slate-600">
                Via the website - Online Application Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Be Part of Our Mission Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Be Part of Our Mission</h2>
            <p className="text-xl text-slate-300 mb-8">
              Help us shape the next generation of thinkers, leaders, and innovators.
            </p>
            <Link to="/contact">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer /> {/* Add Footer if you want */}
    </div>
  );
}