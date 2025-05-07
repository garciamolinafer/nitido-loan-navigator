import { ThreadType } from '@/hooks/useCommsData';

// Mock participants data
const mockParticipants = [
  { id: "1", name: "Marina", avatar: "/placeholder.svg" },
  { id: "2", name: "John", avatar: "/placeholder.svg" },
  { id: "3", name: "Alice", avatar: "/placeholder.svg" },
  { id: "4", name: "Michael", avatar: "/placeholder.svg" },
  { id: "5", name: "Nitidina", avatar: "/lovable-uploads/Nitidina Image.jpg", isAI: true },
  { id: "6", name: "Paralegal", avatar: "/placeholder.svg", isAI: true },
  { id: "7", name: "Bob", avatar: "/placeholder.svg" },
  { id: "8", name: "Carol", avatar: "/placeholder.svg" },
  { id: "9", name: "Emily", avatar: "/placeholder.svg" },
  { id: "10", name: "Kevin", avatar: "/placeholder.svg" },
  { id: "11", name: "Mark", avatar: "/placeholder.svg" },
  { id: "12", name: "Karen", avatar: "/placeholder.svg" },
  { id: "13", name: "David", avatar: "/placeholder.svg" },
  { id: "14", name: "Clara", avatar: "/placeholder.svg" },
];

