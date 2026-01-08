// components/drive/FileCard.tsx
import { Checkbox } from "@/components/ui/checkbox";
import FolderDropdown from "@/components/dropdowns/FolderDropdown";
import { getFileIcon, getThumbnail, formatFileSize } from "@/lib/fileUtils";

export default function FileCard({
  item,
  isSelected,
  onToggleSelection,
  onClick,
  onDownload,
  onRename,
  onMove,
  onDelete,
}) {
  const handleDropdownAction = (action) => (e) => {
    e.stopPropagation();
    action();
  };

  return (
    <div
      className={`group relative p-4 rounded-[24px] border transition-all duration-300 cursor-pointer ${
        isSelected
          ? "bg-[#E2FF54]/10 border-[#E2FF54]/40 shadow-[0_0_30px_rgba(226,255,84,0.05)]"
          : "bg-white/2 border-white/5 hover:border-white/10 hover:bg-white/4"
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelection}
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg border-white/20 data-[state=checked]:bg-[#E2FF54] data-[state=checked]:text-black"
        />

        <div onClick={(e) => e.stopPropagation()}>
          <FolderDropdown
            item={item}
            onDownload={handleDropdownAction(onDownload)}
            onRename={handleDropdownAction(onRename)}
            onMove={handleDropdownAction(onMove)}
            onDelete={handleDropdownAction(onDelete)}
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="transform group-hover:scale-110 transition-transform duration-500 mb-4 filter drop-shadow-2xl">
          {getThumbnail(item) || getFileIcon(item)}
        </div>
        <span className="text-[11px] font-bold text-gray-300 text-center truncate w-full group-hover:text-white transition-colors px-2">
          {item.name}
        </span>
        <span className="text-[9px] font-black text-gray-600 mt-2 uppercase tracking-tighter">
          {item.type === "file" ? formatFileSize(item.size) : "Dir"}
        </span>
      </div>
    </div>
  );
}
