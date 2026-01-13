"use client";

import { Checkbox } from "@/components/ui/checkbox";
import FolderDropdown from "@/components/dropdowns/FolderDropdown";
import { getFileIcon, formatFileSize } from "@/lib/fileUtils";
import {
  HardDrive,
  FileText,
  ImageIcon,
  Eye,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { getThumbnailUrl } from "@/lib/utils";

const API_URL = "http://localhost:5000/api";

export default function FileCard({
  item,
  isSelected,
  onToggleSelection,
  onClick,
  isTrashView,
  ...actions
}) {
  const isImage = item.mimeType?.startsWith("image/");
  const isPDF = item.mimeType === "application/pdf"; // Construct URL with Token for authentication

  const thumbnail = encodeURI("http://localhost:5000" + item.thumbnailUrl);

  return (
    <div
      className={`group relative flex flex-col border rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden aspect-4/5 ${
        isTrashView ? "grayscale-[0.5] hover:grayscale-0" : ""
      } ${
        isSelected
          ? "bg-lime-500/10 dark:bg-nexus-accent/5 border-lime-500/50 dark:border-nexus-accent/40"
          : "bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none"
      }`}
      onClick={onClick}
    >
      {/* Red Pulse for Trash Items */}
      {isTrashView && (
        <div className="absolute top-4 right-4 z-40">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        </div>
      )}
      {isTrashView && (
        <div className="absolute inset-0 bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-2">
          <span className="text-[8px] font-black text-red-200 tracking-[0.3em] uppercase">
            Data_Corrupted
          </span>
          <div className="flex gap-2">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-nexus-accent hover:text-black transition-colors">
              <RotateCcw size={18} />
            </div>
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-red-600 transition-colors">
              <Trash2 size={18} />
            </div>
          </div>
        </div>
      )}

      {/* SELECTION & ACTIONS HUD */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-30">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelection}
          onClick={(e) => e.stopPropagation()}
          className="rounded-md border-slate-300 dark:border-white/20 data-[state=checked]:bg-lime-500 dark:data-[state=checked]:bg-nexus-accent data-[state=checked]:border-transparent"
        />

        <div
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FolderDropdown item={item} {...actions} />
        </div>
      </div>
      {/* VIEWPORT: IMAGE OR PDF PREVIEW */}
      <div className="flex-1 flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0D0D0D]">
        {isImage ? (
          <img
            src={thumbnail}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            alt={item.name}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        ) : isPDF ? (
          <div className="relative w-full h-full flex items-center justify-center bg-slate-100 dark:bg-white/2">
            <FileText size={48} className="text-red-500/40" strokeWidth={1} />

            <div className="absolute bottom-4 px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-[8px] font-mono text-red-600 dark:text-red-400">
              PDF_DOCUMENT
            </div>
          </div>
        ) : (
          <div className="scale-125 opacity-80 group-hover:opacity-100 transition-all text-slate-400 dark:text-gray-400">
            {getFileIcon(item)}
          </div>
        )}
        {/* HOVER EYE OVERLAY */}
        <div className="absolute inset-0 bg-lime-500/10 dark:bg-nexus-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-slate-900/80 dark:bg-black/80 p-3 rounded-full border border-lime-500/50 dark:border-nexus-accent/50 scale-75 group-hover:scale-100 transition-transform">
            <Eye size={20} className="text-lime-400 dark:text-nexus-accent" />
          </div>
        </div>
      </div>
      {/* DATA TRAY */}
      <div
        className={`p-4 border-t transition-colors ${
          isSelected
            ? "border-lime-500/20 bg-lime-500/5 dark:bg-nexus-accent/5"
            : "border-slate-100 dark:border-white/5 bg-white/20 dark:bg-black"
        }`}
      >
        <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate italic">
          {item.name}
        </p>

        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-1.5 text-slate-400 dark:text-gray-500">
            <HardDrive size={10} />
            <span className="text-[9px] font-mono uppercase">
              {formatFileSize(item.size)}
            </span>
          </div>

          {isImage ? (
            <ImageIcon
              size={10}
              className="text-slate-300 dark:text-gray-700"
            />
          ) : (
            isPDF && <div className="w-1 h-1 bg-red-500 rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
}
