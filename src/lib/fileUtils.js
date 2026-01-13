import { FolderIcon, FileIcon, VideoIcon } from "lucide-react";

// const API_URL = "http://localhost:5000/api";

export const getFileIcon = (item) => {
  if (!item) return null;
  if (item?.type === "folder") {
    return <FolderIcon className="w-8 h-8 text-nexus-accent/90" />;
  }
  if (item?.mimeType?.startsWith("image/")) {
    const thumbnail = encodeURI("http://localhost:5000" + item.thumbnailUrl);
    return (
      <img
        src={thumbnail}
        alt={item.name}
        className="w-8 h-8 rounded-lg"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    );
  }
  if (item?.mimeType?.startsWith("video/")) {
    return <VideoIcon className="w-8 h-8 text-purple-500" />;
  }
  return <FileIcon className="w-8 h-8 text-gray-500" />;
};

export const formatFileSize = (bytes) => {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
