"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Linkedin, Github } from "lucide-react";
import emailjs from "emailjs-com";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:snehashishmishra38@gmail.com",
      color: "hover:text-primary",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/snehashish-mishra",
      color: "hover:text-primary",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/SnehashishMishra",
      color: "hover:text-primary",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-1 bg-linear-to-r from-primary to-secondary rounded-full"></div>
            </div>
            <p className="text-lg text-muted-foreground">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to collaborate.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-8 rounded-lg bg-card border border-border mb-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
                ></textarea>
              </div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-medium"
                >
                  🎉 Message sent successfully!
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium"
                >
                  ❌ Error sending message. Please try again.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{
                  scale: 1.01,
                  boxShadow: "0 10px 20px rgba(6, 182, 212, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  link.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full bg-card border border-border transition-colors hover:border-primary ${link.color} cursor-pointer`}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import type React from "react";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { Mail, Linkedin, Github } from "lucide-react";

// export default function Contact() {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<
//     "idle" | "success" | "error"
//   >("idle");

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus("idle");

//     try {
//       const mailtoLink = `mailto:snehashishmishra18@gmail.com?subject=${encodeURIComponent(
//         formData.subject
//       )}&body=${encodeURIComponent(
//         `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
//       )}`;
//       window.location.href = mailtoLink;

//       setFormData({ name: "", email: "", subject: "", message: "" });
//       setSubmitStatus("success");
//       setTimeout(() => setSubmitStatus("idle"), 3000);
//     } catch (error) {
//       setSubmitStatus("error");
//       setTimeout(() => setSubmitStatus("idle"), 3000);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const socialLinks = [
//     {
//       icon: Mail,
//       label: "Email",
//       href: "mailto:snehashishmishra18@gmail.com",
//       color: "hover:text-primary",
//     },
//     {
//       icon: Linkedin,
//       label: "LinkedIn",
//       href: "https://linkedin.com/in/snehashish-mishra",
//       color: "hover:text-primary",
//     },
//     {
//       icon: Github,
//       label: "GitHub",
//       href: "https://github.com/SnehashishMishra",
//       color: "hover:text-primary",
//     },
//   ];

//   return (
//     <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         <motion.div
//           ref={ref}
//           variants={containerVariants}
//           initial="hidden"
//           animate={inView ? "visible" : "hidden"}
//         >
//           <motion.div variants={itemVariants} className="text-center mb-12">
//             <h2 className="text-4xl sm:text-5xl font-bold mb-4">
//               Let's <span className="text-primary">Connect</span>
//             </h2>
//             <div className="flex justify-center mb-4">
//               <div className="w-20 h-1 bg-linear-to-r from-primary to-secondary rounded-full"></div>
//             </div>
//             <p className="text-lg text-muted-foreground">
//               I'm always open to discussing new projects, creative ideas, or
//               opportunities to be part of your vision.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="p-8 rounded-lg bg-card border border-border mb-8"
//           >
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Your name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-foreground mb-2">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="your.email@example.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   name="subject"
//                   placeholder="What's this about?"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-foreground mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   name="message"
//                   rows={5}
//                   placeholder="Your message..."
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
//                 ></textarea>
//               </div>

//               {submitStatus === "success" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-medium"
//                 >
//                   Message sent successfully!
//                 </motion.div>
//               )}

//               {submitStatus === "error" && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium"
//                 >
//                   Error sending message. Please try again.
//                 </motion.div>
//               )}

//               <motion.button
//                 type="submit"
//                 disabled={isSubmitting}
//                 whileHover={{
//                   scale: 1.02,
//                   boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)",
//                 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full px-6 py-3 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//               >
//                 {isSubmitting ? "Sending..." : "Send Message"}
//               </motion.button>
//             </form>
//           </motion.div>

//           <motion.div
//             variants={itemVariants}
//             className="flex justify-center gap-8"
//           >
//             {socialLinks.map((link, index) => (
//               <motion.a
//                 key={index}
//                 href={link.href}
//                 target={link.href.startsWith("mailto:") ? undefined : "_blank"}
//                 rel={
//                   link.href.startsWith("mailto:")
//                     ? undefined
//                     : "noopener noreferrer"
//                 }
//                 whileHover={{ scale: 1.2, rotate: 360 }}
//                 whileTap={{ scale: 0.9 }}
//                 className={`p-3 rounded-full bg-card border border-border transition-colors hover:border-primary ${link.color} cursor-pointer`}
//               >
//                 <link.icon className="w-6 h-6" />
//               </motion.a>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
