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
        className="flex items-center gap-4 bg-white dark:bg-[#111] border border-slate-200 dark:border-nexus-accent/30 px-6 py-2.5 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-colors duration-500"
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-lime-600 dark:text-nexus-accent uppercase tracking-widest leading-none">
            {count} Nodes
          </span>
          <span className="text-[8px] text-slate-400 dark:text-gray-500 font-bold uppercase mt-1">
            Ready for Instruction
          </span>
        </div>

        {/* Vertical Divider adaptive color */}
        <div className="w-px h-8 bg-slate-200 dark:bg-white/10 mx-2" />

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white font-bold text-[10px] uppercase tracking-tighter"
            onClick={onMove}
          >
            <MoveIcon className="w-3.5 h-3.5 mr-2" /> Move
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-9 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/20 text-red-500 font-bold text-[10px] uppercase tracking-tighter"
            onClick={onDelete}
          >
            <TrashIcon className="w-3.5 h-3.5 mr-2" /> Delete
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-slate-400 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white transition-colors"
            onClick={onClear}
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
