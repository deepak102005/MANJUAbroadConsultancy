"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MessageSquare,
  Tag,
  RefreshCw,
  AlertCircle,
  Inbox,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setContacts(data.contacts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-bgLight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary tracking-tight">
              Contact Inquiries
            </h1>
            <p className="text-secondary text-sm mt-1">
              {contacts.length} message{contacts.length !== 1 ? "s" : ""} in database
            </p>
          </div>
          <button
            onClick={fetchContacts}
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
        {!loading && !error && contacts.length === 0 && (
          <div className="text-center py-24 text-secondary">
            <Inbox className="h-12 w-12 mx-auto mb-4 text-accent/40" />
            <p className="font-semibold text-lg">No messages yet</p>
            <p className="text-sm mt-1">Submitted contact forms will appear here.</p>
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-accent/15 rounded-2xl shadow-premium overflow-hidden"
            >
              {/* Summary Row */}
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-accent/3 transition-colors cursor-pointer"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-primary text-base truncate">{c.name}</p>
                    <p className="text-xs text-secondary truncate">{c.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-secondary hidden md:block">
                    {new Date(c.created_at).toLocaleString("en-IN")}
                  </span>
                  {expanded === c.id
                    ? <ChevronUp className="h-5 w-5 text-secondary" />
                    : <ChevronDown className="h-5 w-5 text-secondary" />}
                </div>
              </button>

              {/* Expanded */}
              {expanded === c.id && (
                <div className="border-t border-accent/10 px-6 py-6 space-y-4 bg-bgLight/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: User, label: "Full Name", value: c.name },
                      { icon: Mail, label: "Email", value: c.email },
                      { icon: Phone, label: "Phone", value: c.phone },
                      { icon: Tag, label: "Subject", value: c.subject },
                      { icon: Calendar, label: "Submitted", value: new Date(c.created_at).toLocaleString("en-IN") },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-2 bg-white border border-accent/10 rounded-xl px-4 py-3">
                        <Icon className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">{label}</p>
                          <p className="text-sm text-primary font-medium break-all">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white border border-accent/10 rounded-xl px-4 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary mb-2 flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> Message
                    </p>
                    <p className="text-sm text-primary leading-relaxed whitespace-pre-wrap">{c.message}</p>
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
