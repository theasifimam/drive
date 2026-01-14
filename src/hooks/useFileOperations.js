// ### 5. Updated useFileOperations Hook (lib/hooks/useFileOperations.js)

"use client";

import { apiClient } from "@/lib/api/client";
import { useDriveStore } from "@/store/driveStore";
import { toast } from "sonner";

export function useFileOperations() {
  const {
    addFileOptimistic,
    removeFileOptimistic,
    updateFileOptimistic,
    invalidateCache,
  } = useDriveStore();

  // CREATE FOLDER
  const createFolder = async (name, parentId) => {
    try {
      const tempId = `temp-${Date.now()}`;

      // Optimistic update
      addFileOptimistic({
        _id: tempId,
        name,
        type: "folder",
        parentId: parentId || null,
        createdAt: new Date().toISOString(),
      });

      const res = await apiClient.post("/files/create-folder", {
        name,
        parentId,
      });

      // Replace temp with real data
      removeFileOptimistic(tempId);
      addFileOptimistic(res.folder);
      invalidateCache(parentId);

      toast.success("Folder created successfully");
      return true;
    } catch (error) {
      toast.error("Failed to create folder");
      console.error("Folder creation error:", error);
      return false;
    }
  };

  // UPLOAD FILES
  const uploadFiles = async (fileList, parentId) => {
    const files = Array.from(fileList);

    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("parentId", parentId || "");

        return apiClient.post("/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      });

      await Promise.all(uploadPromises);
      invalidateCache(parentId);
      toast.success(`${files.length} file(s) uploaded successfully`);
      return true;
    } catch (error) {
      toast.error("Upload failed");
      console.error("Upload error:", error);
      return false;
    }
  };

  // RENAME ITEM
  const renameItem = async (id, newName) => {
    try {
      // Optimistic update
      updateFileOptimistic(id, { name: newName });

      await apiClient.put(`/files/rename/${id}`, { newName });
      toast.success("Renamed successfully");
      return true;
    } catch (error) {
      toast.error("Failed to rename");
      console.error("Rename error:", error);
      return false;
    }
  };

  // MOVE ITEMS
  const moveItems = async (ids, destinationId) => {
    try {
      await apiClient.put(`/files/move`, {
        targetFolderId: destinationId,
        ids,
      });

      // Invalidate both source and destination caches
      invalidateCache();
      toast.success("Items moved successfully");
      return true;
    } catch (error) {
      toast.error("Failed to move items");
      console.error("Move error:", error);
      return false;
    }
  };

  // DELETE ITEMS
  const deleteItems = async (ids) => {
    try {
      // Optimistic remove
      ids.forEach((id) => removeFileOptimistic(id));

      await apiClient.post(`/files/bulk-trash`, { ids });
      invalidateCache();
      toast.success(`${ids.length} item(s) moved to trash`);
      return true;
    } catch (error) {
      toast.error("Failed to delete items");
      console.error("Delete error:", error);
      return false;
    }
  };

  // DOWNLOAD FILE
  const downloadFile = async (id, fileName) => {
    try {
      const response = await apiClient.get(`/download/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || `file-${id}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Download failed");
      console.error("Download error:", error);
    }
  };

  return {
    createFolder,
    uploadFiles,
    renameItem,
    moveItems,
    deleteItems,
    downloadFile,
  };
}
