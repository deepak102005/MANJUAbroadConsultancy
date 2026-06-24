"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, FileText, MessageSquare, Shield, LogOut,
  CalendarDays, TrendingUp, ArrowRight,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ users: 0, bookings: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/db-test");
        const data = await res.json();
        if (data.tables) setStats(data.tables);
      } catch {/* ignore */} finally { setLoading(false); }
    })();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  const cards = [
    {
      title: "Slot Bookings",
      count: stats.bookings,
      icon: CalendarDays,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-600",
      iconColor: "text-blue-500",
      href: "/admin/bookings",
      description: "View & download Excel",
    },
    {
      title: "Contact Inquiries",
      count: stats.contacts,
      icon: MessageSquare,
      color: "bg-accent/10 border-accent/20 text-accent",
      iconColor: "text-accent",
      href: "/admin/contacts",
      description: "View all messages",
    },
    {
      title: "Registered Users",
      count: stats.users,
      icon: Users,
      color: "bg-green-500/10 border-green-500/20 text-green-600",
      iconColor: "text-green-500",
      href: "/admin/users",
      description: "View accounts",
    },
  ];

  return (
    <div className="min-h-screen bg-bgLight">
      {/* Admin Header */}
      <header className="bg-primary-dark border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-accent" />
          <div>
            <span className="block text-white font-bold text-lg leading-none">Admin Panel</span>
            <span className="block text-gray-400 text-xs">Manju Abroad Consultancy</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
            ← Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-primary">Dashboard Overview</h1>
          <p className="text-secondary text-sm mt-1">Manage all submissions and user data</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={card.href}>
                <div className={`bg-white border rounded-2xl p-6 shadow-premium hover:shadow-xl transition-all cursor-pointer group ${card.color}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${card.color}`}>
                      <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-accent transition-colors" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {loading ? <div className="h-8 w-12 bg-gray-200 animate-pulse rounded" /> : card.count}
                  </div>
                  <div className="font-semibold text-primary text-sm">{card.title}</div>
                  <div className="text-xs text-secondary mt-0.5">{card.description}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white border border-accent/15 rounded-2xl p-6 shadow-premium">
          <h2 className="font-bold text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" /> Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "📥 Download Bookings as Excel", href: "/admin/bookings" },
              { label: "📬 View Contact Messages", href: "/admin/contacts" },
              { label: "👥 View Registered Users", href: "/admin/users" },
              { label: "🔌 Check DB Connection", href: "/api/db-test" },
            ].map(item => (
              <Link key={item.label} href={item.href}
                className="flex items-center justify-between px-4 py-3 rounded-xl border border-accent/10 hover:border-accent/40 hover:bg-accent/5 transition-all text-sm font-medium text-primary group"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-accent transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
