// components/drive/SelectionBatch.tsx
import { motion, AnimatePresence } from "framer-motion";
import { MoveIcon, TrashIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SelectionBatch({ count, onMove, onDelete, onClear }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.95 }}
        className="flex items-center gap-4 bg-[#111] border border-[#E2FF54]/30 px-6 py-2.5 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-[#E2FF54] uppercase tracking-widest leading-none">
            {count} Nodes
          </span>
          <span className="text-[8px] text-gray-500 font-bold uppercase mt-1">
            Ready for Instruction
          </span>
        </div>

        <div className="w-px h-8 bg-white/10 mx-2" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white font-bold text-[10px] uppercase tracking-tighter"
            onClick={onMove}
          >
            <MoveIcon className="w-3.5 h-3.5 mr-2" /> Move
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-lg hover:bg-red-500/10 text-red-500 font-bold text-[10px] uppercase tracking-tighter"
            onClick={onDelete}
          >
            <TrashIcon className="w-3.5 h-3.5 mr-2" /> Delete
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-gray-600 hover:text-white transition-colors"
            onClick={onClear}
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
