import { useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { trashAPI } from "@/lib/api/endpoints/trash";
import { useTrashStore } from "@/store/trashStore";
import { toast } from "sonner";

export function useTrashData(folderId) {
  const user = useAuthStore((state) => state.user);

  const {
    files,
    loading,
    setFiles,
    setLoading,
    setError,
    deletePermanently,
    restoreTrash,
  } = useTrashStore();

  // Fetch files with caching
  const fetchTrashes = useCallback(async () => {
    if (!user) return;
    // Check cache first
    setLoading(true);
    setError(null);

    try {
      const result = await trashAPI.getTrashes();
      setFiles(result.items);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [user, setFiles, setLoading, setError]);

  const restoreTrashes = useCallback(
    async (ids) => {
      if (!user) return;
      restoreTrash(ids);
      // Check cache first
      setLoading(true);
      setError(null);
      try {
        await trashAPI.restoreTrashes(ids);
        await fetchTrashes();
        toast.success("Restored successfully");
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error.message);
      }
    },
    [fetchTrashes]
  );

  const bulkDeletePermanently = useCallback(
    async (ids) => {
      deletePermanently(ids);
      try {
        await trashAPI.bulkDeletePermanently(ids);
        await fetchTrashes();
        toast.warning("Items deleted permanently");
      } catch (error) {
        console.error(error);
      }
    },
    [fetchTrashes, files]
  );

  useEffect(() => {
    fetchTrashes();
  }, [fetchTrashes]);

  return {
    files,
    loading,
    bulkDeletePermanently,
    fetchTrashes,
    restoreTrashes,
  };
}
