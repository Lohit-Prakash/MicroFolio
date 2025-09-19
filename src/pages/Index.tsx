import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { User, GraduationCap, Briefcase, FolderOpen, Mail, Sparkles } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 particle-field animate-particle-float pointer-events-none z-0"></div>
      
      {/* Hero Section - Always visible */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* Futuristic Navigation Tabs */}
      <div className="relative z-10 py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="glass-gradient p-2 rounded-2xl shadow-neon border border-primary/20 bg-transparent backdrop-blur-xl">
                <TabsTrigger 
                  value="about" 
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-cyber"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">About</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="education"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-cyber"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Education</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="experience"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-cyber"
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Experience</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="projects"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-cyber"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Projects</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="contact"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-cyber"
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">Contact</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tab Content with animations */}
            <div className="relative">
              <TabsContent value="about" className="animate-fade-up">
                <About />
              </TabsContent>
              <TabsContent value="education" className="animate-slide-in">
                <Education />
              </TabsContent>
              <TabsContent value="experience" className="animate-scale-up">
                <Experience />
              </TabsContent>
              <TabsContent value="projects" className="animate-fade-up">
                <Projects />
              </TabsContent>
              <TabsContent value="contact" className="animate-slide-in">
                <Contact />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Floating elements */}
      <div className="fixed top-1/4 left-8 w-4 h-4 bg-primary/30 rounded-full animate-float z-0"></div>
      <div className="fixed top-1/2 right-12 w-6 h-6 bg-secondary/20 rounded-full animate-float z-0" style={{ animationDelay: '1s' }}></div>
      <div className="fixed bottom-1/4 left-1/4 w-3 h-3 bg-accent/40 rounded-full animate-float z-0" style={{ animationDelay: '2s' }}></div>
      <div className="fixed top-3/4 right-1/4 w-5 h-5 bg-primary/25 rounded-full animate-float z-0" style={{ animationDelay: '0.5s' }}></div>
    </main>
  );
};

export default Index;