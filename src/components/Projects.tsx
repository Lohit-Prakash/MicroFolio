import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { Rocket, Zap, Satellite, Cog, Radio, Cpu, Eye } from "lucide-react";
import ProjectModal from "@/components/modals/ProjectModal";

const Projects = () => {
  const { data } = usePortfolio();
  const { projects } = data;
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const iconMap: { [key: string]: any } = {
    "Major Project": Rocket,
    "Internship Project": Radio,
    "Research Project": Zap,
    "Research Project (Patented)": Cog,
    "Personal Project": Cpu,
    "default": Satellite
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge research and development projects spanning aerospace, 
              electronics, and control systems
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const IconComponent = iconMap[project.type] || iconMap.default;
              return (
                <Card 
                  key={index} 
                  className="card-gradient shadow-soft hover:shadow-medium transition-spring group h-full cursor-pointer project-card-hover"
                  onClick={() => handleProjectClick(project)}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 accent-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-spring flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <Badge variant={project.status === "Ongoing" ? "default" : project.status === "Patented" ? "secondary" : "outline"}>
                            {project.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {project.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl leading-tight mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                          <div>{project.institution}</div>
                          <div>{project.period}</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <h4 className="font-semibold text-sm text-foreground">Key Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-primary/20">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs border-primary/20">
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </section>
  );
};

export default Projects;