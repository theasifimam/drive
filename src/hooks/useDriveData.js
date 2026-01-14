import { useEffect, useCallback } from "react";
import { filesAPI } from "@/lib/api/endpoints/files";
import { useAuthStore } from "@/store/authStore";
import { useDriveStore } from "@/store/driveStore";

export function useDriveData(folderId) {
  const user = useAuthStore((state) => state.user);

  const {
    files,
    breadcrumbs,
    folders,
    loading,
    setCurrentFolder,
    setFiles,
    setBreadcrumbs,
    setFolders,
    setLoading,
    setError,
    getCachedFiles,
    cacheFiles,
  } = useDriveStore();

  // Fetch files with caching
  const fetchFiles = useCallback(async () => {
    if (!user) return;

    // Check cache first
    const cached = getCachedFiles(folderId || "root");
    if (cached) {
      setFiles(cached);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await filesAPI.getFiles(folderId);
      setFiles(data.data);
      cacheFiles(folderId || "root", data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [
    folderId,
    user,
    getCachedFiles,
    setFiles,
    cacheFiles,
    setLoading,
    setError,
  ]);

  // Fetch breadcrumbs
  const fetchBreadcrumbs = useCallback(async () => {
    if (!folderId || folderId === "root") {
      setBreadcrumbs([]);
      return;
    }

    try {
      const result = await filesAPI.getBreadcrumbs(folderId);
      setBreadcrumbs(result.data);
    } catch (error) {
      console.error("Breadcrumb fetch error:", error);
    }
  }, [folderId, setBreadcrumbs]);

  // Fetch all folders (for move dialog)
  const fetchAllFolders = useCallback(async () => {
    if (!user) return;

    try {
      const data = await filesAPI.getAllFolders();
      setFolders(data.data);
    } catch (error) {
      console.error("Folders fetch error:", error);
    }
  }, [user, setFolders]);

  useEffect(() => {
    setCurrentFolder(folderId);
    fetchFiles();
    fetchBreadcrumbs();
  }, [folderId, setCurrentFolder, fetchFiles, fetchBreadcrumbs]);

  useEffect(() => {
    fetchAllFolders();
  }, [fetchAllFolders]);

  return {
    files,
    breadcrumbs,
    allFolders: folders,
    loading,
    refetch: fetchFiles,
    refetchFolders: fetchAllFolders,
  };
}
