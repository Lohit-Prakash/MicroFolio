import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Calendar, GraduationCap, BookOpen, ChevronLeft, ChevronRight, FileText, ExternalLink } from "lucide-react";
import { Education } from "@/contexts/PortfolioDataContext";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface EducationModalProps {
  education: Education | null;
  isOpen: boolean;
  onClose: () => void;
}

const EducationModal = ({ education, isOpen, onClose }: EducationModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!education) return null;

  const hasImages = education.images && education.images.length > 0;
  const hasPdfs = education.pdfs && education.pdfs.length > 0;

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

            {/* Image Carousel */}
            {hasImages && (
              <div>
                <h3 className="font-semibold text-foreground mb-3">Images</h3>
                <Carousel className="w-full">
                  <CarouselContent>
                    {education.images!.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                          <img
                            src={image}
                            alt={`${education.degree} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {education.images!.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </>
                  )}
                </Carousel>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {currentImageIndex + 1} / {education.images!.length}
                </p>
              </div>
            )}

            {/* PDFs */}
            {hasPdfs && (
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Documents
                </h3>
                <div className="space-y-2">
                  {education.pdfs!.map((pdf, index) => (
                    <a
                      key={index}
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                    >
                      <FileText className="w-5 h-5 text-primary" />
                      <span className="flex-1 text-sm font-medium">Document {index + 1}</span>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}

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
