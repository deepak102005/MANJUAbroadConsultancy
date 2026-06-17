"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, ShieldCheck, HeartHandshake, Eye, Target, CheckCircle2 } from "lucide-react";

const values = [
  { name: "Integrity", desc: "Honesty and ethical practice in every consultation and credential handling process." },
  { name: "Transparency", desc: "No automated bot bookings or false guarantees. Complete honesty about slot availability." },
  { name: "DS-160 Accuracy", desc: "Meticulous verification of details to ensure zero errors on submitted visa application forms." },
  { name: "Commitment", desc: "Continuous monitoring of official portals to match you with your requested interview slots." },
  { name: "Client Success", desc: "Securing matching OFC and Consular slots at the best times and centers for approval." },
];

const trustReasons = [
  "Consulate Timing Advisory",
  "Error-Free DS-160 Preparation",
  "Manual (Bot-Free) Booking",
  "Prompt Portal Status Updates",
  "Personalized Support",
];

export default function About() {
  return (
    <div className="relative">
      {/* Page Hero */}
      <section className="bg-dark-gradient py-24 md:py-32 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full bg-accent/15 border border-accent/20 text-accent text-xs font-bold tracking-wider mb-4 uppercase"
          >
            Since 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            About <span className="text-gold-gradient">MANJU ABROAD CONSULTANCY</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed font-light"
          >
            Helping students, professionals, and families achieve their dreams of traveling, studying, and working in the United States by providing focused visa center consultation and slot scheduling.
          </motion.p>
        </div>
      </section>

      {/* Company Overview Card & Mission/Vision */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-20">
            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 sm:p-10 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-accent font-bold mb-3 block">
                  Official Details
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                  MANJU ABROAD CONSULTANCY
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-3 border-b border-gray-200/50">
                    <span className="font-semibold text-primary text-sm">Contact Person</span>
                    <span className="text-secondary text-sm">A. Suresh Kumar</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200/50">
                    <span className="font-semibold text-primary text-sm">Registration Number</span>
                    <span className="text-secondary text-sm font-mono">AP-06-84-019-02488722</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200/50">
                    <span className="font-semibold text-primary text-sm">Tagline</span>
                    <span className="text-accent text-sm font-medium">Your Future Our Promise</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200/50">
                    <span className="font-semibold text-primary text-sm">Specialty Focus</span>
                    <span className="text-secondary text-sm">India Center Selection & Manual Booking</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs text-secondary leading-relaxed">
                Registered under standard regulations, we follow strict manual methodologies to monitor appointment releases and advise on high-approval timing structures across India.
              </div>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8 flex flex-col justify-between"
            >
              {/* Mission Card */}
              <div className="glass-card p-8 rounded-2xl flex-1 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-gold-gradient/10 border border-accent/20 flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">Our Mission</h3>
                <p className="text-sm text-secondary leading-relaxed font-light">
                  Our mission is to provide transparent, reliable, and professional visa consultation services that help clients achieve their international goals confidently. We focus purely on finding the best visa center timing, error-free DS-160 preparation, and scheduling slots for demand periods.
                </p>
              </div>

              {/* Vision Card */}
              <div className="glass-card p-8 rounded-2xl flex-1 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">Our Vision</h3>
                <p className="text-sm text-secondary leading-relaxed font-light">
                  To become one of Andhra Pradesh's most trusted overseas visa support services, known for precision in DS-160 drafting and success in securing biometrics and interview dates manually.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-base font-semibold uppercase tracking-wider text-accent mb-2">
                Our Standards
              </h2>
              <p className="text-3xl font-bold text-primary">Core Values We Honor</p>
              <div className="h-1 w-10 bg-accent mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-premium hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-primary text-base mb-2">{v.name}</h3>
                  <p className="text-xs text-secondary leading-relaxed font-light">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Clients Trust Us */}
          <div className="rounded-3xl bg-primary text-white p-8 sm:p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
                  Focused Approach
                </h2>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">
                  Strategic Solutions for Consulate Booking
                </h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                  US visa slot scheduling involves daily tracking and technical forms. We concentrate fully on checking slot availability, optimizing biometrics & interview timing, and filing accurate forms.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trustReasons.map((reason, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span className="text-sm text-gray-200 font-medium">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
