import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sjlohitp@gmail.com",
      link: "mailto:sjlohitp@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 93455 20182",
      link: "tel:+919345520182"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Hosur, Tamil Nadu, India",
      link: null
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Advanced background effects */}
      <div className="absolute inset-0 matrix-gradient opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 border border-primary/10 rounded-full animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 border border-secondary/15 rounded-lg animate-3d-rotate"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-neon-glow">
              Get In Touch
            </h2>
            <div className="glass-gradient p-6 rounded-2xl border border-primary/20 shadow-cyber">
              <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
                I'm always excited to discuss new opportunities, research collaborations, 
                or innovative projects in aerospace and electronics engineering.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 text-primary animate-neon-glow">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const content = (
                    <Card className="card-3d shadow-neon hover:shadow-cyber transition-spring group">
                      <CardContent className="p-6 relative overflow-hidden">
                        <div className="absolute inset-0 hologram-gradient opacity-5 group-hover:opacity-10 transition-opacity"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-14 h-14 neon-gradient rounded-xl flex items-center justify-center flex-shrink-0 shadow-glow animate-cyber-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
                            <IconComponent className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-primary mb-1">{info.label}</div>
                            <div className="text-muted-foreground">{info.value}</div>
                          </div>
                          {info.link && (
                            <ExternalLink className="w-5 h-5 text-secondary ml-auto group-hover:scale-110 transition-transform" />
                          )}
                        </div>
                        {/* Floating indicator */}
                        <div className="absolute top-2 right-2 w-2 h-2 bg-secondary/60 rounded-full animate-pulse"></div>
                      </CardContent>
                    </Card>
                  );

                  return info.link ? (
                    <a key={index} href={info.link} className="block">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Call to Action */}
            <div>
              <Card className="card-hologram shadow-hologram h-full animate-hologram">
                <CardContent className="p-8 text-center h-full flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute inset-0 hero-gradient opacity-90"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 neon-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow animate-cyber-pulse">
                      <Mail className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <h3 className="text-2xl font-semibold text-primary-foreground mb-6 animate-neon-glow">
                      Let's Collaborate
                    </h3>
                    <p className="text-primary-foreground/90 mb-8 leading-relaxed">
                      Whether you're interested in aerospace research, drone technology, 
                      power electronics, or innovative engineering solutions, I'd love to hear from you.
                    </p>
                    
                    <div className="space-y-6">
                      <Button 
                        size="lg" 
                        variant="secondary"
                        className="w-full px-8 py-4 text-lg font-medium shadow-cyber hover:shadow-neon transition-spring hover:scale-105 rounded-xl"
                        asChild
                      >
                        <a href="mailto:sjlohitp@gmail.com" className="flex items-center justify-center gap-2">
                          <span>📧</span>
                          Send Me an Email
                        </a>
                      </Button>
                      
                      <div className="glass-gradient p-4 rounded-xl border border-primary-foreground/20">
                        <p className="text-primary-foreground/80 font-medium mb-3">Available for:</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-primary-foreground/70">
                            <span className="w-1 h-1 bg-secondary rounded-full"></span>
                            Research Collaborations
                          </div>
                          <div className="flex items-center gap-2 text-primary-foreground/70">
                            <span className="w-1 h-1 bg-secondary rounded-full"></span>
                            Internship Opportunities
                          </div>
                          <div className="flex items-center gap-2 text-primary-foreground/70">
                            <span className="w-1 h-1 bg-secondary rounded-full"></span>
                            Technical Consultations
                          </div>
                          <div className="flex items-center gap-2 text-primary-foreground/70">
                            <span className="w-1 h-1 bg-secondary rounded-full"></span>
                            Academic Discussions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-secondary/40 rounded-full animate-float"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary-foreground/60 rounded-full animate-pulse"></div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Connection lines */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-primary/20 to-secondary/20 hidden md:block"></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;