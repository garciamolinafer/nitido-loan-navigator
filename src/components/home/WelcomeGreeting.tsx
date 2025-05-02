
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { NitidinaAvatar } from "@/components/assistants/NitidinaAvatar";

interface WelcomeGreetingProps {
  userName: string;
}

export function WelcomeGreeting({ userName }: WelcomeGreetingProps) {
  // Get time of day for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-slate-50 to-white">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <NitidinaAvatar size="md" />
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Good {getTimeOfDay()}, {userName}
            </h2>
            <p className="text-gray-700 mb-3">
              Today I've reconciled your Outlook calendar with pending portfolio actions. 
              There are several validations awaiting in{" "}
              <Link to="/coworker" className="text-blue-600 hover:underline font-medium">
                Nítido Coworker
              </Link>{" "}
              — shall we start there?
            </p>
            <Link 
              to="/coworker"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
            >
              Open Coworker
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
