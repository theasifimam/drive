"use client";

import { useState } from "react";
import Image from "next/image";

// ----------------------------------
// Helper: detect file category
// ----------------------------------
function getFileCategory(mimeType = "") {
  if (mimeType.startsWith("image")) return "image";
  if (mimeType.startsWith("video")) return "video";
  if (mimeType.startsWith("audio")) return "audio";
  if (mimeType === "application/pdf") return "pdf";
  return "doc"; // docs, zip, unknown
}

// ----------------------------------
// Small preview (grid item)
// ----------------------------------
export function FilePreview({ file, onClick }) {
  const category = getFileCategory(file.mimeType);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border p-2 hover:shadow"
    >
      {category === "image" && (
        <Image
          src={`/uploads/${file.path}`}
          alt={file.name}
          width={150}
          height={150}
          className="h-32 w-full object-cover rounded"
        />
      )}

      {category === "video" && (
        <video
          src={`/api/files/${file.path}`}
          className="h-32 w-full rounded object-cover"
          muted
        />
      )}

      {category === "audio" && (
        <div className="flex h-32 items-center justify-center bg-gray-100 rounded">
          🎵 Audio
        </div>
      )}

      {category === "pdf" && (
        <div className="flex h-32 items-center justify-center bg-red-50 rounded">
          📄 PDF
        </div>
      )}

      {category === "doc" && (
        <div className="flex h-32 items-center justify-center bg-blue-50 rounded">
          📁 File
        </div>
      )}

      <p className="mt-2 truncate text-sm">{file.name}</p>
    </div>
  );
}

// ----------------------------------
// Fullscreen modal with navigation
// ----------------------------------
function PreviewModal({ files, index, onClose, setIndex }) {
  const file = files[index];
  const category = getFileCategory(file.mimeType);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        onClick={() => setIndex((i) => Math.max(i - 1, 0))}
        className="absolute left-4 text-white text-3xl"
      >
        ‹
      </button>

      {/* Content */}
      <div className="max-w-[90vw] max-h-[90vh]">
        {category === "image" && (
          <img
            src={`/api/files/${file.path}`}
            alt={file.name}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        )}

        {category === "video" && (
          <video
            src={`/api/files/${file.path}`}
            controls
            autoPlay
            className="max-h-[90vh] max-w-[90vw]"
          />
        )}

        {category === "audio" && (
          <audio src={`/api/files/${file.path}`} controls autoPlay />
        )}

        {category === "pdf" && (
          <iframe
            src={`/api/files/${file.path}`}
            className="w-[80vw] h-[90vh] bg-white"
          />
        )}

        {category === "doc" && (
          <div className="bg-white p-6 rounded">
            <p className="mb-4">Preview not available</p>
            <a
              href={`/api/files/${file.path}`}
              download
              className="text-blue-600 underline"
            >
              Download file
            </a>
          </div>
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => setIndex((i) => Math.min(i + 1, files.length - 1))}
        className="absolute right-4 text-white text-3xl"
      >
        ›
      </button>
    </div>
  );
}

// ----------------------------------
// Main gallery component
// ----------------------------------
export default function FileGallery({ files }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <FilePreview
            key={file.path}
            file={file}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <PreviewModal
          files={files}
          index={activeIndex}
          setIndex={setActiveIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}
