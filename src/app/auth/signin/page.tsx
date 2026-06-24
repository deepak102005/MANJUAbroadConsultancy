"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";
import logo from "../../../../assets/logo.png";

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Sign in failed. Please try again.");
        setLoading(false);
        return;
      }

      // Admin → redirect to home page (same as customers) but keep admin session
      if (data.isAdmin) {
        localStorage.setItem(
          "manju_currentUser",
          JSON.stringify({ name: "Admin", email: email })
        );
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          router.push("/");
          setTimeout(() => window.location.reload(), 100);
        }, 1500);
        return;
      }

      // Regular user → store session and go home
      localStorage.setItem(
        "manju_currentUser",
        JSON.stringify({ name: data.user.name, email: data.user.email })
      );

      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push("/");
        setTimeout(() => window.location.reload(), 100);
      }, 1500);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-sky overflow-hidden hover:scale-105 transition-transform duration-300">
            <Image src={logo} alt="MANJU ABROAD CONSULTANCY Logo" width={64} height={64} className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <span className="block text-2xl font-serif font-extrabold tracking-wider text-primary">MANJU</span>
            <span className="block text-[10px] tracking-[0.22em] font-bold text-sky-gradient uppercase -mt-0.5">Abroad Consultancy</span>
          </div>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white border border-accent/15 py-8 px-4 shadow-premium sm:rounded-2xl sm:px-10">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-sky-gradient flex items-center justify-center shadow-sky mx-auto mb-4 animate-bounce">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-primary">Welcome Back!</h2>
              <p className="text-secondary text-sm font-light">
                Sign in successful. Redirecting you to home page...
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-primary">Sign In to Your Account</h2>
                <p className="text-secondary text-xs mt-1">Access your client dashboard and schedules</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-accent/15 bg-white focus:outline-none focus:border-accent text-sm text-primary transition-colors placeholder:text-gray-400"
                    />
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-secondary/60" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary">
                      Password
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-[11px] text-accent hover:text-accent/70 font-semibold hover:underline transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-accent/15 bg-white focus:outline-none focus:border-accent text-sm text-primary transition-colors placeholder:text-gray-400"
                    />
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-secondary/60" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-secondary/60 hover:text-primary focus:outline-none"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-sky-gradient text-primary font-bold text-sm rounded-xl shadow-sky hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-secondary">
                  Don't have an account?{" "}
                  <Link href="/auth/signup" className="text-accent font-semibold hover:underline">
                    Sign Up here
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
