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
          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#111] border-white/10 text-white rounded-2xl p-2 shadow-2xl backdrop-blur-xl"
      >
        {item?.type === "file" && (
          <>
            <DropdownMenuItem
              onClick={onDownload}
              className="hover:bg-white/10 cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
          </>
        )}
        <DropdownMenuItem
          onClick={onRename}
          className="hover:bg-white/10 cursor-pointer"
        >
          <EditIcon className="w-4 h-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onMove}
          className="hover:bg-white/10 cursor-pointer"
        >
          <MoveIcon className="w-4 h-4 mr-2" />
          Move
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={onDelete}
          className="hover:bg-red-500/10 text-red-500 cursor-pointer"
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
