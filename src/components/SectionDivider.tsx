import { Sparkles } from "lucide-react";

const SectionDivider = () => {
  return (
    <div className="relative py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4">
          {/* Left line */}
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-border"></div>
          
          {/* Center decoration */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          {/* Right line */}
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-border to-border"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
