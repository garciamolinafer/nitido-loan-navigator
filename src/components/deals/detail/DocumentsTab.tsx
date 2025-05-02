
import { useState } from "react";
import { mockDocuments, documentCategories, Document } from "@/data/mock-documents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Upload, 
  Search,
  CircleHelp,
  BookOpen
} from "lucide-react";
import { DocumentCategory } from "./documents/DocumentCategory";
import { DocumentPreview } from "./documents/DocumentPreview";
import { ContractsAssistant, MinimizedAssistant } from "./documents/ContractsAssistant";
import { Badge } from "@/components/ui/badge";

const DocumentsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showAssistant, setShowAssistant] = useState(false);
  const [minimizedAssistant, setMinimizedAssistant] = useState(false);
  
  // Filter documents based on search query
  const filteredDocuments = mockDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group documents by category
  const documentsByCategory = documentCategories.map(category => ({
    ...category,
    documents: filteredDocuments.filter(doc => doc.category === category.id)
  }));
  
  // Handle document selection
  const handleSelectDocument = (document: Document) => {
    setSelectedDocument(document);
  };
  
  // Handle assistant toggle
  const toggleAssistant = () => {
    if (minimizedAssistant) {
      setMinimizedAssistant(false);
    } else {
      setShowAssistant(!showAssistant);
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Header section with upload button and search */}
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        <div className="flex gap-3">
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Document
          </Button>
          <Button variant="outline" className="gap-1" onClick={toggleAssistant}>
            <BookOpen className="h-4 w-4" />
            Contracts Assistant
          </Button>
        </div>
        <div className="relative max-w-xs">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      {/* Integration indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="gap-1 px-2 py-0.5 border-dashed">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            Synced with Intralinks
          </Badge>
          <span className="text-xs">Last synced: May 1, 2025</span>
        </div>
        <Button variant="ghost" size="sm" className="text-xs gap-1">
          <CircleHelp className="h-3.5 w-3.5" />
          Document Help
        </Button>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Document categories section */}
        <div className="space-y-4">
          <h3 className="font-medium">Document Repository</h3>
          
          {documentsByCategory.map((category) => (
            <DocumentCategory 
              key={category.id}
              title={category.name}
              description={category.description}
              documents={category.documents}
              selectedDocumentId={selectedDocument?.id || null}
              onSelectDocument={handleSelectDocument}
              defaultOpen={category.id === "legal"} // Open legal by default
            />
          ))}
        </div>
        
        {/* Document preview & contract assistant */}
        <div className="space-y-4">
          {showAssistant ? (
            <ContractsAssistant 
              selectedDocument={selectedDocument}
              onClose={() => setShowAssistant(false)}
              onMinimize={() => {
                setShowAssistant(false);
                setMinimizedAssistant(true);
              }}
            />
          ) : (
            <DocumentPreview document={selectedDocument} />
          )}
        </div>
      </div>
      
      {/* Minimized assistant */}
      {minimizedAssistant && (
        <div className="fixed bottom-20 right-20 w-64 z-40">
          <MinimizedAssistant onMaximize={() => {
            setMinimizedAssistant(false);
            setShowAssistant(true);
          }} />
        </div>
      )}
      
      {/* Contracts Assistant trigger button (always visible at bottom right) */}
      <Button 
        variant="outline"
        className="fixed bottom-6 right-20 shadow-md flex gap-2 z-30"
        onClick={toggleAssistant}
      >
        <BookOpen className="h-4 w-4" />
        <span className="font-medium">Contracts Assistant</span>
      </Button>
    </div>
  );
};

export default DocumentsTab;
