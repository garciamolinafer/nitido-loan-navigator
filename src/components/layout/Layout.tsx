
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import Header from "./Header";
import { NitidinaAssistant } from "../assistants/NitidinaAssistant";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  userName?: string;
  userSurname?: string;
}

export default function Layout({ 
  children, 
  title = "Home", 
  userName = "Marina", 
  userSurname = "Neumann" 
}: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <Header title={title} userName={userName} userSurname={userSurname} />
          <main className="flex-1 p-6 bg-background">{children}</main>
        </div>
        <NitidinaAssistant />
      </div>
    </SidebarProvider>
  );
}
