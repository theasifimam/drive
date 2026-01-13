"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Create an instance to keep the code DRY
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
const driveApi = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Sends cookies automatically
});

export function useDriveData(currentFolderId) {
  const [files, setFiles] = useState([]);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- FETCH FILES (Current Directory) ---
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      // If currentFolderId is "root" or null, we pass empty string or specific root param
      const parentId =
        currentFolderId && currentFolderId !== "root" ? currentFolderId : "";
      const res = await driveApi.get(
        `/files/folder-files/${parentId || "root"}`
      );

      // Axios stores data in .data
      setFiles(res.data.success ? res.data.data : res.data);
    } catch (error) {
      console.error(
        "DRIVE_FETCH_ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  }, [currentFolderId]);

  // --- FETCH ALL FOLDERS (For Move/Copy Tree) ---
  const fetchAllFolders = useCallback(async () => {
    try {
      const res = await driveApi.get("/files/all-folders");
      setAllFolders(res.data.success ? res.data.data : res.data);
    } catch (error) {
      console.error("FOLDER_TREE_FETCH_ERROR:", error);
    }
  }, []);

  // --- FETCH BREADCRUMBS ---
  const fetchBreadcrumbs = useCallback(async () => {
    if (!currentFolderId || currentFolderId === "root") {
      setBreadcrumbs([]);
      return;
    }
    try {
      const res = await driveApi.get(`/files/breadcrumb/${currentFolderId}`);
      setBreadcrumbs(res.data.success ? res.data.data : res.data);
    } catch (error) {
      console.error("BREADCRUMB_FETCH_ERROR:", error);
    }
  }, [currentFolderId]);

  // Trigger sync when folder changes
  useEffect(() => {
    fetchFiles();
    fetchBreadcrumbs();
    // Fetch folders only once or when needed (e.g., for sidebar)
    fetchAllFolders();
  }, [currentFolderId, fetchFiles, fetchBreadcrumbs, fetchAllFolders]);

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
