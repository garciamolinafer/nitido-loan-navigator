
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

type NitidinaDealsGreetingProps = {
  dealCount: number;
};

const NitidinaDealsGreeting = ({ dealCount }: NitidinaDealsGreetingProps) => {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <Card className="mb-6 bg-gray-50 border-l-4 border-l-primary">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 mt-1">
            <AvatarImage src="/placeholder.svg" alt="Nitidina" />
            <AvatarFallback>Ni</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <p className="font-medium mb-2">
              Good {getTimeOfDay()}, Marina. You have {dealCount} active deals. Three transactions require attention:
            </p>
            
            {expanded ? (
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li><strong>Project Eland Windfarm</strong>: KYC delay (please contact legal)</li>
                <li><strong>Beta Rail Infrastructure</strong>: Document review pending</li>
                <li><strong>Borealis Equity Partners</strong>: Covenant breach flagged</li>
              </ul>
            ) : null}
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/planner">View Task Planner</Link>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Hide Summary" : "Show Summary"}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setDismissed(true)}
              >
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NitidinaDealsGreeting;
