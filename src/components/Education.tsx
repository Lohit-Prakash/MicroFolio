import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Aerospace Engineering",
      institution: "Indian Institute of Technology Madras",
      period: "2024 - 2025",
      status: "Exchange Student",
      description: "Advanced coursework in aerospace systems, control theory, and space technology",
      highlights: ["Ongoing", "Research Focus"]
    },
    {
      degree: "B.Tech in Electronics and Communication Engineering", 
      institution: "National Institute of Technology Puducherry",
      period: "2021 - 2024",
      status: "CGPA: 8.60/10.00",
      description: "Comprehensive study of electronics, communication systems, and embedded technologies",
      highlights: ["Till 6th Semester", "Distinguished Performance"]
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'matrix-rain 20s linear infinite'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-neon-glow">
              Education
            </h2>
            <div className="glass-gradient p-4 rounded-2xl border border-primary/20 shadow-cyber">
              <p className="text-xl text-foreground">
                Academic excellence across prestigious institutions in India
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card key={index} className="card-3d shadow-neon hover:shadow-cyber transition-spring group animate-fade-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardContent className="p-8 relative overflow-hidden">
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 hologram-gradient opacity-5 group-hover:opacity-10 transition-opacity"></div>
                  
                  <div className="flex flex-col md:flex-row gap-6 relative z-10">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 neon-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-spring shadow-glow animate-cyber-pulse" style={{ animationDelay: `${index * 0.5}s` }}>
                        <GraduationCap className="w-10 h-10 text-primary-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-semibold text-primary mb-3 animate-neon-glow">
                            {edu.degree}
                          </h3>
                          <h4 className="text-lg font-medium text-secondary mb-3">
                            {edu.institution}
                          </h4>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-3">
                          <div className="flex items-center gap-2 text-muted-foreground glass-gradient px-3 py-1 rounded-full border border-primary/20">
                            <Calendar className="w-4 h-4 text-secondary" />
                            <span className="font-medium">{edu.period}</span>
                          </div>
                          <Badge variant="secondary" className="w-fit bg-primary/20 text-primary border-primary/30 shadow-glow">
                            {edu.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="glass-gradient p-4 rounded-xl border border-primary/20 mb-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="border-primary/30 text-primary bg-primary/10 hover:bg-primary/20 transition-colors">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Floating particles for this card */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary/60 rounded-full animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Floating academic elements */}
          <div className="absolute top-20 right-10 w-6 h-6 border-2 border-primary/30 rounded-lg animate-3d-rotate"></div>
          <div className="absolute bottom-20 left-10 w-4 h-4 bg-secondary/20 rounded-full animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default Education;