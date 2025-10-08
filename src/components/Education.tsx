import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, MapPin, Eye } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import EducationModal from "@/components/modals/EducationModal";
import { Education as EducationType } from "@/contexts/PortfolioDataContext";

const Education = () => {
  const { data } = usePortfolio();
  const [selectedEducation, setSelectedEducation] = useState<EducationType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEducationClick = (edu: EducationType) => {
    setSelectedEducation(edu);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Education
            </h2>
            <p className="text-xl text-muted-foreground">
              Academic excellence across prestigious institutions in India
            </p>
          </div>

          <div className="space-y-8">
            {data.education.map((edu) => (
              <Card 
                key={edu.id} 
                className="card-gradient shadow-soft hover:shadow-medium transition-spring group cursor-pointer"
                onClick={() => handleEducationClick(edu)}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 accent-gradient rounded-full flex items-center justify-center group-hover:scale-110 transition-spring">
                        <GraduationCap className="w-8 h-8 text-accent-foreground" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {edu.degree}
                          </h3>
                          <h4 className="text-lg font-medium text-primary mb-2">
                            {edu.institution}
                          </h4>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{edu.period}</span>
                          </div>
                          <Badge variant="secondary" className="w-fit">
                            CGPA: {edu.cgpa}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4">
                        {edu.specialization && (
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="border-primary/20">
                              {edu.specialization}
                            </Badge>
                          </div>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors ml-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEducationClick(edu);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <EducationModal 
        education={selectedEducation}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEducation(null);
        }}
      />
    </section>
  );
};

export default Education;