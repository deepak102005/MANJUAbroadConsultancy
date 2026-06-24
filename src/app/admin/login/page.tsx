"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import logo from "../../../../assets/logo.png";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex flex-col items-center gap-3 mb-2">
          <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-sky overflow-hidden">
            <Image src={logo} alt="Logo" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <span className="block text-2xl font-serif font-extrabold tracking-wider text-white">MANJU</span>
            <span className="block text-[10px] tracking-[0.22em] font-bold text-sky-gradient uppercase -mt-0.5">Abroad Consultancy</span>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-2 mt-4 mb-2">
          <Shield className="h-5 w-5 text-accent" />
          <span className="text-accent text-sm font-bold tracking-wider uppercase">Admin Portal</span>
        </div>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md py-8 px-6 sm:rounded-2xl sm:px-10 shadow-premium">
          <h2 className="text-xl font-bold text-white text-center mb-6">Sign In to Admin Panel</h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">Admin Email</label>
              <div className="relative">
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="manjuabroadconsultancy@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-accent text-sm text-white transition-colors placeholder:text-gray-500"
                />
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"} required value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:outline-none focus:border-accent text-sm text-white transition-colors"
                />
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-3 text-gray-400 hover:text-white">
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-sky-gradient text-primary font-bold text-sm rounded-xl shadow-sky hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                : <><Shield className="h-4 w-4" /> Enter Admin Panel</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
