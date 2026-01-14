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

export default function FileCard({
  item,
  isSelected,
  onToggleSelection,
  onClick,
  isTrashView,
  restoreItems,
  bulkDeletePermanently,
  ...actions
}) {
  const isImage = item.mimeType?.startsWith("image/");
  const isPDF = item.mimeType === "application/pdf";
  const thumbnail = encodeURI("http://localhost:5000" + item.thumbnailUrl);

  return (
    <div
      className={`group relative flex flex-col border rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden aspect-4/5 
        ${isTrashView ? "grayscale-[0.5] hover:grayscale-0" : ""} 
        ${
          isSelected
            ? "border-nexus-accent/90 ring-1 ring-nexus-accent/30"
            : "bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 shadow-sm"
        }`}
      onClick={onClick}
    >
      {/* 1. SELECTION & ACTIONS HUD */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-40">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelection}
          onClick={(e) => e.stopPropagation()}
          className="rounded-md border-slate-400 dark:border-white/30 data-[state=checked]:bg-nexus-accent"
        />
        <div
          onClick={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FolderDropdown item={item} {...actions} />
        </div>
      </div>

      {/* 2. FULL VIEWPORT (Image or Icon) */}
      <div className="absolute inset-0 z-0 bg-slate-50 dark:bg-[#0D0D0D]">
        {isImage ? (
          <img
            src={thumbnail}
            alt={item.name}
            // Removed any rotate classes; object-cover maintains aspect ratio
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full opacity-30 dark:opacity-20 scale-150">
            {getFileIcon(item)}
          </div>
        )}
      </div>

      {/* 3. TRASH OVERLAY */}
      {isTrashView && (
        <div className="absolute inset-0 z-30 bg-red-950/40 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-none flex flex-col items-center justify-center gap-3">
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                restoreItems([item.id]);
              }}
              className="p-3 bg-white/20 hover:bg-nexus-accent hover:text-black backdrop-blur-md rounded-full text-white transition-all"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                bulkDeletePermanently([item._id]);
              }}
              className="p-3 bg-white/20 hover:bg-red-600 backdrop-blur-md rounded-full text-white transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}

      {/* 4. FLOATING GRADIENT DATA TRAY */}
      <div
        className={`absolute bottom-0 left-0 w-full p-4 z-30 transition-all duration-500 ${
          isSelected
            ? "border-nexus-accent/30 bg-linear-to-t from-nexus-accent/30 via-nexus-accent/10 to-transparent"
            : "border-white/10 bg-linear-to-t from-black/70 via-black/30 to-transparent"
        }`}
      >
        <div className="relative z-10">
          <p
            className={`text-[10px] font-black uppercase tracking-tight truncate italic transition-colors ${
              isSelected
                ? "text-nexus-text dark:text-nexus-accent"
                : "text-white drop-shadow-md"
            }`}
          >
            {item.name}
          </p>

          <div className="flex justify-between items-center mt-0.5">
            <div
              className={`flex items-center gap-1.5 ${
                isSelected
                  ? "text-nexus-text/80 dark:text-nexus-accent/80"
                  : "text-white/70"
              }`}
            >
              <HardDrive size={9} strokeWidth={2.5} />
              <span className="text-[8px] font-mono font-bold uppercase tracking-widest">
                {formatFileSize(item.size)}
              </span>
            </div>

            {isImage ? (
              <ImageIcon
                size={9}
                className={
                  isSelected
                    ? "text-nexus-text dark:text-nexus-accent"
                    : "text-white/40"
                }
              />
            ) : (
              isPDF && (
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected
                      ? "bg-nexus-accent shadow-[0_0_8px_#E2FF54]"
                      : "bg-red-500 shadow-[0_0_5px_red]"
                  }`}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
