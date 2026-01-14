"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderIcon, MoveIcon, ChevronRight, ChevronDown } from "lucide-react";

export default function MoveDialog({
  open,
  onOpenChange,
  destination,
  onDestinationChange,
  folders,
  movingItems,
  currentFolderId,
  onMove,
}) {
  // Local state to track which folders are expanded
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  const toggleExpand = (e, folderId) => {
    e.stopPropagation(); // Don't select the folder just for expanding
    const newSet = new Set(expandedFolders);
    if (newSet.has(folderId)) newSet.delete(folderId);
    else newSet.add(folderId);
    setExpandedFolders(newSet);
  };

  const FolderTree = ({ currentId = null, level = 0 }) => {
    // Filter folders for the current depth
    const currentLevelFolders = folders.filter((f) =>
      level === 0 ? !f.parentId : f.parentId === currentId
    );

    if (currentLevelFolders.length === 0) return null;

    return (
      <div
        className={
          level > 0 ? "ml-4 border-l border-white/5 pl-2" : "space-y-1"
        }
      >
        {currentLevelFolders.map((folder) => {
          const isExpanded = expandedFolders.has(folder._id);
          const isSelected = destination === folder._id;
          const isBeingMoved = movingItems.includes(folder._id);
          const hasChildren = folders.some((f) => f.parentId === folder._id);

          return (
            <div key={folder._id} className="flex flex-col">
              <div
                onClick={() => !isBeingMoved && onDestinationChange(folder._id)}
                className={`flex items-center group px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-nexus-accent text-black"
                    : "text-gray-300 hover:bg-white/5"
                } ${isBeingMoved ? "opacity-30 cursor-not-allowed" : ""}`}
              >
                {/* Toggle Arrow */}
                <div
                  className="w-5 h-5 flex items-center justify-center mr-1 hover:bg-black/10 rounded"
                  onClick={(e) => hasChildren && toggleExpand(e, folder._id)}
                >
                  {hasChildren ? (
                    isExpanded ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )
                  ) : (
                    <div className="w-1 h-1 bg-white/20 rounded-full ml-1" />
                  )}
                </div>

                <FolderIcon
                  className={`w-4 h-4 mr-2 ${
                    isSelected ? "text-black" : "text-nexus-accent"
                  }`}
                />
                <span className="text-xs font-medium truncate">
                  {folder.name}
                </span>
              </div>

              {/* Recursive Step: Only render if expanded */}
              {isExpanded && (
                <FolderTree currentId={folder._id} level={level + 1} />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-slate-200 dark:bg-[#0D0D0D] dark:border-white/10 dark:text-white max-w-md p-0 overflow-hidden rounded-[32px]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="flex items-center gap-3 text-lg font-black uppercase tracking-tighter">
            <MoveIcon className="w-5 h-5 text-nexus-accent" />
            Targeting_Matrix
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-2">
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar bg-black/20 border border-white/5 rounded-2xl p-2">
            {/* Root Drive Option */}
            <div
              onClick={() => onDestinationChange(null)}
              className={`flex items-center px-3 py-2 rounded-lg cursor-pointer mb-2 transition-colors ${
                destination === null
                  ? "bg-nexus-accent text-black"
                  : "text-gray-300 hover:bg-white/5"
              }`}
            >
              <div className="w-5 h-5 mr-1" />{" "}
              {/* Spacer to align with chevrons */}
              <FolderIcon
                className={`w-4 h-4 mr-2 ${
                  destination === null ? "text-black" : "text-nexus-accent"
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-widest">
                Root_Directory
              </span>
            </div>

            <FolderTree />
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 flex gap-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100"
          >
            Cancel
          </Button>
          <Button
            onClick={onMove}
            disabled={destination === currentFolderId}
            className="flex-[2] bg-nexus-accent text-black hover:bg-nexus-accent/90 rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            Initiate_Transfer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
