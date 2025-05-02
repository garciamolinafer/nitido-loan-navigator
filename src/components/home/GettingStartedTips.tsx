
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Plus, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function GettingStartedTips() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Getting Started</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-sm">Set up your profile</p>
            <Button variant="link" size="sm" className="h-auto p-0">Configure settings</Button>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-sm">Create a New Deal</p>
            <Button variant="link" size="sm" className="h-auto p-0" asChild>
              <Link to="/deals">Get started</Link>
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-amber-100 p-2 rounded-full text-amber-600">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-sm">Tip: You can ask Nitidina any question by clicking her chat icon at the bottom-right.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
