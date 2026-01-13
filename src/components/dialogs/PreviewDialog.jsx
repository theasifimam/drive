"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  XIcon,
  FileIcon,
  ShieldCheck,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function PreviewDialog({
  open,
  onOpenChange,
  file,
  onNavigate,
  onDownload,
  user,
}) {
  if (!file) return null;
  const isImage = file.mimeType?.startsWith("image/");
  const isVideo = file.mimeType?.startsWith("video/");
  const isPDF = file?.path?.endsWith(".pdf");

  const previewUrl = encodeURI(`${API_URL}/files/view/${user.id}/${file._id}`);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="rounded-none">
      <DialogHeader className="hidden">
        <DialogTitle className="hidden"></DialogTitle>
      </DialogHeader>
      {/* Modal Background stays dark for cinematic focus, but UI adapts */}
      <DialogContent className="max-w-none min-w-screen rounded-none h-screen bg-[#050505] border-none p-0 m-0 gap-0 overflow-hidden outline-none ring-0 flex flex-col justify-center items-center">
        {/* TOP INTERFACE: Adaptive glassmorphism */}
        <div className="absolute top-0 left-0 w-full z-50 p-6 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent backdrop-blur-[2px]">
          <div className="flex items-center gap-4 pl-4">
            {/* Keeping the brand accent color consistent */}
            <div className="bg-lime-400 dark:bg-nexus-accent p-2 rounded-lg">
              <FileIcon className="w-4 h-4 text-black" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-black uppercase tracking-tighter truncate max-w-62.5 md:max-w-xl text-white">
                {file.name}
              </h3>
              <p className="text-[9px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">
                Node_Preview // {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pr-4">
            {/* Buttons that pop in Light Mode but stay sleek in Dark */}
            <Button
              onClick={onDownload}
              className="hidden md:flex bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 text-white hover:bg-white hover:text-black dark:hover:bg-nexus-accent dark:hover:text-black rounded-full px-6 transition-all font-bold uppercase text-[10px] tracking-widest"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 hover:bg-red-500/80 text-white transition-all border border-white/20 dark:border-white/10"
            >
              <XIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* EDGE-TO-EDGE MEDIA CONTAINER: No Rounded Corners */}
        <div className="w-full h-full relative flex items-center justify-center bg-black">
          {/* NAVIGATION */}
          <div className="absolute left-0 top-0 h-full w-24 z-40 flex items-center justify-center group/nav">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(-1);
              }}
              className="h-16 w-16 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover/nav:opacity-100 hover:bg-white hover:text-black dark:hover:bg-nexus-accent transition-all duration-300 text-white"
            >
              <ChevronLeftIcon className="w-10 h-10" />
            </Button>
          </div>

          <div className="absolute right-0 top-0 h-full w-24 z-40 flex items-center justify-center group/nav">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(1);
              }}
              className="h-16 w-16 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover/nav:opacity-100 hover:bg-white hover:text-black dark:hover:bg-nexus-accent transition-all duration-300 text-white"
            >
              <ChevronRightIcon className="w-10 h-10" />
            </Button>
          </div>

          <div className="w-full h-full flex items-center justify-center">
            {isImage ? (
              <img
                src={previewUrl}
                alt={file.name}
                className="max-w-full max-h-full object-contain select-none shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                loading="lazy"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            ) : isVideo ? (
              <div className="w-full h-full">
                <video
                  src={previewUrl}
                  controls
                  autoPlay
                  className="w-full h-full bg-black"
                />
              </div>
            ) : isPDF ? (
              <div className="w-full h-full">
                <iframe
                  src={previewUrl}
                  title={file.name}
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 p-16 border border-white/10 bg-white/5 backdrop-blur-md">
                <FileIcon size={80} className="text-gray-600" strokeWidth={1} />
                <div className="text-center">
                  <p className="font-mono text-xs uppercase tracking-[0.4em] text-gray-400 mb-2">
                    Binary_Stream
                  </p>
                  <span className="px-3 py-1 bg-white/10 text-white rounded text-[10px] font-mono border border-white/20 italic">
                    {file.mimeType}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FLOATING HUD: Light/Dark Adaptive but on Dark Ground */}
        <div className="absolute bottom-12 z-50 flex items-center gap-6 px-8 py-3 bg-white/10 dark:bg-black/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={14}
              className="text-lime-400 dark:text-nexus-accent"
            />
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">
              Secure_Node_Output
            </span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lime-400 dark:bg-nexus-accent animate-pulse" />
            <span className="text-[10px] font-mono text-white">
              SYSTEM_PREVIEW
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
