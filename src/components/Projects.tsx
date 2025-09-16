import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { Rocket, Zap, Satellite, Cog, Radio, Cpu } from "lucide-react";

const Projects = () => {
  const { data } = usePortfolio();
  const { projects } = data;

  const iconMap: { [key: string]: any } = {
    "Major Project": Rocket,
    "Internship Project": Radio,
    "Research Project": Zap,
    "Research Project (Patented)": Cog,
    "Personal Project": Cpu,
    "default": Satellite
  };

  return (
    <section className="py-20 bg-muted/30">
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
                <Card key={index} className="card-gradient shadow-soft hover:shadow-medium transition-spring group h-full">
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
                        <CardTitle className="text-xl leading-tight mb-2">
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
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-foreground">Key Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-primary/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;