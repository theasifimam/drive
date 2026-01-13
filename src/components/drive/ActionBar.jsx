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
    <div className="flex items-center justify-between gap-3 p-2 mb-6 transition-colors duration-500">
      <div className="flex flex-wrap items-center justify-between gap-6 transition-all duration-500">
        {/* CONTAINER: Removed hard #111 bg for a transparent/adaptive look */}
        <div className="flex items-center gap-3">
          {/* PRIMARY ACTION: Neon remains neon, but shadow adjusts */}
          <Button
            onClick={onNewFolder}
            className="bg-lime-400 dark:bg-nexus-accent text-black hover:bg-lime-500 dark:hover:bg-[#d4f043] rounded-xl px-5 py-6 font-black uppercase text-[11px] tracking-widest shadow-[0_8px_20px_rgba(163,230,53,0.2)] dark:shadow-[0_8px_20px_rgba(226,255,84,0.15)] transition-all active:scale-95"
          >
            <FolderPlusIcon className="w-4 h-4 mr-2" />
            New_Folder
          </Button>

          {/* SECONDARY ACTION: Adaptive white/slate vs white/5 */}
          <Button
            variant="outline"
            onClick={onUpload}
            className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl px-5 py-6 font-black uppercase text-[11px] tracking-widest transition-all shadow-sm dark:shadow-none"
          >
            <UploadIcon className="w-4 h-4 mr-2 text-lime-600 dark:text-nexus-accent" />
            Upload_Node
          </Button>

          {/* TERTIARY ACTION */}
          {onShare && (
            <Button
              variant="outline"
              onClick={onShare}
              className="bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-xl px-5 py-6 font-black uppercase text-[11px] tracking-widest group shadow-sm dark:shadow-none transition-all"
            >
              <ShareIcon className="w-4 h-4 mr-2 text-slate-400 group-hover:text-lime-600 dark:group-hover:text-nexus-accent transition-colors" />
              Share_Link
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* BATCH SELECTION HUD */}
        {selectedCount > 0 && (
          <SelectionBatch
            count={selectedCount}
            onMove={onMove}
            onDelete={onDelete}
            onClear={onClearSelection}
          />
        )}

        {/* SWITCHER: Ensure this component also uses border-slate-200 in light mode */}
        <ListGridSwitcher viewMode={viewMode} setViewMode={onViewModeChange} />
      </div>
    </div>
  );
}
