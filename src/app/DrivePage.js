"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/drive/Breadcrumbs";
import ActionBar from "@/components/drive/ActionBar";
import FileGrid from "@/components/drive/FileGrid";
import FileList from "@/components/drive/FileList";
import DragDropOverlay from "@/components/drive/DragDropOverlay";
import EmptyState from "@/components/drive/EmptyState";
import LoadingState from "@/components/drive/LoadingState";
import PreviewDialog from "@/components/dialogs/PreviewDialog";
import NewFolderDialog from "@/components/dialogs/NewFolderDialog";
import RenameDialog from "@/components/dialogs/RenameDialog";
import MoveDialog from "@/components/dialogs/MoveDialog";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import { useDriveData } from "@/hooks/useDriveData";
import { useFileOperations } from "@/hooks/useFileOperations";
import { useAuthStore } from "@/store/authStore";
import { useDriveStore } from "@/store/driveStore";
import { RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import OperationsOverlay from "@/components/drive/OperationsOverlay";

export default function DrivePage({ folderId }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const user = useAuthStore((state) => state.user);

  // ZUSTAND STORE
  const {
    files,
    breadcrumbs,
    loading,
    viewMode,
    selectedIds,
    setViewMode,
    toggleSelection,
    selectAll,
    clearSelection,
  } = useDriveStore();

  // CUSTOM HOOKS
  const { allFolders, refetch } = useDriveData(folderId);
  const {
    createFolder,
    uploadFiles,
    renameItem,
    moveItems,
    deleteItems,
    downloadFile,
  } = useFileOperations();

  // LOCAL STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // DIALOG STATES
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showMove, setShowMove] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // DIALOG DATA
  const [previewFile, setPreviewFile] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [newFolderName, setNewFolderName] = useState("New Folder");
  const [renamingItem, setRenamingItem] = useState(null);
  const [newName, setNewName] = useState("");
  const [movingItems, setMovingItems] = useState([]);
  const [moveDestination, setMoveDestination] = useState(null);

  // KEYBOARD NAVIGATION FOR PREVIEW
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!previewFile) return;
      if (event.key === "ArrowRight") {
        navigatePreview(1);
      } else if (event.key === "ArrowLeft") {
        navigatePreview(-1);
      } else if (event.key === "Escape") {
        setPreviewFile(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewFile, previewIndex, files]);

  // NAVIGATION
  const navigateToFolder = (newFolderId) => {
    if (newFolderId) {
      router.push(`/folder/${newFolderId}`);
    } else {
      router.push("/");
    }
  };

  const handleShareFolder = () => {
    const url = folderId
      ? `${window.location.origin}/folder/${folderId}`
      : window.location.origin;
    navigator.clipboard.writeText(url).then(() => {
      alert("Folder link copied to clipboard!");
    });
  };

  // FILE OPERATIONS
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    const success = await createFolder(newFolderName, folderId);
    if (success) {
      setNewFolderName("");
      setShowNewFolder(false);
      refetch();
    }
  };

  const handleRename = async () => {
    if (!newName.trim() || !renamingItem) return;
    const success = await renameItem(renamingItem._id, newName);
    if (success) {
      setShowRename(false);
      setRenamingItem(null);
      setNewName("");
      refetch();
    }
  };

  const handleMove = async () => {
    if (movingItems.length === 0) return;
    const success = await moveItems(movingItems, moveDestination);
    if (success) {
      setShowMove(false);
      setMovingItems([]);
      setMoveDestination(null);
      clearSelection();
      refetch();
    }
  };

  const handleDelete = async () => {
    const itemsToDelete =
      selectedIds.size > 0 ? Array.from(selectedIds) : [showDelete];
    const success = await deleteItems(itemsToDelete);
    if (success) {
      setShowDelete(false);
      clearSelection();
      refetch();
    }
  };

  // PREVIEW OPERATIONS
  const isPreviewable = (file) => {
    if (!file || !file.mimeType) return false;
    return (
      file.mimeType.startsWith("image/") || file.mimeType.startsWith("video/")
    );
  };

  const handlePreview = (file) => {
    const previewableFiles = files.filter((f) => isPreviewable(f));
    const index = previewableFiles.findIndex((f) => f._id === file._id);
    setPreviewFile(file);
    setPreviewIndex(index);
    setShowPreview(true);
  };

  const navigatePreview = (direction) => {
    const previewableFiles = files.filter((f) => isPreviewable(f));
    let newIndex = previewIndex + direction;
    if (newIndex < 0) newIndex = previewableFiles.length - 1;
    if (newIndex >= previewableFiles.length) newIndex = 0;
    setPreviewIndex(newIndex);
    setPreviewFile(previewableFiles[newIndex]);
  };

  // DRAG AND DROP
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files, folderId).then(() => refetch());
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  // FILTERED FILES
  const filteredFiles = files?.filter((file) => {
    return file.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // ITEM ACTIONS
  const handleItemClick = (item) => {
    if (item.type === "folder") {
      navigateToFolder(item._id);
    } else {
      handlePreview(item);
    }
  };

  const openRenameDialog = (item) => {
    setRenamingItem(item);
    setNewName(item.name);
    setShowRename(true);
  };

  const openMoveDialog = (items) => {
    setMovingItems(items);
    setShowMove(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-black">
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        onHomeClick={() => navigateToFolder(null)}
        onBreadcrumbClick={navigateToFolder}
      />

      <div className="max-w-6xl mx-auto">
        <main
          className={`relative flex-1 mt-10 rounded-4xl border border-white/5 dark:bg-[#0D0D0D] transition-all duration-500 overflow-hidden ${
            dragOver
              ? "ring-2 ring-nexus-accent bg-lime-50/50 dark:bg-nexus-accent/5 scale-[0.995]"
              : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {dragOver && <DragDropOverlay />}

          <div className="p-8">
            <ActionBar
              onNewFolder={() => setShowNewFolder(true)}
              onUpload={() => fileInputRef.current?.click()}
              onShare={folderId ? handleShareFolder : null}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              selectedCount={selectedIds.size}
              onMove={() => openMoveDialog(Array.from(selectedIds))}
              onDelete={() => setShowDelete(true)}
              onClearSelection={clearSelection}
            />

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) =>
                e.target.files &&
                uploadFiles(e.target.files, folderId).then(() => refetch())
              }
              className="hidden"
            />

            {loading ? (
              <LoadingState />
            ) : filteredFiles.length === 0 ? (
              <EmptyState searchQuery={searchQuery} />
            ) : viewMode === "grid" ? (
              <FileGrid
                files={filteredFiles}
                selectedFiles={selectedIds}
                onToggleSelection={toggleSelection}
                onItemClick={handleItemClick}
                onDownload={downloadFile}
                onRename={openRenameDialog}
                onMove={(item) => openMoveDialog([item._id])}
                onDelete={(id) => setShowDelete(id)}
              />
            ) : (
              <FileList
                files={filteredFiles}
                selectedFiles={selectedIds}
                onToggleSelection={toggleSelection}
                onSelectAll={selectAll}
                onItemClick={handleItemClick}
                onDownload={downloadFile}
                onRename={openRenameDialog}
                onMove={(item) => openMoveDialog([item._id])}
                onDelete={(id) => setShowDelete(id)}
              />
            )}
          </div>
        </main>
      </div>

      {/* DIALOGS */}
      <NewFolderDialog
        open={showNewFolder}
        onOpenChange={setShowNewFolder}
        folderName={newFolderName}
        onFolderNameChange={setNewFolderName}
        onCreate={handleCreateFolder}
      />

      <RenameDialog
        open={showRename}
        onOpenChange={setShowRename}
        name={newName}
        onNameChange={setNewName}
        onRename={handleRename}
      />

      <MoveDialog
        open={showMove}
        onOpenChange={setShowMove}
        destination={moveDestination}
        onDestinationChange={setMoveDestination}
        folders={allFolders}
        movingItems={movingItems}
        currentFolderId={folderId}
        onMove={handleMove}
      />

      <DeleteDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        onDelete={handleDelete}
        itemCount={selectedIds.size || 1}
      />

      <PreviewDialog
        open={showPreview}
        user={user}
        onOpenChange={setShowPreview}
        file={previewFile}
        onNavigate={navigatePreview}
        onDownload={() => downloadFile(previewFile._id)}
      />

      {/* FLOATING ACTION HUD (Appears on selection) */}
      <OperationsOverlay
        selectedIds={selectedIds}
        handleDelete={handleDelete}
      />
    </div>
  );
}
