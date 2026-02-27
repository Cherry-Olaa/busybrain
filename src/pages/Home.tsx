// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   GraduationCap,
//   Users,
//   BookOpen,
//   Award,
//   TrendingUp,
//   Target,
// } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// const Home = () => {
//   const features = [
//     {
//       icon: GraduationCap,
//       title: "Quality Education",
//       description:
//         "Comprehensive curriculum designed to foster critical thinking and academic excellence.",
//     },
//     {
//       icon: Users,
//       title: "Expert Faculty",
//       description:
//         "Dedicated and experienced teachers committed to student success and growth.",
//     },
//     {
//       icon: BookOpen,
//       title: "Modern Learning",
//       description:
//         "State-of-the-art facilities and innovative teaching methodologies.",
//     },
//     {
//       icon: Award,
//       title: "Excellence",
//       description:
//         "Track record of outstanding academic achievements and student performance.",
//     },
//   ];

//   const stats = [
//     { icon: Users, value: "500+", label: "Students" },
//     { icon: GraduationCap, value: "50+", label: "Teachers" },
//     { icon: BookOpen, value: "30+", label: "Subjects" },
//     { icon: Award, value: "15+", label: "Years" },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />

//       {/* Hero Section */}
//       <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background px-4 pt-28 pb-20 md:pt-36">
//         {/* Logo Watermark */}
//         <img
//           src="/logo-watermark.png"
//           alt="Busy Brain Schools watermark"
//           aria-hidden="true"
//           className="pointer-events-none absolute left-1/2 top-1/2 w-[9000px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-10 select-none md:w-[420px] lg:w-[520px]"
//         />

//         <div
//           data-aos="fade-up" // <- content animation
//           data-aos-duration="1000"
//           data-aos-delay="200"
//           className="container relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] items-center"
//         >
//           <div className="mx-auto max-w-4xl text-center">
//             <h1 className=" text-xl font-bold leading-tight md:text-5xl lg:text-6xl">
//               Welcome to
//               <br />
//               <span className="relative inline-block text-primary">
//                 BUSY BRAIN SCHOOLS
//               </span>
//             </h1>

//             <p className="mb-4 text-base font-medium text-muted-foreground md:text-2xl">
//               Critical thinking for a brighter tomorrow
//             </p>

//             <p className="mx-auto mb-8 sm:max-w-4xl text-xs text-muted-foreground md:text-lg">
//               Empowering young minds with quality education, innovative teaching
//               methods, and a commitment to excellence. Join us in shaping the
//               leaders of tomorrow.
//             </p>

//             <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
//               <Link to="/contact">
//                 <Button
//                   size="lg"
//                   className="bg-primary shadow-lg shadow-primary/30 hover:bg-primary/90"
//                 >
//                   Apply Now
//                 </Button>
//               </Link>

//               <Link to="/results-check">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="w-full sm:w-auto"
//                 >
//                   Check Results
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="min-h-screen md:min-h-0 py-6 bg-muted/40 border-y border-border flex items-center">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div key={index} className="text-center border p-4 rounded-xl">
//                   <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 mb-3 md:mb-4">
//                     <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
//                   </div>
//                   <div className="text-2xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm md:text-base text-muted-foreground">
//                     {stat.label}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="">
//         <div className="container min-h-screen p-4 justify-center items-center flex flex-col bg-primary/10 mx-auto">
//           <div className="text-center mb-12 md:mb-16">
//             {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BBS?</h2> */}
//             <h2 className="text-xl md:text-4xl font-bold mb-4 relative inline-block">
//               Why Choose BBS?
//               <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></span>
//             </h2>

//             <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
//               Discover what makes BUSYBRAINSCHOOLS the preferred choice for
//               quality education
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <Card className="p-6 bg-background border border-border hover:border-primary/40 transition-all duration-300">
//                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
//                     <Icon className="w-6 h-6 text-primary" />
//                   </div>
//                   <h3 className="text-xl font-semibold mb-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-muted-foreground text-sm">
//                     {feature.description}
//                   </p>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section
//         data-aos="fade-down" // <- content animation
//         data-aos-duration="1000"
//         data-aos-delay="200"
        
