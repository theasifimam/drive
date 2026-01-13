"use client";

import React, { useState, useMemo } from "react";
import { Trash2, RotateCcw, ShieldAlert, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileGrid from "@/components/drive/FileGrid";

export default function TrashPage() {
  const [files, setFiles] = useState([]); // Fetch your trashed files here
  const [selectedIds, setSelectedIds] = useState(new Set());

  const trashedFiles = useMemo(() => files.filter((f) => f.isTrashed), [files]);

  return (
    <div className="relative min-h-screen p-8 bg-transparent">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-10 px-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500/10 rounded-xl">
              <Trash2 className="text-red-500" size={20} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic dark:text-white">
              System_Archive <span className="text-red-500/50">/Trash</span>
            </h1>
          </div>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <Info size={12} /> Items here are scheduled for permanent deletion
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-full border-red-500/20 bg-red-500/5 hover:bg-red-500/20 text-red-500 text-[10px] font-black tracking-widest uppercase"
          onClick={() => {
            /* Trigger Bulk Delete All API */
          }}
        >
          Purge_All_Data
        </Button>
      </div>

      {/* BENTO GRID */}
      {trashedFiles.length > 0 ? (
        <FileGrid
          files={trashedFiles}
          selectedFiles={selectedIds}
          onToggleSelection={(id) => {
            const newSet = new Set(selectedIds);
            newSet.has(id) ? newSet.delete(id) : newSet.add(id);
            setSelectedIds(newSet);
          }}
          // We pass special actions for the Trash Bin
          isTrashView={true}
        />
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center opacity-20">
          <ShieldAlert size={64} strokeWidth={1} />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.4em]">
            Archive_is_Empty
          </p>
        </div>
      )}

      {/* FLOATING ACTION HUD (Appears on selection) */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
          <div className="flex items-center gap-2 px-6 py-4 bg-black/80 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl">
            <span className="text-[10px] font-black text-white/50 mr-4 border-r border-white/10 pr-4">
              {selectedIds.size}{" "}
              <span className="ml-1 tracking-tighter">NODES_SELECTED</span>
            </span>

            <Button
              onClick={() => {
                /* Restore API */
              }}
              className="bg-nexus-accent hover:bg-nexus-accent/80 text-black rounded-2xl text-[10px] font-black uppercase px-6"
            >
              <RotateCcw size={14} className="mr-2" /> Restore
            </Button>

            <Button
              onClick={() => {
                /* Delete Permanently API */
              }}
              className="bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase px-6"
            >
              <Trash2 size={14} className="mr-2" /> Delete_Permanently
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
