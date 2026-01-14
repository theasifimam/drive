// ### 3. Optimized File Operations (lib/api/endpoints/files.ts)

import { apiClient } from "../client";

export const filesAPI = {
  // Fetch files with caching strategy
  async getFiles(folderId) {
    const parentId = folderId || "root";
    return apiClient.get(`/files/folder-files/${parentId}`);
  },

  // Fetch all folders for tree view
  async getAllFolders() {
    return apiClient.get("/files/all-folders");
  },

  // Fetch breadcrumbs
  async getBreadcrumbs(folderId) {
    return apiClient.get(`/files/breadcrumb/${folderId}`);
  },

  // Create folder
  async createFolder(payload) {
    return apiClient.post("/files/create-folder", payload);
  },

  // Rename file/folder
  async rename(id, payload) {
    return apiClient.patch(`/files/rename/${id}`, payload);
  },

  // Move files/folders (batch)
  async move(payload) {
    return apiClient.post("/files/batch-move", payload);
  },

  // Delete files/folders (batch)
  async bulkDelete(ids) {
    return apiClient.post("/files/bulk-trash", { ids });
  },

  // Download file
  async downloadFile(id) {
    return apiClient.get(`/download/${id}`, { responseType: "blob" });
  },
};
