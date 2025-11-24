import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const ElegantLightTheme = () => {
  return (
    <div className="bg-white text-gray-700 font-serif">
      <style>{`
        .elegant-light-theme .title {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
        }
        .elegant-light-theme .subtitle {
          font-family: 'Lato', sans-serif;
          font-size: 1.5rem;
          font-weight: 300;
          text-align: center;
          margin-bottom: 4rem;
          color: #777;
        }
        .elegant-light-theme .content-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: start;
        }
        .elegant-light-theme .sidebar {
          border-right: 1px solid #ddd;
          padding-right: 4rem;
        }
      `}</style>
      <div className="elegant-light-theme max-w-7xl mx-auto px-8 py-20">
        <h1 className="title">Portfolio</h1>
        <h2 className="subtitle">A Curated Collection of Work</h2>
        <div className="content-grid">
          <div className="sidebar">
            <div id="about" className="py-8">
              <h3 className="text-2xl font-bold mb-4">About</h3>
              <About />
            </div>
            <div id="contact" className="py-8">
              <h3 className="text-2xl font-bold mb-4">Contact</h3>
              <Contact />
            </div>
          </div>
          <div>
            <div id="education" className="py-8">
              <h3 className="text-3xl font-bold mb-8 text-center">Education</h3>
              <Education />
            </div>
            <div id="experience" className="py-8">
              <h3 className="text-3xl font-bold mb-8 text-center">Experience</h3>
              <Experience />
            </div>
            <div id="projects" className="py-8">
              <h3 className="text-3xl font-bold mb-8 text-center">Projects</h3>
              <Projects />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElegantLightTheme;
