import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Calendar, Eye } from "lucide-react";
import ExperienceModal from "@/components/modals/ExperienceModal";
import { usePortfolio } from "@/contexts/PortfolioDataContext";

const Experience = () => {
  const { data } = usePortfolio();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExperienceClick = (experience: any) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

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
            {data.experience.map((exp, index) => (
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
                            {exp.title}
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
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                      
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