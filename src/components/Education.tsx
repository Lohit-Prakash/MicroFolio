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
            {education.map((edu, index) => (
              <Card key={index} className="card-gradient shadow-soft hover:shadow-medium transition-spring group">
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
                          <h3 className="text-2xl font-semibold text-foreground mb-2">
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
                            {edu.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {edu.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="border-primary/20">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;