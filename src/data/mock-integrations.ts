
import { Integration } from "@/types/integration";
import { 
  Database, 
  ShieldCheck, 
  Folder, 
  Video, 
  FileText,
  Mail, 
  MessageSquare, 
  ChartBar, 
  Dropbox, 
  Slack
} from "lucide-react";

export const getMockIntegrations = (): Integration[] => {
  return [
    {
      id: "loaniq",
      name: "LoanIQ",
      description: "Core loan servicing platform for syndicated lending",
      category: "data",
      status: "connected",
      icon: Database,
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      capabilities: [
        "Import loan amortization schedules",
        "Update interest rates",
        "Map loan fields to Nítido data models"
      ],
      syncFrequency: "Auto - Every 24h",
      activityLogs: [
        { 
          id: "liq1", 
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), 
          type: "sync", 
          message: "Loan data sync completed", 
          records: 124 
        },
        { 
          id: "liq2", 
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), 
          type: "info", 
          message: "Interest rate updated", 
          records: 1 
        }
      ]
    },
    {
      id: "finscan",
      name: "FinScan",
      description: "AML/KYC screening tool for due diligence",
      category: "compliance",
      status: "action-needed",
      icon: ShieldCheck,
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 48), // 48 hours ago
      capabilities: [
        "One-click screening of new customers",
        "Daily watchlist scans",
        "Alerts for sanctions matches"
      ],
      syncFrequency: "Daily",
      activityLogs: [
        { 
          id: "fs1", 
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), 
          type: "error", 
          message: "API quota exceeded", 
          records: 0 
        },
        { 
          id: "fs2", 
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), 
          type: "sync", 
          message: "Compliance scan complete", 
          records: 15 
        }
      ]
    },
    {
      id: "intralinks",
      name: "IntraLinks",
      description: "Secure data room for sharing loan documents",
      category: "document",
      status: "connected",
      icon: Folder,
      lastSync: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      capabilities: [
        "Mirror syndication documents",
        "Share doc links with syndicate partners",
        "Track document views"
      ],
      syncFrequency: "Real-time"
    },
    {
      id: "versana",
      name: "Versana",
      description: "Modern platform for deal tracking and analytics",
      category: "data",
      status: "connected",
      icon: ChartBar,
      lastSync: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      capabilities: [
        "Import deal summaries",
        "Sync workflow milestones",
        "Send automated deadline reminders"
      ],
      syncFrequency: "Every 6h"
    },
    {
      id: "zoom",
      name: "Zoom",
      description: "Video conferencing for syndicate meetings",
      category: "communication",
      status: "disconnected",
      icon: Video,
      capabilities: [
        "Schedule meetings from within Nítido",
        "Auto-attach transcripts to loan files",
        "Record syndicate calls"
      ],
      syncFrequency: "On meetings"
    },
    {
      id: "word",
      name: "Microsoft Word",
      description: "Word processing and document creation",
      category: "document",
      status: "connected",
      icon: FileText,
      lastSync: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      capabilities: [
        "Upload/import Word files",
        "Preserve version history",
        "Enable co-authoring"
      ],
      syncFrequency: "On document update"
    },
    {
      id: "outlook",
      name: "Outlook",
      description: "Email and calendar integration",
      category: "communication",
      status: "connected",
      icon: Mail,
      lastSync: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      capabilities: [
        "Import loan-related emails",
        "Sync meeting invites",
        "Create calendar events for due dates"
      ],
      syncFrequency: "Real-time"
    },
    {
      id: "docusign",
      name: "DocuSign",
      description: "Electronic signature and agreement management",
      category: "document",
      status: "disconnected",
      icon: FileText,
      capabilities: [
        "Send documents for signature",
        "Auto-fetch signed copies",
        "Apply template envelopes"
      ],
      syncFrequency: "On document change"
    },
    {
      id: "dropbox",
      name: "Dropbox",
      description: "Cloud file storage for loan documentation",
      category: "document",
      status: "disconnected",
      icon: Dropbox,
      capabilities: [
        "Sync Dropbox folders with loan docs",
        "Automatic versioning",
        "Easy drag-drop import"
      ],
      syncFrequency: "Every 24h"
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Team chat and collaboration platform",
      category: "communication",
      status: "disconnected",
      icon: MessageSquare,
      capabilities: [
        "Link loan projects with Teams channels",
        "Log chat transcripts",
        "Schedule group meetings"
      ],
      syncFrequency: "Real-time"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Messaging platform for real-time updates",
      category: "communication",
      status: "disconnected",
      icon: Slack,
      capabilities: [
        "Sync Slack channels for lending teams",
        "Notify when loan events occur",
        "Post milestone updates automatically"
      ],
      syncFrequency: "Real-time"
    }
  ];
};
