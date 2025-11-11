import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileOrLinkInputProps {
  label?: string;
  placeholder?: string;
  accept?: string;
  onAdd: (url: string) => void;
  buttonText?: string;
}

export default function FileOrLinkInput({
  label,
  placeholder,
  accept,
  onAdd,
  buttonText = "Add",
}: FileOrLinkInputProps) {
  const [url, setUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddUrl = () => {
    if (!url.trim()) return;
    onAdd(url.trim());
    setUrl("");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : undefined;
      if (result) {
        onAdd(result);
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder || (label ? `Add ${label} URL` : "Add URL")}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
          className="flex-1 transition-all duration-300 focus:shadow-glow hover:shadow-medium"
        />
        <Button type="button" onClick={handleAddUrl} variant="outline" className="hover-scale transition-spring">
          {buttonText}
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-dashed border-border"></div>
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="flex-1 border-t border-dashed border-border"></div>
      </div>
      <div>
        <Button type="button" onClick={handleUploadClick} variant="outline" className="w-full hover-scale transition-spring">
          <Upload className="w-4 h-4 mr-2" />
          Upload {label || 'File'}
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}


