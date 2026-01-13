"use client";

import axios from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:5000/api";

export function useFileOperations(fetchFiles, fetchAllFolders) {
  // 1. Create a specialized Axios instance for Nexus Drive
  const nexusApi = axios.create({
    baseURL: API_URL,
    withCredentials: true, // MANDATORY: This ensures cookies are sent/received
    headers: {
      "Content-Type": "application/json",
    },
  });

  // --- REFRESH UTILITY ---
  const syncUI = () => Promise.all([fetchFiles(), fetchAllFolders()]);

  // --- CREATE FOLDER ---
  const createFolder = async (name, parentId) => {
    try {
      const res = await nexusApi.post("/files/create-folder", {
        name,
        parentId,
      });
      if (res.status === 201 || res.status === 200) {
        await syncUI();
        return true;
      }
    } catch (error) {
      console.error(
        "CRITICAL_NODE_ERROR: FOLDER_CREATION_FAILED",
        error.response?.data || error.message
      );
    }
    return false;
  };

  // --- UPLOAD FILES ---
  const uploadFiles = async (fileList, parentId) => {
    const files = Array.from(fileList);

    // Using Promise.all for parallel data streaming
    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("parentId", parentId || "");

      return nexusApi.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Axios handles boundaries automatically
        },
        // TRACK PROGRESS: You can use this to drive your UI progress bars
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`UPLOADING_${file.name}: ${percentCompleted}%`);
        },
      });
    });

    try {
      await Promise.all(uploadPromises);
      await fetchFiles();
      return true;
    } catch (error) {
      console.error(
        "UPLOAD_PROTOCOL_FAILURE",
        error.response?.data || error.message
      );
    }
    return false;
  };

  // --- RENAME ITEM ---
  const renameItem = async (id, newName) => {
    try {
      const res = await nexusApi.patch(`/files/files/${id}`, { name: newName });
      if (res.status === 200) {
        await syncUI();
        return true;
      }
    } catch (error) {
      console.error(
        "RENAME_PROTOCOL_ERROR",
        error.response?.data || error.message
      );
    }
    return false;
  };

  // --- MOVE ITEMS ---
  const moveItems = async (itemIds, destinationId) => {
    try {
      // Parallel batch move execution
      await Promise.all(
        itemIds.map((itemId) =>
          nexusApi.patch(`/files/${itemId}/move`, { parentId: destinationId })
        )
      );
      await syncUI();
      return true;
    } catch (error) {
      console.error(
        "MOVE_PROTOCOL_ERROR",
        error.response?.data || error.message
      );
    }
    return false;
  };

  // --- DELETE ITEMS ---
  const deleteItems = async (ids) => {
    console.log(ids);
    try {
      await nexusApi.post(`/files/bulk-trash`, { ids });
      await syncUI();
      await toast.success(
        `${ids.length} item(s) moved to trash successfully! 🚮`
      );
      return true;
    } catch (error) {
      console.error(
        "TERMINATION_PROTOCOL_ERROR",
        error.response?.data || error.message
      );
    }
    return false;
  };

  // --- DOWNLOAD FILE ---
  const downloadFile = async (id, fileName) => {
    try {
      // Axios handles the blob download to ensure cookies are respected
      const response = await nexusApi.get(`/download/${id}`, {
        responseType: "blob",
      });

      // Create a virtual download anchor
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || `nexus_data_${id}`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("DOWNLOAD_PROTOCOL_FAILURE", error.message);
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
