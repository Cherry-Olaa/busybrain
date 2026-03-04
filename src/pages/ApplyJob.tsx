// // pages/ApplyJob.tsx
// import { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import axios from "@/lib/api";
// import {
//   ChevronLeft,
//   Loader2,
//   Upload,
//   CheckCircle,
//   Briefcase
// } from "lucide-react";

// export default function ApplyJob() {
//   const { slug } = useParams<{ slug: string }>();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [job, setJob] = useState<any>(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     experience: '',
//     education: '',
//     skills: '',
//     coverLetter: '',
//     portfolio: '',
//     linkedIn: ''
//   });
//   const [resume, setResume] = useState<File | null>(null);

//   useEffect(() => {
//     fetchJob();
//   }, [slug]);

//   const fetchJob = async () => {
//     try {
//       const res = await axios.get(`/jobs/public/${slug}`);
//       setJob(res.data);
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to load job details",
//         variant: "destructive"
//       });
//       navigate("/careers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setResume(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!resume) {
//       toast({
//         title: "Error",
//         description: "Please upload your resume",
//         variant: "destructive"
//       });
//       return;
//     }

//     setSubmitting(true);
//     const formDataToSend = new FormData();
    
//     formDataToSend.append('jobId', job._id);
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) formDataToSend.append(key, value);
//     });
//     formDataToSend.append('resume', resume);

//     try {
//       const res = await axios.post('/jobs/apply', formDataToSend, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       toast({
//         title: "Application Submitted!",
//         description: "We'll review your application and get back to you soon.",
//       });

//       navigate(`/careers/${slug}/success`);
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Failed to submit application",
//         variant: "destructive"
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 flex items-center justify-center">
//         <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-amber-50 to-yellow-50 py-8">
//       <div className="container mx-auto px-4 max-w-3xl">
//         <Link
//           to={`/careers/${slug}`}
//           className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
//         >
//           <ChevronLeft size={20} />
//           Back to Job Details
//         </Link>

//         <Card className="p-6">
//           <div className="flex items-center gap-3 mb-6">
//             <Briefcase className="w-6 h-6 text-amber-500" />
//             <h1 className="text-2xl font-bold">Apply for {job?.title}</h1>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>First Name *</Label>
//                 <Input
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label>Last Name *</Label>
//                 <Input
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Email *</Label>
//                 <Input
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label>Phone *</Label>
//                 <Input
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             <div>
//               <Label>Resume/CV *</Label>
//               <div className="mt-1 flex items-center gap-2">
//                 <Input
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileChange}
//                   required
//                   className="flex-1"
//                 />
//                 {resume && <CheckCircle className="w-5 h-5 text-green-500" />}
//               </div>
//               <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
//             </div>

//             <div>
//               <Label>Work Experience *</Label>
//               <Textarea
//                 name="experience"
//                 value={formData.experience}
//                 onChange={handleChange}
//                 required
//                 rows={3}
//                 placeholder="Briefly describe your relevant work experience..."
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label>Education *</Label>
//               <Textarea
//                 name="education"
//                 value={formData.education}
//                 onChange={handleChange}
//                 required
//                 rows={2}
//                 placeholder="Your highest qualification and institution..."
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label>Skills</Label>
//               <Input
//                 name="skills"
//                 value={formData.skills}
//                 onChange={handleChange}
//                 placeholder="e.g., Teaching, Communication, First Aid (comma separated)"
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <Label>Cover Letter (Optional)</Label>
//               <Textarea
//                 name="coverLetter"
//                 value={formData.coverLetter}
//                 onChange={handleChange}
//                 rows={4}
//                 placeholder="Tell us why you're interested in this position..."
//                 className="mt-1"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Label>Portfolio (Optional)</Label>
//                 <Input
//                   name="portfolio"
//                   value={formData.portfolio}
//                   onChange={handleChange}
//                   placeholder="https://..."
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label>LinkedIn (Optional)</Label>
//                 <Input
//                   name="linkedIn"
//                   value={formData.linkedIn}
//                   onChange={handleChange}
//                   placeholder="https://linkedin.com/in/..."
//                   className="mt-1"
//                 />
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={submitting}
//               className="w-full bg-amber-500 hover:bg-amber-600 py-6 text-lg"
//             >
//               {submitting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Submitting Application...
//                 </>
//               ) : (
//                 'Submit Application'
//               )}
//             </Button>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// }


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
  Briefcase,
  MapPin,
  GraduationCap,
  BookOpen,
  Building2,
  Award,
  Star,
  Plus,
  X
} from "lucide-react";

