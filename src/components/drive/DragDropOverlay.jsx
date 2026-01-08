// components/drive/DragDropOverlay.tsx
import { UploadIcon } from "lucide-react";

export default function DragDropOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-black/40">
      <div className="p-10 rounded-full bg-black border border-[#E2FF54] shadow-[0_0_50px_rgba(226,255,84,0.2)] animate-pulse">
        <UploadIcon className="w-16 h-16 text-[#E2FF54]" />
      </div>
      <p className="mt-6 text-2xl font-black uppercase tracking-[0.3em] text-[#E2FF54]">
        Deploy_Files
      </p>
      <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-widest">
        Release to initiate transfer
      </p>
    </div>
  );
}
