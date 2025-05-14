import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import { useState } from 'react';
import { DocumentTreeNode, DocumentFolder } from '@/types/documents';
import { cn } from '@/lib/utils';

interface FolderTreeProps {
  data: DocumentTreeNode[];
  onSelect: (node: DocumentTreeNode) => void;
  selectedId?: string;
}

interface TreeNodeProps extends FolderTreeProps {
  level: number;
}

const TreeNode = ({ data, onSelect, selectedId, level }: TreeNodeProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  return (
    <ul className="space-y-0.5">
      {data.map((node) => (
        <li key={node.id}>
          <div
            className={cn(
              'flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer text-sm',
              'hover:bg-gray-100 transition-colors duration-150',
              selectedId === node.id && 'bg-blue-50 text-blue-600',
              level > 0 && 'ml-4'
            )}
            onClick={() => onSelect(node)}
          >
            {node.type === 'folder' && node.children?.length ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                className="h-4 w-4 flex items-center justify-center"
              >
                {expandedNodes.has(node.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ) : (
              <span className="w-4" />
            )}
            {node.type === 'folder' ? (
              <Folder className="h-4 w-4 text-blue-500" />
            ) : (
              <File className="h-4 w-4 text-gray-500" />
            )}
            <span className="truncate">{node.name}</span>
          </div>
          {node.children && expandedNodes.has(node.id) && (
            <TreeNode
              data={node.children}
              onSelect={onSelect}
              selectedId={selectedId}
              level={level + 1}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export const FolderTree = ({ data, onSelect, selectedId }: FolderTreeProps) => {
  return (
    <div className="min-w-[250px] max-w-[300px] h-full overflow-y-auto border-r">
      <div className="p-4">
        <TreeNode
          data={data}
          onSelect={onSelect}
          selectedId={selectedId}
          level={0}
        />
      </div>
    </div>
  );
}; 