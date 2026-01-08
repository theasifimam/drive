// components/drive/ActionBar.tsx
import { FolderPlusIcon, UploadIcon, ShareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListGridSwitcher from "@/components/ListGridSwitcher";
import SelectionBatch from "./SelectionBatch";

export default function ActionBar({
  onNewFolder,
  onUpload,
  onShare,
  viewMode,
  onViewModeChange,
  selectedCount,
  onMove,
  onDelete,
  onClearSelection,
}) {
  return (
    <div className="flex items-center justify-between gap-3 p-2 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-6 transition-all duration-500">
        <div className="flex items-center gap-3 bg-[#111]">
          <Button
            onClick={onNewFolder}
            className="bg-[#E2FF54] text-black hover:bg-[#d4f043] rounded-xl px-5 py-6 font-black uppercase text-[11px] tracking-widest shadow-[0_8px_20px_rgba(226,255,84,0.15)] transition-all active:scale-95"
          >
            <FolderPlusIcon className="w-4 h-4 mr-2" />
            New_Folder
          </Button>

          <Button
            variant="outline"
            onClick={onUpload}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl px-5 py-6 font-black uppercase text-[11px] tracking-widest transition-all"
          >
            <UploadIcon className="w-4 h-4 mr-2 text-[#E2FF54]" />
            Upload_Node
          </Button>

          {onShare && (
            <Button
              variant="outline"
              onClick={onShare}
              className="bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl px-5 py-6 font-black uppercase text-[11px] tracking-widest group"
            >
              <ShareIcon className="w-4 h-4 mr-2 group-hover:text-[#E2FF54] transition-colors" />
              Share_Link
            </Button>
          )}
        </div>

        {selectedCount > 0 && (
          <SelectionBatch
            count={selectedCount}
            onMove={onMove}
            onDelete={onDelete}
            onClear={onClearSelection}
          />
        )}
      </div>

      <ListGridSwitcher viewMode={viewMode} setViewMode={onViewModeChange} />
    </div>
  );
}
