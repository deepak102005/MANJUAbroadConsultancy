"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Clock, Send, User, MessageSquare, Loader2, CheckCircle, Smartphone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Page Hero */}
      <section className="bg-dark-gradient py-24 md:py-32 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Contact <span className="text-gold-gradient">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed font-light"
          >
            Get in touch with our visa experts today. We respond within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main Info and Form section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center border border-gray-200/60"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-sm font-bold text-primary mb-2">Phone / WhatsApp</h3>
              <a href="tel:+919666991668" className="text-sm text-secondary hover:text-accent font-semibold">
                +91 96669 91668
              </a>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center border border-gray-200/60"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-gradient/10 border border-accent/20 flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-sm font-bold text-primary mb-2">Email Address</h3>
              <a href="mailto:manjuabroadconsultancy@gmail.com" className="text-sm text-secondary hover:text-accent font-semibold break-all">
                manjuabroadconsultancy@gmail.com
              </a>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6 rounded-2xl flex flex-col items-center text-center border border-gray-200/60"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-gradient/10 border border-accent/20 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-sm font-bold text-primary mb-2">Office Hours</h3>
              <span className="text-xs text-secondary leading-relaxed font-medium">
                Mon - Sat: 9 AM - 7 PM <br /> Sun: By Appointment
              </span>
            </motion.div>
          </div>

          <div className="max-w-3xl mx-auto mb-20">
            <div className="glass-card p-6 sm:p-10 rounded-2xl border border-gray-200/60 shadow-premium">
              <h3 className="text-lg font-bold text-primary mb-6">Send A Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                      />
                      <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your Phone Number"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                      />
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Email & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                      />
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. F1 Visa Slot Booking"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your detailed query here..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                    />
                    <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-xs text-green-700 font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                    Message sent successfully! We will get back to you shortly.
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-premium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
