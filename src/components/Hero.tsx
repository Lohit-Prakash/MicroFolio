import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import heroImage from "@/assets/hero-aerospace.jpg";

const Hero = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

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
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
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
          </div>

          <div className="animate-scale-up" style={{animationDelay: '0.7s'}}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="px-10 py-4 text-lg font-medium bg-accent hover:bg-accent/90 text-accent-foreground shadow-strong hover:shadow-glow transition-elegant hover:scale-[1.02] rounded-2xl"
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 py-4 text-lg font-medium border-2 border-accent/30 text-foreground hover:bg-accent/5 hover:border-accent shadow-medium hover:shadow-strong transition-elegant hover:scale-[1.02] rounded-2xl backdrop-blur-sm"
              >
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-pulse-glow">
        <div className="w-8 h-12 border-2 border-accent/40 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-4 bg-accent rounded-full mt-2 animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;