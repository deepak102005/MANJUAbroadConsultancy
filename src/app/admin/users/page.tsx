"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Calendar, RefreshCw, AlertCircle, Inbox, ArrowLeft, LogOut, Users } from "lucide-react";

interface UserRow {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setUsers(data.users);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bgLight">
      <header className="bg-primary-dark border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
          <span className="text-gray-600">|</span>
          <span className="text-white font-bold">Registered Users</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg cursor-pointer">
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Registered Users</h1>
            <p className="text-secondary text-sm mt-1">{users.length} account{users.length !== 1 ? "s" : ""} in database</p>
          </div>
          <button onClick={fetchUsers} className="flex items-center gap-2 px-4 py-2 border border-accent/20 hover:border-accent/50 text-accent text-sm font-semibold rounded-xl transition-all cursor-pointer">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {loading && <div className="flex justify-center py-24"><div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" /></div>}

        {!loading && !error && users.length === 0 && (
          <div className="text-center py-24 text-secondary">
            <Inbox className="h-12 w-12 mx-auto mb-4 text-accent/40" />
            <p className="font-semibold text-lg">No users yet</p>
          </div>
        )}

        <div className="space-y-3">
          {users.map((u, idx) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-accent/15 rounded-2xl shadow-premium px-6 py-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-primary truncate">{u.name}</p>
                <p className="text-xs text-secondary truncate flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {u.email}
                </p>
              </div>
              <div className="text-xs text-secondary text-right shrink-0 hidden sm:block">
                <p className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Joined</p>
                <p className="font-medium">{new Date(u.created_at).toLocaleDateString("en-IN")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
