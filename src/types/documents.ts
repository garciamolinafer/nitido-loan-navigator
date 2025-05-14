export type DocumentCategory =
  | 'loan_agreement'
  | 'securities'
  | 'other_agreements'
  | 'financials'
  | 'technical'
  | 'legal'
  | 'aml'
  | 'others';

export const CATEGORY_COLORS: Record<DocumentCategory, string> = {
  loan_agreement: '#FF6B6B',  // Red
  securities: '#4ECDC4',      // Teal
  other_agreements: '#45B7D1', // Blue
  financials: '#96CEB4',      // Green
  technical: '#FFEEAD',       // Yellow
  legal: '#D4A5A5',          // Pink
  aml: '#9B59B6',            // Purple
  others: '#95A5A6'          // Gray
};

export interface DocumentMetadata {
  id: string;
  name: string;
  fileName: string;
  fileType: string;
  category: DocumentCategory;
  uploadDate: string;
  uploaderId: string;
  uploaderName: string;
  size: string;
  tags: string[];
  status: 'active' | 'archived' | 'draft';
  lastModified: string;
  version: number;
  path: string[];
  accessHistory?: {
    userId: string;
    userName: string;
    action: 'view' | 'download';
    timestamp: string;
  }[];
}

export interface DocumentFolder {
  id: string;
  name: string;
  path: string[];
  subFolders: DocumentFolder[];
  documents: DocumentMetadata[];
  parentId?: string;
}

export interface DocumentTreeNode {
  id: string;
  name: string;
  type: 'folder' | 'document';
  children?: DocumentTreeNode[];
  metadata?: DocumentMetadata;
}

export interface DocumentViewState {
  selectedDocument?: DocumentMetadata;
  selectedFolder?: DocumentFolder;
  view: 'grid' | 'list';
  sortBy: 'name' | 'date' | 'size' | 'type';
  sortDirection: 'asc' | 'desc';
}

export interface DocumentSearchFilters {
  searchTerm?: string;
  categories?: DocumentCategory[];
  dateRange?: {
    start: string;
    end: string;
  };
  tags?: string[];
}

export interface DocumentAssistantType {
  id: 'nitidina' | 'paralegal' | 'extractor';
  name: string;
  description: string;
  icon: string;
  isAvailable: (document: DocumentMetadata) => boolean;
  greeting: (document: DocumentMetadata) => string;
} 