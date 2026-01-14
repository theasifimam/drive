import React from "react";
import { Button } from "../ui/button";
import { Move, RotateCcw, Trash2 } from "lucide-react";

const OperationsOverlay = ({ selectedIds, handleDelete }) => {
  if (selectedIds.size === 0) return null;
  else
    return (
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
        <div className="flex items-center gap-2 px-6 py-4 bg-black/80 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-4xl shadow-2xl">
          <span className="text-[10px] font-black text-white/50 mr-4 border-r border-white/10 pr-4">
            {selectedIds.size}{" "}
            <span className="ml-1 tracking-tighter">NODES_SELECTED</span>
          </span>

          <Button
            onClick={() => {
              //   restoreTrashes(Array.from(selectedIds));
            }}
            className="bg-nexus-accent hover:bg-nexus-accent/80 text-black rounded-2xl text-[10px] font-black uppercase px-6"
          >
            <Move size={14} className="mr-2" /> Move
          </Button>

          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase px-6"
          >
            <Trash2 size={14} className="mr-2" /> Delete_Permanently
          </Button>
        </div>
      </div>
    );
};

export default OperationsOverlay;
