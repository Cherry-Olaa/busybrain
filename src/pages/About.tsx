import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Target, Eye, Heart, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from teaching to student support.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty, ethics, and moral principles.',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We embrace innovative teaching methods and modern educational technologies.',
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'We envision a future where every student reaches their full potential.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-background to-muted">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Learn more about BUSY BRAIN SCHOOLS and our commitment to educational excellence
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <Card className="p-8 bg-card border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                To provide a holistic education that blends qur’anic teachings and Prophetic traditions with Nigerian a global standards Fostering digital literacy, innovation, moral guidance and critical reflection we empower each child to discover their potential uphold integrity and contribute positively to society
                </p>
              </Card>

              <Card className="p-8 bg-card border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                To be model school that nurtures future-ready students. Enriched with the knowledge of life and its purpose through the Quran the traditions of the prophet (SAW). And guided critical thinking Raising individual who excel academically. Live by strong values and thrive in a fast-changing world
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-12 md:py-16 px-4 bg-muted/50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our History</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4 leading-relaxed">
                  BUSY BRAIN SCHOOLS was founded over 15 years ago with a simple yet powerful vision: 
                  to create an educational institution that nurtures critical thinking and academic excellence. 
                  What began as a small school with a handful of dedicated teachers and enthusiastic students 
                  has grown into one of the region's most respected educational institutions.
                </p>
                <p className="mb-4 leading-relaxed">
                  Throughout our journey, we have remained committed to our core values of excellence, integrity, 
                  and innovation. Our faculty comprises highly qualified and experienced educators who are passionate 
                  about teaching and dedicated to student success. We continuously invest in modern facilities, 
                  educational technology, and professional development to ensure our students receive the best possible education.
                </p>
                <p className="leading-relaxed">
                  Today, BUSY BRAIN SCHOOLS serves over 500 students across various grade levels, with a team of 
                  more than 50 dedicated staff members. Our alumni have gone on to excel in various fields, 
                  making significant contributions to society and carrying forward the values instilled during 
                  their time at BBS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at BUSY BRAIN SCHOOLS
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 bg-card border-border">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Motto Section */}
        <section className="py-16 md:py-20 px-4 bg-primary/20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
              "Critical thinking for a brighter tomorrow"
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              This is not just our motto—it's our commitment to every student who walks through our doors.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
