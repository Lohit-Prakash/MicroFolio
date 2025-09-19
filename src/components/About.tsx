import { Card, CardContent } from "@/components/ui/card";
import { Target, BookOpen, Lightbulb } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioDataContext";

const About = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-gradient opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-neon-glow">
            About Me
          </h2>
          <div className="glass-gradient p-6 rounded-2xl border border-primary/20 shadow-cyber">
            <p className="text-xl text-foreground leading-relaxed">
              {personalInfo.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="card-3d shadow-neon hover:shadow-cyber transition-spring hover:scale-105 group">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 hologram-gradient opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 neon-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-cyber-pulse">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To pioneer innovative solutions in aerospace and electronics that 
                  push the boundaries of what's possible in space exploration and autonomous systems.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d shadow-neon hover:shadow-cyber transition-spring hover:scale-105 group">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 hologram-gradient opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 neon-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-cyber-pulse" style={{ animationDelay: '0.5s' }}>
                  <BookOpen className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Education</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Currently pursuing Aerospace Engineering at IIT Madras as an exchange student, 
                  building on my strong foundation in Electronics and Communication.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d shadow-neon hover:shadow-cyber transition-spring hover:scale-105 group">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 hologram-gradient opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 neon-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-cyber-pulse" style={{ animationDelay: '1s' }}>
                  <Lightbulb className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Innovation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Specializing in drone technology, control systems, and advanced power electronics 
                  with practical experience at ISRO and leading research institutions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="card-hologram shadow-hologram animate-hologram">
            <CardContent className="p-8 relative">
              <div className="absolute inset-0 matrix-gradient opacity-20"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-6 text-center text-primary animate-neon-glow">Current Focus</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glass-gradient p-6 rounded-xl border border-primary/20">
                    <h4 className="font-semibold text-lg mb-4 text-secondary flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                      Research Areas
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        Drone Swarming Algorithms
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        Sliding Mode Control Systems
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        Power Electronics & Converters
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        Satellite Communication Systems
                      </li>
                    </ul>
                  </div>
                  <div className="glass-gradient p-6 rounded-xl border border-primary/20">
                    <h4 className="font-semibold text-lg mb-4 text-secondary flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                      Key Skills
                    </h4>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        Embedded Systems (Raspberry Pi, Pixhawk)
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        MATLAB/Simulink & Ansys HFSS
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        Control Theory & Algorithm Development
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-primary rounded-full"></span>
                        Research & Technical Documentation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;