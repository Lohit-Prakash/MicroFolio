import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import heroImage from "@/assets/hero-aerospace.jpg";

const Hero = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Advanced Background with 3D effects */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Aerospace Engineering Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 hero-gradient"></div>
        
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-lg animate-3d-rotate"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-secondary/30 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-accent/10 rotate-45 animate-pulse-glow"></div>
        
        {/* Matrix-style grid overlay */}
        <div className="absolute inset-0 opacity-20 animate-matrix"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <div className="glass-gradient p-2 rounded-xl shadow-cyber">
          <ThemeToggle />
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center relative">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <div className="relative">
            {/* Holographic effect behind text */}
            <div className="absolute inset-0 hologram-gradient opacity-20 blur-3xl animate-hologram"></div>
            
            <h1 className="relative text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-neon-glow">
              {personalInfo.name.split(' ').slice(0, 2).join(' ')}
              <span className="block text-secondary text-3xl md:text-4xl font-medium mt-2 animate-cyber-pulse">
                {personalInfo.name.split(' ').slice(2).join(' ')}
              </span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed glass-gradient p-4 rounded-2xl backdrop-blur-sm border border-primary/20">
            {personalInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 text-primary-foreground/80 glass-gradient px-4 py-2 rounded-full border border-primary/20">
              <MapPin className="w-5 h-5 text-secondary" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80 glass-gradient px-4 py-2 rounded-full border border-primary/20">
              <Phone className="w-5 h-5 text-secondary" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80 glass-gradient px-4 py-2 rounded-full border border-primary/20">
              <Mail className="w-5 h-5 text-secondary" />
              <span>{personalInfo.email}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg font-medium shadow-cyber transition-spring hover:scale-105 hover:shadow-neon rounded-xl bg-secondary hover:bg-secondary/80"
            >
              <span className="mr-2">🚀</span>
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-glow transition-spring hover:scale-105 rounded-xl hover:shadow-cyber"
            >
              <span className="mr-2">💬</span>
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-8 h-12 glass-gradient border-2 border-primary/30 rounded-full flex justify-center shadow-cyber">
          <div className="w-2 h-2 bg-secondary rounded-full mt-3 animate-bounce"></div>
        </div>
        <p className="text-primary-foreground/60 text-sm mt-2 animate-pulse">Scroll to explore</p>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
        <div className="absolute top-2/3 right-1/5 w-3 h-3 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-2/5 w-1 h-1 bg-accent/50 rounded-full animate-pulse"></div>
        <div className="absolute top-1/5 right-1/3 w-2 h-2 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </section>
  );
};

export default Hero;