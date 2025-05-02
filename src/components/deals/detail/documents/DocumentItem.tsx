
import { useState } from "react";
import { Document } from "@/data/mock-documents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  FileImage,
  Download,
  Eye,
  File,
  FileType,
  FileSpreadsheet
} from "lucide-react";

interface DocumentItemProps {
  document: Document;
  selected: boolean;
  onClick: () => void;
}

export const DocumentItem = ({ document, selected, onClick }: DocumentItemProps) => {
  const getFileIcon = () => {
    switch (document.fileType) {
      case "pdf":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "docx":
        return <FileText className="h-5 w-5 text-blue-600" />;
      case "xlsx":
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case "png":
      case "jpg":
        return <FileImage className="h-5 w-5 text-purple-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div 
      className={`p-3 border rounded-md mb-2 transition-colors ${
        selected ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {getFileIcon()}
          <div className="flex-1">
            <h4 className="font-medium text-sm">{document.title}</h4>
            <p className="text-xs text-muted-foreground">{document.fileName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {document.status && (
            <Badge 
              variant={document.status === "new" ? "default" : 
                     document.status === "reviewed" ? "secondary" : 
                     "outline"}
              className="text-[10px]"
            >
              {document.status}
            </Badge>
          )}
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            {document.size}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Preview</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        Uploaded {document.uploadDate}
        {document.description && <span> • {document.description}</span>}
      </div>
    </div>
  );
};
