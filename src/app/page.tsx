"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle,
  Calendar,
  ArrowRight,
  Clock,
  Award,
  FileText,
  Check,
  Compass,
  Star,
  Users,
  ChevronRight,
  MapPin,
  ClipboardList
} from "lucide-react";

// Statistics Data
const stats = [
  { value: "10k+", label: "Slots Booked Successfully", icon: Calendar },
  { value: "95%", label: "DS-160 Form Accuracy", icon: FileText },
  { value: "24/7", label: "Consulate Monitoring", icon: Clock },
  { value: "5", label: "Major US Visa Hubs", icon: MapPin },
];

// Core Services Array
const coreServices = [
  {
    title: "Consulate Center Consultation",
    desc: "Personalized advice on which US consulate in India (Hyderabad, Chennai, Mumbai, Kolkata, New Delhi) is best for visa approvals based on seasonal patterns and pass rates.",
    icon: Compass,
  },
  {
    title: "DS-160 Form Filing",
    desc: "Complete and error-free preparation, review, and submission of the DS-160 application form to prevent technical refusals.",
    icon: FileText,
  },
  {
    title: "Visa Slot Booking",
    desc: "Fast and manual assistance to secure hard-to-find biometrics and consulate interview appointments during high-demand peak seasons.",
    icon: Calendar,
  },
];

// Why Choose Us Data
const features = [
  {
    title: "Consulate Timing Analytics",
    desc: "We track which centers are granting approvals and slot release trends daily to guide your center selection.",
    icon: Compass,
  },
  {
    title: "Manual Booking Support",
    desc: "We coordinate date matching manually, strictly following official portal regulations without using automated bots.",
    icon: Users,
  },
  {
    title: "DS-160 Data Verification",
    desc: "Every answer in your DS-160 is cross-verified for absolute consistency with prior records and travel plans.",
    icon: ShieldCheck,
  },
  {
    title: "Interview & Biometrics Alignment",
    desc: "We coordinate and synchronize your OFC (biometrics) and consular interview dates for minimal travel inconvenience.",
    icon: ClipboardList,
  },
  {
    title: "Transparent Procedures",
    desc: "No false promises or artificial slot guarantees. Honest progress logs and transparent communication.",
    icon: CheckCircle,
  },
  {
    title: "Peak Demand Coordination",
    desc: "Specialized assistance for student intakes (Fall/Spring) and work petition peaks when slots are highly competitive.",
    icon: Clock,
  },
];

// Visa Types We Support
const visasSupported = [
  {
    title: "Student Visa (F1)",
    desc: "DS-160 drafting and slot matching for fall and spring intake student slots.",
  },
  {
    title: "Work Visa (H1B)",
    desc: "Petition coordination and consular appointment bookings for tech and skilled professionals.",
  },
  {
    title: "Dependent Visa (H4)",
    desc: "OFC and interview synchronization for spouses and children joining primary sponsors.",
  },
  {
    title: "Tourist & Business Visa (B1/B2)",
    desc: "Form preparation and scheduling for business travel and family visitors.",
  },
];

// Timeline steps
const steps = [
  {
    step: "01",
    title: "Profile & Center Intake",
    desc: "Evaluate your visa type and advise on which consulate in India is best for your slot matching.",
  },
  {
    step: "02",
    title: "DS-160 Drafting",
    desc: "Gather details and professionally draft your DS-160 form, verifying every entry for compliance.",
  },
  {
    step: "03",
    title: "Form Submission & Fee Lock",
    desc: "Finalize, lock, and submit your DS-160, and support you in paying the MRV visa fees correctly.",
  },
  {
    step: "04",
    title: "Active Slot Tracking",
    desc: "Daily monitoring of the scheduling portals for biometrics (OFC) and interview date releases.",
  },
  {
    step: "05",
    title: "Manual Slot Booking",
    desc: "Reserving your target appointment slots manually during release windows.",
  },
  {
    step: "06",
    title: "Interview Confirmation",
    desc: "Handing over your slot confirmations and DS-160 submission copies, ready for your interview.",
  },
];

