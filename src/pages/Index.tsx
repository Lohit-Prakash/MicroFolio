import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { User, Briefcase, FolderOpen, GraduationCap, Mail, LogIn } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Login from "@/components/Login";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between py-4">
              <TabsList className="grid w-fit grid-cols-6 gap-1 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger 
                  value="about" 
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">About</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="education"
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="experience"
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="projects"
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="contact"
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Contact</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="login"
                  className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </TabsTrigger>
              </TabsList>
              
              <ThemeToggle />
            </div>
            
            <TabsContent value="about" className="mt-0">
              <About />
            </TabsContent>
            
            <TabsContent value="education" className="mt-0">
              <Education />
            </TabsContent>
            
            <TabsContent value="experience" className="mt-0">
              <Experience />
            </TabsContent>
            
            <TabsContent value="projects" className="mt-0">
              <Projects />
            </TabsContent>
            
            <TabsContent value="contact" className="mt-0">
              <Contact />
            </TabsContent>
            
            <TabsContent value="login" className="mt-0">
              <div className="min-h-screen flex items-center justify-center py-20">
                <Login />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Index;