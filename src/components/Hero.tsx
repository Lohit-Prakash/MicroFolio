import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, ChevronDown, Github, Linkedin, Youtube, Instagram, Twitter, Download, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import heroImage from "@/assets/hero-aerospace.jpg";

const Hero = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleDownloadResume = () => {
    // This will be functional once Supabase is connected
    console.log('Download resume clicked');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 gradient-hero opacity-40"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-accent/20 to-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <div className="card-glass p-2 rounded-2xl">
          <ThemeToggle />
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Profile Picture */}
          <div className="mb-8 animate-fade-up">
            <div className="w-40 h-40 mx-auto rounded-3xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 p-1 shadow-2xl shadow-primary/20 backdrop-blur-sm">
              <div className="w-full h-full rounded-3xl bg-gradient-to-br from-background/95 to-muted/50 flex items-center justify-center text-5xl font-bold text-primary shadow-inner border border-white/10">
                {personalInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>

          <div className="animate-fade-up">
            <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 leading-tight tracking-tight">
              {personalInfo.name.split(' ').slice(0, 2).join(' ')}
              <span className="block text-accent text-4xl md:text-5xl font-medium mt-4 animate-fade-in-delay">
                {personalInfo.name.split(' ').slice(2).join(' ')}
              </span>
            </h1>
          </div>
          
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              {personalInfo.description}
            </p>
          </div>

          <div className="animate-slide-up" style={{animationDelay: '0.5s'}}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="card-minimal px-4 py-2 flex items-center gap-3 text-foreground/80 hover:text-foreground transition-elegant">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="font-medium">{personalInfo.location}</span>
              </div>
              <div className="card-minimal px-4 py-2 flex items-center gap-3 text-foreground/80 hover:text-foreground transition-elegant">
                <Phone className="w-5 h-5 text-accent" />
                <span className="font-medium">{personalInfo.phone}</span>
              </div>
              <div className="card-minimal px-4 py-2 flex items-center gap-3 text-foreground/80 hover:text-foreground transition-elegant">
                <Mail className="w-5 h-5 text-accent" />
                <span className="font-medium">{personalInfo.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8 animate-fade-in animation-delay-1000">
              {personalInfo.linkedin && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover-scale rounded-full card-minimal transition-all duration-300 hover:shadow-lg hover:bg-accent/10"
                  onClick={() => window.open(personalInfo.linkedin, '_blank')}
                >
                  <Linkedin className="w-5 h-5 hover:text-blue-600 transition-colors" />
                </Button>
              )}
              {personalInfo.github && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover-scale rounded-full card-minimal transition-all duration-300 hover:shadow-lg hover:bg-accent/10"
                  onClick={() => window.open(personalInfo.github, '_blank')}
                >
                  <Github className="w-5 h-5 hover:text-gray-800 dark:hover:text-white transition-colors" />
                </Button>
              )}
              {personalInfo.scholar && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover-scale rounded-full card-minimal transition-all duration-300 hover:shadow-lg hover:bg-accent/10"
                  onClick={() => window.open(personalInfo.scholar, '_blank')}
                >
                  <GraduationCap className="w-5 h-5 hover:text-blue-700 transition-colors" />
                </Button>
              )}
              {personalInfo.youtube && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover-scale rounded-full card-minimal transition-all duration-300 hover:shadow-lg hover:bg-accent/10"
                  onClick={() => window.open(personalInfo.youtube, '_blank')}
                >
                  <Youtube className="w-5 h-5 hover:text-red-600 transition-colors" />
                </Button>
              )}
              {personalInfo.instagram && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover-scale rounded-full card-minimal transition-all duration-300 hover:shadow-lg hover:bg-accent/10"
                  onClick={() => window.open(personalInfo.instagram, '_blank')}
                >
                  <Instagram className="w-5 h-5 hover:text-pink-600 transition-colors" />
                </Button>
              )}
              {personalInfo.twitter && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover-scale rounded-full card-minimal transition-all duration-300 hover:shadow-lg hover:bg-accent/10"
                  onClick={() => window.open(personalInfo.twitter, '_blank')}
                >
                  <Twitter className="w-5 h-5 hover:text-blue-400 transition-colors" />
                </Button>
              )}
            </div>
          </div>

          <div className="animate-scale-up" style={{animationDelay: '0.7s'}}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="px-10 py-4 text-lg font-medium bg-accent hover:bg-accent/90 text-accent-foreground shadow-strong hover:shadow-glow transition-elegant hover:scale-[1.02] rounded-2xl"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 py-4 text-lg font-medium border-2 border-accent/30 text-foreground hover:bg-accent/5 hover:border-accent shadow-medium hover:shadow-strong transition-elegant hover:scale-[1.02] rounded-2xl backdrop-blur-sm"
                onClick={() => scrollToSection('contact')}
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-1 animate-fade-in">
          <span className="text-xs text-muted-foreground/60 font-medium tracking-wider mb-1">SCROLL</span>
          <div className="relative">
            <ChevronDown className="w-6 h-6 text-accent animate-bounce" />
            <ChevronDown className="w-6 h-6 text-accent/40 absolute top-2 left-0 animate-bounce" style={{animationDelay: '0.1s'}} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;