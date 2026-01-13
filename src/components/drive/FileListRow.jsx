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
      className={`group transition-colors cursor-pointer ${
        isSelected
          ? "bg-lime-500/10 dark:bg-nexus-accent/5"
          : "hover:bg-slate-50 dark:hover:bg-white/3"
      }`}
      onClick={onClick}
    >
      <td className="px-6 py-4 text-center">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggleSelection}
          onClick={(e) => e.stopPropagation()}
          className="border-slate-300 dark:border-white/10 data-[state=checked]:bg-lime-500 dark:data-[state=checked]:bg-nexus-accent data-[state=checked]:border-transparent"
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="text-slate-400 dark:opacity-60 group-hover:text-lime-600 dark:group-hover:text-nexus-accent dark:group-hover:opacity-100 transition-all">
            {getFileIcon(item)}
          </div>
          <span className="text-sm font-bold text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
            {item.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 font-mono text-[11px] text-slate-400 dark:text-gray-500 uppercase">
        {item.type === "file" ? formatFileSize(item.size) : "---"}
      </td>
      <td className="px-4 py-4 font-mono text-[11px] text-slate-400 dark:text-gray-500 uppercase">
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
