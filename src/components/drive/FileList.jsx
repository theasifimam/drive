// components/drive/FileList.tsx
import { Checkbox } from "@/components/ui/checkbox";
import FileListRow from "./FileListRow";

export default function FileList({
  files,
  selectedFiles,
  onToggleSelection,
  onSelectAll,
  onItemClick,
  onDownload,
  onRename,
  onMove,
  onDelete,
}) {
  return (
    <div className="overflow-hidden transition-colors duration-500">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 dark:border-white/5">
            <th className="px-6 py-5 w-12 text-center">
              <Checkbox
                checked={
                  selectedFiles.size === files.length && files.length > 0
                }
                onCheckedChange={onSelectAll}
                className="border-slate-300 dark:border-white/20 data-[state=checked]:bg-lime-500 dark:data-[state=checked]:bg-nexus-accent data-[state=checked]:border-transparent"
              />
            </th>
            <th className="px-4 py-5 text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">
              Node_Identity
            </th>
            <th className="px-4 py-5 text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">
              Payload
            </th>
            <th className="px-4 py-5 text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">
              Timestamp
            </th>
            <th className="px-6 py-5 text-right text-[10px] font-black text-slate-400 dark:text-gray-500 uppercase tracking-widest">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-white/2">
          {files.map((item) => (
            <FileListRow
              key={item._id}
              item={item}
              isSelected={selectedFiles.has(item._id)}
              onToggleSelection={() => onToggleSelection(item._id)}
              onClick={() => onItemClick(item)}
              onDownload={() => onDownload(item._id)}
              onRename={() => onRename(item)}
              onMove={() => onMove(item)}
              onDelete={() => onDelete(item._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
