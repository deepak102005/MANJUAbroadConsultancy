"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Award } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide footer on auth pages
  if (pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="bg-bgLight border-t border-accent/10 text-secondary">
      {/* Upper Footer: Branding & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-6">
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
                <span className="block text-2xl sm:text-3xl font-serif font-extrabold tracking-wider text-primary group-hover:text-accent transition-colors duration-300">
                  MANJU
                </span>
                <span className="block text-[10px] sm:text-xs tracking-[0.22em] font-bold text-sky-gradient uppercase -mt-0.5">
                  Abroad Consultancy
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-secondary">
              Your Future. Our Promise. Expert guidance for USA Student, H1B, H4, and B1/B2 visa applications with professional visa slot booking assistance.
            </p>
            {/* Registration badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/10">
              <Award className="h-4 w-4 text-accent" />
              <div className="text-[11px] text-primary">
                <span className="block font-medium">Reg No:</span>
                <span className="font-mono text-secondary">AP-06-84-019-02488722</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-primary font-semibold text-sm tracking-wider uppercase mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Our Services", href: "/services" },
                { name: "Book Now", href: "/book" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Visa Services */}
          <div>
            <h3 className="text-primary font-semibold text-sm tracking-wider uppercase mb-6">
              Visa Services
            </h3>
            <ul className="space-y-3.5">
              {[
                { name: "F1 Student Visa", href: "/services#student" },
                { name: "H1B Work Visa", href: "/services#h1b" },
                { name: "H4 Dependent Visa", href: "/services#h4" },
                { name: "B1/B2 Tourist Visa", href: "/services#tourist" },
                { name: "Visa Slot Booking", href: "/services#booking" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-6">
            <h3 className="text-primary font-semibold text-sm tracking-wider uppercase">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a
                  href="tel:+919666991668"
                  className="text-sm hover:text-primary transition-colors"
                >
                  +91 96669 91668
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a
                  href="mailto:manjuabroadconsultancy@gmail.com"
                  className="text-sm hover:text-primary transition-colors break-all"
                >
                  manjuabroadconsultancy@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Copyright & Bottom Links */}
      <div className="border-t border-accent/10 py-6 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-center md:text-left text-secondary">
            &copy; {currentYear} MANJU ABROAD CONSULTANCY. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-secondary">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
