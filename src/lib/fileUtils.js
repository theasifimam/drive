import { FolderIcon, FileIcon, ImageIcon, VideoIcon } from "lucide-react";

const API_URL = "http://localhost:5000/api";

export const getFileIcon = (item) => {
  if (!item) return null;
  if (item?.type === "folder") {
    return <FolderIcon className="w-8 h-8 text-blue-500" />;
  }
  if (item?.mimeType?.startsWith("image/")) {
    return <ImageIcon className="w-8 h-8 text-green-500" />;
  }
  if (item?.mimeType?.startsWith("video/")) {
    return <VideoIcon className="w-8 h-8 text-purple-500" />;
  }
  return <FileIcon className="w-8 h-8 text-gray-500" />;
};

export const getThumbnail = (item) => {
  const token = localStorage.getItem("token");
  if (item.mimeType?.startsWith("image/")) {
    return (
      <img
        src={`${API_URL}/preview/${item._id}?token=${token}`}
        alt={item.name}
        className="w-full h-32 object-cover rounded-lg"
      />
    );
  }
  if (item.mimeType?.startsWith("video/")) {
    return (
      <video
        src={`${API_URL}/preview/${item._id}?token=${token}`}
        className="w-full h-32 object-cover rounded-lg"
      />
    );
  }
  return null;
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
