import React from "react";
import { Button } from "./ui/button";
import { GridIcon, ListIcon } from "lucide-react";

const ListGridSwitcher = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center gap-1 p-1.5 transition-colors duration-500  bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
      <Button
        variant="ghost"
        size="sm"
        className={`rounded-xl h-9 w-10 p-0 transition-all duration-300 ${
          viewMode === "grid"
            ? "bg-lime-400 dark:bg-nexus-accent text-black shadow-md dark:shadow-[0_0_15px_rgba(226,255,84,0.3)] hover:bg-lime-500 dark:hover:bg-[#d4f043]"
            : "text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5"
        }`}
        onClick={() => setViewMode("grid")}
      >
        <GridIcon size={18} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`rounded-xl h-9 w-10 p-0 transition-all duration-300 ${
          viewMode === "list"
            ? "bg-lime-400 dark:bg-nexus-accent text-black shadow-md dark:shadow-[0_0_15px_rgba(226,255,84,0.3)] hover:bg-lime-500 dark:hover:bg-[#d4f043]"
            : "text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5"
        }`}
        onClick={() => setViewMode("list")}
      >
        <ListIcon size={18} />
      </Button>
    </div>
  );
};

export default ListGridSwitcher;
