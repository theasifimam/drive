// ### 5. Updated useFileOperations Hook (lib/hooks/useFileOperations.js)

"use client";

import { apiClient } from "@/lib/api/client";
import { useTrashStore } from "@/store/trashStore";
import { toast } from "sonner";

export function useTrashOperations() {
  const { bulkDeletePermanently } = useTrashStore();

  const fetchTrashItems = async () => {
    try {
      const res = await apiClient.get("/files/trash");
      return res.data.items;
    } catch (error) {
      console.error("Error fetching trash items:", error);
      return [];
    }
  };

  // RESTORE ITEMS
  const restoreItems = async (ids) => {
    try {
      await apiClient.post(`/files/bulk-restore`, { ids });
      invalidateCache();
      toast.success(`${ids.length} item(s) restored`);
      return true;
    } catch (error) {
      toast.error("Failed to restore items");
      console.error("Restore error:", error);
      return false;
    }
  };

  // DELETE ITEMS
  const deleteItemsPermanently = async (ids) => {
    try {
      // Optimistic remove
      bulkDeletePermanently(ids);

      await apiClient.post(`/files/bulk-delete`, { ids });
      invalidateCache();
      toast.success(`${ids.length} item(s) deleted permanently`);
      return true;
    } catch (error) {
      toast.error("Failed to delete items");
      console.error("Delete error:", error);
      return false;
    }
  };

  return {
    deleteItemsPermanently,
    restoreItems,
    fetchTrashItems,
  };
}
