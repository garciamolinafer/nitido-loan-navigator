
import { WorkflowTemplate, Workflow } from "@/hooks/useCoworker";

export const mockTemplates: WorkflowTemplate[] = [
  {
    id: "template1",
    name: "Notify Lenders of Upcoming Payment Dates",
    description: "Send automated reminders to syndicate lenders about upcoming loan payments",
    category: "Notifications",
    icon: "bell",
    systems: ["loaniq", "outlook", "intralinks"],
    steps: [
      {
        name: "Retrieve payment data",
        system: "loaniq",
        description: "Get next payment date and amount from LoanIQ"
      },
      {
        name: "Identify lenders",
        system: "loaniq",
        description: "Get list of participating lenders"
      },
      {
        name: "Draft reminder email",
        system: "agentic",
        description: "Generate email content with payment details",
        requiresApproval: true
      },
      {
        name: "Send email",
        system: "outlook",
        description: "Distribute email to all lenders"
      },
      {
        name: "Archive notification",
        system: "intralinks",
        description: "Save a copy in document repository"
      }
    ]
  },
  {
    id: "template2",
    name: "Send Drawdown Notice to Lenders",
    description: "Automate sending a funding drawdown notice when a borrower requests disbursement",
    category: "Notifications",
    icon: "credit-card",
    systems: ["loaniq", "word", "outlook", "intralinks"],
    steps: [
      {
        name: "Collect drawdown details",
        system: "agentic",
        description: "Get amount, date, and purpose"
      },
      {
        name: "Verify loan balance",
        system: "loaniq",
        description: "Check current loan balance and schedule"
      },
      {
        name: "Generate notice document",
        system: "word",
        description: "Create drawdown notice from template",
        requiresApproval: true
      },
      {
        name: "Send notice to lenders",
        system: "outlook",
        description: "Email notice to all lenders with attachment"
      },
      {
        name: "Update loan record",
        system: "loaniq",
        description: "Record the disbursement in LoanIQ"
      }
    ]
  },
  {
    id: "template3",
    name: "Prepare Compliance Certificate",
    description: "Generate and distribute a covenant compliance certificate",
    category: "Compliance",
    icon: "shield",
    systems: ["finscan", "word", "outlook"],
    steps: [
      {
        name: "Gather financial metrics",
        system: "finscan",
        description: "Retrieve latest financial data"
      },
      {
        name: "Pull covenant definitions",
        system: "agentic",
        description: "Extract covenant terms from loan agreement"
      },
      {
        name: "Calculate compliance status",
        system: "agentic",
        description: "Compute and check compliance for each covenant"
      },
      {
        name: "Generate certificate",
        system: "word",
        description: "Create compliance certificate document",
        requiresApproval: true
      },
      {
        name: "Distribute certificate",
        system: "outlook",
        description: "Send certificate to stakeholders"
      }
    ]
  },
  {
    id: "template4",
    name: "Send Rate Change Notification",
    description: "Notify lenders of an upcoming interest rate reset or pricing adjustment",
    category: "Notifications",
    icon: "percent",
    systems: ["loaniq", "outlook"],
    steps: [
      {
        name: "Get rate information",
        system: "loaniq",
        description: "Retrieve reset date and current margin"
      },
      {
        name: "Calculate new interest",
        system: "agentic",
        description: "Compute new interest using deal terms"
      },
      {
        name: "Create notification",
        system: "agentic",
        description: "Populate notification template with rate info"
      },
      {
        name: "Send rate change notice",
        system: "outlook",
        description: "Email notification to all lenders",
        requiresApproval: true
      },
      {
        name: "Update loan system",
        system: "loaniq",
        description: "Record the rate change in LoanIQ"
      }
    ]
  },
  {
    id: "template5",
    name: "AML/KYC Screening for New Entity",
    description: "Automate anti-money laundering and KYC checks for a new lender or borrower entity",
    category: "Compliance",
    icon: "search",
    systems: ["finscan", "versana"],
    steps: [
      {
        name: "Collect entity details",
        system: "agentic",
        description: "Gather name, country, and identifiers"
      },
      {
        name: "Submit for screening",
        system: "finscan",
        description: "Send information to FinScan database"
      },
      {
        name: "Process screening results",
        system: "finscan",
        description: "Analyze watchlist hits and adverse media"
      },
      {
        name: "Summarize findings",
        system: "agentic",
        description: "Create summary report of risks and matches",
        requiresApproval: true
      },
      {
        name: "Update entity status",
        system: "versana",
        description: "Record status in Versana/LoanIQ"
      }
    ]
  }
];

