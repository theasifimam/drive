// components/drive/FileGrid.tsx

import FileCard from "./FileCard";

export default function FileGrid({
  files,
  selectedFiles,
  onToggleSelection,
  onItemClick,
  onDownload,
  onRename,
  onMove,
  onDelete,
  isTrashView,
  restoreItems,
  bulkDeletePermanently,
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
      {files.map((item) => (
        <FileCard
          key={item._id}
          item={item}
          isSelected={selectedFiles.has(item._id)}
          onToggleSelection={() => onToggleSelection(item._id)}
          onClick={() => onItemClick(item)}
          onDownload={() => onDownload(item._id)}
          onRename={() => onRename(item)}
          onMove={() => onMove(item)}
          onDelete={() => onDelete(item._id)}
          isTrashView={isTrashView}
          restoreItems={restoreItems}
          bulkDeletePermanently={bulkDeletePermanently}
        />
      ))}
    </div>
  );
}
