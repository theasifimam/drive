// ### 2. Drive Store with Zustand (lib/stores/driveStore.js) - NO IMMER VERSION

"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialState = {
  files: [],
  selectedIds: new Set(),
  viewMode: "grid",
  loading: false,
  error: null,
  fileCache: new Map(),
};

export const useTrashStore = create(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // FILE MANAGEMENT
        setFiles: (files) => {
          const state = get();
          const newCache = new Map(state.fileCache);
          set({ files, fileCache: newCache });
        },

        setSelectedIds: (ids) => set({ selectedIds: new Set(ids) }),

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

        restoreTrash: () => {
          const state = get();
          const newSelected = new Set(state.selectedIds);
          const newFiles = state.files.filter((f) => !newSelected.has(f._id));
          set({ files: newFiles, selectedIds: new Set() });
        },

        deletePermanently: () => {
          const state = get();
          const newSelected = new Set(state.selectedIds);
          const newFiles = state.files.filter((f) => !newSelected.has(f._id));
          set({ files: newFiles, selectedIds: new Set() });
        },

        clearSelection: () => {
          set({ selectedIds: new Set() });
        },

        moveToTrashBulkOptimistic: (ids) => {
          const state = get();
          const newFiles = state.files.filter((f) => !ids.includes(f._id));
          set({ files: newFiles });
        },

        bulkDeleteTrashPermanentlyOptimistic: (ids) => {
          const state = get();
          const newFiles = state.files.filter((f) => !ids.includes(f._id));
          set({ files: newFiles });
        },

        // CACHE MANAGEMENT
        cacheFiles: (folderId, files) => {
          const state = get();
          const newCache = new Map(state.fileCache);
          newCache.set(folderId, files);
          set({ fileCache: newCache });
        },

        getCachedFiles: () => {
          return get().fileCache.get();
        },

        invalidateCache: () => {
          const state = get();
          const newCache = new Map(state.fileCache);
          newCache.clear();

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
