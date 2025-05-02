
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ChevronRight } from "lucide-react";
import { NitidinaAvatar } from "@/components/assistants/NitidinaAvatar";
import { Link } from "react-router-dom";

interface NitidinaWelcomeBannerProps {
  userName: string;
  overdueCount: number;
  dueToday: number;
  newTasks: number;
  onShowPriorities: () => void;
  onDismiss: () => void;
}

export function NitidinaWelcomeBanner({
  userName,
  overdueCount,
  dueToday,
  newTasks,
  onShowPriorities,
  onDismiss
}: NitidinaWelcomeBannerProps) {
  // Get time of day for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  return (
    <Card className="mb-6 border-blue-100 bg-gradient-to-r from-slate-50 to-white">
      <CardContent className="p-4 relative">
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-2 right-2" 
          onClick={onDismiss}
        >
          <X size={16} />
          <span className="sr-only">Dismiss</span>
        </Button>
        
        <div className="flex items-start gap-4">
          <NitidinaAvatar size="md" />
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">
              Good {getTimeOfDay()}, {userName}!
            </h2>
            
            <p className="text-gray-700 mb-3">
              {newTasks > 0 && `Since your last login, ${newTasks} new tasks have arrived. `}
              {overdueCount > 0 && `You have ${overdueCount} ${overdueCount === 1 ? 'task' : 'tasks'} overdue `}
              {overdueCount > 0 && dueToday > 0 && 'and '}
              {dueToday > 0 && `${dueToday} ${dueToday === 1 ? 'task' : 'tasks'} due today`}.
              {overdueCount === 0 && dueToday === 0 && 'All tasks are on track.'}
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={onShowPriorities} className="gap-1">
                <span>Show Top Priorities</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/coworker">Open Coworker</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
