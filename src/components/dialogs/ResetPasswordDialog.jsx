"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShieldEllipsis,
  Lock,
  KeyRound,
  Terminal,
  CheckCircle2,
  Loader2,
  Zap,
} from "lucide-react";

export default function ResetPasswordDialog() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Calculate Strength (0 to 4)
  const strength = useMemo(() => {
    let score = 0;
    const pass = formData.newPassword;
    if (!pass) return 0;
    if (pass.length > 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  }, [formData.newPassword]);

  const strengthColor = [
    "bg-red-500/20 text-red-500", // 0: Weak
    "bg-orange-500/20 text-orange-500", // 1: Low
    "bg-yellow-500/20 text-yellow-500", // 2: Medium
    "bg-blue-500/20 text-blue-500", // 3: High
    "bg-nexus-accent/20 text-nexus-accent", // 4: Secure
  ][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword)
      return toast.error("Ciphers do not match");

    setLoading(true);
    try {
      await apiClient.post("/auth/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success("Password changed successfully");
      setOpen((state) => !state);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.message
          ? error.response.data.message
          : "Failed to change password, Please Try again"
      );
    } finally {
      setLoading(false);
      // close modal
    }
  };

  return (
    <Dialog>
      <DialogTrigger open={open} onOpenChange={setOpen} asChild>
        <div className="group flex items-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-500/10 hover:text-gray-700 dark:hover:text-gray-300 py-3 px-4 cursor-pointer font-black text-[10px] uppercase tracking-widest transition-all mt-1">
          <ShieldEllipsis
            size={16}
            className="mr-3 transition-transform group-hover:-translate-x-1 text-nexus-accent"
          />
          Reset_Password
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] bg-white/80 dark:bg-[#0A0A0A]/90 backdrop-blur-2xl border-none rounded-[32px] p-6 shadow-2xl">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-2 opacity-50 mb-1">
            <Terminal size={12} className="text-nexus-accent" />
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase">
              Security_Protocol
            </span>
          </div>
          <DialogTitle className="text-xl font-black italic uppercase tracking-tighter">
            Identity_{" "}
            <span className="bg-black text-nexus-accent px-1">
              Re-Encryption
            </span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          {/* Current Password */}
          <div className="col-span-2 p-4 rounded-[22px] bg-black/5 dark:bg-white/[0.03] border border-white/5 focus-within:border-white/20 transition-all">
            <label className="text-[9px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2 mb-2">
              <Lock size={10} /> Current_Key
            </label>
            <Input
              required
              type="password"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({ ...formData, currentPassword: e.target.value })
              }
              className="bg-transparent border-none focus-visible:ring-0 text-sm font-mono p-0 h-auto"
            />
          </div>

          {/* Strength Meter Tile (New!) */}
          <div
            className={`col-span-2 p-4 rounded-[22px] border transition-all duration-500 flex justify-between items-center ${strengthColor} border-current/10`}
          >
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Zap size={10} /> Encryption_Strength
              </label>
              <div className="flex gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 w-6 rounded-full transition-all duration-500 ${
                      i < strength ? "bg-current" : "bg-current/10"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[10px] font-black italic uppercase tracking-widest">
              {["WEAK", "LOW", "MED", "HIGH", "SECURE"][strength]}
            </span>
          </div>

          {/* New Password */}
          <div className="col-span-2 md:col-span-1 p-4 rounded-[22px] bg-black/5 dark:bg-white/[0.03] border border-white/5 focus-within:border-nexus-accent/30 transition-all">
            <label className="text-[9px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2 mb-2">
              <KeyRound size={10} /> New_Cipher
            </label>
            <Input
              required
              type="password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({ ...formData, newPassword: e.target.value })
              }
              className="bg-transparent border-none focus-visible:ring-0 text-sm font-mono p-0 h-auto"
            />
          </div>

          {/* Confirm Password */}
          <div className="col-span-2 md:col-span-1 p-4 rounded-[22px] bg-black/5 dark:bg-white/[0.03] border border-white/5 focus-within:border-nexus-accent/30 transition-all">
            <label className="text-[9px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2 mb-2">
              <CheckCircle2 size={10} /> Verify_Cipher
            </label>
            <Input
              required
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="bg-transparent border-none focus-visible:ring-0 text-sm font-mono p-0 h-auto"
            />
          </div>

          <div className="col-span-2 mt-4 flex gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="ghost"
                className="flex-1 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-50"
              >
                Abort
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-nexus-accent hover:bg-nexus-accent/80 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-nexus-accent/20"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Apply_Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
