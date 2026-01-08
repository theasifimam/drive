// components/dialogs/MoveDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderIcon, MoveIcon } from "lucide-react";

export default function MoveDialog({
  open,
  onOpenChange,
  destination,
  onDestinationChange,
  folders,
  movingItems,
  currentFolderId,
  onMove,
}) {
  const FolderTree = ({ folders, currentId, level = 0 }) => {
    const currentLevelFolders = folders.filter(
      (f) => (level === 0 && !f.parentId) || f.parentId === currentId
    );

    return (
      <div className={level > 0 ? "ml-4" : ""}>
        {currentLevelFolders.map((folder) => (
          <div key={folder._id}>
            <Button
              variant={destination === folder._id ? "secondary" : "ghost"}
              className="w-full justify-start mb-1 text-white hover:bg-white/10"
              onClick={() => onDestinationChange(folder._id)}
              disabled={movingItems.includes(folder._id)}
            >
              <FolderIcon className="w-4 h-4 mr-2" />
              {folder.name}
            </Button>
            <FolderTree
              folders={folders}
              currentId={folder._id}
              level={level + 1}
            />
          </div>
        ))}
      </div>
    );
  };

  const handleMove = () => {
    onMove();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0D0D0D] border-white/10 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-wider">
            <MoveIcon className="w-6 h-6 text-[#E2FF54]" />
            Move Items
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-sm text-gray-400 mb-4">
            Select a destination folder:
          </p>
          <div className="max-h-96 overflow-y-auto bg-white/5 border border-white/10 rounded-lg p-4">
            <Button
              variant={destination === null ? "secondary" : "ghost"}
              className="w-full justify-start mb-2 text-white hover:bg-white/10"
              onClick={() => onDestinationChange(null)}
            >
              <FolderIcon className="w-4 h-4 mr-2" />
              Root Drive
            </Button>
            <FolderTree folders={folders} currentId={null} />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white/5 border-white/10 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleMove}
            className="bg-[#E2FF54] text-black hover:bg-[#d4f043]"
            disabled={destination === currentFolderId}
          >
            Move Here
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
