import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      role: "Research Intern",
      company: "Indian Institute of Technology Madras",
      location: "Chennai, Tamil Nadu",
      period: "May 2024 - July 2024",
      type: "Research",
      achievements: [
        "Developed an algorithm for drone swarming, addressing challenges in autonomous coordination",
        "Built a functional drone prototype using Raspberry Pi 4 and Pixhawk flight controller",
        "Used Mission Planner and QGroundControl for mission planning and configuration",
        "Tested algorithms in both simulations and real-world trials",
        "Acquired expertise in drone technology and advanced project management"
      ]
    },
    {
      role: "Project Intern",
      company: "Indian Space Research Organization (ISRO)",
      location: "Bangalore, Karnataka", 
      period: "Dec 2023 - Jan 2024",
      type: "Space Technology",
      achievements: [
        "Designed and simulated dual-band patch antenna for GPS and NavIC on Indian satellites",
        "Worked with frequencies of 1.17 GHz and 1.57 GHz for satellite communication",
        "Utilized Ansys HFSS for electromagnetic simulations and antenna modeling",
        "Gained exposure to satellite link budgeting and power converter systems",
        "Learned ISRO's work culture and precision requirements for space communication"
      ]
    },
    {
      role: "Intern",
      company: "Titan Watches",
      location: "Hosur, Tamil Nadu",
      period: "May 2023",
      type: "Manufacturing",
      achievements: [
        "Explored watch assembly and mechanics in the R&D department",
        "Gained insights into design and production workflows for precision instruments",
        "Learned end-to-end product development processes",
        "Understood precision engineering principles in consumer electronics"
      ]
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0 cyber-gradient opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary via-secondary to-transparent animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-neon-glow">
              Experience
            </h2>
            <div className="glass-gradient p-4 rounded-2xl border border-primary/20 shadow-cyber">
              <p className="text-xl text-foreground">
                Research and practical experience across leading organizations
              </p>
            </div>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <Card key={index} className="card-3d shadow-neon hover:shadow-cyber transition-spring group animate-fade-up" style={{ animationDelay: `${index * 0.3}s` }}>
                <CardContent className="p-8 relative overflow-hidden">
                  {/* Dynamic holographic overlay */}
                  <div className="absolute inset-0 hologram-gradient opacity-5 group-hover:opacity-15 transition-opacity"></div>
                  
                  <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                    <div className="flex-shrink-0 relative">
                      <div className="w-20 h-20 neon-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-spring shadow-glow animate-cyber-pulse" style={{ animationDelay: `${index * 0.7}s` }}>
                        <Briefcase className="w-10 h-10 text-primary-foreground" />
                      </div>
                      {/* Company type indicator */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between mb-6">
                        <div className="mb-4 xl:mb-0">
                          <h3 className="text-2xl font-semibold text-primary mb-3 animate-neon-glow">
                            {exp.role}
                          </h3>
                          <h4 className="text-lg font-medium text-secondary mb-4">
                            {exp.company}
                          </h4>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground glass-gradient px-3 py-1 rounded-full border border-primary/20">
                              <MapPin className="w-4 h-4 text-secondary" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground glass-gradient px-3 py-1 rounded-full border border-primary/20">
                              <Calendar className="w-4 h-4 text-secondary" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Badge variant="secondary" className="w-fit h-fit bg-primary/20 text-primary border-primary/30 shadow-glow animate-pulse">
                          {exp.type}
                        </Badge>
                      </div>
                      
                      <div className="glass-gradient p-6 rounded-xl border border-primary/20">
                        <h5 className="text-lg font-semibold text-primary mb-4">Key Achievements</h5>
                        <div className="space-y-4">
                          {exp.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-4 group/achievement">
                              <div className="flex-shrink-0 mt-2">
                                <div className="w-3 h-3 neon-gradient rounded-full shadow-glow group-hover/achievement:scale-125 transition-transform"></div>
                              </div>
                              <p className="text-muted-foreground leading-relaxed group-hover/achievement:text-foreground transition-colors">
                                {achievement}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements for each card */}
                  <div className="absolute top-6 right-6 w-2 h-2 bg-primary/40 rounded-full animate-float"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-secondary/60 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/2 right-2 w-1 h-8 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Experience timeline indicator */}
          <div className="absolute left-8 top-40 bottom-40 w-px bg-gradient-to-b from-primary/20 via-secondary/30 to-primary/20 hidden lg:block"></div>
          
          {/* Floating tech elements */}
          <div className="absolute top-32 right-16 w-8 h-8 border-2 border-primary/30 rounded-lg animate-3d-rotate"></div>
          <div className="absolute bottom-32 left-16 w-6 h-6 bg-secondary/20 rounded-full animate-float"></div>
        </div>
      </div>
    </section>
  );
};

export default Experience;