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
      <div className="container mx-auto px-4 py-8">
        <header className="md:hidden mb-8">
          <h1 className="text-4xl font-bold text-white text-center">Navigation</h1>
          <nav className="flex justify-center gap-4 mt-4">
            <a href="#about" className="text-lg text-white hover:text-red-500">About</a>
            <a href="#education" className="text-lg text-white hover:text-red-500">Education</a>
            <a href="#experience" className="text-lg text-white hover:text-red-500">Experience</a>
            <a href="#projects" className="text-lg text-white hover:text-red-500">Projects</a>
            <a href="#contact" className="text-lg text-white hover:text-red-500">Contact</a>
          </nav>
        </header>
        <div className="flex flex-wrap -mx-4">
          <aside className="hidden md:block w-full md:w-1/4 px-4">
            <div className="sticky top-8">
              <section id="about" className="py-8">
                <About />
              </section>
              <section id="education" className="py-8">
                <Education />
              </section>
            </div>
          </aside>
          <main className="w-full md:w-1/2 px-4">
            <div className="flex flex-col items-center justify-center bg-black/70 p-8 border-x-4 border-red-500 min-h-screen">
              <h1 className="text-5xl font-bold text-white mb-8">Navigation</h1>
              <nav className="flex flex-col gap-4 text-center">
                <a href="#about" className="text-2xl text-white hover:text-red-500">About</a>
                <a href="#education" className="text-2xl text-white hover:text-red-500">Education</a>
                <a href="#experience" className="text-2xl text-white hover:text-red-500">Experience</a>
                <a href="#projects" className="text-2xl text-white hover:text-red-500">Projects</a>
                <a href="#contact" className="text-2xl text-white hover:text-red-500">Contact</a>
              </nav>
            </div>
          </main>
          <aside className="hidden md:block w-full md:w-1/4 px-4">
            <div className="sticky top-8">
              <section id="experience" className="py-8">
                <Experience />
              </section>
              <section id="projects" className="py-8">
                <Projects />
              </section>
              <section id="contact" className="py-8">
                <Contact />
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkTheme;