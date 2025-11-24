import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const ElegantLightTheme = () => {
  return (
    <div className="bg-white text-gray-700 font-serif">
      <style jsx>{`
        .title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }
        .subtitle {
          font-family: 'Lato', sans-serif;
          font-size: 1.2rem;
          font-weight: 300;
          text-align: center;
          margin-bottom: 3rem;
          color: #777;
        }
        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        @media (min-width: 768px) {
          .title {
            font-size: 4rem;
            margin-bottom: 2rem;
          }
          .subtitle {
            font-size: 1.5rem;
            margin-bottom: 4rem;
          }
          .section-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <header>
          <h1 className="title">Portfolio</h1>
          <h2 className="subtitle">A Curated Collection of Work</h2>
        </header>
        <div className="flex flex-wrap -mx-4">
          <aside className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
            <div className="sticky top-8">
              <section id="about" className="mb-8">
                <h3 className="section-title">About</h3>
                <About />
              </section>
              <section id="contact">
                <h3 className="section-title">Contact</h3>
                <Contact />
              </section>
            </div>
          </aside>
          <main className="w-full md:w-2/3 px-4">
            <section id="education" className="mb-12">
              <h3 className="section-title text-center">Education</h3>
              <Education />
            </section>
            <section id="experience" className="mb-12">
              <h3 className="section-title text-center">Experience</h3>
              <Experience />
            </section>
            <section id="projects">
              <h3 className="section-title text-center">Projects</h3>
              <Projects />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ElegantLightTheme;
