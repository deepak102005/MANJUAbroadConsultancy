"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  FileText,
  Calendar,
  CheckCircle,
  Search,
  FileCheck,
  MessageSquare,
  ShieldCheck,
  Users
} from "lucide-react";

const coreServices = [
  {
    id: "consultation",
    title: "Consulate Center Consultation",
    desc: "We analyze daily approval patterns across all US visa centers in India (Chennai, Hyderabad, Mumbai, Kolkata, and New Delhi). We advise you on which consulate center is best to choose and the optimal timing for your booking to maximize approval probability.",
    icon: Compass,
    tasks: [
      "Daily Approval & Refusal Analytics",
      "Consulate Capacity Assessment",
      "Best Center Selection Guidance",
      "Strategic Date Selection Advice",
      "Consulate-specific Queue Monitoring",
    ],
  },
  {
    id: "ds160",
    title: "DS-160 Form Filing",
    desc: "The DS-160 is the most critical document in your US visa application. We manage the entire form filling process professionally, ensuring every field is complete, consistent, and completely free of errors to prevent unnecessary technical refusals.",
    icon: FileText,
    tasks: [
      "Information Collection & Verification",
      "Professional Form Drafting",
      "Sponsor & Financial Data Audits",
      "Previous Refusal Reason Analysis (if any)",
      "Final Form Submission & Confirmation Lock",
    ],
  },
  {
    id: "booking",
    title: "Visa Interview & Biometrics Slot Booking",
    desc: "Securing appointment slots during peak seasons (such as Student Fall/Spring intakes or Work petition releases) can be extremely difficult. We assist you by manually monitoring and booking biometrics (OFC) and consular interview slots during these high-demand periods.",
    icon: Calendar,
    tasks: [
      "24/7 Portal Availability Monitoring",
      "Manual Booking (Strictly Bot-Free)",
      "OFC & Interview Date Synchronization",
      "Rescheduling Support (Within Limits)",
      "High-Demand Intake Scheduling (F1, H1B, H4, B1/B2)",
    ],
  },
];

const additionalServices = [
  {
    title: "Profile Data Audits",
    desc: "Thorough review of academic or employer history to ensure perfect alignment with DS-160 data.",
    icon: Search,
  },
  {
    title: "Form Verification",
    desc: "Double-checking pre-filled DS-160 submissions for typos, incorrect numbers, and mismatched names.",
    icon: FileCheck,
  },
  {
    title: "MRV Fee Support",
    desc: "Guiding the payment process to avoid portal locked receipts or fee expiration errors.",
    icon: ShieldCheck,
  },
  {
    title: "Manual Slot Management",
    desc: "Careful monitoring of appointment cancellations to grab early emergency slots manually.",
    icon: Users,
  },
  {
    title: "Consulate Q&A Prep",
    desc: "Focused guidance for the consular interview matching the specific details filled in your DS-160.",
    icon: MessageSquare,
  },
];

export default function Services() {
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
            US Visa <span className="text-gold-gradient">Specialties</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-relaxed font-light"
          >
            We focus exclusively on providing expert advice on Indian visa centers, complete DS-160 form preparation, and manual scheduling of biometrics and interview slots.
          </motion.p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {coreServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="glass-card rounded-2xl overflow-hidden p-8 sm:p-12 scroll-mt-24 border border-gray-200/60"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="inline-flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-primary">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-sm text-secondary font-light leading-relaxed">
                        {service.desc}
                      </p>
                    </div>

                    {/* Right checklist */}
                    <div className="lg:col-span-5 bg-primary/5 border border-primary/5 rounded-xl p-6 sm:p-8 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-accent">
                        What we deliver:
                      </h3>
                      <ul className="space-y-3">
                        {service.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span className="text-sm text-primary font-medium">
                              {task}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Supporting Services */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold uppercase tracking-wider text-accent mb-3">
              Technical Checkups
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight">
              Operational Value Additions
            </p>
            <div className="h-1 w-12 bg-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="bg-white/5 border border-white/10 hover:border-accent/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-gold-gradient/15 border border-accent/20 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
