import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";

const DarkGlowTheme = () => (
  <div className="bg-gray-900 text-white">
    <div className="container mx-auto px-4 py-8">
      <section id="about" className="scroll-mt-20">
        <div className="p-8 rounded-lg shadow-lg bg-gray-800 border border-cyan-500/50">
          <About />
        </div>
      </section>

      <SectionDivider />

      <section id="education" className="scroll-mt-20">
        <div className="p-8 rounded-lg shadow-lg bg-gray-800 border border-cyan-500/50">
          <Education />
        </div>
      </section>

      <SectionDivider />

      <section id="experience" className="scroll-mt-20">
        <div className="p-8 rounded-lg shadow-lg bg-gray-800 border border-cyan-500/50">
          <Experience />
        </div>
      </section>

      <SectionDivider />

      <section id="projects" className="scroll-mt-20">
        <div className="p-8 rounded-lg shadow-lg bg-gray-800 border border-cyan-500/50">
          <Projects />
        </div>
      </section>

      <SectionDivider />

      <section id="contact" className="scroll-mt-20">
        <div className="p-8 rounded-lg shadow-lg bg-gray-800 border border-cyan-500/50">
          <Contact />
        </div>
      </section>
    </div>
  </div>
);

export default DarkGlowTheme;
