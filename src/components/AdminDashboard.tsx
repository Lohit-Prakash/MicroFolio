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
import { User, Briefcase, GraduationCap, FolderOpen, Mail, BarChart3, Settings, Menu, Home, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const navigationItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
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
      case "projects":
        return <EditProjects />;
      case "experience":
        return <EditExperience />;
      case "education":
        return (
          <Card className="card-modern animate-scale-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education Management
              </CardTitle>
              <CardDescription>Manage your educational background</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">Education management features coming soon...</p>
                <p className="text-sm text-muted-foreground/70 mt-2">We're working on bringing you comprehensive education management tools.</p>
              </div>
            </CardContent>
          </Card>
        );
      case "contact":
        return (
          <Card className="card-modern animate-scale-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Settings
              </CardTitle>
              <CardDescription>Manage contact forms and messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Mail className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">Contact management features coming soon...</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Soon you'll be able to manage all your contact forms and messages here.</p>
              </div>
            </CardContent>
          </Card>
        );
      case "analytics":
        return (
          <Card className="card-modern animate-scale-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Portfolio Analytics
              </CardTitle>
              <CardDescription>View visitor statistics and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground text-lg">Analytics dashboard coming soon...</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Get insights into your portfolio's performance and visitor engagement.</p>
              </div>
            </CardContent>
          </Card>
        );
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