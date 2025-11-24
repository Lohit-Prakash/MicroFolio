import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";

const MinimalistCleanTheme = () => (
  <div className="bg-white text-gray-800">
    <section id="about" className="scroll-mt-20">
      <About />
    </section>

    <SectionDivider />

    <section id="education" className="scroll-mt-20">
      <Education />
    </section>

    <SectionDivider />

    <section id="experience" className="scroll-mt-20">
      <Experience />
    </section>

    <SectionDivider />

    <section id="projects" className="scroll-mt-20">
      <Projects />
    </section>

    <SectionDivider />

    <section id="contact" className="scroll-mt-20">
      <Contact />
    </section>
  </div>
);

export default MinimalistCleanTheme;
