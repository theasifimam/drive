// components/drive/EmptyState.tsx
import { SearchIcon } from "lucide-react";

export default function EmptyState({ searchQuery }) {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center transition-colors duration-500">
      <div className="p-6 rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 mb-6 text-slate-300 dark:text-gray-600 shadow-inner dark:shadow-none">
        <SearchIcon className="w-12 h-12" />
      </div>
      <p className="text-xl font-black uppercase tracking-tighter text-slate-900 dark:text-white opacity-40">
        {searchQuery ? "No Matches Found" : "Vault Empty"}
      </p>
      <p className="text-xs text-slate-400 dark:text-gray-500 mt-2 font-mono uppercase tracking-widest opacity-40">
        Folder contains no data packets
      </p>
    </div>
  );
}
