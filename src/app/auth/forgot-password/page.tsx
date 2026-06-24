"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import logo from "../../../../assets/logo.png";

type Step = "email" | "reset" | "success";

export default function ForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ── Step 1: verify email ── */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setStep("reset");
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  /* ── Step 2: set new password ── */
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Reset failed. Please try again.");
        setLoading(false);
        return;
      }

      setLoading(false);
      setStep("success");
      setTimeout(() => router.push("/auth/signin"), 2000);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgLight flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-sky overflow-hidden hover:scale-105 transition-transform duration-300">
            <Image
              src={logo}
              alt="MANJU ABROAD CONSULTANCY Logo"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <span className="block text-2xl font-serif font-extrabold tracking-wider text-primary">
              MANJU
            </span>
            <span className="block text-[10px] tracking-[0.22em] font-bold text-sky-gradient uppercase -mt-0.5">
              Abroad Consultancy
            </span>
          </div>
        </Link>
      </div>

      {/* Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white border border-accent/15 py-8 px-4 shadow-premium sm:rounded-2xl sm:px-10">

          <AnimatePresence mode="wait">

            {/* ── SUCCESS ── */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-sky-gradient flex items-center justify-center shadow-sky mx-auto mb-4 animate-bounce">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-primary">Password Reset!</h2>
                <p className="text-secondary text-sm font-light">
                  Your password has been updated successfully. Redirecting to Sign In…
                </p>
              </motion.div>
            )}

            {/* ── STEP 1: EMAIL ── */}
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                    <KeyRound className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-xl font-bold text-primary">Forgot Password?</h2>
                  <p className="text-secondary text-xs mt-1 max-w-xs mx-auto">
                    Enter the email linked to your account and we'll verify it.
                  </p>
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

                <form className="space-y-5" onSubmit={handleEmailSubmit}>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-accent/15 bg-white focus:outline-none focus:border-accent text-sm text-primary transition-colors placeholder:text-gray-400"
                      />
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-secondary/60" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-sky-gradient text-primary font-bold text-sm rounded-xl shadow-sky hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Verify Email"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/auth/signin"
                    className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-accent font-semibold transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Sign In
                  </Link>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: NEW PASSWORD ── */}
            {step === "reset" && (
              <motion.div
                key="reset"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="mb-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold text-primary">Set New Password</h2>
                  <p className="text-secondary text-xs mt-1">
                    Account verified for{" "}
                    <span className="text-accent font-semibold">{email}</span>
                  </p>
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

                <form className="space-y-5" onSubmit={handleResetSubmit}>
                  {/* New Password */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? "text" : "password"}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-accent/15 bg-white focus:outline-none focus:border-accent text-sm text-primary transition-colors placeholder:text-gray-400"
                      />
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-secondary/60" />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-3 text-secondary/60 hover:text-primary focus:outline-none"
                      >
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-accent/15 bg-white focus:outline-none focus:border-accent text-sm text-primary transition-colors placeholder:text-gray-400"
                      />
                      <Lock className="absolute left-3.5 top-3 h-4 w-4 text-secondary/60" />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-3 text-secondary/60 hover:text-primary focus:outline-none"
                      >
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-sky-gradient text-primary font-bold text-sm rounded-xl shadow-sky hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => { setStep("email"); setError(""); }}
                    className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-accent font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Use a different email
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
