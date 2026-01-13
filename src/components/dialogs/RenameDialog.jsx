// components/dialogs/RenameDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditIcon } from "lucide-react";

export default function RenameDialog({
  open,
  onOpenChange,
  name,
  onNameChange,
  onRename,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onRename();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white  border-slate-200 dark:bg-[#0D0D0D] dark:border-white/10 dark:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-black uppercase tracking-wider">
            <EditIcon className="w-6 h-6 text-nexus-accent" />
            Rename Item
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="py-6">
            <Input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter new name..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-white/5 border-white/10 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-nexus-accent text-black hover:bg-[#d4f043]"
              disabled={!name.trim()}
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
