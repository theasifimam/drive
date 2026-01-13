import React from "react";
import { CloudIcon, SearchIcon, Command } from "lucide-react";
import ProfileDropdown from "./dropdowns/ProfileDropdown";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full px-6 py-3 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 transition-colors duration-500">
      <div className="flex items-center justify-between gap-8">
        {/* SECTION 1: COMPACT BRAND */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-lime-400 dark:bg-nexus-accent p-1.5 rounded-lg shadow-[0_4px_12px_rgba(132,204,22,0.2)] dark:shadow-[0_0_15px_rgba(226,255,84,0.1)]">
            <CloudIcon className="w-4 h-4 text-black" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white leading-none transition-colors">
              Mazlis{" "}
              <span className="text-slate-400 dark:text-gray-600 font-medium tracking-tighter">
                Drive
              </span>
            </h1>
          </div>
        </div>

        {/* SECTION 2: SLIM SEARCH BAR (Fluid) */}
        <div className="flex-1 max-w-xl relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-gray-600 group-focus-within:text-slate-900 dark:group-focus-within:text-nexus-accent transition-colors" />
          <input
            type="text"
            placeholder="Search directory..."
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl py-2 pl-10 pr-12 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-lime-500/50 dark:focus:border-nexus-accent/50 focus:ring-1 focus:ring-lime-500/20 dark:focus:ring-nexus-accent/20 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700 font-mono shadow-inner dark:shadow-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 opacity-40">
            <Command size={10} className="text-slate-900 dark:text-white" />
            <span className="text-[9px] text-slate-900 dark:text-white font-mono font-bold">
              K
            </span>
          </div>
        </div>

        {/* SECTION 3: UTILS & PROFILE */}
        <div className="flex items-center gap-4 shrink-0">
          {/* User Module */}
          <div className="flex items-center gap-3 pl-1">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
