import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const BrutalistTheme = () => {
  return (
    <div className="bg-yellow-300 text-black font-mono relative overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap');
        
        .brutalist-title {
          font-family: 'Rubik Glitch', sans-serif;
          font-size: 2.5rem;
          text-align: center;
          padding: 1rem;
        }
        .brutalist-content {
          padding: 1rem;
          background: #fff;
          border: 4px solid black;
        }
        .brutalist-nav {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          background: #0ff;
          padding: 1rem;
          border: 4px solid black;
          margin-bottom: 1rem;
        }
        .brutalist-section {
          padding: 2rem 0;
          border-bottom: 4px solid black;
        }
        .brutalist-section:last-child {
          border-bottom: none;
        }

        @media (min-width: 768px) {
          .brutalist-title {
            font-size: 5rem;
            position: absolute;
            top: 2rem;
            left: 2rem;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            transform: rotate(180deg);
            padding: 0;
            border: none;
          }
          .brutalist-content {
            margin-left: 10rem;
            padding: 2rem;
            border-left: 10px solid #f0f;
          }
          .brutalist-nav {
            position: absolute;
            top: 2rem;
            right: 2rem;
            flex-direction: column;
            margin-bottom: 0;
          }
        }
      `}</style>
      <header>
        <h1 className="brutalist-title">Portfolio</h1>
        <nav className="brutalist-nav">
          <a href="#about">About</a>
          <a href="#education">Edu</a>
          <a href="#experience">Exp</a>
          <a href="#projects">Proj</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main className="brutalist-content">
        <section id="about" className="brutalist-section">
          <About />
        </section>
        <section id="education" className="brutalist-section">
          <Education />
        </section>
        <section id="experience" className="brutalist-section">
          <Experience />
        </section>
        <section id="projects" className="brutalist-section">
          <Projects />
        </section>
        <section id="contact" className="brutalist-section">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default BrutalistTheme;
