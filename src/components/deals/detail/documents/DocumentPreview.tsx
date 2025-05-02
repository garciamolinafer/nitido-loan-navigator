
import { Document } from "@/data/mock-documents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileType, Eye } from "lucide-react";

interface DocumentPreviewProps {
  document: Document | null;
}

export const DocumentPreview = ({ document }: DocumentPreviewProps) => {
  if (!document) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center">
        <div className="text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Select a document to preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <Card className="border-0 shadow-none">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">{document.title}</CardTitle>
              <CardDescription>
                {document.fileName} • {document.size} • Uploaded {document.uploadDate}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Open
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 border rounded-md p-8 flex items-center justify-center h-[400px] overflow-hidden">
            <div className="text-center">
              <FileType className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">
                Document preview not available in demo
              </p>
              <p className="text-xs mt-2 text-muted-foreground max-w-xs mx-auto">
                In the full application, documents would be rendered here or opened in a viewer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
