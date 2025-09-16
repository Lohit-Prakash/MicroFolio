import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Zap, Satellite, Cog, Radio, Cpu } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Soft-Landing of Rockets Using Sliding Mode Control Algorithm",
      period: "Aug 2024 - Present",
      institution: "IIT Madras, Chennai",
      type: "Major Project",
      icon: Rocket,
      description: "Developing advanced control algorithms using Sliding Mode Control to achieve precision soft-landing of rockets, addressing stability and accuracy challenges under dynamic flight conditions.",
      technologies: ["Control Theory", "MATLAB/Simulink", "Aerospace Dynamics", "Algorithm Development"],
      status: "Ongoing"
    },
    {
      title: "Comprehensive Development & Implementation of Drone Swarming Algorithm",
      period: "May 2024 - July 2024", 
      institution: "IIT Madras, Chennai",
      type: "Internship Project",
      icon: Radio,
      description: "Designed and built autonomous drone systems with swarming capabilities, integrating Pixhawk for flight control, Raspberry Pi 4 for computational processing, and Mission Planner for mission coordination.",
      technologies: ["Raspberry Pi", "Pixhawk", "Mission Planner", "QGroundControl", "Autonomous Systems"],
      status: "Completed"
    },
    {
      title: "SIMO DC-DC Boost Converter with Model Predictive Control",
      period: "2023-2024",
      institution: "NIT Puducherry, Karaikal",
      type: "Research Project",
      icon: Zap,
      description: "Engineered a multiport converter topology for applications requiring multiple output channels, utilizing Model Predictive Control (MPC) to regulate output voltages and minimize cross-regulation effects.",
      technologies: ["Power Electronics", "MPC", "Circuit Design", "MATLAB"],
      status: "Completed"
    },
    {
      title: "Linearly Polarised Dual Band Patch Antenna for Gaganyaan Applications",
      period: "Dec 2023 - Jan 2024",
      institution: "ISRO, Bangalore",
      type: "Internship Project",
      icon: Satellite,
      description: "Developed specialized patch antenna for Indian space missions, designed for GPS and NavIC satellite communication at 1.17 GHz and 1.57 GHz frequencies with linear polarization characteristics.",
      technologies: ["Ansys HFSS", "Antenna Design", "Satellite Communication", "RF Engineering"],
      status: "Completed"
    },
    {
      title: "Analysis of Inductor Current Ripple Minimization in PV-Fed Interleaved Modular DC-DC Converter",
      period: "2023 - 2024",
      institution: "NIT Puducherry, Karaikal",
      type: "Research Project (Patented)",
      icon: Cog,
      description: "Developed and patented innovative method to reduce inductor current ripple in Modular Multilevel Converters, achieving 2% efficiency improvement and enabling optimal power extraction under partial shading conditions.",
      technologies: ["Solar PV", "MPPT", "Converter Design", "Patent Filed"],
      status: "Patented"
    },
    {
      title: "Modular Multilevel Converter for Cross-Regulation-Free SIMO Applications",
      period: "2023 - 2024", 
      institution: "NIT Puducherry, Karaikal",
      type: "Research Project",
      icon: Cpu,
      description: "Designed novel converter topology for multi-source electric vehicle systems, enabling independent voltage regulation for each port, validated through comprehensive Small Signal Analysis and hardware prototyping.",
      technologies: ["Power Electronics", "Electric Vehicles", "Small Signal Analysis", "Hardware Validation"],
      status: "Completed"
    }
  ];

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
              const IconComponent = project.icon;
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