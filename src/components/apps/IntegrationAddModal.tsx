
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Integration } from "@/types/integration";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface IntegrationAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableIntegrations: Integration[];
}

export function IntegrationAddModal({ isOpen, onClose, availableIntegrations }: IntegrationAddModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredIntegrations = availableIntegrations.filter(
    integration => integration.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConnect = (integration: Integration) => {
    toast({
      title: "Connecting to " + integration.name,
      description: "Setting up your integration...",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Integration</DialogTitle>
        </DialogHeader>
        
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search available integrations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-4 max-h-96 overflow-y-auto">
          {filteredIntegrations.length > 0 ? (
            <div className="space-y-2">
              {filteredIntegrations.map(integration => (
                <div 
                  key={integration.id} 
                  className="flex items-center justify-between p-3 rounded-md border hover:border-primary hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-primary-foreground rounded-md flex items-center justify-center mr-3">
                      {integration.icon && 
                        <integration.icon className="h-5 w-5 text-primary" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-sm">{integration.name}</p>
                      <p className="text-xs text-muted-foreground">{integration.category.charAt(0).toUpperCase() + integration.category.slice(1)}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => handleConnect(integration)}
                  >
                    Connect
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No matching integrations found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
