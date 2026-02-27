// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { Card } from '@/components/ui/card';
// import { Target, Eye, Heart, Award } from 'lucide-react';

// const About = () => {
//   const values = [
//     {
//       icon: Target,
//       title: 'Excellence',
//       description: 'We strive for excellence in everything we do, from teaching to student support.',
//     },
//     {
//       icon: Heart,
//       title: 'Integrity',
//       description: 'We uphold the highest standards of honesty, ethics, and moral principles.',
//     },
//     {
//       icon: Award,
//       title: 'Innovation',
//       description: 'We embrace innovative teaching methods and modern educational technologies.',
//     },
//     {
//       icon: Eye,
//       title: 'Vision',
//       description: 'We envision a future where every student reaches their full potential.',
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
      
//       <main className="flex-1 ">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-br from-background to-muted">
//           <div className="containerh min-h-screen  justify-center items-center h-full flex flex-col mx-auto">
//             <div className=" mx-auto text-center">
//               <h1 className="text-xl md:text-5xl font-bold mb-6">About Us</h1>
//               <p className="text-sm md:text-xl w-60 md:w-auto text-muted-foreground">
//                 Learn more about BUSY BRAIN SCHOOLS and our commitment to educational excellence
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Mission Section */}
//         <section className="">
//           <div className="p-4 mx-auto">
//             <div className="grid md:grid-cols-2 gap-8 md:gap-12">
//               <Card className="p-4 bg-card border-border">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
//                     <Target className="w-6 h-6 text-primary" />
//                   </div>
//                   <h2 className="text-xl md:text-3xl font-bold">Our Mission</h2>
//                 </div>
//                 <p className="text-muted-foreground text-xs leading-relaxed">
//                 To provide a holistic education that blends qur’anic teachings and Prophetic traditions with Nigerian a global standards Fostering digital literacy, innovation, moral guidance and critical reflection we empower each child to discover their potential uphold integrity and contribute positively to society
//                 </p>
//               </Card>

//               <Card className="p-4 bg-card border-border">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
//                     <Eye className="w-6 h-6 text-secondary" />
//                   </div>
//                   <h2 className="text-xl md:text-3xl font-bold">Our Vision</h2>
//                 </div>
//                 <p className="text-muted-foreground text-xs leading-relaxed">
//                 To be model school that nurtures future-ready students. Enriched with the knowledge of life and its purpose through the Quran the traditions of the prophet (SAW). And guided critical thinking Raising individual who excel academically. Live by strong values and thrive in a fast-changing world
//                 </p>
//               </Card>
//             </div>
//           </div>
//         </section>

//         {/* History Section */}
//         <section className=" p-4 bg-muted/50">
//           <div className="container mx-auto">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-xl md:text-4xl font-bold mb-6 text-center">Our History</h2>
//               <div className="prose prose-lg max-w-none text-muted-foreground">
//                 <p className="mb-4 leading-relaxed text-xs">
//                   BUSY BRAIN SCHOOLS was founded over 15 years ago with a simple yet powerful vision: 
//                   to create an educational institution that nurtures critical thinking and academic excellence. 
//                   What began as a small school with a handful of dedicated teachers and enthusiastic students 
//                   has grown into one of the region's most respected educational institutions.
//                 </p>
//                 <p className="mb-4 leading-relaxed text-xs">
//                   Throughout our journey, we have remained committed to our core values of excellence, integrity, 
//                   and innovation. Our faculty comprises highly qualified and experienced educators who are passionate 
//                   about teaching and dedicated to student success. We continuously invest in modern facilities, 
//                   educational technology, and professional development to ensure our students receive the best possible education.
//                 </p>
//                 <p className="leading-relaxed text-xs">
//                   Today, BUSY BRAIN SCHOOLS serves over 500 students across various grade levels, with a team of 
//                   more than 50 dedicated staff members. Our alumni have gone on to excel in various fields, 
//                   making significant contributions to society and carrying forward the values instilled during 
//                   their time at BBS.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className=" p-4">
//           <div className=" mx-auto">
//             <div className="text-center mb-12">
//               <h2 className="text-xl md:text-4xl font-bold mb-4">Our Core Values</h2>
//               <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
//                 The principles that guide everything we do at BUSY BRAIN SCHOOLS
//               </p>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {values.map((value, index) => {
//                 const Icon = value.icon;
//                 return (
//                   <Card key={index} className="p-4 text-center hover:shadow-lg transition-all duration-300 bg-card border-border">
//                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
//                       <Icon className="w-8 h-8 text-primary" />
//                     </div>
//                     <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
//                     <p className="text-muted-foreground text-sm">{value.description}</p>
//                   </Card>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* Motto Section */}
//         <section className="p-5 bg-primary/15">
//           <div className=" mx-auto text-center">
//             <h2 className="text-xl md:text-4xl font-bold mb-4 text-primary-foreground">
//               "Critical thinking for a brighter tomorrow"
//             </h2>
//             <p className="text-sm text-primary-foreground/90 max-w-2xl mx-auto">
//               This is not just our motto—it's our commitment to every student who walks through our doors.
//             </p>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default About;


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  Star, 
  Sparkles, 
  BookOpen, 
  Users, 
  GraduationCap,
  Moon,
  Sun,
  Smile,
  Rocket,
  Trophy,
  ScrollText,
  Compass,
  Lightbulb,
  Flower2,
  Gem,
  Shield
} from 'lucide-react';
import { useEffect, useRef } from 'react';

