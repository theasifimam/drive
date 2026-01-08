// hooks/useSelection.ts
import { useState } from "react";

export function useSelection(files) {
  const [selectedFiles, setSelectedFiles] = useState(new Set());

  const toggleSelection = (id) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const selectAll = () => {
    if (selectedFiles.size === files.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(files.map((f) => f._id)));
    }
  };

  const clearSelection = () => {
    setSelectedFiles(new Set());
  };

  return {
    selectedFiles,
    toggleSelection,
    selectAll,
    clearSelection,
  };
}
