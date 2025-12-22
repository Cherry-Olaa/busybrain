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
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description:
        "Comprehensive curriculum designed to foster critical thinking and academic excellence.",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description:
        "Dedicated and experienced teachers committed to student success and growth.",
    },
    {
      icon: BookOpen,
      title: "Modern Learning",
      description:
        "State-of-the-art facilities and innovative teaching methodologies.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Track record of outstanding academic achievements and student performance.",
    },
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Students" },
    { icon: GraduationCap, value: "50+", label: "Teachers" },
    { icon: BookOpen, value: "30+", label: "Subjects" },
    { icon: Award, value: "15+", label: "Years" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background px-4 pt-28 pb-20 md:pt-36">
        {/* Logo Watermark */}
        <img
          src="/logo-watermark.png"
          alt="Busy Brain Schools watermark"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[9000px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-10 select-none md:w-[420px] lg:w-[520px]"
        />

        <div
          data-aos="fade-up" // <- content animation
          data-aos-duration="1000"
          data-aos-delay="200"
          className="container relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] items-center"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h1 className=" text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Welcome to
              <br />
              <span className="relative inline-block text-primary">
                BUSY BRAIN SCHOOLS
              </span>
            </h1>

            <p className="mb-4 text-xl font-medium text-muted-foreground md:text-2xl">
              Critical thinking for a brighter tomorrow
            </p>

            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              Empowering young minds with quality education, innovative teaching
              methods, and a commitment to excellence. Join us in shaping the
              leaders of tomorrow.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="bg-primary shadow-lg shadow-primary/30 hover:bg-primary/90"
                >
                  Apply Now
                </Button>
              </Link>

              <Link to="/results-check">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Check Results
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 md:py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center border p-4 rounded-xl">
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 mb-3 md:mb-4">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <div className="text-2xl md:text-4xl font-bold text-foreground mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container h-screen justify-center items-center flex flex-col bg-primary/10 mx-auto">
          <div className="text-center mb-12 md:mb-16">
            {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BBS?</h2> */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Why Choose BBS?
              <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover what makes BUSYBRAINSCHOOLS the preferred choice for
              quality education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card className="p-6 bg-background border border-border hover:border-primary/40 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-aos="fade-down" // <- content animation
        data-aos-duration="1000"
        data-aos-delay="200"
        
        className="py-20 px-4 relative overflow-hidden"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Join Our Community?
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards academic excellence. Contact us today to
            learn more about admissions.
          </p>
          <Link to="/contact">
            <Button size="lg" className=" font-semibold shadow-lg">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
