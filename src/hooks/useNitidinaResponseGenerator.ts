
import { useState } from "react";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export function useNitidinaResponseGenerator() {
  const handleNitidinaResponse = (prompt: string) => {
    // This is a simplified mock of AI response generation
    // In a real implementation, this would call an AI service
    
    let response: string;
    
    // Check if this is a task-specific prompt
    if (prompt.includes("help with a") && prompt.includes("priority task")) {
      const taskMatch = prompt.match(/task: "([^"]+)"/);
      const taskTitle = taskMatch ? taskMatch[1] : "this task";
      const dealMatch = prompt.match(/for the ([^,]+) deal/);
      const dealName = dealMatch ? dealMatch[1] : "the deal";
      
      // Generate a helpful response based on the task type
      if (prompt.includes("covenant")) {
        response = `I see you need help with the covenant compliance task "${taskTitle}" for ${dealName}. I can help you review the financial data and ensure compliance with all covenants.\n\nWould you like me to:\n1. Pull the latest financial data from FinScan\n2. Show you a summary of covenant requirements\n3. Start preparing a waiver letter if there are breaches`;
      } else if (prompt.includes("document")) {
        response = `I can help you with the documentation task "${taskTitle}" for ${dealName}. Let's make sure all the necessary paperwork is in order.\n\nWould you like me to:\n1. Open IntraLinks to access the documents\n2. Draft a template document for you\n3. Create a document checklist for this deal`;
      } else if (prompt.includes("drawdown")) {
        response = `I see you're working on a drawdown request "${taskTitle}" for ${dealName}. I can help you prepare and process this request.\n\nWould you like me to:\n1. Check available facility amounts in LoanIQ\n2. Prepare a draft drawdown notice\n3. Create a workflow in Coworker to automate future drawdowns`;
      } else if (prompt.includes("market")) {
        response = `For your market data task "${taskTitle}" for ${dealName}, I can help gather and analyze the relevant market information.\n\nWould you like me to:\n1. Pull the latest rates from Versana\n2. Generate a market trends report\n3. Set up automated alerts for significant market changes`;
      } else if (prompt.includes("compliance")) {
        response = `I'll help you with the compliance task "${taskTitle}" for ${dealName}. Let's ensure everything meets regulatory requirements.\n\nWould you like me to:\n1. Check compliance status in FinScan\n2. Generate required compliance forms\n3. Create a recurring compliance workflow in Coworker`;
      } else {
        response = `I see you need help with "${taskTitle}" for ${dealName}. I'd be happy to assist with this task.\n\nWould you like me to:\n1. Help you create a step-by-step action plan\n2. Set up reminders for important deadlines\n3. Delegate parts of this task to the appropriate team members`;
      }
      
      if (prompt.includes("overdue")) {
        response += "\n\nSince this task is overdue, I recommend prioritizing it immediately. Would you like me to clear some time on your calendar to focus on this?";
      }
    } else {
      // Default responses for regular chat
      const greetings = ["hi", "hello", "hey"];
      const taskQueries = ["task", "todo", "to-do", "to do", "overdue"];
      
      const promptLower = prompt.toLowerCase();
      
      if (greetings.some(greeting => promptLower.includes(greeting))) {
        response = "Hello! How can I help you with your tasks today?";
      } else if (taskQueries.some(query => promptLower.includes(query))) {
        response = "You have several tasks that require your attention. Would you like to see your overdue tasks or upcoming deadlines?";
      } else if (promptLower.includes("coworker")) {
        response = "I can help you set up automated workflows in Nítido Coworker. Would you like to create a new workflow or check existing ones?";
      } else {
        response = "I'm here to help with your tasks and workflow. How can I assist you today?";
      }
    }
    
    return response;
  };

  return { handleNitidinaResponse };
}