export default function ApplyJob() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [job, setJob] = useState<any>(null);
  
  // Enhanced form data with all new fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    courseOfStudy: '',
    institutions: [''],
    workExperience: '',
    previousSchool: '',
    subjectsTaught: [''],
    trcnCertification: '',
    keyStrengths: [''],
    skills: '',
    coverLetter: '',
    portfolio: '',
    linkedIn: ''
  });
  
  const [resume, setResume] = useState<File | null>(null);

  // Education options
  const educationOptions = [
    "NCE",
    "B.Ed",
    "B.Sc + PGDE",
    "M.Ed / M.Sc",
    "Others"
  ];

  // Work experience options
  const experienceOptions = [
    "0-1 years",
    "2-3 years",
    "4-6 years",
    "7+ years"
  ];

  // Yes/No options for TRCN
  const yesNoOptions = ["Yes", "No"];

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle array fields (institutions)
  const handleInstitutionChange = (index: number, value: string) => {
    const updated = [...formData.institutions];
    updated[index] = value;
    setFormData({ ...formData, institutions: updated });
  };

  const addInstitution = () => {
    setFormData({
      ...formData,
      institutions: [...formData.institutions, '']
    });
  };

  const removeInstitution = (index: number) => {
    if (formData.institutions.length > 1) {
      const updated = formData.institutions.filter((_, i) => i !== index);
      setFormData({ ...formData, institutions: updated });
    }
  };

  // Handle array fields (subjects taught)
  const handleSubjectChange = (index: number, value: string) => {
    const updated = [...formData.subjectsTaught];
    updated[index] = value;
    setFormData({ ...formData, subjectsTaught: updated });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjectsTaught: [...formData.subjectsTaught, '']
    });
  };

  const removeSubject = (index: number) => {
    if (formData.subjectsTaught.length > 1) {
      const updated = formData.subjectsTaught.filter((_, i) => i !== index);
      setFormData({ ...formData, subjectsTaught: updated });
    }
  };

  // Handle array fields (key strengths)
  const handleStrengthChange = (index: number, value: string) => {
    const updated = [...formData.keyStrengths];
    updated[index] = value;
    setFormData({ ...formData, keyStrengths: updated });
  };

  const addStrength = () => {
    setFormData({
      ...formData,
      keyStrengths: [...formData.keyStrengths, '']
    });
  };

  const removeStrength = (index: number) => {
    if (formData.keyStrengths.length > 1) {
      const updated = formData.keyStrengths.filter((_, i) => i !== index);
      setFormData({ ...formData, keyStrengths: updated });
    }
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
    
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // For arrays, send as JSON string
        formDataToSend.append(key, JSON.stringify(value.filter(item => item.trim() !== '')));
      } else if (value) {
        formDataToSend.append(key, value);
      }
    });
    
    formDataToSend.append('resume', resume);

    try {
      await axios.post('/jobs/apply', formDataToSend, {
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
      <div className="min-h-screen bg-[#041d29] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0b92bf] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#041d29] py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link
          to={`/careers/${slug}`}
          className="inline-flex items-center gap-2 text-[#9fb6c2] hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Job Details
        </Link>

        <Card className="p-6 bg-white/5 border-white/10 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-[#0b92bf]" />
            <h1 className="text-2xl font-bold text-white">Apply for {job?.title}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Star className="w-5 h-5 text-[#0b92bf]" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80">First Name *</Label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Last Name *</Label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label className="text-white/80">Email *</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Phone *</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-white/80">Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="pl-10 mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                    placeholder="Your current address"
                  />
                </div>
              </div>
            </div>

            {/* Education & Qualifications */}
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <GraduationCap className="w-5 h-5 text-[#0b92bf]" />
                Education & Qualifications
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80">Education *</Label>
                  <select
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 bg-white/10 text-white border border-white/20 rounded-md focus:border-[#0b92bf] focus:ring-[#0b92bf]"
                  >
                    <option value="" className="bg-[#041d29] text-white">Select Education Level</option>
                    {educationOptions.map(option => (
                      <option key={option} value={option} className="bg-[#041d29] text-white">{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-white/80">Course of Study *</Label>
                  <Input
                    name="courseOfStudy"
                    value={formData.courseOfStudy}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                    placeholder="e.g., Mathematics Education"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-white/80">Institutions Attended *</Label>
                {formData.institutions.map((institution, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={institution}
                      onChange={(e) => handleInstitutionChange(index, e.target.value)}
                      placeholder={`Institution ${index + 1}`}
                      className="flex-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                      required={index === 0}
                    />
                    {index === formData.institutions.length - 1 ? (
                      <Button
                        type="button"
                        onClick={addInstitution}
                        className="bg-[#0b92bf] hover:bg-[#0a7ca3] text-white"
                        size="sm"
                      >
                        <Plus size={16} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => removeInstitution(index)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        size="sm"
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Experience */}
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Briefcase className="w-5 h-5 text-[#0b92bf]" />
                Professional Experience
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80">Work Experience *</Label>
                  <select
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 bg-white/10 text-white border border-white/20 rounded-md focus:border-[#0b92bf] focus:ring-[#0b92bf]"
                  >
                    <option value="" className="bg-[#041d29] text-white">Select Years of Experience</option>
                    {experienceOptions.map(option => (
                      <option key={option} value={option} className="bg-[#041d29] text-white">{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-white/80">Previous School/Organization</Label>
                  <Input
                    name="previousSchool"
                    value={formData.previousSchool}
                    onChange={handleChange}
                    className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                    placeholder="Current or most recent school"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-white/80">Subjects Taught *</Label>
                {formData.subjectsTaught.map((subject, index) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={subject}
                      onChange={(e) => handleSubjectChange(index, e.target.value)}
                      placeholder={`Subject ${index + 1}`}
                      className="flex-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                      required={index === 0}
                    />
                    {index === formData.subjectsTaught.length - 1 ? (
                      <Button
                        type="button"
                        onClick={addSubject}
                        className="bg-[#0b92bf] hover:bg-[#0a7ca3] text-white"
                        size="sm"
                      >
                        <Plus size={16} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        size="sm"
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Qualifications */}
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-[#0b92bf]" />
                Professional Qualifications
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80">TRCN Certification *</Label>
                  <select
                    name="trcnCertification"
                    value={formData.trcnCertification}
                    onChange={handleChange}
                    required
                    className="w-full mt-1 p-2 bg-white/10 text-white border border-white/20 rounded-md focus:border-[#0b92bf] focus:ring-[#0b92bf]"
                  >
                    <option value="" className="bg-[#041d29] text-white">Select Option</option>
                    {yesNoOptions.map(option => (
                      <option key={option} value={option} className="bg-[#041d29] text-white">{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Key Strengths */}
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Star className="w-5 h-5 text-[#0b92bf]" />
                Key Strengths as a Teacher *
              </h2>
              
              {formData.keyStrengths.map((strength, index) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={strength}
                    onChange={(e) => handleStrengthChange(index, e.target.value)}
                    placeholder={`Strength ${index + 1}`}
                    className="flex-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                    required={index === 0}
                  />
                  {index === formData.keyStrengths.length - 1 ? (
                    <Button
                      type="button"
                      onClick={addStrength}
                      className="bg-[#0b92bf] hover:bg-[#0a7ca3] text-white"
                      size="sm"
                    >
                      <Plus size={16} />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => removeStrength(index)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                      size="sm"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Resume Upload */}
            <div>
              <Label className="text-white/80">Resume/CV *</Label>
              <div className="mt-1 flex items-center gap-2">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="flex-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] file:bg-[#0b92bf] file:text-white file:border-0 file:rounded file:px-4 file:py-2 file:mr-4 hover:file:bg-[#0a7ca3]"
                />
                {resume && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <p className="text-xs text-white/40 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <BookOpen className="w-5 h-5 text-[#0b92bf]" />
                Additional Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-white/80">Skills</Label>
                  <Input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g., Classroom Management, Lesson Planning, Communication (comma separated)"
                    className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                  />
                </div>

                <div>
                  <Label className="text-white/80">Cover Letter (Optional)</Label>
                  <Textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                    className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/80">Portfolio (Optional)</Label>
                    <Input
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <Label className="text-white/80">LinkedIn (Optional)</Label>
                    <Input
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className="mt-1 bg-white/10 text-white border-white/20 focus:border-[#0b92bf] placeholder:text-white/40"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0b92bf] hover:bg-[#0a7ca3] text-white py-6 text-lg"
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