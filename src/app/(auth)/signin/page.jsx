"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ChevronRight, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { signin, isLoading, error, needsVerification } = useAuthStore();

  useEffect(() => {
    if (needsVerification) {
      router.push("/signup");
    }
  }, [needsVerification]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signin(formData);
    if (result.success) router.push("/");
  };

  return (
    <div className="flex flex-col h-full w-full max-w-120 mx-auto justify-between transition-colors duration-300">
      {/* HEADER MODULE */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Fingerprint
            size={16}
            className="text-lime-600 dark:text-nexus-accent"
          />
          <span className="text-[10px] font-mono text-lime-600 dark:text-nexus-accent uppercase tracking-[0.3em]">
            Auth_Sequence: Initialize
          </span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">
          Access_Identifier
        </h2>
        {error && (
          <p className="text-[10px] text-red-600 dark:text-red-500 font-mono uppercase mt-2 bg-red-500/10 py-1 px-3 rounded border border-red-500/20 w-fit">
            Error: {error}
          </p>
        )}
      </div>

      {/* FORM BENTO STACK */}
      <form onSubmit={handleLogin} className="flex-1 space-y-4">
        {/* EMAIL MODULE - Recessed in light mode */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/5 transition-all duration-300 focus-within:border-lime-500/50 dark:focus-within:border-nexus/30 focus-within:bg-white dark:focus-within:bg-white/4 group shadow-inner dark:shadow-none">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500 block mb-2">
            System_Email
          </label>
          <div className="relative">
            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-600 group-focus-within:text-lime-600 dark:group-focus-within:text-nexus-accent transition-colors" />
            <input
              type="text"
              placeholder="operator@mazlis.com"
              className="w-full bg-transparent pl-8 pr-2 py-1 text-sm focus:outline-none text-slate-900 dark:text-white font-mono placeholder:text-slate-300 dark:placeholder:text-gray-800"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* PASSWORD MODULE - Recessed in light mode */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/2 border border-slate-200 dark:border-white/5 transition-all duration-300 focus-within:border-lime-500/50 dark:focus-within:border-nexus-accent/30 focus-within:bg-white dark:focus-within:bg-white/4 group shadow-inner dark:shadow-none">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-gray-500">
              Passphrase
            </label>
            <Link
              href="/forgot"
              className="text-[8px] font-mono text-slate-400 hover:text-lime-600 dark:text-gray-700 dark:hover:text-gray-500 cursor-pointer uppercase tracking-tighter transition-colors"
            >
              Forgot_Key?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-gray-600 group-focus-within:text-lime-600 dark:group-focus-within:text-nexus-accent transition-colors" />
            <input
              required
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-transparent pl-8 pr-2 py-1 text-sm focus:outline-none text-slate-900 dark:text-white font-mono placeholder:text-slate-300 dark:placeholder:text-gray-800"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        <Button
          disabled={isLoading}
          className="w-full bg-lime-400 dark:bg-nexus-accent text-black hover:bg-lime-500 dark:hover:bg-[#d4f043] rounded-2xl h-14 font-black uppercase text-[12px] tracking-widest mt-2 group shadow-xl shadow-lime-500/10 transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              Synchronizing...
            </span>
          ) : (
            <>
              Initialize_Session
              <ChevronRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </>
          )}
        </Button>
      </form>

      {/* LOWER BENTO FOOTER */}
      <div className="mt-12 grid grid-cols-2 gap-3">
        <Link
          href="/signup"
          className="bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex flex-col gap-2 hover:bg-slate-50 dark:hover:bg-white/3 transition-all group shadow-sm dark:shadow-none"
        >
          <span className="text-[8px] font-mono text-slate-400 dark:text-gray-600 uppercase">
            New_Identity
          </span>
          <span className="text-[10px] font-bold text-slate-800 dark:text-white uppercase group-hover:text-lime-600 dark:group-hover:text-nexus-accent transition-colors">
            Create_Node
          </span>
        </Link>
        <Link
          href="/reset-password"
          className="bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/5 rounded-2xl p-4 flex flex-col gap-2 opacity-50 grayscale hover:grayscale-0 transition-all shadow-sm dark:shadow-none"
        >
          <span className="text-[8px] font-mono text-slate-400 dark:text-gray-600 uppercase">
            Reset_Now
          </span>
          <span className="text-[10px] font-bold text-slate-800 dark:text-white uppercase">
            Forgot Password
          </span>
        </Link>
      </div>
    </div>
  );
}
