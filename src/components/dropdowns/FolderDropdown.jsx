// components/dropdowns/FolderDropdown.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreVerticalIcon,
  DownloadIcon,
  EditIcon,
  MoveIcon,
  TrashIcon,
} from "lucide-react";

export default function FolderDropdown({
  item,
  onDownload,
  onRename,
  onMove,
  onDelete,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white dark:bg-[#111] border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl p-2 shadow-2xl backdrop-blur-xl"
      >
        {item?.type === "file" && (
          <>
            <DropdownMenuItem
              onClick={onDownload}
              className="hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer rounded-lg transition-colors"
            >
              <DownloadIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-gray-500" />
              Download
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10" />
          </>
        )}
        <DropdownMenuItem
          onClick={onRename}
          className="hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer rounded-lg transition-colors"
        >
          <EditIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-gray-500" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onMove}
          className="hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer rounded-lg transition-colors"
        >
          <MoveIcon className="w-4 h-4 mr-2 text-slate-400 dark:text-gray-500" />
          Move
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/10" />
        <DropdownMenuItem
          onClick={onDelete}
          className="hover:bg-red-50 dark:hover:bg-red-500/10 text-red-600 dark:text-red-500 cursor-pointer rounded-lg transition-colors"
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
