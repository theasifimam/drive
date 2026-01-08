"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
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
import { useSelection } from "@/hooks/useSelection";

const API_URL = "http://localhost:5000/api";

export default function DrivePage({ user, onLogout, folderId }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  // State Management
  const [currentFolderId, setCurrentFolderId] = useState(folderId);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [dragOver, setDragOver] = useState(false);

  // Dialog States
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showMove, setShowMove] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Custom Hooks
  const {
    files,
    breadcrumbs,
    allFolders,
    loading,
    fetchFiles,
    fetchAllFolders,
    fetchBreadcrumbs,
  } = useDriveData(currentFolderId);

  const {
    createFolder,
    uploadFiles,
    renameItem,
    moveItems,
    deleteItems,
    downloadFile,
  } = useFileOperations(API_URL, fetchFiles, fetchAllFolders);

  const { selectedFiles, toggleSelection, selectAll, clearSelection } =
    useSelection(files);

  const [previewFile, setPreviewFile] = useState(null);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [newFolderName, setNewFolderName] = useState("");
  const [renamingItem, setRenamingItem] = useState(null);
  const [newName, setNewName] = useState("");
  const [movingItems, setMovingItems] = useState([]);
  const [moveDestination, setMoveDestination] = useState(null);

  // Update folder ID when prop changes
  useEffect(() => {
    setCurrentFolderId(folderId);
  }, [folderId]);

  // Navigation
  const navigateToFolder = (newFolderId) => {
    if (newFolderId) {
      router.push(`/${newFolderId}`);
    } else {
      router.push("/");
    }
  };

  const handleShareFolder = () => {
    const url = currentFolderId
      ? `${window.location.origin}/folder/${currentFolderId}`
      : window.location.origin;
    navigator.clipboard.writeText(url).then(() => {
      alert("Folder link copied to clipboard!");
    });
  };

  // File Operations
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    await createFolder(newFolderName, currentFolderId);
    setNewFolderName("");
    setShowNewFolder(false);
  };

  const handleRename = async () => {
    if (!newName.trim() || !renamingItem) return;
    await renameItem(renamingItem._id, newName);
    setShowRename(false);
    setRenamingItem(null);
    setNewName("");
  };

  const handleMove = async () => {
    if (movingItems.length === 0) return;
    await moveItems(movingItems, moveDestination);
    setShowMove(false);
    setMovingItems([]);
    setMoveDestination(null);
    clearSelection();
  };

  const handleDelete = async () => {
    const itemsToDelete =
      selectedFiles.size > 0 ? Array.from(selectedFiles) : [showDelete];
    await deleteItems(itemsToDelete);
    setShowDelete(false);
    clearSelection();
  };

  // Preview Operations
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

  // Drag and Drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFiles(e.dataTransfer.files, currentFolderId);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  // Filtered Files
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Item Actions
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
    <div className="min-h-screen bg-black">
      <Header
        user={user}
        onLogout={onLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        onHomeClick={() => navigateToFolder(null)}
        onBreadcrumbClick={navigateToFolder}
      />

      <div className="max-w-6xl mx-auto">
        <main
          className={`relative flex-1 mt-10 rounded-[32px] border border-white/5 bg-[#0D0D0D] transition-all duration-500 overflow-hidden ${
            dragOver ? "ring-2 ring-[#E2FF54] bg-[#E2FF54]/5 scale-[0.995]" : ""
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
              onShare={currentFolderId ? handleShareFolder : null}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              selectedCount={selectedFiles.size}
              onMove={() => openMoveDialog(Array.from(selectedFiles))}
              onDelete={() => setShowDelete(true)}
              onClearSelection={clearSelection}
            />

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={(e) =>
                e.target.files && uploadFiles(e.target.files, currentFolderId)
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
                selectedFiles={selectedFiles}
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
                selectedFiles={selectedFiles}
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

      {/* Dialogs */}
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
        currentFolderId={currentFolderId}
        onMove={handleMove}
      />

      <DeleteDialog
        open={showDelete}
        onOpenChange={setShowDelete}
        onDelete={handleDelete}
        itemCount={selectedFiles.size || 1}
      />

      <PreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        file={previewFile}
        onNavigate={navigatePreview}
        onDownload={() => downloadFile(previewFile._id)}
      />
    </div>
  );
}
