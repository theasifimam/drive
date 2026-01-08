import React from "react";
import { CloudIcon, SearchIcon, Command } from "lucide-react";
import ProfileDropdown from "./dropdowns/ProfileDropdown";

const Header = ({ user, onLogout, searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-40 w-full px-6 py-3 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center justify-between gap-8">
        {/* SECTION 1: COMPACT BRAND */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#E2FF54] p-1.5 rounded-lg shadow-[0_0_15px_rgba(226,255,84,0.1)]">
            <CloudIcon className="w-4 h-4 text-black" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-black uppercase tracking-widest text-white leading-none">
              Mazlis{" "}
              <span className="text-gray-600 font-medium tracking-tighter">
                Drive
              </span>
            </h1>
          </div>
        </div>

        {/* SECTION 2: SLIM SEARCH BAR (Fluid) */}
        <div className="flex-1 max-w-xl relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 group-focus-within:text-[#E2FF54] transition-colors" />
          <input
            type="text"
            placeholder="Search directory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/5 rounded-xl py-2 pl-10 pr-12 text-xs text-white focus:outline-none focus:border-[#E2FF54]/30 focus:bg-white/5 transition-all placeholder:text-gray-700 font-mono"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 opacity-40">
            <Command size={10} className="text-gray-400" />
            <span className="text-[9px] text-gray-400 font-mono font-bold">
              K
            </span>
          </div>
        </div>

        {/* SECTION 3: UTILS & PROFILE */}
        <div className="flex items-center gap-4 shrink-0">
          {/* User Module */}
          <div className="flex items-center gap-3 pl-1">
            <div className="hidden lg:flex flex-col items-end leading-none mr-1">
              <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                {user?.name || "Operator"}
              </span>
              <span className="text-[8px] text-[#E2FF54] font-mono mt-0.5 uppercase opacity-70">
                Level_01
              </span>
            </div>
            <ProfileDropdown user={user} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
