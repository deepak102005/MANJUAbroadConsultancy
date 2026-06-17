import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Award } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark border-t border-white/10 text-gray-400">
      {/* Upper Footer: Branding & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-gold overflow-hidden">
                <Image
                  src={logo}
                  alt="MANJU ABROAD CONSULTANCY Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block text-lg font-extrabold tracking-wider text-white">
                  MANJU
                </span>
                <span className="block text-[10px] tracking-[0.22em] font-bold text-gold-gradient uppercase -mt-1">
                  Abroad Consultancy
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Your Future. Our Promise. Expert guidance for USA Student, H1B, H4, and B1/B2 visa applications with professional visa slot booking assistance.
            </p>
            {/* Registration badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <Award className="h-4 w-4 text-accent" />
              <div className="text-[11px] text-gray-300">
                <span className="block font-medium">Reg No:</span>
                <span className="font-mono text-gray-400">AP-06-84-019-02488722</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
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
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Visa Services */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-6">
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
                    className="text-sm hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-6">
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed text-gray-400">
                  #68-3-17, NSM School Road,
                  <br />
                  Patamata, Vijayawada - 520010,
                  <br />
                  Krishna District, Andhra Pradesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a
                  href="tel:+919666991668"
                  className="text-sm hover:text-white transition-colors"
                >
                  +91 96669 91668
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a
                  href="mailto:manjuabroadconsultancy@gmail.com"
                  className="text-sm hover:text-white transition-colors break-all"
                >
                  manjuabroadconsultancy@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Copyright & Bottom Links */}
      <div className="border-t border-white/5 py-6 bg-primary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-center md:text-left text-gray-500">
            &copy; {currentYear} MANJU ABROAD CONSULTANCY. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
