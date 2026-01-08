// components/dialogs/DeleteDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrashIcon, AlertTriangleIcon } from "lucide-react";

export default function DeleteDialog({
  open,
  onOpenChange,
  onDelete,
  itemCount,
}) {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0D0D0D] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-wider text-red-500">
            <AlertTriangleIcon className="w-6 h-6" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-gray-400 pt-4">
            Are you sure you want to delete {itemCount}{" "}
            {itemCount === 1 ? "item" : "items"}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-white/5 border-white/10 hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
