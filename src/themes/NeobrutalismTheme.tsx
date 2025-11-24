import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";

const NeobrutalismTheme = () => {
  return (
    <div className="bg-[#1A1A2E] text-[#E0E0E0] min-h-screen">
      <style>{`
        .neobrutalism-section {
          border: 3px solid #00F0FF; /* Electric blue border */
          margin-bottom: 2.5rem;
          padding: 2rem;
          box-shadow: 10px 10px 0px #FF00FF, 15px 15px 0px #00F0FF; /* Dual colored offset shadow */
          transition: all 0.2s ease-out;
          position: relative;
          overflow: hidden;
          background-color: rgba(0,0,0,0.4); /* Semi-transparent background */
        }
        .neobrutalism-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(0,240,255,0.1), rgba(255,0,255,0.1));
            z-index: -1;
            opacity: 0.3;
        }
        .neobrutalism-section:hover {
          box-shadow: 12px 12px 0px #FF00FF, 18px 18px 0px #00F0FF;
          transform: translate(-3px, -3px);
          border-color: #FF00FF; /* Border color changes on hover */
        }
        .neobrutalism-section h2 {
            color: #00F0FF; /* Electric blue heading */
            text-shadow: 2px 2px #FF00FF;
        }
        .neobrutalism-section p {
            color: #B0B0B0;
        }
      `}</style>
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <section id="about" className="neobrutalism-section">
          <h2 className="text-4xl font-extrabold mb-6">About_Me //</h2>
          <About />
        </section>

        <SectionDivider />

        <section id="education" className="neobrutalism-section">
          <h2 className="text-4xl font-extrabold mb-6">Education_Log //</h2>
          <Education />
        </section>

        <SectionDivider />

        <section id="experience" className="neobrutalism-section">
          <h2 className="text-4xl font-extrabold mb-6">Experience_Path //</h2>
          <Experience />
        </section>

        <SectionDivider />

        <section id="projects" className="neobrutalism-section">
          <h2 className="text-4xl font-extrabold mb-6">Projects_Matrix //</h2>
          <Projects />
        </section>

        <SectionDivider />

        <section id="contact" className="neobrutalism-section">
          <h2 className="text-4xl font-extrabold mb-6">Contact_Console //</h2>
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default NeobrutalismTheme;