"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Shield,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertCircle,
  Inbox,
} from "lucide-react";

interface Applicant {
  visaCategory: string;
  ds160Confirmation: string;
  requiredDates: string;
  location: string;
  message?: string;
}

interface Booking {
  id: number;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  user_id: string;
  password: string;
  sec_question1?: string;
  sec_ans1?: string;
  sec_question2?: string;
  sec_ans2?: string;
  sec_question3?: string;
  sec_ans3?: string;
  applicants: Applicant[];
  created_at: string;
}

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/book");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setBookings(data.bookings);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-bgLight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              Slot Booking Submissions
            </h1>
            <p className="text-secondary text-sm mt-1">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} in database
            </p>
          </div>
          <button
            onClick={fetchBookings}
            className="flex items-center gap-2 px-4 py-2 bg-sky-gradient text-primary font-bold text-sm rounded-xl shadow-sky hover:shadow-xl transition-all cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-24 text-secondary">
            <Inbox className="h-12 w-12 mx-auto mb-4 text-accent/40" />
            <p className="font-semibold text-lg">No bookings yet</p>
            <p className="text-sm mt-1">Submitted bookings will appear here.</p>
          </div>
        )}

        {/* Bookings List */}
        <div className="space-y-4">
          {bookings.map((b, idx) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-accent/15 rounded-2xl shadow-premium overflow-hidden"
            >
              {/* Summary Row */}
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-accent/3 transition-colors cursor-pointer"
                onClick={() => setExpanded(expanded === b.id ? null : b.id)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-primary text-base truncate">{b.name}</p>
                    <p className="text-xs text-secondary truncate">{b.email} · {b.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    <FileText className="h-3 w-3" />
                    {b.applicants.length} applicant{b.applicants.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-xs text-secondary hidden md:block">
                    {new Date(b.created_at).toLocaleString("en-IN")}
                  </span>
                  {expanded === b.id
                    ? <ChevronUp className="h-5 w-5 text-secondary" />
                    : <ChevronDown className="h-5 w-5 text-secondary" />}
                </div>
              </button>

              {/* Expanded Details */}
              {expanded === b.id && (
                <div className="border-t border-accent/10 px-6 py-6 space-y-6 bg-bgLight/50">

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                      Contact Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: User, label: "Full Name", value: b.name },
                        { icon: Mail, label: "Email", value: b.email },
                        { icon: Phone, label: "Phone", value: b.phone },
                        { icon: Phone, label: "WhatsApp", value: b.whatsapp },
                        { icon: MapPin, label: "City", value: b.city },
                        { icon: Calendar, label: "Submitted", value: new Date(b.created_at).toLocaleString("en-IN") },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-2 bg-white border border-accent/10 rounded-xl px-4 py-3">
                          <Icon className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">{label}</p>
                            <p className="text-sm text-primary font-medium">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portal Credentials */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3 flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-accent" />
                      USA Visa Portal Login
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "User ID", value: b.user_id },
                        { label: "Password", value: b.password },
                        ...(b.sec_question1 ? [{ label: `Q1: ${b.sec_question1}`, value: b.sec_ans1 || "—" }] : []),
                        ...(b.sec_question2 ? [{ label: `Q2: ${b.sec_question2}`, value: b.sec_ans2 || "—" }] : []),
                        ...(b.sec_question3 ? [{ label: `Q3: ${b.sec_question3}`, value: b.sec_ans3 || "—" }] : []),
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white border border-accent/10 rounded-xl px-4 py-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">{label}</p>
                          <p className="text-sm text-primary font-medium break-all">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applicants */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                      Applicant Details
                    </h3>
                    <div className="space-y-3">
                      {b.applicants.map((app, i) => (
                        <div key={i} className="bg-white border border-accent/15 rounded-xl p-4">
                          <p className="text-xs font-bold text-accent mb-3">Applicant #{i + 1}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              { label: "Visa Category", value: app.visaCategory },
                              { label: "DS-160 Confirmation", value: app.ds160Confirmation },
                              { label: "Required Dates", value: app.requiredDates },
                              { label: "Target Location", value: app.location },
                              ...(app.message ? [{ label: "Message", value: app.message }] : []),
                            ].map(({ label, value }) => (
                              <div key={label} className="bg-bgLight rounded-lg px-3 py-2">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">{label}</p>
                                <p className="text-sm text-primary font-medium">{value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
