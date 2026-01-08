// hooks/useFileOperations.ts
export function useFileOperations(API_URL, fetchFiles, fetchAllFolders) {
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const createFolder = async (name, parentId) => {
    try {
      const res = await fetch(`${API_URL}/folders`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ name, parentId }),
      });
      if (res.ok) {
        await fetchFiles();
        await fetchAllFolders();
        return true;
      }
    } catch (error) {
      console.error("Error creating folder:", error);
    }
    return false;
  };

  const uploadFiles = async (fileList, parentId) => {
    const files = Array.from(fileList);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("parentId", parentId || "");
      try {
        await fetch(`${API_URL}/upload`, {
          method: "POST",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          body: formData,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    await fetchFiles();
  };

  const renameItem = async (id, newName) => {
    try {
      const res = await fetch(`${API_URL}/files/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ name: newName }),
      });
      if (res.ok) {
        await fetchFiles();
        await fetchAllFolders();
        return true;
      }
    } catch (error) {
      console.error("Error renaming item:", error);
    }
    return false;
  };

  const moveItems = async (itemIds, destinationId) => {
    try {
      for (const itemId of itemIds) {
        await fetch(`${API_URL}/files/${itemId}/move`, {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({ parentId: destinationId }),
        });
      }
      await fetchFiles();
      await fetchAllFolders();
      return true;
    } catch (error) {
      console.error("Error moving items:", error);
    }
    return false;
  };

  const deleteItems = async (itemIds) => {
    try {
      for (const id of itemIds) {
        await fetch(`${API_URL}/files/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });
      }
      await fetchFiles();
      await fetchAllFolders();
      return true;
    } catch (error) {
      console.error("Error deleting items:", error);
    }
    return false;
  };

  const downloadFile = (id) => {
    const token = localStorage.getItem("token");
    window.open(`${API_URL}/download/${id}?token=${token}`, "_blank");
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
