import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const RetroWaveTheme = () => {
  return (
    <div className="bg-purple-900 text-cyan-300 font-sans" style={{
      backgroundImage: `
        linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
        repeating-linear-gradient(45deg, transparent, transparent 10px, #ff00ff 10px, #ff00ff 20px),
        repeating-linear-gradient(-45deg, transparent, transparent 10px, #00ffff 10px, #00ffff 20px)
      `,
      backgroundSize: '100% 100%, 100px 100px, 100px 100px',
      textShadow: '0 0 3px #f0f, 0 0 5px #f0f, 0 0 8px #f0f',
    }}>
      <div className="flex min-h-screen">
        <div className="w-1/4 bg-black/50 p-8">
          <h1 className="text-4xl font-bold text-white mb-8">Menu</h1>
          <nav className="flex flex-col gap-4">
            <a href="#about" className="text-xl text-white hover:text-cyan-300">About</a>
            <a href="#education" className="text-xl text-white hover:text-cyan-300">Education</a>
            <a href="#experience" className="text-xl text-white hover:text-cyan-300">Experience</a>
            <a href="#projects" className="text-xl text-white hover:text-cyan-300">Projects</a>
            <a href="#contact" className="text-xl text-white hover:text-cyan-300">Contact</a>
          </nav>
        </div>
        <div className="w-3/4 p-8">
          <div id="about" className="py-16">
            <About />
          </div>
          <div id="education" className="py-16">
            <Education />
          </div>
          <div id="experience" className="py-16">
            <Experience />
          </div>
          <div id="projects" className="py-16">
            <Projects />
          </div>
          <div id="contact" className="py-16">
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetroWaveTheme;