//         className="py-20 px-4 relative overflow-hidden"
//       >
//         <div className="container mx-auto text-center">
//           <h2 className="text-xl md:text-4xl font-bold mb-4 text-primary-foreground">
//             Ready to Join Our Community?
//           </h2>
//           <p className="text-xs md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
//             Take the first step towards academic excellence. Contact us today to
//             learn more about admissions.
//           </p>
//           <Link to="/contact">
//             <Button size="lg" className=" font-semibold shadow-lg">
//               Get in Touch
//             </Button>
//           </Link>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Home;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Target,
  Star,
  Heart,
  Moon,
  Sparkles,
  Rocket,
  Smile,
  BookHeart,
  Leaf,
  Sun,
  Cloud,
  Palette,
  Camera,
  Music,
  Trophy,
  Globe,
  Calendar,
  Coffee,
  Gift,
  PartyPopper,
  Flower2,
  Pencil,
  Brush,
  Trees,
  Users2,
  Gamepad2,
  Pizza,
  Baby,
  School,
  Bus,
  Library,
  Microscope,
  Globe2,
  HandHeart,
  Medal,
  Cherry,
  IceCream,
  Candy,
 
  Drumstick,
  Apple,
  Orbit,
  RocketIcon,
  Shapes,
  Puzzle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";

