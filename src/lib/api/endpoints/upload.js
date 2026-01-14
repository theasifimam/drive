// ### 4. Upload Manager with Chunking (lib/api/endpoints/uploads.ts)

import { apiClient } from "../client";
import { toast } from "sonner";

class UploadManager {
  uploadQueue = new Map();
  concurrentUploads = 3; // Max concurrent uploads
  chunkSize = 5 * 1024 * 1024; // 5MB chunks

  async uploadFiles(files, parentId) {
    const fileArray = Array.from(files);

    // Create upload queue
    fileArray.forEach((file, index) => {
      const fileId = `${Date.now()}-${index}`;
      this.uploadQueue.set(fileId, {
        fileId,
        fileName: file.name,
        progress: 0,
        status: "pending",
      });
    });

    // Process uploads with concurrency control
    const uploadPromises = fileArray.map((file, index) =>
      this.uploadFile(file, parentId, `${Date.now()}-${index}`)
    );

    // Use Promise.allSettled to handle partial failures
    const results = await Promise.allSettled(uploadPromises);

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    if (succeeded > 0) {
      toast.success(`${succeeded} file(s) uploaded successfully`);
    }
    if (failed > 0) {
      toast.error(`${failed} file(s) failed to upload`);
    }
  }

  async uploadFile(file, parentId, fileId) {
    this.updateProgress(fileId, 0, "uploading");

    try {
      // For large files, use chunked upload
      if (file.size > this.chunkSize) {
        await this.uploadInChunks(file, parentId, fileId);
      } else {
        await this.uploadDirect(file, parentId, fileId);
      }

      this.updateProgress(fileId, 100, "success");
    } catch (error) {
      this.updateProgress(fileId, 0, "error");
      throw error;
    }
  }

  async uploadDirect(file, parentId, fileId) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", parentId || "");

    await apiClient.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        this.updateProgress(fileId, progress, "uploading");
      },
    });
  }

  async uploadInChunks(file, parentId, fileId) {
    const totalChunks = Math.ceil(file.size / this.chunkSize);

    // Initialize upload session
    const { uploadId } = await apiClient.post("/files/upload/init", {
      fileName: file.name,
      fileSize: file.size,
      totalChunks,
      parentId,
    });

    // Upload chunks
    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("uploadId", uploadId);
      formData.append("chunkIndex", i.toString());

      await apiClient.post("/files/upload/chunk", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const progress = Math.round(((i + 1) / totalChunks) * 100);
      this.updateProgress(fileId, progress, "uploading");
    }

    // Finalize upload
    await apiClient.post("/files/upload/finalize", { uploadId });
  }

  updateProgress(fileId, progress, status) {
    const upload = this.uploadQueue.get(fileId);
    if (upload) {
      upload.progress = progress;
      upload.status = status;
      // Emit event for UI updates
      window.dispatchEvent(
        new CustomEvent("upload-progress", { detail: upload })
      );
    }
  }

  getProgress(fileId) {
    return this.uploadQueue.get(fileId);
  }

  getAllProgress() {
    return Array.from(this.uploadQueue.values());
  }
}

export const uploadManager = new UploadManager();
