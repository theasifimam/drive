"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Smartphone,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Timer,
  Fingerprint,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function OTPResetPage() {
  const [step, setStep] = useState(1); // Step 1: Identity, Step 2: OTP
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleNextStep = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleOtpChange = (value, index) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5)
      document.getElementById(`otp-${index + 1}`)?.focus();
  };

  return (
    <div className="flex flex-col h-full w-full max-w-120 mx-auto justify-between min-h-125 transition-colors duration-300">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 text-lime-600 dark:text-nexus-accent">
          {step === 1 ? (
            <Fingerprint size={16} />
          ) : (
            <ShieldCheck size={16} className="animate-pulse" />
          )}
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
            {step === 1
              ? "Protocol: Identity_Check"
              : "Protocol: Verification_Required"}
          </span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">
          {step === 1 ? "Recovery_Start" : "Confirm_Override"}
        </h2>
        <p className="text-[10px] text-slate-400 dark:text-gray-500 font-mono uppercase tracking-widest mt-3">
          {step === 1
            ? "Enter system identifier to receive sync code"
            : `Sync code sent to: ${identifier}`}
        </p>
      </div>

      {/* FORM AREA */}
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onSubmit={handleNextStep}
            className="flex-1 space-y-4"
          >
            {/* Input Bento Group */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 focus-within:border-lime-500/50 dark:focus-within:border-nexus-accent/30 transition-all group shadow-inner">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-600 block mb-3">
                Email_or_Mobile
              </label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-700 group-focus-within:text-lime-600 dark:group-focus-within:text-nexus-accent transition-colors" />
                <input
                  required
                  type="text"
                  placeholder="name@mazlis.com"
                  className="w-full bg-transparent pl-8 pr-2 py-1 text-sm focus:outline-none text-slate-900 dark:text-white font-mono placeholder:text-slate-300 dark:placeholder:text-white/10"
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>
            <Button
              disabled={loading}
              className="w-full bg-lime-400 dark:bg-nexus-accent text-black hover:bg-lime-500 dark:hover:bg-[#d4f043] rounded-2xl h-14 font-black uppercase text-[12px] tracking-widest mt-2 group shadow-lg shadow-lime-500/20 dark:shadow-none transition-all"
            >
              {loading ? "Searching_Database..." : "Request_Access_Code"}
              <ChevronRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </motion.form>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-6"
          >
            <div className="flex justify-between gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-full h-14 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center text-xl font-mono font-bold text-lime-600 dark:text-nexus-accent focus:ring-1 focus:ring-lime-500 dark:focus:ring-nexus-accent outline-none transition-all shadow-inner"
                />
              ))}
            </div>
            <Button className="w-full bg-lime-400 dark:bg-nexus-accent text-black hover:bg-lime-500 dark:hover:bg-[#d4f043] rounded-2xl h-14 font-black uppercase text-[12px] tracking-widest group shadow-lg shadow-lime-500/20">
              Validate_Sync_Code
            </Button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-center text-[10px] font-mono text-slate-400 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white uppercase tracking-widest transition-colors"
            >
              Wrong identifier? Go back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER BENTO ELEMENTS */}
      <div className="mt-8 grid grid-cols-12 gap-3">
        {/* Cancel Button Tile */}
        <Link
          href="/signin"
          className="col-span-4 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-white/3 transition-all group shadow-sm dark:shadow-none"
        >
          <ChevronLeft
            size={16}
            className="text-slate-400 dark:text-gray-600 group-hover:text-lime-600 dark:group-hover:text-nexus-accent"
          />
          <span className="text-[8px] font-bold text-slate-400 dark:text-gray-500 uppercase mt-1">
            Cancel
          </span>
        </Link>

        {/* Status Tile */}
        <div className="col-span-8 bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex items-center justify-between px-6 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-3">
            <Timer size={14} className="text-slate-400 dark:text-gray-600" />
            <div className="flex flex-col">
              <span className="text-[8px] font-mono text-slate-400 dark:text-gray-600 uppercase">
                Status
              </span>
              <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase">
                Secure_Link
              </span>
            </div>
          </div>
          <div className="h-2.5 w-2.5 rounded-full bg-lime-500 dark:bg-nexus-accent animate-pulse shadow-[0_0_8px_rgba(132,204,22,0.4)]" />
        </div>
      </div>
    </div>
  );
}