const Home = () => {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stars = starsRef.current;
    if (stars) {
      const children = stars.children;
      for (let i = 0; i < children.length; i++) {
        const star = children[i] as HTMLElement;
        const delay = Math.random() * 3;
        const duration = 3 + Math.random() * 2;
        star.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      }
    }
  }, []);

  const features = [
    {
      icon: BookHeart,
      title: "Quranic Studies",
      description:
        "Learn the Holy Quran with proper Tajweed and understanding from qualified Islamic scholars.",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: Sparkles,
      title: "Academic Excellence",
      description:
        "Comprehensive curriculum designed to foster critical thinking and academic achievement.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: Heart,
      title: "Islamic Values",
      description:
        "Nurturing character with strong moral values and Islamic principles in a caring environment.",
      color: "from-rose-400 to-pink-500",
    },
    {
      icon: Rocket,
      title: "Modern Learning",
      description:
        "State-of-the-art facilities with innovative teaching methods for the digital age.",
      color: "from-amber-400 to-orange-500",
    },
  ];

  const activities = [
    { icon: Moon, label: "Islamic Studies", color: "text-emerald-400" },
    { icon: Palette, label: "Arts & Crafts", color: "text-pink-400" },
    { icon: Leaf, label: "Gardening Club", color: "text-green-400" },
    { icon: Cloud, label: "Science Lab", color: "text-sky-400" },
    { icon: Sun, label: "Sports", color: "text-yellow-400" },
    { icon: BookOpen, label: "Library", color: "text-purple-400" },
    { icon: Music, label: "Recitaion Class", color: "text-orange-400" },
    { icon: Camera, label: "Creativity", color: "text-amber-400" },
  ];

  const events = [
    { icon: Gift, title: "Eid Celebration", date: "April 2026", color: "bg-emerald-100 text-emerald-600" },
    { icon: PartyPopper, title: "Sports Day", date: "May 2026", color: "bg-blue-100 text-blue-600" },
    // { icon: Flower2, title: "Spring Festival", date: "June 2026", color: "bg-pink-100 text-pink-600" },
    { icon: Trophy, title: "Quran Competition", date: "July 2026", color: "bg-purple-100 text-purple-600" },
    // { icon: Globe, title: "Cultural Day", date: "September 2026", color: "bg-orange-100 text-orange-600" },
    // { icon: Calendar, title: "Graduation Day", date: "December 2026", color: "bg-yellow-100 text-yellow-600" },
  ];

  const testimonials = [
    {
      name: "Aisha Ahmed",
      role: "Parent of Grade 3 Student",
      text: "My daughter loves going to school every day! The teachers are so caring and the Islamic environment is exactly what we wanted.",
      icon: Heart,
      color: "text-pink-500",
    },
    {
      name: "Mohammed Ibrahim",
      role: "Grade 6 Student",
      text: "I love the science experiments and learning Quran. The teachers make everything fun!",
      icon: Smile,
      color: "text-yellow-500",
    },
    {
      name: "Fatima Hassan",
      role: "Parent of Grade 1 Student",
      text: "The progress my son has made in Quran recitation is amazing. Such a wonderful school!",
      icon: Star,
      color: "text-purple-500",
    },
  ];

  const programs = [
    {
      icon: Baby,
      title: "Early Years (Ages 3-5)",
      description: "Play-based learning with Islamic values",
      age: "Nursery & Kindergarten",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: School,
      title: "Primary School (Ages 6-11)",
      description: "Foundation in academics and Quran",
      age: "Grades 1-6",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: GraduationCap,
      title: "Secondary School (Ages 12-16)",
      description: "Academic excellence with leadership skills",
      age: "Grades 7-11",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: BookOpen,
      title: "Tahfiz Program",
      description: "Quran memorization with academic studies",
      age: "All Ages",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const facilities = [
    { icon: Library, label: "Library", color: "bg-amber-100 text-amber-600" },
    { icon: Microscope, label: "Science Labs", color: "bg-cyan-100 text-cyan-600" },
  
    { icon: Music, label: "Recitaion Room", color: "bg-orange-100 text-orange-600" },
    { icon: Brush, label: "Art Studio", color: "bg-pink-100 text-pink-600" },
    { icon: Trees, label: "Playground", color: "bg-emerald-100 text-emerald-600" },
    { icon: Coffee, label: "Cafeteria", color: "bg-yellow-100 text-yellow-600" },
    { icon: Bus, label: "School Transport", color: "bg-red-100 text-red-600" },
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Happy Students", color: "from-blue-400 to-blue-500" },
    { icon: GraduationCap, value: "50+", label: "Caring Teachers", color: "from-green-400 to-green-500" },
    { icon: BookOpen, value: "30+", label: "Fun Subjects", color: "from-purple-400 to-purple-500" },
    { icon: Award, value: "15+", label: "Years of Joy", color: "from-orange-400 to-orange-500" },
    { icon: Trophy, value: "100+", label: "Awards Won", color: "from-yellow-400 to-yellow-500" },
    { icon: Users2, value: "50+", label: "Staff Members", color: "from-pink-400 to-pink-500" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-yellow-50">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .bounce-animation {
          animation: bounce 2s ease-in-out infinite;
        }
        .spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <Header />

      {/* Floating Stars and Shapes Background */}
      <div ref={starsRef} className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-300 opacity-30"
            size={Math.random() * 20 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <Orbit
            key={`shape-${i}`}
            className="absolute text-amber-300 opacity-20 spin-slow"
            size={Math.random() * 30 + 15}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-28 pb-20 md:pt-36">
        {/* Yellow-themed Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-300 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-40 right-20 w-36 h-36 bg-orange-300 rounded-full opacity-30 blur-3xl animate-pulse delay-500"></div>
          <div className="absolute left-1/4 bottom-1/4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
        </div>

        {/* Logo Watermark */}
        <img
          src="/logo-watermark.png"
          alt="Busy Brain Schools watermark"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[600px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-20 select-none md:w-[420px] lg:w-[520px] float-animation"
        />

        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="container relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] items-center"
        >
          <div className="mx-auto max-w-4xl text-center">
            {/* Yellow-themed Hero Text */}
            <div className="inline-block px-4 py-2 bg-yellow-200 rounded-full mb-6">
              <p className="text-yellow-800 font-medium">🌟 Where Learning Meets Joy 🌟</p>
            </div>

            <h1 className="text-2xl font-bold leading-tight md:text-5xl lg:text-6xl">
              <span className="gradient-text">
                Welcome to
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  BUSY BRAIN SCHOOLS
                </span>
                <Sparkles className="absolute -top-6 -right-8 w-8 h-8 text-yellow-400 animate-ping" />
                <Sparkles className="absolute -bottom-6 -left-8 w-8 h-8 text-amber-400 animate-ping delay-300" />
              </span>
            </h1>

            <p className="mb-4 text-base font-medium text-gray-700 md:text-2xl flex items-center justify-center gap-2">
              <Moon className="w-6 h-6 text-emerald-500" />
              Critical thinking for a brighter tomorrow
              <Sun className="w-6 h-6 text-orange-500" />
            </p>

            <p className="mx-auto mb-8 max-w-2xl text-sm text-gray-600 md:text-lg bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
              Empowering young minds with quality education, Islamic values,
              and innovative teaching methods. Join us in shaping the leaders
              of tomorrow with faith and knowledge in a fun, nurturing environment.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white shadow-lg shadow-yellow-500/30 transform hover:scale-110 transition-all duration-300 group"
                >
                  <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Start Your Journey
                </Button>
              </Link>

              <Link to="/results-check">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 transform hover:scale-110 transition-all duration-300"
                >
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Check Results
                </Button>
              </Link>
            </div>

            {/* Fun Characters Row */}
            <div className="mt-12 flex justify-center gap-6">
              <Smile className="w-12 h-12 text-yellow-500 float-animation" />
              <Heart className="w-12 h-12 text-pink-500 float-animation delay-200" />
              <Star className="w-12 h-12 text-purple-500 float-animation delay-400" />
              <Cherry className="w-12 h-12 text-red-500 float-animation delay-100" />
              <Candy className="w-12 h-12 text-yellow-500 float-animation delay-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Yellow Theme */}
      <section className="py-12 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center bg-white/20 backdrop-blur-lg rounded-2xl p-4 transform hover:scale-110 transition-all duration-300 border-2 border-white/30 group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/30 mb-3 group-hover:rotate-12 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/90 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Our Learning Programs
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect program for your child's age and interests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card
                  key={index}
                  className="group p-6 bg-white border-2 border-transparent hover:border-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${program.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {program.title}
                  </h3>
                  <p className="text-sm text-yellow-600 font-medium mb-2">
                    {program.age}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {program.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              Our Wonderful Facilities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything your child needs for a happy learning experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${facility.color} mb-2 group-hover:scale-110 transition-all duration-300 group-hover:rotate-6 cursor-pointer`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">{facility.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fun Activities Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fun Activities We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learning is fun at BUSY BRAIN SCHOOLS! Check out our exciting activities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-yellow-400"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white to-${activity.color}/20 mb-3 group-hover:animate-bounce`}>
                    <Icon className={`w-8 h-8 ${activity.color}`} />
                  </div>
                  <p className="font-medium text-gray-700">{activity.label}</p>
                </div>
              );
            })}
          </div>

          {/* Extra Fun Row */}
          {/* <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[Gamepad2, Pizza, Apple, IceCream, Balloon, Drumstick, Shapes, Puzzle].map((Icon, i) => (
              <div key={i} className="p-3 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors cursor-pointer">
                <Icon className="w-5 h-5 text-yellow-600" />
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Upcoming Fun Events
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mark your calendars for these exciting events!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => {
              const Icon = event.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-gradient-to-br from-white to-yellow-50 border-2 border-yellow-100 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${event.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{event.title}</h3>
                      <p className="text-yellow-600 font-medium">{event.date}</p>
                      <p className="text-sm text-gray-500 mt-2">Join us for this special celebration!</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-yellow-100 to-amber-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              What People Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our happy students and parents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
              const Icon = testimonial.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-white border-2 border-transparent hover:border-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100`}>
                      <Icon className={`w-5 h-5 ${testimonial.color}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Why Kids Love BBS?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes learning exciting and meaningful at our school
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group p-6 bg-white border-2 border-transparent hover:border-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              A Day at BBS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Peek into the fun and learning at our school
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-yellow-200 to-amber-200 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4 text-center">
                  <div className="text-yellow-600 font-bold">Fun Moment {i + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-amber-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Stay Updated!
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for fun updates, event news, and learning tips!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border-2 border-white bg-white/20 text-white placeholder-white/70 focus:outline-none focus:border-yellow-300"
            />
            <Button className="bg-white text-yellow-600 hover:bg-yellow-50 font-bold rounded-full px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-white animate-ping"
              size={30}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Ready for an Adventure?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our joyful community and start your learning journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-yellow-100 font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 group"
              >
                <Sparkles className="w-6 h-6 mr-2 group-hover:animate-spin" />
                Enroll Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-white hover:bg-white/20 font-bold text-lg px-8 py-6 rounded-full transform hover:scale-110 transition-all duration-300"
              >
                <School className="w-6 h-6 mr-2" />
                Take a Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;