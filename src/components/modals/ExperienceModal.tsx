import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, MapPin, Calendar, Briefcase, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Experience } from "@/contexts/PortfolioDataContext";

interface ExperienceModalProps {
  experience: Experience | null;
  isOpen: boolean;
  onClose: () => void;
}

const ExperienceModal = ({ experience, isOpen, onClose }: ExperienceModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!experience) return null;

  const hasImages = experience.images && experience.images.length > 0;
  const hasPdfs = experience.pdfs && experience.pdfs.length > 0;

  const nextImage = () => {
    if (hasImages && experience.images) {
      setCurrentImageIndex((prev) => (prev + 1) % experience.images.length);
    }
  };

  const prevImage = () => {
    if (hasImages && experience.images) {
      setCurrentImageIndex((prev) => (prev - 1 + experience.images.length) % experience.images.length);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="modal-flip-enter">
          <DialogHeader className="flex flex-row items-center justify-between pb-4">
            <DialogTitle className="text-2xl font-bold text-foreground pr-8">
              {experience.title}
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
            {/* Images Carousel */}
            {hasImages && (
              <div className="relative rounded-lg overflow-hidden bg-muted/30">
                <div className="relative aspect-video">
                  <img 
                    src={experience.images![currentImageIndex]} 
                    alt={`${experience.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {experience.images!.length > 1 && (
                    <>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100"
                        onClick={nextImage}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {experience.images!.map((_, idx) => (
                          <button
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex ? 'bg-primary w-6' : 'bg-primary/40'
                            }`}
                            onClick={() => setCurrentImageIndex(idx)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

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

            {/* PDFs */}
            {hasPdfs && (
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Related Documents
                </h3>
                <div className="space-y-2">
                  {experience.pdfs!.map((pdf, index) => (
                    <a
                      key={index}
                      href={pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors group"
                    >
                      <FileText className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground">
                        Document {index + 1}.pdf
                      </span>
                    </a>
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