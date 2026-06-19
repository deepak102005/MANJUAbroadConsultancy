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
  Users,
  Plus,
  Trash2
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
  });

  const [applicants, setApplicants] = useState([
    {
      visaCategory: "Student Visa (F1)",
      customVisaCategory: "",
      ds160Confirmation: "",
      requiredDates: "",
      location: "Any Location",
      message: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplicantChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedApplicants = [...applicants];
    updatedApplicants[index] = {
      ...updatedApplicants[index],
      [field]: value,
    };
    setApplicants(updatedApplicants);
  };

  const addApplicant = () => {
    setApplicants([
      ...applicants,
      {
        visaCategory: "Student Visa (F1)",
        customVisaCategory: "",
        ds160Confirmation: "",
        requiredDates: "",
        location: "Any Location",
        message: "",
      },
    ]);
  };

  const removeApplicant = (index: number) => {
    if (applicants.length > 1) {
      setApplicants(applicants.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Map applicants array so that if visaCategory is "Other", we send the customVisaCategory value
      const compiledApplicants = applicants.map((app) => ({
        visaCategory: app.visaCategory === "Other" ? app.customVisaCategory : app.visaCategory,
        ds160Confirmation: app.ds160Confirmation,
        requiredDates: app.requiredDates,
        location: app.location,
        message: app.message,
      }));

      const payload = {
        ...formData,
        applicants: compiledApplicants,
      };

      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <section className="bg-dark-gradient py-24 md:py-32 border-b border-accent/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6"
          >
            Visa Slot <span className="text-sky-gradient">Booking Assistance</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-secondary leading-relaxed font-light"
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
                      <div className="w-10 h-10 rounded-xl bg-sky-gradient/10 border border-accent/20 flex items-center justify-center">
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
                      <div className="space-y-6">
                        <h3 className="text-sm font-bold text-accent uppercase tracking-wider border-b border-gray-200/60 pb-2">
                          3. Visa Details & Scheduling Preferences
                        </h3>

                        <div className="space-y-6">
                          {applicants.map((applicant, index) => (
                            <div
                              key={index}
                              className="p-5 sm:p-6 rounded-2xl bg-white/40 border border-gray-200/60 shadow-sm relative space-y-6"
                            >
                              {/* Header for Applicant */}
                              <div className="flex justify-between items-center pb-2 border-b border-gray-200/40">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                                  <Users className="h-4 w-4 text-accent" />
                                  Applicant #{index + 1}
                                </span>
                                {index > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => removeApplicant(index)}
                                    className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Remove
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Type of Visa */}
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                                      Type of Visa *
                                    </label>
                                    <select
                                      value={applicant.visaCategory}
                                      onChange={(e) =>
                                        handleApplicantChange(index, "visaCategory", e.target.value)
                                      }
                                      className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white cursor-pointer"
                                    >
                                      <option value="Student Visa (F1)">Student Visa (F1)</option>
                                      <option value="H1B Visa">H1B Visa</option>
                                      <option value="H4 Visa">H4 Visa</option>
                                      <option value="B1/B2 Visa">B1/B2 Visa</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>

                                  {applicant.visaCategory === "Other" && (
                                    <div className="relative">
                                      <input
                                        type="text"
                                        required
                                        value={applicant.customVisaCategory}
                                        onChange={(e) =>
                                          handleApplicantChange(index, "customVisaCategory", e.target.value)
                                        }
                                        placeholder="Specify visa type (e.g. F2 Visa)"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* DS-160 */}
                                <div>
                                  <label className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">
                                    DS-160 Confirmation No *
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      required
                                      value={applicant.ds160Confirmation}
                                      onChange={(e) =>
                                        handleApplicantChange(index, "ds160Confirmation", e.target.value)
                                      }
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
                                      required
                                      value={applicant.requiredDates}
                                      onChange={(e) =>
                                        handleApplicantChange(index, "requiredDates", e.target.value)
                                      }
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
                                    value={applicant.location}
                                    onChange={(e) =>
                                      handleApplicantChange(index, "location", e.target.value)
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white cursor-pointer"
                                  >
                                    <option value="Any Location">Any Location</option>
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
                                    rows={2}
                                    value={applicant.message}
                                    onChange={(e) =>
                                      handleApplicantChange(index, "message", e.target.value)
                                    }
                                    placeholder="Any further details or travel constraints..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/60 focus:outline-none focus:border-accent text-sm transition-colors bg-white"
                                  />
                                  <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Applicant Button */}
                        <button
                          type="button"
                          onClick={addApplicant}
                          className="w-full py-3.5 border border-dashed border-accent/60 text-accent hover:text-accent-light hover:border-accent hover:bg-accent/5 font-bold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Plus className="h-4 w-4" />
                          Add Another Applicant
                        </button>
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
                        className="w-full py-4 bg-sky-gradient text-primary font-bold rounded-xl shadow-sky hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
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
                    <div className="w-16 h-16 rounded-full bg-sky-gradient flex items-center justify-center shadow-sky mb-6">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-3">Request Submitted!</h2>
                    <p className="text-secondary text-sm font-light max-w-md mx-auto leading-relaxed mb-6">
                      Thank you for submitting your booking details. A. Suresh Kumar and our scheduling assistants will verify your credentials and begin the manual scheduling process soon. We will message you on WhatsApp once a slot matches your requested dates.
                    </p>
                    <button
                      onClick={() => {
                        setSuccess(false);
                        setApplicants([
                          {
                            visaCategory: "Student Visa (F1)",
                            customVisaCategory: "",
                            ds160Confirmation: "",
                            requiredDates: "",
                            location: "Any Location",
                            message: "",
                          },
                        ]);
                        setFormData({
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
                        });
                      }}
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
              <div className="bg-white rounded-2xl p-8 border border-accent/15 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-base font-bold text-accent uppercase tracking-wider mb-6">
                  Contact Information
                </h3>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <User className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-secondary font-medium">Contact Person</span>
                      <span className="text-sm text-primary font-semibold">A. Suresh Kumar</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-secondary font-medium">Direct Phone / WhatsApp</span>
                      <a href="tel:+919666991668" className="text-sm text-primary font-semibold hover:text-accent transition-colors">
                        +91 96669 91668
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs text-secondary font-medium">Official Email</span>
                      <a href="mailto:manjuabroadconsultancy@gmail.com" className="text-sm text-primary font-semibold hover:text-accent transition-colors break-all">
                        manjuabroadconsultancy@gmail.com
                      </a>
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
