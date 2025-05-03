
import { LucideIcon } from "lucide-react";

export type IntegrationCategory = "document" | "communication" | "data" | "compliance";
export type IntegrationStatus = "connected" | "disconnected" | "action-needed";

export interface ActivityLog {
  id: string;
  timestamp: Date;
  type: "sync" | "error" | "warning" | "info";
  message: string;
  records?: number;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  icon?: LucideIcon;
  lastSync?: Date;
  capabilities?: string[];
  syncFrequency?: string;
  activityLogs?: ActivityLog[];
}

export interface IntegrationFilters {
  category: string | null;
  status: string | null;
}
