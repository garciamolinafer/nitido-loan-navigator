
import { AlertTriangle, Check } from "lucide-react";

const CovenantsTab = () => {
  return (
    <div className="p-4 border rounded-lg">
      <p className="text-lg font-medium mb-2">Covenants Overview</p>
      <div className="flex gap-4">
        <div className="flex items-center gap-1">
          <Check className="text-green-500 h-5 w-5" />
          <span>Compliant: 4</span>
        </div>
        <div className="flex items-center gap-1">
          <AlertTriangle className="text-red-500 h-5 w-5" />
          <span>Breached: 1</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Untested/Upcoming: 1</span>
        </div>
      </div>
    </div>
  );
};

export default CovenantsTab;