// Testimonials Data
const testimonials = [
  {
    name: "Sai Krishna Prasad",
    role: "F1 Student, UT Dallas",
    quote:
      "They advised me to book my interview at Chennai during a specific week and handled my DS-160 perfectly. Their manual slot booking saved me weeks of tracking.",
    rating: 5,
  },
  {
    name: "Ramanuja Rao",
    role: "H1B Holder, Software Engineer",
    quote:
      "Suresh Kumar garu suggested the best consulate timing for my H1B renewal. The DS-160 was filed without single error and they secured a slot during high demand season.",
    rating: 5,
  },
  {
    name: "K. Lakshmi",
    role: "H4 Dependent Visa Holder",
    quote:
      "Securing matching OFC and Interview dates for H4 was very difficult. Their manual slot matching process got me aligned dates in Hyderabad easily.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* 1. Hero Section with Video Background */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
            type="video/mp4"
          />
        </video>

        {/* Soft light overlay with sky-bluish tint so video colors shine through clearly but text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-bgLight/40 via-bgLight/55 to-bgLight/70 z-10 backdrop-blur-[0.5px]" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/20 mb-8"
          >
            <ShieldCheck className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent">
              REGISTERED VISA CONSULTANCY
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-primary mb-6"
          >
            Your Future.
            <br />
            <span className="text-sky-gradient">Our Promise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-secondary mb-10 leading-relaxed font-light"
          >
            Professional DS-160 form preparation, consulate center timing advice, and manual biometrics & visa interview slot booking for high-demand times.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/book" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-sky-gradient text-primary font-bold rounded-xl shadow-sky hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group">
                Book Visa Slot
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-accent/25 text-primary hover:bg-accent/5 font-bold rounded-xl shadow-premium transition-all duration-300">
                Free Consultation
              </button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-accent/10 pt-8"
          >
            {[
              "Registered Consultancy",
              "Consulate Center Advice",
              "DS-160 Error Checks",
              "Legitimate Manual Slots",
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 text-xs sm:text-sm text-secondary font-medium"
              >
                <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Statistics Section */}
      <section className="relative z-30 py-16 bg-white border-y border-accent/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center text-center p-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center mb-4 border border-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-4xl sm:text-5xl font-bold text-primary mb-2 tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-secondary">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Core Specialties Section */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold uppercase tracking-wider text-accent mb-3">
              Our Specialties
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Focusing on What Matters Most
            </p>
            <div className="h-1 w-12 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreServices.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed font-light">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Support Profiles Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold uppercase tracking-wider text-accent mb-3">
              Consulate Solutions
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
              Visa Types We Schedule & Consult For
            </p>
            <div className="h-1 w-12 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visasSupported.map((visa, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-bgLight border border-accent/15 hover:border-accent/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group"
                >
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {visa.title}
                    </h3>
                    <p className="text-xs text-secondary font-light leading-relaxed mb-4">
                      {visa.desc}
                    </p>
                  </div>
                  <Link href="/services">
                    <span className="text-[10px] font-semibold text-accent flex items-center gap-1.5 hover:underline cursor-pointer group/link">
                      Service Specs
                      <ChevronRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold uppercase tracking-wider text-accent mb-3">
              Why Choose Us
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Setting High Standards in Visa Operations
            </p>
            <div className="h-1 w-12 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card glass-card-hover p-8 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-3">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-secondary leading-relaxed font-light">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Process Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-base font-semibold uppercase tracking-wider text-accent mb-3">
              Our Process
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Six Steps to Your Booking Success
            </p>
            <div className="h-1 w-12 bg-accent mx-auto mt-4" />
          </div>

          <div className="relative">
            {/* Center line for larger screens */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 lg:-translate-x-1/2" />

            <div className="space-y-12">
              {steps.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-col lg:flex-row items-stretch relative ${
                      isEven ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-4 lg:left-1/2 w-8 h-8 rounded-full bg-sky-gradient border-4 border-bgLight shadow-sky -translate-x-1/2 flex items-center justify-center text-xs font-bold text-primary z-10" />

                    {/* Left space/card content */}
                    <div className="w-full lg:w-1/2 pl-12 lg:pl-0 lg:px-8">
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 rounded-2xl relative"
                      >
                        <div className="absolute right-6 top-6 text-4xl font-black text-gray-200/50">
                          {item.step}
                        </div>
                        <h3 className="text-lg font-bold text-primary mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-secondary leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Right spacer for desk layout */}
                    <div className="hidden lg:block lg:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-24 bg-bgLight relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold uppercase tracking-wider text-accent mb-3">
              Success Stories
            </h2>
            <p className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              What Our Clients Say
            </p>
            <div className="h-1 w-12 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass-card p-8 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-sm text-secondary italic mb-6 leading-relaxed font-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-gray-200/60 pt-4 mt-4">
                  <h4 className="font-bold text-primary text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="relative py-24 bg-dark-gradient overflow-hidden border-t border-accent/15">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
              Ready To Secure Your <span className="text-sky-gradient">Visa Slot?</span>
            </h2>
            <p className="text-secondary text-lg max-w-xl mx-auto font-light leading-relaxed">
              Unlock successful scheduling and error-free forms. Book with our consulate experts today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/book" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-sky-gradient text-primary font-bold rounded-xl shadow-sky hover:shadow-2xl transition-all duration-300">
                  Book Visa Slot
                </button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-4 bg-white border border-accent/25 text-primary hover:bg-accent/5 font-bold rounded-xl shadow-premium transition-all duration-300">
                  Talk To Consultant
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
