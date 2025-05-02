
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Document } from "@/data/mock-documents";
import { DocumentItem } from "./DocumentItem";
import { Badge } from "@/components/ui/badge";

interface DocumentCategoryProps {
  title: string;
  description: string;
  documents: Document[];
  selectedDocumentId: string | null;
  onSelectDocument: (document: Document) => void;
  defaultOpen?: boolean;
}

export const DocumentCategory = ({
  title,
  description,
  documents,
  selectedDocumentId,
  onSelectDocument,
  defaultOpen = false
}: DocumentCategoryProps) => {
  const newDocumentsCount = documents.filter(doc => doc.status === "new").length;
  
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? "category" : undefined}>
      <AccordionItem value="category" className="border rounded-md mb-3">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center gap-2 text-left">
            <span className="font-medium">{title}</span>
            <span className="text-muted-foreground text-xs">({documents.length})</span>
            {newDocumentsCount > 0 && (
              <Badge variant="default" className="text-xs">
                {newDocumentsCount} new
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="px-4 pt-1 pb-3">
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="space-y-2">
              {documents.map((document) => (
                <DocumentItem 
                  key={document.id}
                  document={document}
                  selected={selectedDocumentId === document.id}
                  onClick={() => onSelectDocument(document)}
                />
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
