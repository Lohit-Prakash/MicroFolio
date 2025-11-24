import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const BrutalistTheme = () => {
  return (
    <div className="bg-yellow-300 text-black font-mono relative overflow-hidden">
      <style>{`
        @font-face {
          font-family: 'Rubik Glitch';
          src: url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap');
        }
        .brutalist-title {
          font-family: 'Rubik Glitch', sans-serif;
          font-size: 5rem;
          position: absolute;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        .brutalist-content {
          margin-left: 10rem;
          padding: 2rem;
          border-left: 10px solid #f0f;
          background: #fff;
        }
        .brutalist-nav {
          position: absolute;
          top: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #0ff;
          padding: 1rem;
          border: 4px solid black;
        }
      `}</style>
      <h1 className="brutalist-title" style={{ top: '2rem', left: '2rem' }}>Portfolio</h1>
      <nav className="brutalist-nav">
        <a href="#about">About</a>
        <a href="#education">Edu</a>
        <a href="#experience">Exp</a>
        <a href="#projects">Proj</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="brutalist-content">
        <div id="about" className="py-12">
          <About />
        </div>
        <div id="education" className="py-12">
          <Education />
        </div>
        <div id="experience" className="py-12">
          <Experience />
        </div>
        <div id="projects" className="py-12">
          <Projects />
        </div>
        <div id="contact" className="py-12">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default BrutalistTheme;
