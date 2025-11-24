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
          font-size: 2rem;
          font-weight: 200;
          text-align: center;
          margin-bottom: 2rem;
          color: #fff;
        }
        @media (min-width: 768px) {
          .section-title {
            font-size: 3rem;
            margin-bottom: 4rem;
          }
        }
      `}</style>
      <div className="minimalist-dark-theme max-w-3xl mx-auto px-4 py-8 md:px-8 md:py-16">
        <section id="about" className="py-8 md:py-16 text-center">
          <h2 className="section-title">About</h2>
          <About />
        </section>
        <section id="education" className="py-8 md:py-16 text-center">
          <h2 className="section-title">Education</h2>
          <Education />
        </section>
        <section id="experience" className="py-8 md:py-16 text-center">
          <h2 className="section-title">Experience</h2>
          <Experience />
        </section>
        <section id="projects" className="py-8 md:py-16 text-center">
          <h2 className="section-title">Projects</h2>
          <Projects />
        </section>
        <section id="contact" className="py-8 md:py-16 text-center">
          <h2 className="section-title">Contact</h2>
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default MinimalistDarkTheme;
