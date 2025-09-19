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
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Aerospace Engineering Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-85"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            {personalInfo.name.split(' ').slice(0, 2).join(' ')}
            <span className="block text-secondary text-3xl md:text-4xl font-medium mt-2">
              {personalInfo.name.split(' ').slice(2).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            {personalInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <MapPin className="w-5 h-5" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Phone className="w-5 h-5" />
              <span>{personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <Mail className="w-5 h-5" />
              <span>{personalInfo.email}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg font-medium shadow-strong transition-spring hover:scale-105"
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg font-medium border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-medium transition-spring hover:scale-105"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;