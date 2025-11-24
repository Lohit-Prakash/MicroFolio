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
      <div className="container mx-auto px-4 py-8">
        <header className="md:hidden mb-8">
          <h1 className="text-4xl font-bold text-white text-center">Menu</h1>
          <nav className="flex justify-center gap-4 mt-4">
            <a href="#about" className="text-lg text-white hover:text-cyan-300">About</a>
            <a href="#education" className="text-lg text-white hover:text-cyan-300">Education</a>
            <a href="#experience" className="text-lg text-white hover:text-cyan-300">Experience</a>
            <a href="#projects" className="text-lg text-white hover:text-cyan-300">Projects</a>
            <a href="#contact" className="text-lg text-white hover:text-cyan-300">Contact</a>
          </nav>
        </header>
        <div className="flex flex-wrap -mx-4">
          <aside className="hidden md:block w-full md:w-1/4 px-4">
            <div className="sticky top-8 bg-black/50 p-8 rounded-lg">
              <h1 className="text-4xl font-bold text-white mb-8">Menu</h1>
              <nav className="flex flex-col gap-4">
                <a href="#about" className="text-xl text-white hover:text-cyan-300">About</a>
                <a href="#education" className="text-xl text-white hover:text-cyan-300">Education</a>
                <a href="#experience" className="text-xl text-white hover:text-cyan-300">Experience</a>
                <a href="#projects" className="text-xl text-white hover:text-cyan-300">Projects</a>
                <a href="#contact" className="text-xl text-white hover:text-cyan-300">Contact</a>
              </nav>
            </div>
          </aside>
          <main className="w-full md:w-3/4 px-4">
            <section id="about" className="py-16">
              <About />
            </section>
            <section id="education" className="py-16">
              <Education />
            </section>
            <section id="experience" className="py-16">
              <Experience />
            </section>
            <section id="projects" className="py-16">
              <Projects />
            </section>
            <section id="contact" className="py-16">
              <Contact />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RetroWaveTheme;
