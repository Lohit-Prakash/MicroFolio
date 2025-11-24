import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const CyberpunkTheme = () => {
  return (
    <div className="bg-black text-red-500 font-mono" style={{
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("https://www.transparenttextures.com/patterns/carbon-fibre.png")',
      textShadow: '0 0 2px #f00, 0 0 5px #f00, 0 0 10px #f00',
    }}>
      <div className="flex min-h-screen">
        <div className="w-1/4 p-8">
          <div id="about" className="py-8">
            <About />
          </div>
          <div id="education" className="py-8">
            <Education />
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center bg-black/70 p-8 border-x-4 border-red-500">
          <h1 className="text-5xl font-bold text-white mb-8">Navigation</h1>
          <nav className="flex flex-col gap-4 text-center">
            <a href="#about" className="text-2xl text-white hover:text-red-500">About</a>
            <a href="#education" className="text-2xl text-white hover:text-red-500">Education</a>
            <a href="#experience" className="text-2xl text-white hover:text-red-500">Experience</a>
            <a href="#projects" className="text-2xl text-white hover:text-red-500">Projects</a>
            <a href="#contact" className="text-2xl text-white hover:text-red-500">Contact</a>
          </nav>
        </div>
        <div className="w-1/4 p-8">
          <div id="experience" className="py-8">
            <Experience />
          </div>
          <div id="projects" className="py-8">
            <Projects />
          </div>
          <div id="contact" className="py-8">
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkTheme;