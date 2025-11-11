import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import EditProfile from "./admin/EditProfile";
import EditProjects from "./admin/EditProjects";
import EditExperience from "./admin/EditExperience";
import EditEducation from "./admin/EditEducation";
import EditContact from "./admin/EditContact";
import EditAnalytics from "./admin/EditAnalytics";
import EditAbout from "./admin/EditAbout";
import { User, Briefcase, GraduationCap, FolderOpen, Mail, BarChart3, Settings, Menu, Home, LogOut, Info } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "about", label: "About Section", icon: Info },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "debug", label: "Debug Storage", icon: Settings },
  ];

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  if (!isLoggedIn) {
    return null;
  }

  const AppSidebar = () => (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="p-4">
        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <h2 className="text-xl font-bold text-sidebar-foreground mb-2">Admin Panel</h2>
          <p className="text-sm text-sidebar-foreground/70">Portfolio Management</p>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/80 uppercase tracking-wide text-xs font-semibold mb-4">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.id} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <SidebarMenuButton
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-medium font-medium"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="hidden sm:block">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <div className="mt-auto pt-8 space-y-3">
          <Button variant="outline" size="sm" asChild className="w-full justify-start">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:block">View Portfolio</span>
            </Link>
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:block">Logout</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <EditProfile />;
      case "about":
        return <EditAbout />;
      case "projects":
        return <EditProjects />;
      case "experience":
        return <EditExperience />;
      case "education":
        return <EditEducation />;
      case "contact":
        return <EditContact />;
      case "analytics":
        return <EditAnalytics />;
      case "debug":
        // lazy import to avoid adding to main bundle
        const DebugStorage = require("./admin/DebugStorage").default;
        return <DebugStorage />;
      default:
        return <EditProfile />;
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen w-full hero-gradient">
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          
          {/* Main Content */}
          <main className="flex-1 overflow-hidden">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50 px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="lg:hidden" />
                  <div className="animate-fade-up">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {navigationItems.find(item => item.id === activeTab)?.label || "Dashboard"}
                    </h1>
                    <p className="text-sm text-muted-foreground hidden sm:block">
                      Manage your portfolio content with ease
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Content Area */}
            <div className="container-responsive py-6 sm:py-8 lg:py-12 space-responsive">
              <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
                {renderTabContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;