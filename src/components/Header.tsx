// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";
// import { useEffect, useState } from "react";

// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [role, setRole] = useState(null);
//   const navigate = useNavigate();

//   const navigation = [
//     { name: "Home", href: "/" },
//     { name: "About Us", href: "/about" },
//     { name: "Contact", href: "/contact" },
//     { name: "Results", href: "/results-check" },
//   ];

//   // sync role
//   useEffect(() => {
//     setRole(localStorage.getItem("role"));
//   }, []);

//   // lock body scroll when menu open
//   useEffect(() => {
//     document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
//   }, [mobileMenuOpen]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setRole(null);
//     setMobileMenuOpen(false);
//     navigate("/login");
//   };

//   const AuthActions = ({ mobile = false }) => {
//     if (role) {
//       return (
//         <div
//           className={`flex gap-3 ${
//             mobile ? "flex-col items-start mt-auto" : "items-center"
//           }`}
//         >
//           <span className="text-sm text-muted-foreground">{role}</span>
//           <button
//             onClick={handleLogout}
//             className="text-sm text-destructive hover:underline"
//           >
//             Logout
//           </button>
//         </div>
//       );
//     }

//     return (
//       <Link
//         to="/login"
//         onClick={() => setMobileMenuOpen(false)}
//         className={mobile ? "mt-auto w-full" : ""}
//       >
//         <Button className={mobile ? "w-full" : ""}>Login</Button>
//       </Link>
//     );
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
//         <nav className="container mx-auto px-4">
//           <div className="flex h-16 md:h-20 items-center justify-between">
//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-3">
//               <img
//                 src="./logo-watermark.png"
//                 alt="logo"
//                 className="w-10 h-10 rounded-full"
//               />
//               <div>
//                 <div className="font-bold text-lg">BBS</div>
//                 <div className="text-xs text-muted-foreground hidden sm:block">
//                   Critical Thinking
//                 </div>
//               </div>
//             </Link>

//             {/* Desktop nav */}
//             <div className="hidden md:flex items-center gap-8">
//               {navigation.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className="text-sm text-muted-foreground hover:text-foreground"
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//               <AuthActions />
//             </div>

//             {/* Mobile toggle */}
//             <button
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen((p) => !p)}
//             >
//               {mobileMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* MOBILE MENU OVERLAY */}
//       {mobileMenuOpen && (
//         <div className="fixed inset-0 top-16 z-40 md:hidden bg-background flex flex-col px-4 py-6">
//           {/* Links */}
//           <div className="flex flex-col gap-6">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="text-sm text-muted-foreground hover:text-foreground"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Auth at bottom */}
//           <AuthActions mobile />
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;


import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Star, Smile, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "About Us", href: "/about", icon: "📚" },
    { name: "Contact", href: "/contact", icon: "📞" },
    // In Header.tsx, add to navigation
    { name: "Kids Zone", href: "/kids-zone", icon: "🎮" },
    { name: "Results", href: "/login", icon: "⭐" },

  ];

  // sync role
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const AuthActions = ({ mobile = false }) => {
    if (role) {
      return (
        <div
          className={`flex gap-3 ${mobile ? "flex-col items-start mt-auto" : "items-center"
            }`}
        >
          <span className="text-sm bg-gradient-to-r from-yellow-400 to-amber-400 text-white px-3 py-1 rounded-full">
            {role} 🌟
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 hover:underline flex items-center gap-1"
          >
            <span>Logout</span>
            <Smile className="w-4 h-4" />
          </button>
        </div>
      );
    }

    return (
      <Link
        to="/login"
        onClick={() => setMobileMenuOpen(false)}
        className={mobile ? "mt-auto w-full" : ""}
      >
        <Button className={`bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold shadow-lg shadow-yellow-500/30 transform hover:scale-105 transition-all duration-300 ${mobile ? "w-full" : ""}`}>
          <Sparkles className="w-4 h-4 mr-2" />
          Login
          <Star className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    );
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-50 via-white to-amber-50 backdrop-blur-sm border-b-2 border-yellow-200">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Star className="absolute top-2 left-1/4 w-4 h-4 text-yellow-300 animate-ping" />
          <Star className="absolute bottom-2 right-1/3 w-3 h-3 text-amber-300 animate-ping delay-300" />
          <Sun className="absolute top-1 right-10 w-5 h-5 text-orange-300 animate-spin-slow opacity-30" />
          <Moon className="absolute bottom-1 left-20 w-4 h-4 text-emerald-300 float-animation" />
        </div>

        <nav className="container mx-auto px-4">
          <div className="flex h-16 md:h-20 items-center justify-between relative">
            {/* Logo with animation */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src="/logo-watermark.png"
                  alt="logo"
                  className="w-12 h-12 rounded-full border-2 border-yellow-400 group-hover:border-yellow-500 transition-all duration-300 group-hover:scale-110"
                />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <div className="font-bold text-xl bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  BUSY BRAIN
                </div>
                <div className="text-xs text-gray-500 hidden sm:flex items-center gap-1">
                  <Smile className="w-3 h-3 text-yellow-500" />
                  <span>Critical Thinking for Kids</span>
                  <Star className="w-3 h-3 text-amber-500" />
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-yellow-600 transition-colors relative"
                >
                  <span className="text-lg group-hover:animate-bounce">{item.icon}</span>
                  <span>{item.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-yellow-400 to-amber-400 transition-all duration-300"></span>
                </Link>
              ))}
              <AuthActions />
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden relative w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors flex items-center justify-center"
              onClick={() => setMobileMenuOpen((p) => !p)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-yellow-600" />
              ) : (
                <Menu className="w-5 h-5 text-yellow-600" />
              )}
            </button>
          </div>
        </nav>

        {/* Bottom decorative strip */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"></div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-gradient-to-b from-yellow-50 to-white flex flex-col px-6 py-8">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-yellow-300 opacity-30"
                size={20}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 relative">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-yellow-400 transition-all duration-300"
              >
                <span className="text-2xl group-hover:animate-bounce">{item.icon}</span>
                <span className="font-medium text-gray-700">{item.name}</span>
                <Star className="w-4 h-4 text-yellow-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Auth at bottom */}
          <AuthActions mobile />
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Header;