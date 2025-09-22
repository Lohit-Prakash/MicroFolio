import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Calendar, Briefcase } from "lucide-react";

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  achievements: string[];
  description?: string;
  companyLogo?: string;
  skills?: string[];
}

interface ExperienceModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal = ({ experience, isOpen, onClose }: ExperienceModalProps) => {
  if (!experience) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="modal-flip-enter">
          <DialogHeader className="flex flex-row items-center justify-between pb-4">
            <DialogTitle className="text-2xl font-bold text-foreground pr-8">
              {experience.role}
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="space-y-6">
            {/* Company Info */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/30">
              <div className="w-16 h-16 accent-gradient rounded-full flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {experience.company}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{experience.period}</span>
                  </div>
                </div>
                <Badge variant="secondary">{experience.type}</Badge>
              </div>
            </div>

            {/* Description */}
            {experience.description && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Role Description</h3>
                <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
              </div>
            )}

            {/* Key Achievements */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Key Achievements & Responsibilities</h3>
              <div className="space-y-4">
                {experience.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border-l-4 border-l-accent">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            {experience.skills && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Skills Developed</h3>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceModal;