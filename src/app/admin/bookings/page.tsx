"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User, Phone, Mail, MapPin, Calendar, FileText,
  Shield, ChevronDown, ChevronUp, RefreshCw,
  AlertCircle, Inbox, Download, ArrowLeft, LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

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

  useEffect(() => { fetchBookings(); }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const downloadExcel = async () => {
    if (bookings.length === 0) return;
    setDownloading(true);

    try {
      const XLSX = await import("xlsx");

      // ── Build rows matching the exact form layout ──
      const rows: any[] = [];

      bookings.forEach((b, bIdx) => {
        // One row per applicant
        b.applicants.forEach((app, aIdx) => {
          rows.push({
            "Submission Date": new Date(b.created_at).toLocaleString("en-IN"),

            // Section 1 – Client Details
            "Full Name": b.name,
            "Phone Number": b.phone,
            "WhatsApp Number": b.whatsapp,
            "Email Address": b.email,
            "City": b.city,

            // Section 2 – Portal Credentials
            "User ID": b.user_id,
            "Password": b.password,
            "Security Question 1": b.sec_question1 || "",
            "Answer 1": b.sec_ans1 || "",
            "Security Question 2": b.sec_question2 || "",
            "Answer 2": b.sec_ans2 || "",
            "Security Question 3": b.sec_question3 || "",
            "Answer 3": b.sec_ans3 || "",

            // Section 3 – Applicant Visa Details
            "Applicant #": aIdx + 1,
            "Type of Visa": app.visaCategory,
            "DS-160 Confirmation No": app.ds160Confirmation,
            "Required Dates": app.requiredDates,
            "Location": app.location,
            "Additional Message / Specific Instructions": app.message || "",
          });
        });
      });

      const ws = XLSX.utils.json_to_sheet(rows);

      // ── Column widths ──
      ws["!cols"] = [
        { wch: 22 }, // Submission Date
        { wch: 20 }, // Full Name
        { wch: 16 }, // Phone
        { wch: 18 }, // WhatsApp
        { wch: 28 }, // Email
        { wch: 16 }, // City
        { wch: 28 }, // User ID
        { wch: 16 }, // Password
        { wch: 30 }, // Sec Q1
        { wch: 20 }, // Ans 1
        { wch: 30 }, // Sec Q2
        { wch: 20 }, // Ans 2
        { wch: 30 }, // Sec Q3
        { wch: 20 }, // Ans 3
        { wch: 12 }, // Applicant #
        { wch: 22 }, // Type of Visa
        { wch: 24 }, // DS-160
        { wch: 22 }, // Dates
        { wch: 18 }, // Location
        { wch: 40 }, // Additional Message
      ];

      // ── Style header row ──
      const headerRange = XLSX.utils.decode_range(ws["!ref"] || "A1");
      for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
        const cellAddr = XLSX.utils.encode_cell({ r: 0, c: col });
        if (!ws[cellAddr]) continue;
        ws[cellAddr].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "1A365D" } },
          alignment: { horizontal: "center", wrapText: true },
        };
      }

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Slot Bookings");

      const date = new Date().toISOString().split("T")[0];
      XLSX.writeFile(wb, `manju_bookings_${date}.xlsx`);
    } catch (err) {
      console.error("Excel error:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight">
      {/* Admin Header */}
      <header className="bg-primary-dark border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-gray-600">|</span>
          <span className="text-white font-bold">Slot Bookings</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 text-xs font-semibold rounded-lg cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Slot Booking Submissions</h1>
            <p className="text-secondary text-sm mt-1">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} in database
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2 border border-accent/20 hover:border-accent/50 text-accent text-sm font-semibold rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={downloadExcel}
              disabled={downloading || bookings.length === 0}
              className="flex items-center gap-2 px-5 py-2 bg-sky-gradient text-primary font-bold text-sm rounded-xl shadow-sky hover:shadow-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className={`h-4 w-4 ${downloading ? "animate-bounce" : ""}`} />
              {downloading ? "Generating..." : "Download Excel"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
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

              {/* Expanded */}
              {expanded === b.id && (
                <div className="border-t border-accent/10 px-6 py-6 space-y-6 bg-bgLight/50">
                  {/* Section 1 */}
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-3 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">1</span>
                      Contact Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {[
                        { icon: User, label: "Full Name", value: b.name },
                        { icon: Mail, label: "Email Address", value: b.email },
                        { icon: Phone, label: "Phone Number", value: b.phone },
                        { icon: Phone, label: "WhatsApp Number", value: b.whatsapp },
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

                  {/* Section 2 */}
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-3 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">2</span>
                      <Shield className="h-3.5 w-3.5 text-accent" />
                      USA Visa Portal Login
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "User ID", value: b.user_id },
                        { label: "Password", value: b.password },
                        ...(b.sec_question1 ? [{ label: `Security Question 1: ${b.sec_question1}`, value: `Answer: ${b.sec_ans1 || "—"}` }] : []),
                        ...(b.sec_question2 ? [{ label: `Security Question 2: ${b.sec_question2}`, value: `Answer: ${b.sec_ans2 || "—"}` }] : []),
                        ...(b.sec_question3 ? [{ label: `Security Question 3: ${b.sec_question3}`, value: `Answer: ${b.sec_ans3 || "—"}` }] : []),
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white border border-accent/10 rounded-xl px-4 py-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">{label}</p>
                          <p className="text-sm text-primary font-medium break-all">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-3 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">3</span>
                      Visa Details & Scheduling
                    </h3>
                    <div className="space-y-3">
                      {b.applicants.map((app, i) => (
                        <div key={i} className="bg-white border border-accent/15 rounded-xl p-4">
                          <p className="text-xs font-bold text-accent mb-3">Applicant #{i + 1}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              { label: "Type of Visa", value: app.visaCategory },
                              { label: "DS-160 Confirmation No", value: app.ds160Confirmation },
                              { label: "Required Dates", value: app.requiredDates },
                              { label: "Location", value: app.location },
                              ...(app.message ? [{ label: "Additional Message / Specific Instructions", value: app.message }] : []),
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
