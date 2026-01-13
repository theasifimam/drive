// components/drive/DragDropOverlay.tsx
import { UploadIcon } from "lucide-react";

export default function DragDropOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-white/40 dark:bg-black/40 transition-colors duration-500">
      <div className="p-10 rounded-full bg-white dark:bg-black border-2 border-lime-500 dark:border-nexus-accent shadow-[0_0_50px_rgba(132,204,22,0.3)] dark:shadow-[0_0_50px_rgba(226,255,84,0.2)] animate-pulse">
        <UploadIcon className="w-16 h-16 text-lime-600 dark:text-nexus-accent" />
      </div>
      <p className="mt-6 text-2xl font-black uppercase tracking-[0.3em] text-lime-600 dark:text-nexus-accent">
        Deploy_Files
      </p>
      <p className="text-slate-500 dark:text-gray-500 font-mono text-xs mt-2 uppercase tracking-widest">
        Release to initiate transfer
      </p>
    </div>
  );
}
