import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Calendar, GraduationCap, BookOpen } from "lucide-react";
import { Education } from "@/contexts/PortfolioDataContext";

interface EducationModalProps {
  education: Education | null;
  isOpen: boolean;
  onClose: () => void;
}

const EducationModal = ({ education, isOpen, onClose }: EducationModalProps) => {
  if (!education) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="modal-flip-enter">
          <DialogHeader className="flex flex-row items-center justify-between pb-4">
            <DialogTitle className="text-2xl font-bold text-foreground pr-8">
              {education.degree}
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
            {/* Institution Info */}
            <div className="flex items-start gap-4 p-6 rounded-lg bg-muted/30">
              <div className="w-16 h-16 accent-gradient rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {education.institution}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{education.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{education.period}</span>
                  </div>
                </div>
                <Badge variant="secondary">CGPA: {education.cgpa}</Badge>
              </div>
            </div>

            {/* Specialization */}
            {education.specialization && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Specialization</h3>
                <Badge variant="outline" className="border-primary/20 text-base px-4 py-2">
                  {education.specialization}
                </Badge>
              </div>
            )}

            {/* Description */}
            {education.description && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">About the Program</h3>
                <p className="text-muted-foreground leading-relaxed">{education.description}</p>
              </div>
            )}

            {/* Achievements */}
            {education.achievements && education.achievements.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-4">Key Achievements</h3>
                <div className="space-y-4">
                  {education.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border-l-4 border-l-accent">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-muted-foreground leading-relaxed">
                        {achievement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relevant Courses */}
            {education.relevantCourses && education.relevantCourses.length > 0 && (
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Relevant Courses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {education.relevantCourses.map((course, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {course}
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

export default EducationModal;
