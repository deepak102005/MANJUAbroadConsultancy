"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Key,
  ShieldAlert,
  HelpCircle,
  FileText,
  Calendar,
  Layers,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Loader2,
  Sparkles,
  Users
} from "lucide-react";

export default function Book() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "",
    userId: "",
    password: "",
    secQuestion1: "",
    secAns1: "",
    secQuestion2: "",
    secAns2: "",
    secQuestion3: "",
    secAns3: "",
    visaCategory: "Student Visa (F1)",
    numApplicants: "1",
    ds160Confirmation: "",
    requiredDates: "",
    location: "Hyderabad",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
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
            Visa Slot <span className="text-gold-gradient">Booking Assistance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed font-light"
          >
            Submit your visa portal credentials and requirements securely. Our team coordinates manually to reserve slots.
          </motion.p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Form Container */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-card p-6 sm:p-10 rounded-2xl border border-gray-200/60 shadow-premium"
                  >
                    <div className="mb-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold-gradient/10 border border-accent/20 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-accent animate-pulse" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-primary">Secure Appointment Request</h2>
                        <p className="text-xs text-gray-500 font-light">Enter visa portal credentials & slot requirements</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Section 1: Contact Details */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-accent uppercase tracking-wider border-b border-gray-200/60 pb-2">
                          1. Personal & Contact Details
                        </h3>
                        
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
                              placeholder="Enter your full name"
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                            />
                            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                                placeholder="Mobile number"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              WhatsApp Number *
                            </label>
                            <div className="relative">
                              <input
                                type="tel"
                                name="whatsapp"
                                required
                                value={formData.whatsapp}
                                onChange={handleChange}
                                placeholder="WhatsApp mobile number"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>

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
                                placeholder="email@example.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              City *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="e.g. Vijayawada"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: USA VISA Portal Credentials */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-accent uppercase tracking-wider border-b border-gray-200/60 pb-2 flex items-center gap-1.5">
                          2. USA VISA Portal Login Credentials
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              User ID *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="userId"
                                required
                                value={formData.userId}
                                onChange={handleChange}
                                placeholder="Portal Username / Email"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Password *
                            </label>
                            <div className="relative">
                              <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Portal Password"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        {/* Security Question 1 */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                          <div className="sm:col-span-8">
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Security Question 1
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="secQuestion1"
                                value={formData.secQuestion1}
                                onChange={handleChange}
                                placeholder="e.g. First pet name"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <HelpCircle className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div className="sm:col-span-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Answer
                            </label>
                            <input
                              type="text"
                              name="secAns1"
                              value={formData.secAns1}
                              onChange={handleChange}
                              placeholder="Ans 1"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                            />
                          </div>
                        </div>

                        {/* Security Question 2 */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                          <div className="sm:col-span-8">
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Security Question 2
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="secQuestion2"
                                value={formData.secQuestion2}
                                onChange={handleChange}
                                placeholder="e.g. In what city you met spouse"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <HelpCircle className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div className="sm:col-span-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Answer
                            </label>
                            <input
                              type="text"
                              name="secAns2"
                              value={formData.secAns2}
                              onChange={handleChange}
                              placeholder="Ans 2"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                            />
                          </div>
                        </div>

                        {/* Security Question 3 */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                          <div className="sm:col-span-8">
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Security Question 3
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="secQuestion3"
                                value={formData.secQuestion3}
                                onChange={handleChange}
                                placeholder="e.g. High school name"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <HelpCircle className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div className="sm:col-span-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Answer
                            </label>
                            <input
                              type="text"
                              name="secAns3"
                              value={formData.secAns3}
                              onChange={handleChange}
                              placeholder="Ans 3"
                              className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Visa details */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-accent uppercase tracking-wider border-b border-gray-200/60 pb-2">
                          3. Visa Details & Scheduling Preferences
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {/* Type of Visa */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Type of Visa *
                            </label>
                            <select
                              name="visaCategory"
                              value={formData.visaCategory}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white cursor-pointer"
                            >
                              <option value="Student Visa (F1)">Student Visa (F1)</option>
                              <option value="H1B Visa">H1B Visa</option>
                              <option value="H4 Visa">H4 Visa</option>
                              <option value="B1/B2 Visa">B1/B2 Visa</option>
                              <option value="Visa Slot Booking">Visa Slot Booking</option>
                            </select>
                          </div>

                          {/* No. of applicants */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              No. of Applicants *
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                name="numApplicants"
                                required
                                min="1"
                                value={formData.numApplicants}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <Users className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          {/* DS-160 */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              DS-160 Confirmation No *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="ds160Confirmation"
                                required
                                value={formData.ds160Confirmation}
                                onChange={handleChange}
                                placeholder="e.g. AA00XXXXXX"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Required Dates */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Required Dates *
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                name="requiredDates"
                                required
                                value={formData.requiredDates}
                                onChange={handleChange}
                                placeholder="e.g. Oct 10 to Nov 15"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                              />
                              <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          {/* Location */}
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                              Location *
                            </label>
                            <select
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white cursor-pointer"
                            >
                              <option value="Chennai">Chennai</option>
                              <option value="Hyderabad">Hyderabad</option>
                              <option value="Mumbai">Mumbai</option>
                              <option value="Kolkata">Kolkata</option>
                              <option value="New Delhi">New Delhi</option>
                            </select>
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                            Additional Message / Specific Instructions
                          </label>
                          <div className="relative">
                            <textarea
                              name="message"
                              rows={3}
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Any further details or travel constraints..."
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                            />
                            <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* Legitimate Process Note */}
                      <div className="p-5 rounded-2xl bg-white border border-accent/30 shadow-premium flex items-start gap-4">
                        <ShieldAlert className="h-6 w-6 text-accent shrink-0 mt-0.5 animate-pulse" />
                        <div>
                          <span className="block text-xs font-bold text-primary uppercase tracking-wide mb-1">
                            Important Notice
                          </span>
                          <p className="text-xs text-secondary leading-relaxed font-light">
                            <strong>Note:</strong> We schedule appointments through a standard, legitimate process without using any bots or automated systems. Your login credentials are handled with strict privacy protocols and used solely for manual slot checking.
                          </p>
                        </div>
                      </div>

                      {error && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                          {error}
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                        type="submit"
                        className="w-full py-4 bg-gold-gradient text-primary font-bold rounded-xl shadow-gold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Submitting Scheduling Request...
                          </>
                        ) : (
                          <>
                            Submit Scheduling Request
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-8 sm:p-12 rounded-2xl border border-gray-200/60 shadow-premium text-center flex flex-col items-center justify-center min-h-[400px]"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold mb-6">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Request Submitted!</h2>
                    <p className="text-secondary text-sm font-light max-w-md mx-auto leading-relaxed mb-6">
                      Thank you for submitting your booking details. A. Suresh Kumar and our scheduling assistants will verify your credentials and begin the manual scheduling process soon. We will message you on WhatsApp once a slot matches your requested dates.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-light transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Contact Card */}
              <div className="bg-primary text-white rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-base font-bold text-accent uppercase tracking-wider mb-6">
                  Contact Information
                </h3>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <User className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-gray-400 font-medium">Contact Person</span>
                      <span className="text-sm text-gray-100 font-semibold">A. Suresh Kumar</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-gray-400 font-medium">Direct Phone / WhatsApp</span>
                      <a href="tel:+919666991668" className="text-sm text-gray-100 font-semibold hover:text-accent transition-colors">
                        +91 96669 91668
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-gray-400 font-medium">Official Email</span>
                      <a href="mailto:manjuabroadconsultancy@gmail.com" className="text-sm text-gray-100 font-semibold hover:text-accent transition-colors break-all">
                        manjuabroadconsultancy@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-gray-400 font-medium">Head Office</span>
                      <span className="text-sm text-gray-200 leading-relaxed font-medium block mt-1">
                        #68-3-17, NSM School Road,
                        <br />
                        Patamata, Vijayawada - 520010,
                        <br />
                        Krishna District, Andhra Pradesh
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Office Hours */}
              <div className="glass-card rounded-2xl p-8 border border-gray-200/60">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">
                  Office Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
                    <span className="text-secondary font-medium">Monday - Saturday</span>
                    <span className="text-primary font-bold">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
                    <span className="text-secondary font-medium">Sunday</span>
                    <span className="text-accent font-bold">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
