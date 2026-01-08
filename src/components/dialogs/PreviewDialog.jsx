// components/dialogs/PreviewDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  XIcon,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function PreviewDialog({
  open,
  onOpenChange,
  file,
  onNavigate,
  onDownload,
}) {
  if (!file) return null;

  const token = localStorage.getItem("token");
  const isImage = file.mimeType?.startsWith("image/");
  const isVideo = file.mimeType?.startsWith("video/");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-[#0D0D0D] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-lg font-black uppercase tracking-wider">
              {file.name}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onDownload}
                className="bg-white/5 border-white/10 hover:bg-white/10"
              >
                <DownloadIcon className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="hover:bg-white/10"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="relative flex items-center justify-center min-h-[400px] bg-black/50 rounded-xl p-4">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate(-1)}
            className="absolute left-4 z-10 bg-black/50 hover:bg-black/70 text-white"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </Button>

          {/* Preview Content */}
          <div className="max-w-full max-h-[70vh] flex items-center justify-center">
            {isImage && (
              <img
                src={`${API_URL}/preview/${file._id}?token=${token}`}
                alt={file.name}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
            {isVideo && (
              <video
                src={`${API_URL}/preview/${file._id}?token=${token}`}
                controls
                className="max-w-full max-h-full rounded-lg"
              />
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate(1)}
            className="absolute right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
        </div>

        {/* File Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl text-sm">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              File Type
            </p>
            <p className="font-bold">{file.mimeType}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">
              Size
            </p>
            <p className="font-bold">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
