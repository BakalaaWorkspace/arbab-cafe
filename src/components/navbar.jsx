import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed top-0 z-[100] w-full transform-gpu will-change-transform`}
    >
      {/* Background layer (separate to avoid border artifacts) */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            : "bg-transparent"
        }`}
      />

      {/* Soft gradient divider instead of border */}
      {isScrolled && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

      <nav className="relative mx-auto max-w-500 px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "py-3" : "py-6"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="group relative flex items-center">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src="src/assets/logo.png"
              alt="Arbab Cafe"
              className="h-8 sm:h-10 w-auto object-contain brightness-110"
            />
            <div className="absolute inset-0 rounded-full bg-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Right actions */}
          <Link to="/checkout" className="relative group">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 rounded-full bg-zinc-900/90 px-4 py-2 sm:px-5 sm:py-2.5 shadow-xl ring-1 ring-white/10 transition-all group-hover:ring-red-600/50"
            >
              <div className="relative">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-200 group-hover:text-red-500 transition-colors" />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[9px] font-bold text-white">
                  0
                </span>
              </div>
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest text-zinc-200">
                Cart
              </span>
            </motion.div>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