const About = () => {
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

  const values = [
    {
      icon: Gem,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from teaching to student support.',
      color: 'from-yellow-400 to-amber-500',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty, ethics, and moral principles.',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace innovative teaching methods and modern educational technologies.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Compass,
      title: 'Vision',
      description: 'We envision a future where every student reaches their full potential.',
      color: 'from-blue-400 to-indigo-500',
    },
  ];

  const milestones = [
    { year: '2009', event: 'School Founded', icon: ScrollText, color: 'bg-amber-100 text-amber-600' },
    { year: '2015', event: 'First Graduating Class', icon: GraduationCap, color: 'bg-emerald-100 text-emerald-600' },
    { year: '2020', event: 'Digital Learning Initiative', icon: Rocket, color: 'bg-purple-100 text-purple-600' },
    { year: '2024', event: '500+ Students Enrolled', icon: Trophy, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const team = [
    { name: 'Dr. Amina Yusuf', role: 'Principal', icon: Star, color: 'text-yellow-500' },
    { name: 'Prof. Ahmed Hassan', role: 'Head of Academics', icon: Award, color: 'text-blue-500' },
    { name: 'Sr. Fatima Mohammed', role: 'Islamic Studies Coordinator', icon: Moon, color: 'text-emerald-500' },
    { name: 'Mr. Ibrahim Suleiman', role: 'ICT Director', icon: Lightbulb, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 via-white to-yellow-50">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .bounce-animation {
          animation: bounce 2s ease-in-out infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <Header />

      {/* Floating Stars Background */}
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
      </div>

      <main className="flex-1 relative">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 pt-24">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-300 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-orange-300 rounded-full opacity-30 blur-2xl animate-pulse delay-500"></div>
            
            {/* Floating Islamic Symbols */}
            <Moon className="absolute top-20 left-20 w-12 h-12 text-emerald-400 opacity-20 spin-slow" />
            <Sun className="absolute bottom-20 right-20 w-16 h-16 text-orange-400 opacity-20 spin-slow" />
            
            {/* Floating Stars */}
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="absolute text-yellow-400 opacity-30"
                size={30}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              {/* Welcome Badge */}
              <div className="inline-block px-4 py-2 bg-yellow-200 rounded-full mb-6">
                <p className="text-yellow-800 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Get to Know Us
                  <Sparkles className="w-4 h-4" />
                </p>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">About</span>
                <br />
                <span className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  BUSY BRAIN SCHOOLS
                </span>
              </h1>
              
              <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
                Learn more about our journey, values, and commitment to nurturing young minds with Islamic values and academic excellence.
              </p>

              {/* Fun Character Row */}
              <div className="mt-8 flex justify-center gap-4">
                <Smile className="w-8 h-8 text-yellow-500 float-animation" />
                <Heart className="w-8 h-8 text-pink-500 float-animation delay-200" />
                <Star className="w-8 h-8 text-purple-500 float-animation delay-400" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Mission Card */}
              <Card className="group p-6 bg-white border-2 border-transparent hover:border-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To provide a holistic education that blends Qur'anic teachings and Prophetic traditions with Nigerian and global standards. Fostering digital literacy, innovation, moral guidance, and critical reflection, we empower each child to discover their potential, uphold integrity, and contribute positively to society.
                </p>
                <div className="mt-4 flex justify-end">
                  <Moon className="w-5 h-5 text-emerald-500 opacity-50" />
                </div>
              </Card>

              {/* Vision Card */}
              <Card className="group p-6 bg-white border-2 border-transparent hover:border-amber-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  To be a model school that nurtures future-ready students, enriched with the knowledge of life and its purpose through the Quran and the traditions of the Prophet (SAW). Guided by critical thinking, we raise individuals who excel academically, live by strong values, and thrive in a fast-changing world.
                </p>
                <div className="mt-4 flex justify-end">
                  <Sun className="w-5 h-5 text-orange-500 opacity-50" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="py-16 px-4 bg-gradient-to-b from-yellow-50 to-amber-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Our Journey
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Celebrating 15+ years of excellence in education
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                return (
                  <Card
                    key={index}
                    className="p-4 bg-white border-2 border-yellow-100 hover:border-yellow-400 rounded-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${milestone.color} group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-800">{milestone.year}</div>
                        <div className="text-xs text-gray-600">{milestone.event}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 gradient-text">Our Story</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto"></div>
              </div>
              
              <Card className="p-8 bg-white border-2 border-yellow-100 rounded-2xl shadow-lg">
                <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                  <p className="leading-relaxed text-sm">
                    BUSY BRAIN SCHOOLS was founded over 15 years ago with a simple yet powerful vision: 
                    to create an educational institution that nurtures critical thinking and academic excellence 
                    while preserving Islamic values and traditions. What began as a small school with a handful 
                    of dedicated teachers and enthusiastic students has grown into one of the region's most 
                    respected educational institutions.
                  </p>
                  <p className="leading-relaxed text-sm">
                    Throughout our journey, we have remained committed to our core values of excellence, integrity, 
                    and innovation. Our faculty comprises highly qualified and experienced educators who are passionate 
                    about teaching and dedicated to student success. We continuously invest in modern facilities, 
                    educational technology, and professional development to ensure our students receive the best 
                    possible education.
                  </p>
                  <p className="leading-relaxed text-sm">
                    Today, BUSY BRAIN SCHOOLS serves over 500 students across various grade levels, with a team of 
                    more than 50 dedicated staff members. Our alumni have gone on to excel in various fields, 
                    making significant contributions to society and carrying forward the values instilled during 
                    their time at BBS.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-amber-50 to-yellow-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Our Core Values
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The principles that guide everything we do at BUSY BRAIN SCHOOLS
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="group p-6 bg-white border-2 border-transparent hover:border-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Our Leadership
                </span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dedicated educators guiding our students toward success
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => {
                const Icon = member.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 bg-white border-2 border-yellow-100 hover:border-yellow-400 rounded-xl transition-all duration-300 text-center group"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className={`w-8 h-8 ${member.color}`} />
                    </div>
                    <h3 className="font-bold text-gray-800">{member.name}</h3>
                    <p className="text-xs text-yellow-600 mt-1">{member.role}</p>
                    <div className="mt-3 flex justify-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-sm opacity-90">Years</div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm opacity-90">Students</div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-1">50+</div>
                <div className="text-sm opacity-90">Teachers</div>
              </div>
              <div className="text-center text-white">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-90">Pass Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Motto Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <Card className="p-8 bg-gradient-to-br from-yellow-100 to-amber-100 border-2 border-yellow-300 max-w-4xl mx-auto">
              <Sparkles className="w-10 h-10 text-yellow-500 mx-auto mb-4 animate-ping" />
              <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800">
                "Critical thinking for a brighter tomorrow"
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                This is not just our motto—it's our commitment to every student who walks through our doors.
              </p>
              <div className="mt-6 flex justify-center gap-2">
                <Moon className="w-5 h-5 text-emerald-500" />
                <Sun className="w-5 h-5 text-orange-500" />
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;