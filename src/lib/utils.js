// lib/fileUtils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getThumbnailUrl = (thumbnailUrl) => {
  if (!thumbnailUrl) return null;

  // Split the URL to encode only the filename part
  const parts = thumbnailUrl.split("/");
  const filename = parts[parts.length - 1];
  const encodedFilename = encodeURIComponent(filename);

  // Rebuild the URL with encoded filename
  parts[parts.length - 1] = encodedFilename;
  return `http://localhost:5000${parts.join("/")}`;
};
