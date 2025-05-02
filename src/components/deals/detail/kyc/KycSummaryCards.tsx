
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, Clock, ShieldAlert } from "lucide-react";
import { mockKycData } from "./mockKycData";

export const KycSummaryCards = () => {
  // Calculate KYC compliance statistics
  const totalEntities = mockKycData.length;
  const approvedEntities = mockKycData.filter(entity => entity.status === "approved").length;
  const pendingEntities = mockKycData.filter(entity => entity.status === "pending").length;
  const flaggedEntities = mockKycData.filter(entity => entity.status === "flagged").length;
  const expiredEntities = mockKycData.filter(entity => entity.status === "expired").length;
  const notStartedEntities = mockKycData.filter(entity => entity.status === "not_started").length;
  
  const compliancePercentage = Math.round((approvedEntities / totalEntities) * 100);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>KYC Compliance</CardDescription>
          <CardTitle className="text-2xl">
            {compliancePercentage}%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={compliancePercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {approvedEntities} of {totalEntities} entities approved
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div>
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-2xl text-green-500">{approvedEntities}</CardTitle>
          </div>
          <ShieldCheck className="h-6 w-6 text-green-500 opacity-75" />
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Last approval: Apr 22, 2025
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div>
            <CardDescription>Pending / Not Started</CardDescription>
            <CardTitle className="text-2xl text-yellow-500">{pendingEntities + notStartedEntities}</CardTitle>
          </div>
          <Clock className="h-6 w-6 text-yellow-500 opacity-75" />
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            {pendingEntities} pending, {notStartedEntities} not started
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div>
            <CardDescription>Flagged / Expired</CardDescription>
            <CardTitle className="text-2xl text-red-500">{flaggedEntities + expiredEntities}</CardTitle>
          </div>
          <ShieldAlert className="h-6 w-6 text-red-500 opacity-75" />
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            {flaggedEntities} flagged, {expiredEntities} expired
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
