// ### 2. Drive Store with Zustand (lib/stores/driveStore.js) - NO IMMER VERSION

"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  currentFolderId: null,
  files: [],
  folders: [],
  breadcrumbs: [],
  selectedIds: new Set(),
  viewMode: "grid",
  loading: false,
  error: null,
  fileCache: new Map(),
  folderCache: new Map(),
};

export const useDriveStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // FOLDER NAVIGATION
        setCurrentFolder: (folderId) => {
          set({
            currentFolderId: folderId,
            selectedIds: new Set(), // Create new Set instead of mutating
          });
        },

        // FILE MANAGEMENT
        setFiles: (files) => {
          const state = get();
          const newCache = new Map(state.fileCache);
          if (state.currentFolderId) {
            newCache.set(state.currentFolderId, files);
          }
          set({ files, fileCache: newCache });
        },

        setFolders: (folders) => set({ folders }),

        setBreadcrumbs: (breadcrumbs) => set({ breadcrumbs }),

        // SELECTION MANAGEMENT
        toggleSelection: (id) => {
          const state = get();
          const newSelected = new Set(state.selectedIds);
          if (newSelected.has(id)) {
            newSelected.delete(id);
          } else {
            newSelected.add(id);
          }
          set({ selectedIds: newSelected });
        },

        selectAll: () => {
          const state = get();
          const allIds = state.files.map((f) => f._id);
          set({ selectedIds: new Set(allIds) });
        },

        clearSelection: () => {
          set({ selectedIds: new Set() });
        },

        // OPTIMISTIC UPDATES
        addFileOptimistic: (file) => {
          const state = get();
          set({ files: [file, ...state.files] });
        },

        removeFileOptimistic: (id) => {
          const state = get();
          const newSelected = new Set(state.selectedIds);
          newSelected.delete(id);
          set({
            files: state.files.filter((f) => f._id !== id),
            selectedIds: newSelected,
          });
        },

        updateFileOptimistic: (id, updates) => {
          set((state) => {
            // 1. Check if the file exists in the current live state
            const fileExists = state.files.some((f) => f._id === id);
            if (!fileExists) return state; // Return unchanged state if not found

            // 2. Return the new state object
            return {
              files: state.files.map((f) =>
                f._id === id ? { ...f, ...updates } : f
              ),
            };
          });
        },

        // CACHE MANAGEMENT
        cacheFiles: (folderId, files) => {
          const state = get();
          const newCache = new Map(state.fileCache);
          newCache.set(folderId, files);
          set({ fileCache: newCache });
        },

        getCachedFiles: (folderId) => {
          return get().fileCache.get(folderId);
        },

        invalidateCache: (folderId) => {
          const state = get();
          const newCache = new Map(state.fileCache);
          if (folderId) {
            newCache.delete(folderId);
          } else {
            newCache.clear();
          }
          set({ fileCache: newCache });
        },

        // UI STATE
        setViewMode: (mode) => set({ viewMode: mode }),
        setLoading: (loading) => set({ loading }),
        setError: (error) => set({ error }),

        // RESET
        reset: () => set(initialState),
      }),
      {
        name: "drive-storage",
        partialize: (state) => ({
          viewMode: state.viewMode,
        }),
        // Custom storage to handle Set and Map serialization
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            const { state } = JSON.parse(str);
            return {
              state: {
                ...state,
                selectedIds: new Set(state.selectedIds || []),
                fileCache: new Map(state.fileCache || []),
                folderCache: new Map(state.folderCache || []),
              },
            };
          },
          setItem: (name, value) => {
            const { state } = value;
            const serialized = {
              state: {
                ...state,
                selectedIds: Array.from(state.selectedIds || []),
                fileCache: Array.from(state.fileCache || []),
                folderCache: Array.from(state.folderCache || []),
              },
            };
            localStorage.setItem(name, JSON.stringify(serialized));
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    ),
    { name: "DriveStore" }
  )
);
