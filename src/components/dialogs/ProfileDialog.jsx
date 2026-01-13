"use client";

import { useState, useRef } from "react";
import {
  Shield,
  User,
  Camera,
  Save,
  AlignLeft,
  Info,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";

export function ProfileDialog() {
  const updateMe = useAuthStore((state) => state.updateMe);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    bio: user?.bio || "",
  });

  const [previewUrl, setPreviewUrl] = useState(
    "http://localhost:5000" + user?.avatarThumbnail || ""
  );
  const fileInputRef = useRef(null);

  //   handle form submit here
  async function handleSubmit(e) {
    e.preventDefault();
    // Use FormData because we are sending a File object (Avatar)
    const submitData = new FormData();
    submitData.append("displayName", formData.displayName);
    submitData.append("bio", formData.bio);

    if (fileInputRef.current?.files[0]) {
      submitData.append("avatar", fileInputRef.current.files[0]);
    }
    const result = await updateMe(submitData);
    if (result.success) {
      const closeButton = document.querySelector(
        "[data-radix-collection-item]"
      );
      closeButton?.click();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-auto px-4 py-4 bg-background/40 hover:bg-background/80 rounded-[22px] border-border/50 flex flex-col items-start gap-1 transition-all group active:scale-[0.98]"
        >
          <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
            <Shield size={10} className="text-nexus-accent" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Operator_Identity
            </span>
          </div>
          <p className="text-[13px] font-bold truncate w-full text-left dark:text-zinc-200">
            {user?.email || "identity_unverified"}
          </p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-110 p-0 bg-transparent border-none">
        <form
          className="bg-white dark:bg-[#080808] overflow-hidden border border-white/5 rounded-4xl p-0 outline-none shadow-2xl"
          onSubmit={handleSubmit}
        >
          {/* 1. HEADER & AVATAR EDIT */}
          <div className="relative h-32 bg-zinc-100 dark:bg-zinc-900/50">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="absolute -bottom-12 left-8">
              <div className="relative group">
                <Avatar className="h-24 w-24 rounded-[28px] border-[6px] border-white dark:border-[#080808] shadow-2xl overflow-hidden">
                  <AvatarImage
                    src={previewUrl}
                    className="object-cover transition-all group-hover:scale-105"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 font-black text-xl rounded-none">
                    OP
                  </AvatarFallback>
                </Avatar>

                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreviewUrl(URL.createObjectURL(file));
                  }}
                />

                <button
                  type="button" // Important: prevents form submission
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 p-2.5 bg-nexus-accent text-black rounded-xl shadow-lg hover:scale-110 active:scale-90 transition-all z-10 border-4 border-white dark:border-[#080808]"
                >
                  <Camera size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. FORM SECTION */}
          <div className="px-8 pt-16 pb-8 space-y-6">
            <div className="space-y-1">
              <DialogTitle className="text-2xl font-black italic tracking-tighter uppercase leading-none">
                Identity_Sync
              </DialogTitle>
              <p className="text-[10px] font-bold text-nexus-accent uppercase tracking-widest">
                Level_01 Admin Access
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <User size={10} /> Public_Handle
                </label>
                <Input
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="h-12 bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/5 rounded-xl font-bold px-4 focus-visible:ring-nexus-accent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <AlignLeft size={10} /> Operator_Directive
                </label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Initialize bio sequence..."
                  className="min-h-25 bg-zinc-50 dark:bg-white/5 border-zinc-200 dark:border-white/5 rounded-xl font-medium p-4 resize-none leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-xl bg-zinc-100/50 dark:bg-white/2 border border-dashed border-zinc-200 dark:border-white/10 flex items-center justify-between group">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">
                    System_Auth_Mail
                  </span>
                  <span className="text-[12px] font-bold text-zinc-400">
                    {user?.email}
                  </span>
                </div>
                <Info
                  size={14}
                  className="text-zinc-500 opacity-50 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            <Button
              disabled={isLoading}
              className="w-full h-14 bg-black dark:bg-nexus-accent text-nexus-accent dark:text-black rounded-2xl font-black uppercase tracking-[0.15em] hover:opacity-90 transition-all shadow-xl shadow-nexus-accent/5"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Save size={18} className="mr-2" />
              )}
              {isLoading ? "Syncing..." : "Sync_Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
