
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";

interface NitidinaGreetingProps {
  activeDeals: number;
  issueCount: number;
}

export function NitidinaGreeting({ activeDeals, issueCount }: NitidinaGreetingProps) {
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed) return null;

  // Get time of day for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <Card className="mt-4 border bg-slate-50">
      <CardContent className="p-6 relative">
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2" 
          onClick={() => setDismissed(true)}
        >
          <X size={16} />
          <span className="sr-only">Dismiss</span>
        </Button>
        
        <div className="flex items-start gap-4">
          <NitidinaAvatar size="sm" />
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">
              Good {getTimeOfDay()}, Marina
            </h2>
            
            <p className="text-gray-700 mb-3">
              You have {activeDeals} active deals. {issueCount > 0 ? (
                <>Three transactions require attention:</> 
              ) : (
                <>All deals are on track.</>
              )}
            </p>
            
            {issueCount > 0 && (
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li className="text-gray-700">
                  <span className="font-medium">KYC delay</span> in <Link to="#" className="text-blue-600 hover:underline font-medium">Project Eland Windfarm</Link> (please contact legal)
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Document review pending</span> in <Link to="#" className="text-blue-600 hover:underline font-medium">Beta Rail Infrastructure</Link>
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Covenant breach flagged</span> in <Link to="#" className="text-blue-600 hover:underline font-medium">Borealis Equity Partners</Link>
                </li>
              </ul>
            )}
            
            <p className="text-gray-700 mb-4">
              Would you like me to open the Task Planner or summarize key items here?
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/planner">View Task Planner</Link>
              </Button>
              <Button variant="outline">Show Summary</Button>
              <Button variant="ghost">Ignore for now</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
