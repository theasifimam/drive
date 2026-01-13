"use client";

import { motion } from "framer-motion";
import { CloudIcon, ShieldCheck, Zap, Globe, Terminal } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#050505] text-slate-900 dark:text-white flex items-center justify-center p-6 transition-colors duration-500 font-sans overflow-hidden">
      {/* Minimalist Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Simple Bento Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
        {/* TILE 1: BRAND HEADER (Wide & Thin) */}
        <motion.div className="md:col-span-12 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-[24px] p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-lime-400 dark:bg-nexus-accent p-2 rounded-xl">
              <CloudIcon size={20} className="text-black" />
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-[0.3em]">
                Mazlis_Vault
              </h1>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                Secure_Access_Point
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
            <span className="text-[10px] font-mono text-slate-400">
              NODE_ACTIVE
            </span>
          </div>
        </motion.div>

        {/* TILE 2: THE AUTH CORE (The Form - Main Focus) */}
        <div className="md:col-span-8 md:row-span-2 bg-white dark:bg-white/3 border border-slate-200 dark:border-white/10 rounded-4xl shadow-2xl relative overflow-hidden flex flex-col min-h-125">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-lime-400 dark:via-nexus-accent to-transparent" />

          {/* Vertically Centered Content Wrapper */}
          <div className="flex-1 flex flex-col items-center justify-center py-8 lg:py-12">
            <div className="w-full max-w-lg">{children}</div>
          </div>
        </div>

        {/* TILE 3: SECURITY PROTOCOL (Sidebar Top) */}
        <motion.div className="md:col-span-4 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-4xl p-8 flex flex-col justify-center items-center text-center shadow-sm">
          <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl mb-4">
            <ShieldCheck
              size={28}
              className="text-lime-600 dark:text-nexus-accent"
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 dark:text-gray-600 mb-1">
            Protection
          </p>
          <p className="text-sm font-bold tracking-tight">
            End-to-End Encrypted
          </p>
        </motion.div>

        {/* TILE 4: TERMINAL ACTION (Sidebar Bottom) */}
        <motion.div className="md:col-span-4 bg-slate-900 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-4xl p-8 flex flex-col justify-between text-white overflow-hidden relative group">
          <Terminal size={20} className="text-lime-400" />
          <div className="mt-4">
            <p className="text-[10px] font-mono text-slate-500 uppercase mb-2">
              Awaiting_Instructions...
            </p>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-lime-400 w-1/3 animate-[pan_2s_infinite]" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
