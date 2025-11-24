import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";
import { useEffect } from "react";

const GlassmorphismTheme = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-glass-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".glass-section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-gray-100 min-h-screen font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('/placeholder.svg')", backgroundSize: 'cover', backgroundAttachment: 'fixed', filter: 'blur(5px)' }}></div>
      <style>{`
        @keyframes glassFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-glass-fade-in {
          animation: glassFadeIn 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .glass-section {
          opacity: 0;
          background: rgba(255, 255, 255, 0.08); /* More subtle background */
          backdrop-filter: blur(20px); /* Increased blur */
          -webkit-backdrop-filter: blur(20px);
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.15); /* Refined border */
          padding: 2.5rem; /* Slightly more padding */
          margin-bottom: 4rem;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); /* Stronger, colored shadow */
          transition: all 0.3s ease-in-out;
        }
        .glass-section:hover {
          border: 1px solid rgba(135, 206, 235, 0.4); /* Subtle hover border glow */
          transform: translateY(-8px) scale(1.01);
        }
        .glass-title {
          text-shadow: 0 0 10px rgba(135, 206, 235, 0.6); /* Title glow */
        }
      `}</style>
      <div className="container mx-auto px-4 py-16 relative z-10 max-w-6xl">
        <section id="about" className="glass-section">
          <h2 className="text-4xl font-bold mb-8 text-center glass-title">About Me</h2>
          <About />
        </section>

        <SectionDivider />

        <section id="education" className="glass-section">
          <h2 className="text-4xl font-bold mb-8 text-center glass-title">Education</h2>
          <Education />
        </section>

        <SectionDivider />

        <section id="experience" className="glass-section">
          <h2 className="text-4xl font-bold mb-8 text-center glass-title">Experience</h2>
          <Experience />
        </section>

        <SectionDivider />

        <section id="projects" className="glass-section">
          <h2 className="text-4xl font-bold mb-8 text-center glass-title">Projects</h2>
          <Projects />
        </section>

        <SectionDivider />

        <section id="contact" className="glass-section">
          <h2 className="text-4xl font-bold mb-8 text-center glass-title">Contact</h2>
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default GlassmorphismTheme;