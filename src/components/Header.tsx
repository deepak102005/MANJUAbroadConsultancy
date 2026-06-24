"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, User, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Book Now", href: "/book" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("manju_currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("manju_currentUser");
    setUser(null);
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
    } catch (e) {
      console.error(e);
    }
    window.location.reload();
  };

  useEffect(() => {
    if (!dropdownOpen) return;
    const closeDropdown = () => setDropdownOpen(false);
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  }, [dropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header on auth and admin pages
  if (pathname?.startsWith("/auth") || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-accent/10 shadow-premium py-4"
          : "bg-gradient-to-b from-black/40 via-black/10 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white flex items-center justify-center shadow-sky overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <Image
                src={logo}
                alt="MANJU ABROAD CONSULTANCY Logo"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className={`block text-2xl sm:text-3xl font-serif font-extrabold tracking-wider transition-colors duration-300 ${
                scrolled ? "text-primary group-hover:text-accent" : "text-white drop-shadow-md"
              }`}>
                MANJU
              </span>
              <span className="block text-[10px] sm:text-xs tracking-[0.22em] font-bold text-sky-gradient uppercase -mt-0.5">
                Abroad Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm tracking-wide transition-colors duration-300 py-1 ${
                    isActive
                      ? "text-accent font-bold"
                      : scrolled
                      ? "text-secondary font-semibold hover:text-primary"
                      : "text-white font-bold drop-shadow-md hover:text-sky-200"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBorder"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 relative">
                {/* Profile Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className="text-secondary text-sm font-medium flex items-center gap-1.5 bg-white/50 px-3 py-1.5 rounded-lg border border-accent/10 hover:bg-white/80 transition-all cursor-pointer focus:outline-none select-none"
                >
                  <User className="h-4 w-4 text-accent" />
                  Hi, <span className="text-accent font-semibold">{user.name.split(" ")[0]}</span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-accent/10 shadow-premium overflow-hidden z-50 py-1"
                    >
                      {user.name === "Admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-secondary hover:text-primary hover:bg-accent/5 transition-colors font-semibold"
                        >
                          <Shield className="h-4 w-4 text-accent" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold text-left cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/auth/signin">
                  <button className={`text-sm font-bold px-4 py-2 transition-colors cursor-pointer ${
                    scrolled ? "text-secondary hover:text-primary" : "text-white drop-shadow-md hover:text-sky-200"
                  }`}>
                    Sign In
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-2.5 bg-sky-gradient text-primary font-bold text-sm rounded-xl shadow-sky hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-secondary hover:text-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 border-b border-accent/10 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent font-semibold"
                        : "text-secondary hover:bg-accent/5 hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 px-4 border-t border-gray-200">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="text-center text-secondary text-sm py-2">
                      Logged in as <span className="text-accent font-bold">{user.name}</span>
                    </div>
                    {user.name === "Admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3 border border-accent/20 bg-accent/5 hover:bg-accent/10 text-accent font-bold text-center rounded-xl flex items-center justify-center gap-2"
                      >
                        <Shield className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full py-3 border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-center rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-3 border border-gray-200 hover:bg-gray-50 text-secondary font-bold text-center rounded-xl cursor-pointer">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full py-3 bg-sky-gradient text-primary font-bold text-center rounded-xl shadow-sky cursor-pointer">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
