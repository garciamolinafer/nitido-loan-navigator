
import { useState } from "react";
import { IntegrationCard } from "./IntegrationCard";
import { IntegrationDetails } from "./IntegrationDetails";
import { Integration } from "@/types/integration";

interface IntegrationGridProps {
  integrations: Integration[];
}

export function IntegrationGrid({ integrations }: IntegrationGridProps) {
  const [expandedIntegrationId, setExpandedIntegrationId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedIntegrationId(expandedIntegrationId === id ? null : id);
  };

  return (
    <>
      {integrations.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/30">
          <p className="text-lg font-medium">No integrations found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <div key={integration.id} className="space-y-4">
              <IntegrationCard 
                integration={integration}
                isExpanded={expandedIntegrationId === integration.id}
                onClick={() => toggleDetails(integration.id)}
              />
              
              {expandedIntegrationId === integration.id && (
                <IntegrationDetails 
                  integration={integration}
                  onClose={() => setExpandedIntegrationId(null)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
