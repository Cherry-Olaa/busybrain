// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error("404 Error: User attempted to access non-existent route:", location.pathname);
//   }, [location.pathname]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-muted">
//       <div className="text-center">
//         <h1 className="mb-4 text-4xl font-bold">404</h1>
//         <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
//         <a href="/" className="text-primary underline hover:text-primary/90">
//           Return to Home
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;


import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  Home, 
  Search, 
  Frown, 
  Smile, 
  Star, 
  Sparkles, 
  Heart,
  ArrowLeft,
  Compass,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const [showFunny, setShowFunny] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    
    // Show funny message after a delay
    const timer = setTimeout(() => setShowFunny(true), 2000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const funnyMessages = [
    "Looks like this page took a vacation! 🌴",
    "Even our best explorers couldn't find this page! 🧭",
    "This page is playing hide and seek... and winning! 🙈",
    "Oops! Our hamsters ran off with this page! 🐹",
    "404: Page not found. It's probably doing homework! 📚",
  ];

  const randomFunnyMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        {[...Array(15)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-300 opacity-30"
            size={Math.random() * 30 + 15}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
            }}
          />
        ))}
        
        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .bounce-animation {
          animation: bounce 2s ease-in-out infinite;
        }
        .spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>

      <Card className="relative z-10 max-w-2xl w-full mx-4 bg-white/90 backdrop-blur-sm border-2 border-yellow-200 shadow-2xl overflow-hidden">
        {/* Top Decorative Strip */}
        <div className="h-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"></div>

        {/* Main Content */}
        <div className="p-8 md:p-12 text-center">
          {/* Animated 404 Numbers */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="relative">
              <span className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                4
              </span>
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-500 animate-ping" />
            </div>
            <div className="relative">
              <span className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                0
              </span>
              <Frown className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 text-orange-500 animate-bounce" />
            </div>
            <div className="relative">
              <span className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                4
              </span>
              <Heart className="absolute -top-4 -left-4 w-6 h-6 text-pink-500 animate-ping" />
            </div>
          </div>

          {/* Funny Message */}
          <div className="mb-6">
            <div className="inline-block px-4 py-2 bg-amber-100 rounded-full mb-4">
              <p className="text-amber-800 font-medium flex items-center gap-2">
                <Smile className="w-4 h-4" />
                Oopsie Daisy!
                <Smile className="w-4 h-4" />
              </p>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Page Not Found
            </h2>
            
            <p className="text-gray-600 mb-4">
              {showFunny ? randomFunnyMessage : "The page you're looking for doesn't exist or has been moved."}
            </p>

            {/* Path attempted */}
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 mb-6 inline-block">
              <p className="text-sm text-amber-700 font-mono flex items-center gap-2">
                <Compass className="w-4 h-4" />
                {location.pathname}
                <Search className="w-4 h-4" />
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Home className="w-5 h-5 mr-2" />
                Go Back Home
              </Button>
            </Link>

            <Link to="/contact">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-bold px-8 py-6 rounded-xl transform hover:scale-105 transition-all duration-300">
                <BookOpen className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
            </Link>
          </div>

          {/* Fun Fact */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            <span>Don't worry, even the best explorers get lost sometimes!</span>
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          </div>
        </div>

        {/* Bottom Decorative Strip */}
        <div className="h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"></div>
      </Card>

      {/* Extra Floating Emojis */}
      <div className="absolute bottom-10 left-10 text-4xl opacity-30 float-animation">😊</div>
      <div className="absolute top-20 right-10 text-4xl opacity-30 float-animation delay-500">🌟</div>
      <div className="absolute bottom-20 right-20 text-4xl opacity-30 spin-slow">🕌</div>
    </div>
  );
};

export default NotFound;