import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const FuturisticHolographicTheme = () => {
  return (
    <div className="bg-black text-white font-sans" style={{
      background: 'linear-gradient(45deg, #0d1a26, #203a43, #2c5364)',
      textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0ff',
    }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <section id="about" className="holographic-panel">
            <About />
          </section>
          <section id="education" className="holographic-panel">
            <Education />
          </section>
          <section id="experience" className="holographic-panel">
            <Experience />
          </section>
          <section id="projects" className="holographic-panel md:col-span-2 lg:col-span-3">
            <Projects />
          </section>
          <section id="contact" className="holographic-panel">
            <Contact />
          </section>
        </div>
      </div>
      <style jsx>{`
        .holographic-panel {
          background: rgba(0, 100, 150, 0.2);
          border: 1px solid rgba(0, 200, 255, 0.4);
          backdrop-filter: blur(5px);
          border-radius: 10px;
          padding: 2rem;
          box-shadow: 0 0 15px rgba(0, 200, 255, 0.3);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .holographic-panel:hover {
          transform: translateY(-10px);
          box-shadow: 0 0 30px rgba(0, 200, 255, 0.6);
        }
      `}</style>
    </div>
  );
};

export default FuturisticHolographicTheme;