export const mockWorkflows: Workflow[] = [
  {
    id: "workflow1",
    name: "Apollo Energy Interest Reminder",
    description: "Send automated reminders to syndicate lenders about upcoming Apollo Energy loan payments",
    category: "Notifications",
    deal: "Apollo Energy",
    schedule: "5 days before due date",
    requiresApproval: true,
    active: true,
    lastRun: "2025-04-28T14:30:00Z",
    steps: [
      {
        id: "step1",
        name: "Retrieve payment data",
        system: "loaniq",
        description: "Get next payment date and amount from LoanIQ",
        status: "completed"
      },
      {
        id: "step2",
        name: "Identify lenders",
        system: "loaniq",
        description: "Get list of participating lenders",
        status: "completed"
      },
      {
        id: "step3",
        name: "Draft reminder email",
        system: "agentic",
        description: "Generate email content with payment details",
        status: "pending",
        requiresApproval: true
      },
      {
        id: "step4",
        name: "Send email",
        system: "outlook",
        description: "Distribute email to all lenders",
        status: "pending"
      },
      {
        id: "step5",
        name: "Archive notification",
        system: "intralinks",
        description: "Save a copy in document repository",
        status: "pending"
      }
    ]
  },
  {
    id: "workflow2",
    name: "Project Titan Covenant Certificate",
    description: "Generate and distribute quarterly covenant compliance certificate for Project Titan",
    category: "Compliance",
    deal: "Project Titan",
    schedule: "Quarterly",
    requiresApproval: true,
    active: true,
    lastRun: "2025-03-15T10:45:00Z",
    steps: [
      {
        id: "step1",
        name: "Gather financial metrics",
        system: "finscan",
        description: "Retrieve latest financial data",
        status: "completed"
      },
      {
        id: "step2",
        name: "Pull covenant definitions",
        system: "agentic",
        description: "Extract covenant terms from loan agreement",
        status: "completed"
      },
      {
        id: "step3",
        name: "Calculate compliance status",
        system: "agentic",
        description: "Compute and check compliance for each covenant",
        status: "completed"
      },
      {
        id: "step4",
        name: "Generate certificate",
        system: "word",
        description: "Create compliance certificate document",
        status: "waiting",
        requiresApproval: true
      },
      {
        id: "step5",
        name: "Distribute certificate",
        system: "outlook",
        description: "Send certificate to stakeholders",
        status: "pending"
      }
    ]
  },
  {
    id: "workflow3",
    name: "BrightFuture Solar Rate Change",
    description: "Notify lenders of upcoming interest rate reset for BrightFuture Solar project",
    category: "Notifications",
    deal: "BrightFuture Solar",
    schedule: "On reset dates",
    requiresApproval: true,
    active: true,
    steps: [
      {
        id: "step1",
        name: "Get rate information",
        system: "loaniq",
        description: "Retrieve reset date and current margin",
        status: "pending"
      },
      {
        id: "step2",
        name: "Calculate new interest",
        system: "agentic",
        description: "Compute new interest using deal terms",
        status: "pending"
      },
      {
        id: "step3",
        name: "Create notification",
        system: "agentic",
        description: "Populate notification template with rate info",
        status: "pending"
      },
      {
        id: "step4",
        name: "Send rate change notice",
        system: "outlook",
        description: "Email notification to all lenders",
        status: "pending",
        requiresApproval: true
      },
      {
        id: "step5",
        name: "Update loan system",
        system: "loaniq",
        description: "Record the rate change in LoanIQ",
        status: "pending"
      }
    ]
  }
];
