// ### 3. Optimized File Operations (lib/api/endpoints/files.ts)

import { apiClient } from "../client";

export const trashAPI = {
  // Fetch files with caching strategy
  async getTrashes() {
    return apiClient.get(`/files/trash`);
  },

  async restoreTrashes(ids) {
    console.log(ids);
    return apiClient.post(`/files/trash-restore`, { ids });
  },

  async bulkDeletePermanently(ids) {
    return apiClient.post(`/files/bulk-delete`, { ids });
  },

  async emptyTrash() {
    return apiClient.delete(`/files/empty-trash`);
  },
};
