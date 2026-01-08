// components/drive/FileListRow.tsx
import { Checkbox } from "@/components/ui/checkbox";
import FolderDropdown from "@/components/dropdowns/FolderDropdown";
import { getFileIcon, formatFileSize, formatDate } from "@/lib/fileUtils";

export default function FileListRow({
  item,
  isSelected,
  onToggleSelection,
  onClick,
  onDownload,
  onRename,
  onMove,
  onDelete,
}) {
  return (
    <tr
      className={`group rounded-2xl hover:bg-white/3 transition-colors cursor-pointer ${
        isSelected ? "bg-[#E2FF54]/5 " : ""
      }`}
      onClick={onClick}
    >
      <td className="px-6 py-4 text-center">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelection}
          onClick={(e) => e.stopPropagation()}
          className="border-white/10 data-[state=checked]:bg-[#E2FF54]"
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="opacity-60 group-hover:opacity-100 group-hover:text-[#E2FF54] transition-all">
            {getFileIcon(item)}
          </div>
          <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
            {item.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 font-mono text-[11px] text-gray-500 uppercase">
        {item.type === "file" ? formatFileSize(item.size) : "---"}
      </td>
      <td className="px-4 py-4 font-mono text-[11px] text-gray-500 uppercase">
        {formatDate(item.createdAt)}
      </td>
      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
        <FolderDropdown
          item={item}
          onDownload={onDownload}
          onRename={onRename}
          onMove={onMove}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}
