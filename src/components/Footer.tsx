// import { Link } from 'react-router-dom';
// import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-card border-t border-border mt-auto">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* School Info */}
//           <div className='space-y-2'>
//             <h3 className="text-lg font-semibold ">BBS</h3>
//             <p className="text-sm text-muted-foreground ">
//               Critical thinking for a brighter tomorrow
//             </p>
//             <div className="flex gap-4">
//               <a
//                 href="https://www.facebook.com/share/1BbPGP8rvM"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-muted-foreground hover:text-primary transition-colors"
//               >
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a
//                 href="https://twitter.com/busybrainschools"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-muted-foreground hover:text-primary transition-colors"
//               >
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a
//                 href="https://instagram.com/busybrainschools"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-muted-foreground hover:text-primary transition-colors"
//               >
//                 <Instagram className="w-5 h-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                   Contact
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                   Portal Login
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-2 text-sm text-muted-foreground">
//                 <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                 <span>79, Beside Total Comfort Filling Station, Sobi Road, Ilorin, Kwara State, Nigeria</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Phone className="w-4 h-4 flex-shrink-0" />
//                 <span>+234 810 815 5707</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Mail className="w-4 h-4 flex-shrink-0" />
//                 <span>contactbusybrain@gmail.com</span>
//               </li>
//             </ul>
//           </div>

//           {/* School Hours */}
//           <div>
//             <h3 className="text-sm font-semibold mb-4">School Hours</h3>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li>Monday - Friday</li>
//               <li className="font-medium text-xs text-foreground">8:00 AM - 3:00 PM</li>
//               <li className="mt-4">Office Hours</li>
//               <li className="font-medium text-xs text-foreground">8:00 AM - 5:00 PM</li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-border mt-8 pt-8 text-center">
//           <p className="text-sm text-muted-foreground">
//             © {new Date().getFullYear()} BUSY BRAIN SCHOOLS. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Star, 
  Sparkles,
  Sun,
  Moon,
  Smile,
  Clock,
  Calendar,
  Gift
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-amber-50 to-yellow-100 border-t-2 border-yellow-300 mt-auto overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Stars */}
        {[...Array(8)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-300 opacity-30"
            size={Math.random() * 20 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
            }}
          />
        ))}
        
        {/* Sparkles */}
        <Sparkles className="absolute top-10 left-10 w-6 h-6 text-yellow-400 animate-ping" />
        <Sparkles className="absolute bottom-10 right-10 w-6 h-6 text-amber-400 animate-ping delay-300" />
        
        {/* Islamic Motifs */}
        <Moon className="absolute top-20 right-20 w-8 h-8 text-emerald-300 opacity-30 rotate-45" />
        <Sun className="absolute bottom-20 left-20 w-10 h-10 text-orange-300 opacity-30 animate-spin-slow" />
      </div>

      {/* Top Decorative Strip */}
      <div className="h-2 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-3 bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300">
            <div className="flex items-center gap-2">
              <img 
                src="/logo-watermark.png" 
                alt="logo" 
                className="w-10 h-10 rounded-full border-2 border-yellow-400"
              />
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                BUSY BRAIN
              </h3>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Smile className="w-4 h-4 text-yellow-500" />
              Critical thinking for a brighter tomorrow
              <Star className="w-4 h-4 text-amber-500" />
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.facebook.com/share/1BbPGP8rvM"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 hover:scale-110 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/busybrainschools"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-sky-100 text-sky-500 rounded-full hover:bg-sky-200 hover:scale-110 transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/busybrainschools"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 hover:scale-110 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contactbusybrain@gmail.com"
                className="p-2 bg-red-100 text-red-500 rounded-full hover:bg-red-200 hover:scale-110 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                <Gift className="w-3 h-3 text-yellow-500" />
                Get fun updates!
              </p>
              <div className="flex gap-1">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-2 py-1 text-xs rounded-l-full border-2 border-yellow-300 bg-white/80 focus:outline-none focus:border-yellow-500"
                />
                <button className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs rounded-r-full hover:scale-105 transition-transform">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home", icon: "🏠" },
                { to: "/about", label: "About Us", icon: "📚" },
                { to: "/contact", label: "Contact", icon: "📞" },
                { to: "/login", label: "Portal Login", icon: "🔑" },
                { to: "/login", label: "Check Results", icon: "⭐" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-gray-600 hover:text-yellow-600 transition-colors"
                  >
                    <span className="text-lg group-hover:animate-bounce">{link.icon}</span>
                    <span>{link.label}</span>
                    <Sparkles className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Phone className="w-5 h-5 text-yellow-500" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span>79, Beside Total Comfort Filling Station, Sobi Road, Ilorin, Kwara State</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>+234 810 815 5707</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                <span>contactbusybrain@gmail.com</span>
              </li>
            </ul>

            {/* Quick Contact */}
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform"
            >
              <Mail className="w-4 h-4" />
              Send us a message
            </Link>
          </div>

          {/* School Hours */}
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300">
            <h3 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              School Hours
            </h3>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Sun className="w-4 h-4 text-orange-500" />
                  School Day
                </p>
                <p className="text-xs text-gray-500">Monday - Friday</p>
                <p className="text-base font-bold text-yellow-600">8:00 AM - 3:00 PM</p>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Office Hours
                </p>
                <p className="text-xs text-gray-500">Monday - Friday</p>
                <p className="text-base font-bold text-amber-600">8:00 AM - 5:00 PM</p>
              </div>

              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-2">
                <Heart className="w-3 h-3 text-pink-400" />
                <span>Closed on Public Holidays</span>
                <Heart className="w-3 h-3 text-pink-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-12">
          {/* Decorative Divider */}
          <div className="absolute inset-x-0 top-0 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-yellow-200 p-6 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                © {new Date().getFullYear()} BUSY BRAIN SCHOOLS. All rights reserved.
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </p>
              
              <div className="flex items-center gap-4">
                <Link to="/privacy" className="text-xs text-gray-500 hover:text-yellow-600 transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-yellow-300">|</span>
                <Link to="/terms" className="text-xs text-gray-500 hover:text-yellow-600 transition-colors">
                  Terms of Use
                </Link>
                <span className="text-yellow-300">|</span>
                <Link to="/sitemap" className="text-xs text-gray-500 hover:text-yellow-600 transition-colors">
                  Sitemap
                </Link>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
                <span>for kids</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;