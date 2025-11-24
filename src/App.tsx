import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { PortfolioProvider } from "@/contexts/PortfolioDataContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { logPageView, logCustomEvent } from "@/lib/analytics";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Log initial page view
    logPageView("portfolio_home");
    
    // Log app initialization
    logCustomEvent("app_launched", {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });

    // Listen to route changes
    const handlePopState = () => {
      const path = window.location.hash.replace("#", "") || "/";
      logPageView(`page_${path}`);
    };

    window.addEventListener("hashchange", handlePopState);

    return () => {
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <PortfolioProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <HashRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </PortfolioProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
