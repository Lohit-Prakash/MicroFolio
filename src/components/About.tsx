import { Card, CardContent } from "@/components/ui/card";
import { Target, BookOpen, Lightbulb } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioDataContext";

const About = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {personalInfo.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="card-gradient shadow-soft hover:shadow-medium transition-spring hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 accent-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To pioneer innovative solutions in aerospace and electronics that 
                push the boundaries of what's possible in space exploration and autonomous systems.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient shadow-soft hover:shadow-medium transition-spring hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 accent-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing Aerospace Engineering at IIT Madras as an exchange student, 
                building on my strong foundation in Electronics and Communication.
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient shadow-soft hover:shadow-medium transition-spring hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 accent-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Specializing in drone technology, control systems, and advanced power electronics 
                with practical experience at ISRO and leading research institutions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="card-gradient shadow-medium">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-center">Current Focus</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">Research Areas</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Drone Swarming Algorithms</li>
                    <li>• Sliding Mode Control Systems</li>
                    <li>• Power Electronics & Converters</li>
                    <li>• Satellite Communication Systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">Key Skills</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Embedded Systems (Raspberry Pi, Pixhawk)</li>
                    <li>• MATLAB/Simulink & Ansys HFSS</li>
                    <li>• Control Theory & Algorithm Development</li>
                    <li>• Research & Technical Documentation</li>
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