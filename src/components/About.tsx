import { Card, CardContent } from "@/components/ui/card";
import { Target, BookOpen, Lightbulb } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioDataContext";

const About = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-up">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 tracking-tight">
            About Me
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
            {personalInfo.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20 animate-slide-up">
          <Card className="card-elevated hover:scale-[1.02] group">
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/60 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow group-hover:scale-110 transition-elegant">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To pioneer innovative solutions in aerospace and electronics that 
                push the boundaries of what's possible in space exploration and autonomous systems.
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated hover:scale-[1.02] group md:mt-8">
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow group-hover:scale-110 transition-elegant">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Education</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Currently pursuing Aerospace Engineering at IIT Madras as an exchange student, 
                building on my strong foundation in Electronics and Communication.
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated hover:scale-[1.02] group">
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glow group-hover:scale-110 transition-elegant">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Specializing in drone technology, control systems, and advanced power electronics 
                with practical experience at ISRO and leading research institutions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto animate-fade-in-delay">
          <Card className="card-elevated shadow-strong backdrop-blur-sm">
            <CardContent className="p-12">
              <h3 className="text-3xl font-semibold mb-10 text-center text-foreground">Current Focus</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h4 className="font-semibold text-2xl mb-6 text-accent flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-accent to-primary rounded-full"></div>
                    Research Areas
                  </h4>
                  <ul className="space-y-4 text-muted-foreground text-lg">
                    <li className="flex items-center gap-3 hover:text-foreground transition-elegant">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Drone Swarming Algorithms
                    </li>
                    <li className="flex items-center gap-3 hover:text-foreground transition-elegant">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Sliding Mode Control Systems
                    </li>
                    <li className="flex items-center gap-3 hover:text-foreground transition-elegant">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Power Electronics & Converters
                    </li>
                    <li className="flex items-center gap-3 hover:text-foreground transition-elegant">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      Satellite Communication Systems
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-2xl mb-6 text-primary flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                    Key Skills
                  </h4>
                  <ul className="space-y-4 text-muted-foreground text-lg">
                    <li className="flex items-center gap-3 hover:text-foreground transition-elegant">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Embedded Systems (Raspberry Pi, Pixhawk)
                    </li>
                    <li className="flex items-center gap-3 hover:text-foreground transition-elegant">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      MATLAB/Simulink & Ansys HFSS
                    </li>
                    <li className="flex items-center gap-3 hover:text-foreground transition-elegant">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Control Theory & Algorithm Development
                    </li>
                    <li className="flex items-center gap-3 hover:text-foreground transition-elegant">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Research & Technical Documentation
                    </li>
                  </ul>
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