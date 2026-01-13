"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  LogOutIcon,
  Moon,
  Sun,
  Shield,
  Recycle,
  ShieldEllipsis,
} from "lucide-react";
import { useTheme } from "next-themes"; // Import the hook
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "next/navigation";
import { ProfileDialog } from "../dialogs/ProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileDropdown = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const signout = useAuthStore((state) => state.signout);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  const handleSignout = () => {
    signout(); // Clears state and LocalStorage automatically
    router.push("/signin"); // Smooth navigation
  };

  function renderAvatar(img) {
    if (img) {
      return "http://localhost:5000" + img;
    } else return false;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-[18px] hover:bg-foreground/5 transition-all border border-transparent hover:border-border group outline-none">
          <Avatar className="w-9 h-9 rounded-[14px] border-nexus-accent border-4 shadow-lg transform group-hover:rotate-3 transition-transform overflow-hidden">
            <AvatarImage
              src={renderAvatar(user?.avatar)}
              alt={user?.account?.username}
              className="object-cover"
            />
            <AvatarFallback className="w-full h-full rounded-none bg-linear-to-br from-nexus-accent to-[#99af2c] flex items-center justify-center text-black font-black text-xs">
              {user?.account?.username?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="hidden xl:flex flex-col items-start text-left">
            <span className="text-xs font-black text-foreground uppercase tracking-tighter">
              {isLoading
                ? "loading..."
                : user?.displayName || user?.username || "Unknown_User"}
            </span>
            <span className="text-[9px] text-green-600 dark:text-nexus-accent font-bold uppercase tracking-widest opacity-80">
              Lvl_4_Op
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 bg-card/90 border-border text-foreground rounded-3xl p-3 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95"
      >
        {/* SECTION 1: USER INFO */}
        <ProfileDialog />

        {/* SECTION 2: INTEGRATED THEME SWITCHER (Using next-themes) */}
        <div className="p-1 my-2 bg-background/50 rounded-xl border border-border flex gap-1">
          <button
            onClick={() => setTheme("dark")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${
              theme === "dark"
                ? "bg-nexus-accent text-black font-bold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Moon size={14} />
            <span className="text-[10px] uppercase font-black tracking-tighter">
              Night
            </span>
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${
              theme === "light"
                ? "bg-nexus-accent text-black font-bold shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sun size={14} />
            <span className="text-[10px] uppercase font-black tracking-tighter">
              Day
            </span>
          </button>
        </div>

        <DropdownMenuSeparator className="bg-border opacity-50 my-2" />

        <DropdownMenuItem className="group rounded-xl text-gray-500 dark:text-gray-400 focus:bg-gray-500/10 focus:text-gray-700 dark:focus:text-gray-400 py-3 px-4 cursor-pointer font-black text-[10px] uppercase tracking-widest transition-all mt-1">
          <ShieldEllipsis
            size={16}
            className="mr-3 transition-transform group-hover:-translate-x-1"
          />
          Reset password
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/recycle-bin")}
          className="group rounded-xl text-gray-500 dark:text-gray-400 focus:bg-gray-500/10 focus:text-gray-700 dark:focus:text-gray-400 py-3 px-4 cursor-pointer font-black text-[10px] uppercase tracking-widest transition-all mt-1"
        >
          <Recycle
            size={16}
            className="mr-3 transition-transform group-hover:-translate-x-1"
          />
          Recycle Bin
        </DropdownMenuItem>

        {/* SECTION 3: ACTIONS */}
        <DropdownMenuItem
          onClick={handleSignout}
          className="group rounded-xl text-red-600 dark:text-red-500 focus:bg-red-500/10 focus:text-red-700 dark:focus:text-red-400 py-3 px-4 cursor-pointer font-black text-[10px] uppercase tracking-widest transition-all mt-1"
        >
          <LogOutIcon
            size={16}
            className="mr-3 transition-transform group-hover:-translate-x-1"
          />
          Terminate_Session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
