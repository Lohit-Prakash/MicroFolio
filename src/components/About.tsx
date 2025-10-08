import { Card, CardContent } from "@/components/ui/card";
import { Target, BookOpen, Lightbulb } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioDataContext";

const About = () => {
  const { data } = usePortfolio();
  const { personalInfo, aboutSection } = data;

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-20 animate-fade-up">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold tracking-wide uppercase">
              Get to know me
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            About Me
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {personalInfo.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24 animate-slide-up">
          <Card className="card-elevated hover:scale-[1.02] group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-10 text-center relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-accent via-accent/80 to-accent/60 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-accent/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Target className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Vision</h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {aboutSection.vision}
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated hover:scale-[1.02] group md:mt-8 relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-10 text-center relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-primary/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Education</h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {aboutSection.educationDesc}
              </p>
            </CardContent>
          </Card>

          <Card className="card-elevated hover:scale-[1.02] group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardContent className="p-10 text-center relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-accent via-primary to-accent/60 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:shadow-primary/50 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <Lightbulb className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Innovation</h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {aboutSection.innovation}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto animate-fade-in-delay">
          <Card className="card-elevated shadow-strong backdrop-blur-sm border-2 hover:border-accent/30 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-accent"></div>
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-accent">
                  Current Focus
                </h3>
                <p className="text-muted-foreground">Areas of active research and skill development</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/60 rounded-2xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-2xl text-foreground">Research Areas</h4>
                  </div>
                  <ul className="space-y-4">
                    {aboutSection.researchAreas.map((area, idx) => (
                      <li key={idx} className="flex items-start gap-4 group cursor-default">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                        </div>
                        <span className="text-muted-foreground text-base leading-relaxed group-hover:text-foreground transition-colors pt-1">
                          {area}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-2xl text-foreground">Key Skills</h4>
                  </div>
                  <ul className="space-y-4">
                    {aboutSection.keySkills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-4 group cursor-default">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-muted-foreground text-base leading-relaxed group-hover:text-foreground transition-colors pt-1">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;