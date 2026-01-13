// contexts/DriveContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

const DriveContext = createContext(undefined);

export function DriveProvider({ children }) {
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const [dialogs, setDialogs] = useState({
    newFolder: false,
    rename: false,
    move: false,
    delete: false,
    preview: false,
  });

  const [operationData, setOperationDataState] = useState({
    renamingItem: null,
    movingItems: [],
    deleteTarget: false,
    previewFile: null,
    previewIndex: 0,
  });

  const openDialog = useCallback((dialog) => {
    setDialogs((prev) => ({ ...prev, [dialog]: true }));
  }, []);

  const closeDialog = useCallback((dialog) => {
    setDialogs((prev) => ({ ...prev, [dialog]: false }));
  }, []);

  const setOperationData = useCallback((data) => {
    setOperationDataState((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <DriveContext.Provider
      value={{
        viewMode,
        setViewMode,
        searchQuery,
        setSearchQuery,
        dialogs,
        openDialog,
        closeDialog,
        operationData,
        setOperationData,
      }}
    >
      {children}
    </DriveContext.Provider>
  );
}

export function useDriveContext() {
  const context = useContext(DriveContext);
  if (!context) {
    throw new Error("useDriveContext must be used within DriveProvider");
  }
  return context;
}
