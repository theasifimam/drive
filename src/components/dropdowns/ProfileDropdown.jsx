import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";

const ProfileDropdown = ({ user, onLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 pl-2 pr-3 py-1.5 rounded-[18px] hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-[#E2FF54] to-[#99af2c] flex items-center justify-center text-black font-black text-xs shadow-lg transform group-hover:rotate-3 transition-transform">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="hidden xl:flex flex-col items-start">
            <span className="text-xs font-black text-white uppercase tracking-tighter">
              {user?.name || "Unknown_User"}
            </span>
            <span className="text-[9px] text-[#E2FF54] font-bold uppercase tracking-widest opacity-70">
              Lvl_4_Op
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 bg-[#0D0D0D] border-white/10 text-white rounded-2xl p-2 shadow-2xl backdrop-blur-xl"
      >
        <div className="px-3 py-4 bg-white/3 rounded-xl mb-2 border border-white/5">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
            Authenticated_As
          </p>
          <p className="text-sm font-bold text-white truncate">{user?.email}</p>
        </div>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem
          onClick={onLogout}
          className="rounded-lg text-red-500 focus:bg-red-500/10 focus:text-red-400 py-3 cursor-pointer font-black text-[10px] uppercase tracking-widest"
        >
          <LogOutIcon size={16} className="mr-3" />
          Terminate_Session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
