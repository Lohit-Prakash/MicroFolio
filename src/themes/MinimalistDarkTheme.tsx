import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const MinimalistDarkTheme = () => {
  return (
    <div className="bg-gray-900 text-gray-400 font-light font-sans">
      <style>{`
        .minimalist-dark-theme a {
          color: #d4af37;
          text-decoration: none;
          border-bottom: 1px solid #d4af37;
          transition: color 0.3s, border-bottom 0.3s;
        }
        .minimalist-dark-theme a:hover {
          color: #fff;
          border-bottom: 1px solid #fff;
        }
        .section-title {
          font-size: 3rem;
          font-weight: 200;
          text-align: center;
          margin-bottom: 4rem;
          color: #fff;
        }
      `}</style>
      <div className="minimalist-dark-theme max-w-3xl mx-auto px-8 py-24">
        <div id="about" className="py-16 text-center">
          <h2 className="section-title">About</h2>
          <About />
        </div>
        <div id="education" className="py-16 text-center">
          <h2 className="section-title">Education</h2>
          <Education />
        </div>
        <div id="experience" className="py-16 text-center">
          <h2 className="section-title">Experience</h2>
          <Experience />
        </div>
        <div id="projects" className="py-16 text-center">
          <h2 className="section-title">Projects</h2>
          <Projects />
        </div>
        <div id="contact" className="py-16 text-center">
          <h2 className="section-title">Contact</h2>
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default MinimalistDarkTheme;
