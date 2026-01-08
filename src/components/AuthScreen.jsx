"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  CloudIcon,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthScreen({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await result.json();
    const { token, user } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    onAuth(user);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#E2FF54]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-[#E2FF54] rounded-2xl shadow-[0_0_30px_rgba(226,255,84,0.2)] mb-4">
            <CloudIcon className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
            Mazlis <span className="text-gray-600">Secure</span>
          </h1>
          <p className="text-gray-500 text-xs font-mono mt-2 tracking-widest uppercase">
            Protocol: {isLogin ? "Authentication_V2" : "Encryption_Setup"}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#0D0D0D] border border-white/5 rounded-[32px] p-8 shadow-2xl relative">
          <div className="absolute top-0 right-10 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#E2FF54]/40 to-transparent" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                    Operator_Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#E2FF54] transition-colors" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Asif"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#E2FF54] text-white transition-all placeholder:text-gray-700"
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                Access_Identifier
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#E2FF54] transition-colors" />
                <input
                  required
                  type="email"
                  placeholder="name@mazlis.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#E2FF54] text-white transition-all placeholder:text-gray-700"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                Security_Passphrase
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#E2FF54] transition-colors" />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#E2FF54] text-white transition-all placeholder:text-gray-700"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              disabled={loading}
              className="w-full bg-[#E2FF54] text-black hover:bg-[#d4f043] rounded-2xl py-6 font-black uppercase text-[12px] tracking-widest mt-4 shadow-[0_10px_20px_rgba(226,255,84,0.1)] group"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  Synchronizing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {isLogin ? "Initialize Session" : "Create Identifier"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-500 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors"
            >
              {isLogin
                ? "New Operator? Create Node"
                : "Existing Operator? Login"}
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex justify-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-1 text-[10px] text-white font-bold uppercase">
            <ShieldCheck className="w-3 h-3 text-[#E2FF54]" /> AES_256
          </div>
          <div className="flex items-center gap-1 text-[10px] text-white font-bold uppercase">
            <Zap className="w-3 h-3 text-[#E2FF54]" /> Zero_Knowledge
          </div>
        </div>
      </motion.div>
    </div>
  );
}
