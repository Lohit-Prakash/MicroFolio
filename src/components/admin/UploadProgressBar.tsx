import { Progress } from "@/components/ui/progress";
import { X } from "lucide-react";

interface UploadProgressBarProps {
  isVisible: boolean;
  progress: number;
  currentFile: string;
  totalFiles: number;
  completedFiles: number;
  error: string | null;
  onClose: () => void;
}

export default function UploadProgressBar({
  isVisible,
  progress,
  currentFile,
  totalFiles,
  completedFiles,
  error,
  onClose,
}: UploadProgressBarProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 bg-background border border-border rounded-lg shadow-lg p-4 animate-in slide-in-from-top-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">
          {error ? "Upload Failed" : "Uploading Files"}
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {error ? (
        <div className="text-sm text-destructive mb-2">
          {error}
        </div>
      ) : (
        <>
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentFile}</span>
              <span>{completedFiles}/{totalFiles} files</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-center text-muted-foreground">
              {progress}% complete
            </div>
          </div>
        </>
      )}

      <div className="text-xs text-muted-foreground">
        {error 
          ? "Please try again or check your connection."
          : "Please don't close this page while uploading."
        }
      </div>
    </div>
  );
}
