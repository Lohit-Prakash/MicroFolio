import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Calendar, Eye } from "lucide-react";
import ExperienceModal from "@/components/modals/ExperienceModal";

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExperienceClick = (experience: any) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const experiences = [
    {
      role: "Research Intern",
      company: "Indian Institute of Technology Madras",
      location: "Chennai, Tamil Nadu",
      period: "May 2024 - July 2024",
      type: "Research",
      description: "Led cutting-edge research in autonomous drone systems, focusing on swarm intelligence and coordination algorithms for multi-agent systems.",
      achievements: [
        "Developed an algorithm for drone swarming, addressing challenges in autonomous coordination",
        "Built a functional drone prototype using Raspberry Pi 4 and Pixhawk flight controller",
        "Used Mission Planner and QGroundControl for mission planning and configuration",
        "Tested algorithms in both simulations and real-world trials",
        "Acquired expertise in drone technology and advanced project management"
      ],
      skills: ["Python", "ROS", "Raspberry Pi", "Pixhawk", "Mission Planner", "QGroundControl", "Drone Technology", "Swarm Intelligence"]
    },
    {
      role: "Project Intern",
      company: "Indian Space Research Organization (ISRO)",
      location: "Bangalore, Karnataka", 
      period: "Dec 2023 - Jan 2024",
      type: "Space Technology",
      description: "Contributed to satellite communication systems development, specializing in antenna design and electromagnetic simulation for India's navigation satellites.",
      achievements: [
        "Designed and simulated dual-band patch antenna for GPS and NavIC on Indian satellites",
        "Worked with frequencies of 1.17 GHz and 1.57 GHz for satellite communication",
        "Utilized Ansys HFSS for electromagnetic simulations and antenna modeling",
        "Gained exposure to satellite link budgeting and power converter systems",
        "Learned ISRO's work culture and precision requirements for space communication"
      ],
      skills: ["Ansys HFSS", "Antenna Design", "Electromagnetic Simulation", "Satellite Communication", "RF Engineering", "MATLAB"]
    },
    {
      role: "Intern",
      company: "Titan Watches",
      location: "Hosur, Tamil Nadu",
      period: "May 2023",
      type: "Manufacturing",
      description: "Gained hands-on experience in precision manufacturing and product development in the luxury watch industry, focusing on R&D processes.",
      achievements: [
        "Explored watch assembly and mechanics in the R&D department",
        "Gained insights into design and production workflows for precision instruments",
        "Learned end-to-end product development processes",
        "Understood precision engineering principles in consumer electronics"
      ],
      skills: ["Precision Manufacturing", "Product Development", "R&D Processes", "Quality Control", "Mechanical Engineering"]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Experience
            </h2>
            <p className="text-xl text-muted-foreground">
              Research and practical experience across leading organizations
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                className="card-gradient shadow-soft hover:shadow-medium transition-spring group cursor-pointer experience-card-hover"
                onClick={() => handleExperienceClick(exp)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 accent-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-spring">
                        <Briefcase className="w-8 h-8 text-accent-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between mb-6">
                        <div className="mb-4 xl:mb-0">
                          <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <h4 className="text-lg font-medium text-primary mb-3">
                            {exp.company}
                          </h4>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.period}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Badge variant="secondary" className="w-fit h-fit">
                          {exp.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        {exp.achievements.slice(0, 2).map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                            <p className="text-muted-foreground leading-relaxed">
                              {achievement}
                            </p>
                          </div>
                        ))}
                        {exp.achievements.length > 2 && (
                          <p className="text-sm text-muted-foreground/70 ml-5">
                            +{exp.achievements.length - 2} more achievements...
                          </p>
                        )}
                      </div>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExperienceClick(exp);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ExperienceModal 
        experience={selectedExperience}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExperience(null);
        }}
      />
    </section>
  );
};

export default Experience;