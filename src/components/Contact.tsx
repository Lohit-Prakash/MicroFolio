import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ExternalLink, Download } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { logCustomEvent, logResumeDownload } from "@/lib/analytics";

const Contact = () => {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  
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
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I'm always excited to discuss new opportunities, research collaborations, 
              or innovative projects in aerospace and electronics engineering.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  const content = (
                    <Card className="card-gradient shadow-soft hover:shadow-medium transition-spring">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 accent-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-6 h-6 text-accent-foreground" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">{info.label}</div>
                            <div className="text-muted-foreground">{info.value}</div>
                          </div>
                          {info.link && (
                            <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                          )}
                        </div>
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

            {/* Call to Action */}
            <div>
              <Card className="hero-gradient shadow-medium h-full">
                <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-primary-foreground mb-6">
                    Let's Collaborate
                  </h3>
                  <p className="text-primary-foreground/90 mb-8 leading-relaxed">
                    Whether you're interested in aerospace research, drone technology, 
                    power electronics, or innovative engineering solutions, I'd love to hear from you.
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="w-full"
                      asChild
                      onClick={() => logCustomEvent("email_contact_click")}
                    >
                      <a href="mailto:sjlohitp@gmail.com">
                        Send Me an Email
                      </a>
                    </Button>
                    
                    <div className="text-primary-foreground/70 text-sm mb-6">
                      <p>Available for:</p>
                      <div className="mt-2 space-y-1">
                        <div>• Research Collaborations</div>
                        <div>• Internship Opportunities</div>
                        <div>• Technical Consultations</div>
                        <div>• Academic Discussions</div>
                      </div>
                    </div>
                    
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        logResumeDownload();
                        if (personalInfo.resumeLink) {
                          window.open(personalInfo.resumeLink, '_blank');
                        } else {
                          console.log('No resume link set');
                        }
                      }}
                      disabled={!personalInfo.resumeLink}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Resume
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;