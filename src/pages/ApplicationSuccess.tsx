// pages/ApplicationSuccess.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Sparkles,
  Heart,
  Star,
  Mail,
  Home,
  Briefcase,
  PartyPopper,
  Smile,
  Rocket,
  Gift,
  GraduationCap
} from "lucide-react";

export default function ApplicationSuccess() {
  const { slug } = useParams<{ slug: string }>();
  const [jobTitle, setJobTitle] = useState("");
  const [showSparkle, setShowSparkle] = useState(true);

  useEffect(() => {
    // Format job title from slug
    if (slug) {
      const formatted = slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      setJobTitle(formatted);
    }

    // Animate sparkles
    const interval = setInterval(() => {
      setShowSparkle(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-yellow-100 to-green-100 relative overflow-hidden">
      {/* Decorative floating elements - CSS only animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(5deg); opacity: 0.6; }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .ping-animation {
          animation: ping 2s ease-in-out infinite;
        }
        .bounce-animation {
          animation: bounce 2s ease-in-out infinite;
        }
        .spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-300"
            size={Math.random() * 20 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              opacity: 0.3
            }}
          />
        ))}
        
        {/* Floating Hearts */}
        {[...Array(5)].map((_, i) => (
          <Heart
            key={`heart-${i}`}
            className="absolute text-pink-300"
            size={Math.random() * 15 + 8}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `bounce ${Math.random() * 3 + 2}s ease-in-out infinite`,
              opacity: 0.2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <Card className="max-w-2xl w-full p-8 md:p-12 bg-white/90 backdrop-blur-sm border-2 border-green-200 shadow-2xl relative overflow-hidden">
          {/* Success Ribbon */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-500 rotate-45 flex items-end justify-center pb-4">
            <PartyPopper className="w-6 h-6 text-white" />
          </div>

          {/* Top Corner Sparkles */}
          <Sparkles 
            className={`absolute top-4 left-4 w-6 h-6 text-yellow-500 transition-opacity duration-500 ${
              showSparkle ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Sparkles 
            className={`absolute bottom-4 right-4 w-6 h-6 text-yellow-500 transition-opacity duration-500 delay-300 ${
              showSparkle ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Content */}
          <div className="text-center relative z-10">
            {/* Animated Checkmark */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-green-400 rounded-full ping-animation opacity-50"></div>
              <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-14 h-14 text-white" />
              </div>
              <GraduationCap className="absolute -top-2 -right-2 w-8 h-8 text-amber-500 spin-slow" />
              <Gift className="absolute -bottom-2 -left-2 w-6 h-6 text-pink-500 bounce-animation" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Application Received!
              </span>
            </h1>

            <div className="flex items-center justify-center gap-2 mb-4">
              <Smile className="w-5 h-5 text-yellow-500 bounce-animation" />
              <p className="text-gray-600">Thank you for your interest in joining our team!</p>
              <Smile className="w-5 h-5 text-yellow-500 bounce-animation delay-200" />
            </div>

            {/* Job Title Card */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border-2 border-amber-200 mb-6">
              <p className="text-sm text-gray-500 mb-1">Position Applied For</p>
              <p className="text-xl font-bold text-amber-700">{jobTitle || "Teaching Position"}</p>
            </div>

            {/* What Happens Next */}
            <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200 mb-6">
              <h2 className="text-lg font-semibold text-green-700 mb-3 flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                What Happens Next?
              </h2>
              
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-600 text-sm">Our HR team will review your application carefully</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-600 text-sm">If your qualifications match, we'll contact you within 1-2 weeks</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-600 text-sm">You'll receive an email confirmation with next steps</p>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mb-8">
              <h3 className="font-semibold text-blue-700 mb-2 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                Quick Tips
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              </h3>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-blue-600">
                <span className="px-2 py-1 bg-blue-100 rounded-full">📞 Keep your phone nearby</span>
                <span className="px-2 py-1 bg-blue-100 rounded-full">📧 Check your email (including spam)</span>
                <span className="px-2 py-1 bg-blue-100 rounded-full">💼 Update your portfolio</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/careers">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-semibold px-8 py-6 transform hover:scale-105 transition-all duration-300">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse More Jobs
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold px-8 py-6 transform hover:scale-105 transition-all duration-300">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Email Confirmation Note */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Mail className="w-4 h-4 text-amber-500" />
              <span>Check your email for a confirmation message</span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>

            {/* Stars Decoration */}
            <div className="flex justify-center gap-1 mt-6">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}