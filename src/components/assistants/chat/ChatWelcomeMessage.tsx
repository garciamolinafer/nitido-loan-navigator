import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";

interface ChatWelcomeMessageProps {
  setMessage: (message: string) => void;
}

const promptExamples = [
  {
    key: "overdue",
    label: "Overdue Tasks",
    detailedPrompt:
      "Please review all overdue tasks for my current deals. For each, provide a summary, the reason for the delay, and propose a step-by-step plan to complete or escalate the task. Also, suggest if any tasks can be autocompleted based on available data.",
    assistantResponse:
      `Certainly! Here are your overdue tasks:\n\n1. Covenant Compliance Review (Beta Rail Infrastructure)\n- Reason: Awaiting financial data from borrower.\n- Plan: 1) Request missing data. 2) Draft compliance memo. 3) Escalate to legal if not received by Friday.\n- Autocomplete: Draft memo can be pre-filled with last quarter's data.\n\n2. KYC Update (Project Eland Windfarm)\n- Reason: Missing ID from new lender.\n- Plan: 1) Notify lender. 2) Upload received documents. 3) Mark as complete.\n- Autocomplete: System can send reminder email.\n\nLet me know if you'd like to take action on any of these!`,
    interimAfterPrompt: [
      "(reviewing overdue tasks...)",
      "(analyzing reasons for delay...)",
      "(proposing step-by-step plan...)",
      "(checking for autocompletion possibilities...)"
    ]
  },
  {
    key: "newtask",
    label: "New Task",
    detailedPrompt:
      "I want to create a new task for the Beta Rail Infrastructure deal. Please draft a detailed task description, assign it to the appropriate team member, and set a realistic deadline. Ensure all compliance and documentation requirements are included.",
    assistantResponse:
      `Here's a proposed new task:\n\nTask: Prepare Q2 Compliance Certificate\n- Description: Draft and submit the Q2 compliance certificate for Beta Rail Infrastructure, including all supporting documentation.\n- Assigned to: John Smith (Legal)\n- Deadline: May 15, 2025\n- Requirements: Attach financial statements, confirm covenant compliance, upload to IntraLinks.\n\nWould you like to create this task or modify any details?`,
    interimAfterPrompt: [
      "(reviewing task requirements...)",
      "(assigning team member...)",
      "(setting deadline...)",
      "(ensuring compliance and documentation...)"
    ]
  },
  {
    key: "summarize",
    label: "Summarize Messages",
    detailedPrompt:
      "Summarize all unread messages in my communications. Highlight any urgent items, pending approvals, or unresolved issues. Provide a recommended action plan for each.",
    assistantResponse:
      `Summary of unread messages:\n\n- Project Titan: Lender ABC requests update on drawdown status (urgent).\n- Apollo Energy: Legal team flagged missing signature on amendment.\n- Beta Rail: Compliance certificate approved, no action needed.\n\nRecommended actions:\n1. Respond to Lender ABC with drawdown timeline.\n2. Forward amendment to borrower for signature.\n\nLet me know if you'd like to reply or need more details!`,
    interimAfterPrompt: [
      "(reviewing list of unread messages...)",
      "(identifying urgent items...)",
      "(highlighting pending approvals...)",
      "(proposing recommended actions...)"
    ]
  }
];

const DEFAULT_INTERIM_AFTER = [
  "(analyzing context...)",
  "(reviewing data...)",
  "(proposing actions...)",
  "(finalizing response...)"
];

export function ChatWelcomeMessage({ setMessage }: ChatWelcomeMessageProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showGenerating, setShowGenerating] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [interimIndex, setInterimIndex] = useState(-1);
  const [showAssistant, setShowAssistant] = useState(false);

  const handlePromptClick = (key: string) => {
    setSelected(key);
    setShowGenerating(true);
    setShowPrompt(false);
    setInterimIndex(-1);
    setShowAssistant(false);
    // Show (generating prompt...) for 4.5s
    setTimeout(() => {
      setShowGenerating(false);
      setShowPrompt(true);
      // After prompt, show interim messages one by one
      const interimMsgs = (promptExamples.find(ex => ex.key === key)?.interimAfterPrompt) || DEFAULT_INTERIM_AFTER;
      let i = 0;
      const showNextInterim = () => {
        if (i < interimMsgs.length) {
          setInterimIndex(i);
          setTimeout(() => {
            setInterimIndex(j => {
              if (j + 1 < interimMsgs.length) {
                i++;
                showNextInterim();
                return j + 1;
              } else {
                setInterimIndex(-1);
                setTimeout(() => setShowAssistant(true), 1200);
                return -1;
              }
            });
          }, 3200 + Math.random() * 800); // 3.2-4s per interim
        }
      };
      showNextInterim();
    }, 4500);
  };

  const selectedPrompt = promptExamples.find((ex) => ex.key === selected);
  const interimMsgs = selectedPrompt?.interimAfterPrompt || DEFAULT_INTERIM_AFTER;

  return (
    <div className="flex gap-2">
      <NitidinaAvatar size="sm" className="mt-1" />
      <div className="flex-1">
        <p className="bg-gray-100 rounded-lg p-3 text-sm">
          Good morning, Marina. How can I help you today? You can ask me about your tasks, upcoming deadlines, or assistance with specific workflows. I always strive to provide thorough, accountable, and well-structured support.
        </p>
        <div className="flex flex-col gap-2 mt-2">
          {promptExamples.map((ex) => (
            <div
              key={ex.key}
              className="bg-black text-white rounded-lg px-3 py-2 text-xs cursor-pointer select-all w-fit"
              onClick={() => handlePromptClick(ex.key)}
            >
              {ex.label}
            </div>
          ))}
        </div>
        {selectedPrompt && (
          <div className="mt-4">
            {/* Show (generating prompt...) before prompt */}
            {showGenerating && (
              <div className="flex gap-2 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">M</div>
                <div className="bg-blue-100 text-blue-900 rounded-lg p-3 text-sm max-w-[80%] animate-pulse">
                  (generating prompt...)
                </div>
              </div>
            )}
            {/* Show detailed prompt as if written by user */}
            {showPrompt && (
              <div className="flex gap-2 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">M</div>
                <div className="bg-blue-100 text-blue-900 rounded-lg p-3 text-sm max-w-[80%]">
                  {selectedPrompt.detailedPrompt}
                </div>
              </div>
            )}
            {/* Show interim messages after prompt */}
            {interimIndex > -1 && (
              <div className="flex gap-2 items-start mt-2">
                <NitidinaAvatar size="sm" className="mt-1" />
                <div className="bg-gray-100 rounded-lg p-3 text-sm max-w-[80%] animate-pulse">
                  {interimMsgs[interimIndex]}
                </div>
              </div>
            )}
            {/* After a delay, show assistant's response */}
            {showAssistant && (
              <div className="flex gap-2 items-start mt-2">
                <NitidinaAvatar size="sm" className="mt-1" />
                <div className="bg-gray-100 rounded-lg p-3 text-sm max-w-[80%] whitespace-pre-line">
                  {selectedPrompt.assistantResponse}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