// Mock communication threads data
export const mockThreads: ThreadType[] = [
  {
    id: "1",
    title: "Urgent Borrower Update",
    deal: "Apollo Energy",
    topics: ["Payments"],
    lastMessage: "I'm on it. Reviewing the model now.",
    lastSender: "Bob",
    timestamp: "1h ago",
    unreadCount: 2,
    priority: "high",
    participants: [
      mockParticipants[0], // Marina
      mockParticipants[2], // Alice
      mockParticipants[4], // Nitidina
      mockParticipants[6], // Bob
    ],
    messages: [
      {
        id: "1-1",
        senderId: "3",
        sender: "Alice",
        content: "Hello team, we have a critical liquidity issue and need to confirm that the next drawdown of $5M can be expedited. Please see the attached cash flow model. We need an answer by end of day.",
        timestamp: "May 1, 2025 10:30 AM"
      },
      {
        id: "1-2",
        senderId: "5", 
        sender: "Nitidina",
        content: "Urgent: Payment request from borrower. Suggest flagging this thread as high priority.",
        timestamp: "May 1, 2025 10:31 AM",
        isAI: true,
        aiType: "nitidina"
      },
      {
        id: "1-3",
        senderId: "1",
        sender: "Marina",
        content: "Acknowledged, reviewing now. Will confirm with agent bank ASAP.",
        timestamp: "May 1, 2025 10:35 AM"
      },
      {
        id: "1-4",
        senderId: "7",
        sender: "Bob",
        content: "I'm on it. Reviewing the model now.",
        timestamp: "May 1, 2025 10:36 AM",
      }
    ]
  },
  {
    id: "2",
    title: "Lender Coordination Call Follow-up",
    deal: "Project Titan",
    topics: ["General"],
    lastMessage: "I'm reviewing Section 4. Will comment by tomorrow.",
    lastSender: "Clara",
    timestamp: "3h ago",
    unreadCount: 0,
    participants: [
      mockParticipants[0], // Marina
      mockParticipants[12], // David
      mockParticipants[4], // Nitidina
      mockParticipants[13], // Clara
    ],
    messages: [
      {
        id: "2-1",
        senderId: "13",
        sender: "David",
        content: "Thanks for the call. As discussed, attached is the rate adjustment proposal for Project Titan. Please review and provide feedback by Friday.",
        timestamp: "May 1, 2025 8:15 AM"
      },
      {
        id: "2-2",
        senderId: "5",
        sender: "Nitidina",
        content: "Note: Zoom call occurred. Attachment present. Action item: 'Review rate proposal by 07/12.'",
        timestamp: "May 1, 2025 8:17 AM",
        isAI: true,
        aiType: "nitidina"
      },
      {
        id: "2-3",
        senderId: "1",
        sender: "Marina",
        content: "Got it. Opening RateProposal_Titan.pdf now.",
        timestamp: "May 1, 2025 8:30 AM"
      },
      {
        id: "2-4",
        senderId: "14",
        sender: "Clara",
        content: "I'm reviewing Section 4. Will comment by tomorrow.",
        timestamp: "May 1, 2025 9:00 AM"
      }
    ]
  },
  {
    id: "3",
    title: "Amendment Negotiation",
    deal: "Apollo Energy",
    topics: ["Amendments"],
    lastMessage: "Thank you. I've resolved the comments.",
    lastSender: "Marina",
    timestamp: "Yesterday",
    unreadCount: 1,
    participants: [
      mockParticipants[0], // Marina
      mockParticipants[7], // Carol
      mockParticipants[4], // Nitidina
      mockParticipants[1], // John
    ],
    messages: [
      {
        id: "3-1",
        senderId: "8",
        sender: "Carol",
        content: "Attached is the draft amendment reflecting the latest discussions. Please review the interest adjustment in Section 3 and let me know any comments.",
        timestamp: "Apr 30, 2025 2:15 PM"
      },
      {
        id: "3-2",
        senderId: "5",
        sender: "Nitidina",
        content: "Document amendment detected. Auto-tagging #Amendment. Highlight: Section 3 interest rate change.",
        timestamp: "Apr 30, 2025 2:17 PM",
        isAI: true,
        aiType: "nitidina"
      },
      {
        id: "3-3",
        senderId: "1",
        sender: "Marina",
        content: "Reviewing draft. @John, can you check compliance on Section 3?",
        timestamp: "Apr 30, 2025 2:20 PM"
      },
      {
        id: "3-4",
        senderId: "2",
        sender: "John",
        content: "Section 3 looks compliant. I've inserted comments in the document.",
        timestamp: "Apr 30, 2025 2:22 PM"
      },
      {
        id: "3-5",
        senderId: "1",
        sender: "Marina",
        content: "Thank you. I've resolved the comments.",
        timestamp: "Apr 30, 2025 2:30 PM"
      }
    ]
  },
  {
    id: "4",
    title: "KYC Check",
    deal: "Project Titan",
    topics: ["Compliance"],
    lastMessage: "I will email the borrower to provide the missing Tax ID.",
    lastSender: "Marina",
    timestamp: "2d ago",
    unreadCount: 0,
    participants: [
      mockParticipants[0], // Marina
      mockParticipants[8], // Emily
      mockParticipants[4], // Nitidina
    ],
    messages: [
      {
        id: "4-1",
        senderId: "9",
        sender: "Emily",
        content: "Attached is the borrower's KYC form we've collected. Nitidina, can you confirm if any fields are missing?",
        timestamp: "Apr 29, 2025 1:15 PM"
      },
      {
        id: "4-2",
        senderId: "5",
        sender: "Nitidina",
        content: "KYC document detected. Missing field: [Tax ID]. Recommend requesting this information from the borrower.",
        timestamp: "Apr 29, 2025 1:17 PM",
        isAI: true,
        aiType: "nitidina"
      },
      {
        id: "4-3",
        senderId: "1",
        sender: "Marina",
        content: "I will email the borrower to provide the missing Tax ID.",
        timestamp: "Apr 29, 2025 1:20 PM"
      }
    ]
  },
  {
    id: "5",
    title: "Covenant Breach Discussion",
    deal: "Apollo Energy",
    topics: ["Compliance", "Covenant"],
    lastMessage: "We're drafting an explanation. Will update lender by EOD.",
    lastSender: "Kevin",
    timestamp: "2d ago",
    unreadCount: 1,
    priority: "high",
    participants: [
      mockParticipants[0], // Marina
      mockParticipants[4], // Nitidina
      mockParticipants[9], // Kevin
    ],
    messages: [
      {
        id: "5-1",
        senderId: "1",
        sender: "Marina",
        content: "The latest report shows EBITDA below the covenant floor. Legal should review immediately.",
        timestamp: "Apr 29, 2025 11:15 AM"
      },
      {
        id: "5-2",
        senderId: "5",
        sender: "Nitidina",
        content: "Alert: Covenant breach detected. Flagging thread. Notifying Legal team.",
        timestamp: "Apr 29, 2025 11:17 AM",
        isAI: true,
        aiType: "nitidina"
      },
      {
        id: "5-3",
        senderId: "10",
        sender: "Kevin",
        content: "We're drafting an explanation. Will update lender by EOD.",
        timestamp: "Apr 29, 2025 11:30 AM"
      }
    ]
  }
];

// Available filter options
export const filterOptions = {
  deals: ["Apollo Energy", "Project Titan"],
  topics: ["General", "Payments", "Amendments", "Compliance", "Covenant", "Drawdowns"],
  status: ["unread", "priority"]
};
