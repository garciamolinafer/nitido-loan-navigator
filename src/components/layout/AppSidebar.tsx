
import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Briefcase, CalendarCheck2, MessageSquare, Bot, LayoutGrid, Home } from "lucide-react";
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
      name: "Communications",
      icon: MessageSquare,
      path: "/communications",
      tooltip: "Communications: Check messages, discussions, and email-like threads with deal participants."
    },
    {
      name: "Coworker",
      icon: Bot,
      path: "/coworker",
      tooltip: "Coworker (Agentic Hub): AI-driven workflows and process automation center."
    },
    {
      name: "Apps",
      icon: LayoutGrid,
      path: "/apps",
      tooltip: "Apps Place: Access integrated apps and third-party tool connections."
    }
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="mt-2 mb-6 flex justify-center">
          <h2 className="text-2xl font-bold">Nítido</h2>
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
            <SidebarMenuButton asChild tooltip="Home: Overview dashboard and welcome page." isActive={true}>
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
