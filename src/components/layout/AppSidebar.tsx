import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { Briefcase, CalendarCheck2, MessageSquare, Bot, LayoutGrid, Home, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppSidebar() {
  const navItems = [
    {
      name: "Deals Dashboard",
      icon: Briefcase,
      path: "/deals",
      tooltip: "Deals Dashboard: View all active deals in your portfolio."
    },
    {
      name: "Task Planner",
      icon: CalendarCheck2,
      path: "/planner",
      tooltip: "Task Planner: Manage tasks, deadlines, and upcoming steps for all deals."
    },
    {
      name: "Comms Hub",
      icon: MessageSquare,
      path: "/communications",
      tooltip: "Comms Hub: Check messages, discussions, and email-like threads with deal participants."
    },
    {
      name: "Coworker Panel",
      icon: Bot,
      path: "/coworker",
      tooltip: "Coworker Panel (Agentic Hub): AI-driven workflows and process automation center."
    },
    {
      name: "Meet the AI Assistants",
      icon: Sparkles,
      path: "/assistants",
      tooltip: "Meet the AI Assistants: Learn about and interact with our AI assistants."
    },
    {
      name: "Apps Setup",
      icon: LayoutGrid,
      path: "/apps",
      tooltip: "Apps Setup: Access integrated apps and third-party tool connections."
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="mt-2 mb-6 flex justify-start pl-4">
          <Link to="/">
            <img 
              src="/lovable-uploads/81831d78-066c-447a-b858-55ad7163b4c5.png" 
              alt="Nítido Logo" 
              className="h-6 cursor-pointer transition-opacity hover:opacity-80" 
            />
          </Link>
        </div>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild tooltip={item.tooltip}>
                <Link to={item.path}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Home: Overview dashboard and welcome page." isActive={false}>
              <Link to="/">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
