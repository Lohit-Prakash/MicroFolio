import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";
import { useEffect } from "react";

const SleekModernTheme = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll(".sleek-modern-section");
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
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 min-h-screen font-sans">
      <style>{`
        @keyframes fadeInScaleUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-up {
          animation: fadeInScaleUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .sleek-modern-section {
          opacity: 0;
        }
        .sleek-card {
          background: linear-gradient(145deg, rgba(30, 30, 30, 0.8), rgba(50, 50, 50, 0.8));
          border: 1px solid rgba(70, 70, 70, 0.5);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 200, 255, 0.3);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          transition: all 0.3s ease-in-out;
        }
        .sleek-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 200, 255, 0.5);
        }
      `}</style>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <section id="about" className="sleek-modern-section mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="sleek-card p-8 rounded-xl hover:translate-y-0">
              <About />
            </div>
            <div className="sleek-card p-8 rounded-xl hover:translate-y-0">
              <h3 className="text-3xl font-bold mb-4 text-blue-400">Vision & Innovation</h3>
              <p className="text-gray-300 leading-relaxed">
                A passionate developer constantly exploring cutting-edge technologies to build
                responsive, user-centric, and visually stunning web applications that push boundaries.
              </p>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="education" className="sleek-modern-section my-24 sleek-card rounded-xl hover:translate-y-0">
          <Education />
        </section>

        <SectionDivider />

        <section id="experience" className="sleek-modern-section my-24 sleek-card rounded-xl hover:translate-y-0">
          <Experience />
        </section>

        <SectionDivider />

        <section id="projects" className="sleek-modern-section my-24 sleek-card rounded-xl hover:translate-y-0">
          <Projects />
        </section>

        <SectionDivider />

        <section id="contact" className="sleek-modern-section mt-24 sleek-card rounded-xl hover:translate-y-0 max-w-3xl mx-auto">
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default SleekModernTheme;