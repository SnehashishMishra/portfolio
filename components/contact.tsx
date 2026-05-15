"use client";

import type React from "react";
import { useState } from "react";
import emailjs from "emailjs-com";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

import { useTheme } from "@/components/theme-provider";

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { theme } = useTheme();

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
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

  return (
    <section id="contact" className="relative px-4 py-10 pt-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold sm:text-5xl">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <div className="mb-4 flex justify-center">
              <div className="from-primary to-secondary h-1 w-20 rounded-full bg-linear-to-r"></div>
            </div>
            <p className="text-muted-foreground text-lg">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to collaborate.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card border-border mb-8 rounded-lg border p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background/80 border-border focus:border-primary focus:ring-primary/50 w-full rounded-lg border px-4 py-2 transition-colors focus:ring-1 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-foreground mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background/80 border-border focus:border-primary focus:ring-primary/50 w-full rounded-lg border px-4 py-2 transition-colors focus:ring-1 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background/80 border-border focus:border-primary focus:ring-primary/50 w-full rounded-lg border px-4 py-2 transition-colors focus:ring-1 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-foreground mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-background/80 border-border focus:border-primary focus:ring-primary/50 w-full resize-none rounded-lg border px-4 py-2 transition-colors focus:ring-1 focus:outline-none"
                />
              </div>

              {/* ✅ Success message */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm font-medium text-green-500"
                >
                  🎉 Message sent successfully!
                </motion.div>
              )}

              {/* ❌ Error message */}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm font-medium text-red-500"
                >
                  ❌ Error sending message. Please try again.
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{
                  scale: 1.01,
                  boxShadow:
                    theme === "dark"
                      ? "0 10px 20px rgba(6, 182, 212, 0.3)"
                      : "0 10px 20px rgba(255, 157, 0, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="from-primary to-secondary text-primary-foreground w-full cursor-pointer rounded-lg bg-linear-to-r px-6 py-3 font-semibold transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
