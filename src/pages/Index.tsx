import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Briefcase, FolderOpen, GraduationCap, Mail, LogIn, Newspaper } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { ThemeToggle } from "@/components/ThemeToggle";
import SectionDivider from "@/components/SectionDivider";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import DefaultTheme from "@/themes/DefaultTheme";
import DarkGlowTheme from "@/themes/DarkGlowTheme";
import LightProfessionalTheme from "@/themes/LightProfessionalTheme";
import NeonCyberpunkTheme from "@/themes/NeonCyberpunkTheme";
import RetroClassicTheme from "@/themes/RetroClassicTheme";
import MinimalistCleanTheme from "@/themes/MinimalistCleanTheme";
import NatureInspiredTheme from "@/themes/NatureInspiredTheme";
import RetroWaveTheme from "@/themes/RetroWaveTheme";
import CyberpunkTheme from "@/themes/CyberpunkTheme";
import MinimalistDarkTheme from "@/themes/MinimalistDarkTheme";
import FuturisticHolographicTheme from "@/themes/FuturisticHolographicTheme";
import ElegantLightTheme from "@/themes/ElegantLightTheme";
import BrutalistTheme from "@/themes/BrutalistTheme";
import SleekModernTheme from "@/themes/SleekModernTheme";
import GlassmorphismTheme from "@/themes/GlassmorphismTheme";
import NeobrutalismTheme from "@/themes/NeobrutalismTheme";
import MinimalistLightTheme from "@/themes/MinimalistLightTheme";
import PlayfulCreativeTheme from "@/themes/PlayfulCreativeTheme";
import CorporateCleanTheme from "@/themes/CorporateCleanTheme";

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const { data, loading } = usePortfolio();

  const navigateToAdmin = () => {
    window.location.href = '/#/admin';
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'education', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Hero />
      
      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-4">
            <nav className="flex gap-1 bg-muted/50 p-1 rounded-xl">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('about')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === 'about' ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('education')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === 'education' ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="hidden sm:inline">Education</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('experience')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === 'experience' ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span className="hidden sm:inline">Experience</span>
              </Button>
              <a href="/#/blog">
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all`}
                >
                  <Newspaper className="w-4 h-4" />
                  <span className="hidden sm:inline">Blog</span>
                </Button>
              </a>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('projects')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === 'projects' ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Projects</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeSection === 'contact' ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </Button>
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* All Sections */}
      {(() => {
        switch (data.personalInfo.theme) {
          case "dark-glow":
            return <DarkGlowTheme />;
          case "light-professional":
            return <LightProfessionalTheme />;
          case "neon-cyberpunk":
            return <NeonCyberpunkTheme />;
          case "retro-classic":
            return <RetroClassicTheme />;
          case "minimalist-clean":
            return <MinimalistCleanTheme />;
          case "nature-inspired":
            return <NatureInspiredTheme />;
          case "retro-wave":
            return <RetroWaveTheme />;
          case "cyberpunk":
            return <CyberpunkTheme />;
          case "minimalist-dark":
            return <MinimalistDarkTheme />;
          case "futuristic-holographic":
            return <FuturisticHolographicTheme />;
          case "elegant-light":
            return <ElegantLightTheme />;
          case "brutalist":
            return <BrutalistTheme />;
          case "sleek-modern":
            return <SleekModernTheme />;
          case "glassmorphism":
            return <GlassmorphismTheme />;
          case "neobrutalism":
            return <NeobrutalismTheme />;
          case "minimalist-light":
            return <MinimalistLightTheme />;
          case "playful-creative":
            return <PlayfulCreativeTheme />;
          case "corporate-clean":
            return <CorporateCleanTheme />;
          default:
            return <DefaultTheme />;
        }
      })()}
      
      {/* Admin Login Button at Bottom */}
      <div className="py-12 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="card-glass p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-white/10">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Admin Access
              </h3>
              <p className="text-muted-foreground mb-6">
                Access the admin panel to manage portfolio content
              </p>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-3 text-lg font-medium border-2 border-accent/30 text-foreground hover:bg-accent/10 hover:border-accent shadow-medium hover:shadow-strong transition-elegant hover:scale-[1.02] rounded-2xl backdrop-blur-sm"
                onClick={navigateToAdmin}
              >
                <LogIn className="w-5 h-5 mr-3" />
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
};

export default Index;