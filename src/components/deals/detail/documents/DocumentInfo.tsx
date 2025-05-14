import { useState } from 'react';
import { DocumentMetadata, CATEGORY_COLORS } from '@/types/documents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Eye, 
  Clock, 
  Tag, 
  User, 
  FileType,
  History,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentInfoProps {
  document: DocumentMetadata;
  onPreview: () => void;
  onDownload: () => void;
}

export const DocumentInfo = ({ document, onPreview, onDownload }: DocumentInfoProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [showAccessHistory, setShowAccessHistory] = useState(false);
  const [expandedInfo, setExpandedInfo] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
    onPreview();
  };

  const renderAccessHistory = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-row items-center justify-between py-2">
          <CardTitle className="text-base">Access History</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowAccessHistory(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {document.accessHistory?.map((access, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-muted rounded-md">
                  <div>
                    <p className="font-medium text-sm">{access.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {access.action === 'view' ? 'Viewed' : 'Downloaded'}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(access.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Card className="h-full border-0 shadow-none">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{document.name}</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              {document.fileName}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-3.5 w-3.5 mr-1" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="h-3.5 w-3.5 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col h-[calc(100vh-250px)]">
          <div className="space-y-3 border rounded-lg p-3 bg-muted/5">
            {/* Quick Info */}
            <div className="flex items-center gap-2 text-xs">
              <Badge 
                style={{ backgroundColor: CATEGORY_COLORS[document.category] }}
                className="text-white text-xs"
              >
                {document.category.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className="text-xs">{document.status}</Badge>
              <span className="text-muted-foreground ml-auto">{document.fileType} • {document.size}</span>
            </div>

            {/* Essential Info */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex items-center">
                <User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <span className="text-muted-foreground">By:</span>
                <span className="ml-1.5 truncate">{document.uploaderName}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-1.5">{document.uploadDate}</span>
              </div>
              <div className="flex items-center">
                <History className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <span className="text-muted-foreground">Version:</span>
                <span className="ml-1.5">{document.version}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <span className="text-muted-foreground">Tags:</span>
                <span className="ml-1.5 truncate">{document.tags.join(', ')}</span>
              </div>
            </div>

            {/* Expandable Section */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-6 text-xs"
              onClick={() => setExpandedInfo(!expandedInfo)}
            >
              {expandedInfo ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </Button>

            {/* Additional Info (Expandable) */}
            {expandedInfo && (
              <div className="space-y-3 pt-2 border-t">
                {/* Access History */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xs font-medium">Recent Access</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => setShowAccessHistory(true)}
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {document.accessHistory?.slice(0, 2).map((access, idx) => (
                      <div key={idx} className="text-xs flex justify-between">
                        <span>{access.userName}</span>
                        <span className="text-muted-foreground">
                          {new Date(access.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-xs font-medium mb-1">Location</h3>
                  <p className="text-xs text-muted-foreground">
                    {document.path.join(' / ')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Document Preview */}
          <div className={`mt-4 border rounded-lg ${showPreview ? 'flex-1' : 'h-0'} transition-all duration-200`}>
            {showPreview && (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center p-2 border-b">
                  <h3 className="text-xs font-medium">Preview</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6"
                    onClick={() => setShowPreview(false)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex-1 bg-muted/5 flex items-center justify-center">
                  {/* TODO: Implement actual document preview */}
                  <p className="text-muted-foreground text-sm">Document Preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Access History Modal */}
      {showAccessHistory && renderAccessHistory()}
    </Card>
  );
}; 