import React from "react";
import { Button } from "./ui/button";
import { GridIcon, ListIcon } from "lucide-react";

const ListGridSwitcher = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex items-center gap-1 bg-black/40 rounded-[18px] p-1.5 border border-white/5">
      <Button
        variant="ghost"
        size="sm"
        className={`rounded-xl h-9 w-10 p-0 transition-all ${
          viewMode === "grid"
            ? "bg-[#E2FF54] text-black shadow-lg"
            : "text-gray-500 hover:text-white"
        }`}
        onClick={() => setViewMode("grid")}
      >
        <GridIcon size={18} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`rounded-xl h-9 w-10 p-0 transition-all ${
          viewMode === "list"
            ? "bg-[#E2FF54] text-black shadow-lg"
            : "text-gray-500 hover:text-white"
        }`}
        onClick={() => setViewMode("list")}
      >
        <ListIcon size={18} />
      </Button>
    </div>
  );
};

export default ListGridSwitcher;
