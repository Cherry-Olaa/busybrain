// import { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Twitter,
//   Instagram,
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const Contact = () => {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitting(true);

//     // Simulate form submission
//     setTimeout(() => {
//       toast({
//         title: "Message Sent!",
//         description: "Thank you for contacting us. We'll get back to you soon.",
//       });
//       setFormData({ name: "", email: "", message: "" });
//       setSubmitting(false);
//     }, 1000);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const contactInfo = [
//     {
//       icon: MapPin,
//       title: "Address",
//       content: "79, Beside Total Comfort Filling Station, Sobi Road, Ilorin, Kwara State, Nigeria",
//     },
//     {
//       icon: Phone,
//       title: "Phone",
//       content: "+234 810 815 5707",
//     },
//     {
//       icon: Mail,
//       title: "Email",
//       content: "contactbusybrain@gmail.com",
//     },
//   ];

//   const socialLinks = [
//     {
//       icon: Facebook,
//       name: "Facebook",
//       url: "https://www.facebook.com/share/1BbPGP8rvM",
//     },
//     {
//       icon: Twitter,
//       name: "Twitter",
//       url: "https://twitter.com/busybrainschools",
//     },
//     {
//       icon: Instagram,
//       name: "Instagram",
//       url: "https://instagram.com/busybrainschools",
//     },
//   ];

//   return (
//     <div className="min-h-screen w-full flex flex-col">
//       <Header />

//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-br from-background to-muted">
          
//           <div className="min-h-screen flex justify-center items-center mx-auto">
//             <div className="max-w-3xl space-y-2 mx-auto text-center">
//               <h1 className="text-4xl md:text-5xl font-bold">
//                 Get in Touch
//               </h1>
//               <p className="text-sm px-4 text-center md:text-xl text-muted-foreground">
//                 Have questions? We'd love to hear from you. Send us a message
//                 and we'll respond as soon as possible.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Contact Info Cards */}
//         <section className="">
//           <div className="p-4 mx-auto">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//               {contactInfo.map((info, index) => {
//                 const Icon = info.icon;
//                 return (
//                   <Card
//                     key={index}
//                     className="p-6 text-center bg-card border-border hover:shadow-lg transition-shadow"
//                   >
//                     <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
//                       <Icon className="w-6 h-6 text-primary" />
//                     </div>
//                     <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
//                     <p className="text-muted-foreground text-sm">
//                       {info.content}
//                     </p>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Contact Form and Map */}
//             <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-4 lg:flex-row">
//               {/* Contact Form */}
//               <Card data-aos="fade-left" className="w-full p-4 bg-card border-border lg:w-1/3">
//                 <h2 className="mb-6 text-xl font-bold">Send us a Message</h2>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div>
//                     <Label htmlFor="name">Full Name</Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       type="text"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 placeholder:text-sm"
//                       placeholder="Enter your full name"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="email">Email Address</Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="mt-1 placeholder:text-sm"
//                       placeholder="your.email@example.com"
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="message">Message</Label>
//                     <Textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={3}
//                       className="mt-1 placeholder:text-sm"
//                       placeholder="Write your message here..."
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     disabled={submitting}
//                     className="w-full bg-primary hover:bg-primary/90"
//                   >
//                     {submitting ? "Sending..." : "Send Message"}
//                   </Button>
//                 </form>
//               </Card>

//               {/* Right Column */}
//               <div className="flex w-full flex-col gap-6 lg:w-1/3">
//                 {/* Office Hours */}
//                 <Card data-aos="fade-up" className="p-4 bg-card border-border">
//                   <h2 className="mb-4 text-base font-bold">Office Hours</h2>

//                   <div className="space-y-3 text-muted-foreground">
//                     <div>
//                       <p className="font-medium text-sm text-foreground">
//                         School Hours
//                       </p>
//                       <p className="text-xs">
//                         Monday – Friday: 8:00 AM – 3:00 PM
//                       </p>
//                     </div>

//                     <div>
//                       <p className="font-medium text-sm text-foreground">
//                         Office Hours
//                       </p>
//                       <p className="text-xs">
//                         Monday – Friday: 8:00 AM – 5:00 PM
//                       </p>
//                     </div>

//                     <div>
//                       <p className="font-medium text-foreground">Weekend</p>
//                       <p className="text-xs">Saturday: By Appointment Only</p>
//                       <p className="text-xs">Sunday: Closed</p>
//                     </div>
//                   </div>
//                 </Card>

//                 {/* Social Links */}
//                 <Card data-aos="fade-down"  className="p-4 bg-card border-border">
//                   <h2 className="mb-4 text-base font-bold">Follow Us</h2>

//                   <p className="mb-4 text-sm text-muted-foreground">
//                     Stay connected with us on social media for updates and news.
//                   </p>

//                   <div className="flex gap-4">
//                     {socialLinks.map((social, index) => {
//                       const Icon = social.icon;

//                       return (
//                         <a
//                           key={index}
//                           href={social.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           aria-label={social.name}
//                           className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary hover:text-primary-foreground"
//                         >
//                           <Icon className="h-5 w-5" />
//                         </a>
//                       );
//                     })}
//                   </div>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;

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
  Send,
  Clock,
  Heart,
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
      title: "Visit Us",
      content: "79, Beside Total Comfort Filling Station, Sobi Road, Ilorin, Kwara State",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+234 810 815 5707",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "contactbusybrain@gmail.com",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "https://www.facebook.com/share/1BbPGP8rvM",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverColor: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: Twitter,
      name: "Twitter",
      url: "https://twitter.com/busybrainschools",
      bgColor: "bg-sky-100",
      iconColor: "text-sky-500",
      hoverColor: "hover:bg-sky-500 hover:text-white",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "https://instagram.com/busybrainschools",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
      hoverColor: "hover:bg-pink-600 hover:text-white",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-yellow-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-yellow-200 rounded-full mb-6">
                <p className="text-yellow-800 font-medium">
                  📬 We'd Love to Hear From You!
                </p>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="text-amber-600">Get in</span>
                <br />
                <span className="text-orange-600">Touch!</span>
              </h1>
              
              <p className="text-gray-600 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md">
                Have questions? We'd love to hear from you! Send us a message
                and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 text-center bg-white border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${info.bgColor} mb-4`}>
                      <Icon className={`w-8 h-8 ${info.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">{info.title}</h3>
                    <p className="text-gray-600 text-sm">
                      {info.content}
                    </p>
                  </Card>
                );
              })}
            </div>

            {/* Contact Form and Info */}
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <Card className="p-6 bg-white border border-gray-200">
                  <h2 className="text-xl font-bold mb-6 text-gray-800">Send us a Message</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                        placeholder="Enter your name"
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
                        className="mt-1"
                        placeholder="your@email.com"
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
                        rows={4}
                        className="mt-1"
                        placeholder="Write your message here..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </Card>

                {/* Right Column - Office Hours & Social */}
                <div className="space-y-6">
                  {/* Office Hours */}
                  <Card className="p-6 bg-white border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-amber-500" />
                      Office Hours
                    </h2>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">School Hours</span>
                        <span className="text-gray-600">Mon-Fri: 8AM - 3PM</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Office Hours</span>
                        <span className="text-gray-600">Mon-Fri: 8AM - 5PM</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Weekend</span>
                        <span className="text-gray-600">Saturday: By Appointment</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700"></span>
                        <span className="text-gray-600">Sunday: Closed</span>
                      </div>
                    </div>
                  </Card>

                  {/* Social Links */}
                  <Card className="p-6 bg-white border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Connect With Us</h2>

                    <p className="text-gray-600 mb-4">
                      Follow us on social media for updates and news.
                    </p>

                    <div className="flex gap-3">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${social.bgColor} ${social.iconColor} ${social.hoverColor} transition-colors`}
                          >
                            <Icon className="h-5 w-5" />
                          </a>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Map Placeholder */}
                  <Card className="p-6 bg-white border border-gray-200">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      Find Us
                    </h2>
                    
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">📍 Sobi Road, Ilorin</p>
                        <p className="text-xs text-gray-500 mt-1">Kwara State, Nigeria</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 px-4 bg-amber-500">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Visit Us?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Schedule a tour of our school and meet our wonderful team!
            </p>
            <Button className="bg-white text-amber-600 hover:bg-amber-50 font-semibold px-8 py-6">
              Schedule a Visit
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
