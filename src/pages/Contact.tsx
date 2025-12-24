import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "12 Unity Avenue, Lagos, Nigeria",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+234 801 234 5678",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contactbusybrain@gmail.com",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/share/1BbPGP8rvM",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/busybrainschools",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/busybrainschools",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background to-muted">
          
          <div className="min-h-screen flex justify-center items-center mx-auto">
            <div className="max-w-3xl space-y-2 mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold">
                Get in Touch
              </h1>
              <p className="text-sm px-4 text-center md:text-xl text-muted-foreground">
                Have questions? We'd love to hear from you. Send us a message
                and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="">
          <div className="p-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 text-center bg-card border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {info.content}
                    </p>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form and Map */}
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-4 lg:flex-row">
              {/* Contact Form */}
              <Card data-aos="fade-left" className="w-full p-4 bg-card border-border lg:w-1/3">
                <h2 className="mb-6 text-xl font-bold">Send us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 placeholder:text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 placeholder:text-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="mt-1 placeholder:text-sm"
                      placeholder="Write your message here..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>

              {/* Right Column */}
              <div className="flex w-full flex-col gap-6 lg:w-1/3">
                {/* Office Hours */}
                <Card data-aos="fade-up" className="p-4 bg-card border-border">
                  <h2 className="mb-4 text-base font-bold">Office Hours</h2>

                  <div className="space-y-3 text-muted-foreground">
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        School Hours
                      </p>
                      <p className="text-xs">
                        Monday – Friday: 8:00 AM – 3:00 PM
                      </p>
                    </div>

                    <div>
                      <p className="font-medium text-sm text-foreground">
                        Office Hours
                      </p>
                      <p className="text-xs">
                        Monday – Friday: 8:00 AM – 5:00 PM
                      </p>
                    </div>

                    <div>
                      <p className="font-medium text-foreground">Weekend</p>
                      <p className="text-xs">Saturday: By Appointment Only</p>
                      <p className="text-xs">Sunday: Closed</p>
                    </div>
                  </div>
                </Card>

                {/* Social Links */}
                <Card data-aos="fade-down"  className="p-4 bg-card border-border">
                  <h2 className="mb-4 text-base font-bold">Follow Us</h2>

                  <p className="mb-4 text-sm text-muted-foreground">
                    Stay connected with us on social media for updates and news.
                  </p>

                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;

                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
