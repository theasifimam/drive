// components/drive/EmptyState.tsx
import { SearchIcon } from "lucide-react";

export default function EmptyState({ searchQuery }) {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center opacity-40">
      <div className="p-6 rounded-3xl bg-white/5 border border-white/5 mb-6 text-gray-600">
        <SearchIcon className="w-12 h-12" />
      </div>
      <p className="text-xl font-black uppercase tracking-tighter text-white">
        {searchQuery ? "No Matches Found" : "Vault Empty"}
      </p>
      <p className="text-xs text-gray-500 mt-2 font-mono uppercase">
        Folder contains no data packets
      </p>
    </div>
  );
}
