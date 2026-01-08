// hooks/useDriveData.ts
import { useState, useEffect } from "react";

export function useDriveData(currentFolderId) {
  const [files, setFiles] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api";

  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/files?parentId=${currentFolderId || ""}`,
        { headers: getAuthHeaders() }
      );
      if (!res.ok) throw new Error("Failed to fetch files");
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFolders = async () => {
    try {
      const res = await fetch(`${API_URL}/folders/all`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setAllFolders(data);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  const fetchBreadcrumbs = async () => {
    if (!currentFolderId) {
      setBreadcrumbs([]);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/breadcrumb/${currentFolderId}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setBreadcrumbs(data);
    } catch (error) {
      console.error("Error fetching breadcrumbs:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
    fetchAllFolders();
    fetchBreadcrumbs();
  }, [currentFolderId]);

  return {
    files,
    breadcrumbs,
    allFolders,
    loading,
    fetchFiles,
    fetchAllFolders,
    fetchBreadcrumbs,
  };
}
