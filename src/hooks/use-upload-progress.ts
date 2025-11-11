import { useState, useCallback } from 'react';

interface UploadProgress {
  isUploading: boolean;
  progress: number;
  currentFile: string;
  totalFiles: number;
  completedFiles: number;
  error: string | null;
}

export function useUploadProgress() {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    isUploading: false,
    progress: 0,
    currentFile: '',
    totalFiles: 0,
    completedFiles: 0,
    error: null,
  });

  const startUpload = useCallback((totalFiles: number) => {
    setUploadProgress({
      isUploading: true,
      progress: 0,
      currentFile: '',
      totalFiles,
      completedFiles: 0,
      error: null,
    });
  }, []);

  const updateProgress = useCallback((currentFile: string, completedFiles: number, totalFiles?: number) => {
    setUploadProgress(prev => ({
      ...prev,
      currentFile,
      completedFiles,
      totalFiles: totalFiles !== undefined ? totalFiles : prev.totalFiles,
      progress: (totalFiles !== undefined ? totalFiles : prev.totalFiles) > 0
        ? Math.round((completedFiles / (totalFiles !== undefined ? totalFiles : prev.totalFiles)) * 100)
        : 0,
    }));
  }, []);

  const setError = useCallback((error: string) => {
    setUploadProgress(prev => ({
      ...prev,
      error,
      isUploading: false,
    }));
  }, []);

  const completeUpload = useCallback(() => {
    setUploadProgress(prev => ({
      ...prev,
      isUploading: false,
      progress: 100,
      currentFile: '',
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setUploadProgress({
      isUploading: false,
      progress: 0,
      currentFile: '',
      totalFiles: 0,
      completedFiles: 0,
      error: null,
    });
  }, []);

  return {
    uploadProgress,
    startUpload,
    updateProgress,
    setError,
    completeUpload,
    resetProgress,
  };
}
