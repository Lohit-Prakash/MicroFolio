import { useState, useEffect } from "react";
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
  const [activeSection, setActiveSection] = useState("about");

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
      const sections = ['about', 'education', 'experience', 'projects', 'contact', 'login'];
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
      <section id="about" className="scroll-mt-20">
        <About />
      </section>
      
      <section id="education" className="scroll-mt-20">
        <Education />
      </section>
      
      <section id="experience" className="scroll-mt-20">
        <Experience />
      </section>
      
      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>
      
      <section id="contact" className="scroll-mt-20">
        <Contact />
      </section>
      
    </main>
  );
};

export default Index;