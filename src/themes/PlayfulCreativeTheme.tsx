import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";

const PlayfulCreativeTheme = () => {
  return (
    <div className="bg-[#12002b] text-[#E0E0E0] font-sans min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.15%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2013V0h13L0%2013zm0%2047L0%2047h13L0%2060zm47%200L47%2047h13L60%2060zm0-47L47%200h13L60%2013z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')`,
          backgroundRepeat: 'repeat',
        }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Orbitron:wght@400;700&display=swap');
        .playful-creative-section {
          background: linear-gradient(145deg, rgba(255, 0, 150, 0.2), rgba(0, 255, 255, 0.2));
          border-radius: 40px 10px 40px 10px; /* More dynamic shape */
          padding: 3rem;
          margin-bottom: 3.5rem;
          box-shadow: 
            0 0 15px rgba(255, 0, 150, 0.5), /* Neon pink glow */
            0 0 30px rgba(0, 255, 255, 0.5), /* Neon cyan glow */
            8px 8px 0px #FF007B, /* Stronger offset shadow */
            16px 16px 0px #00FFFF; /* Second offset shadow */
          transform: rotate(0deg); /* Reset initial rotation */
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce transition */
          border: 2px solid #FF007B;
          position: relative;
          z-index: 1;
        }
        .playful-creative-section:hover {
          transform: translateY(-8px) rotate(2deg) scale(1.02); /* More playful hover */
          box-shadow: 
            0 0 25px rgba(255, 0, 150, 0.7), 
            0 0 45px rgba(0, 255, 255, 0.7),
            12px 12px 0px #FF007B, 
            20px 20px 0px #00FFFF;
          border-color: #00FFFF;
        }
        .playful-creative-section h2 {
          font-family: 'Orbitron', sans-serif; /* Futuristic font */
          color: #00FFFF;
          font-size: 2.8rem;
          text-shadow: 0 0 10px #FF007B, 0 0 20px #00FFFF; /* Dual neon text shadow */
          margin-bottom: 2.2rem;
        }
        .playful-creative-section p {
          line-height: 1.9;
          color: #C0C0C0;
        }
      `}</style>
      <div className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
        <section id="about" className="playful-creative-section">
          <h2 className="text-center">About:Circuit</h2>
          <About />
        </section>

        <SectionDivider />

        <section id="education" className="playful-creative-section">
          <h2 className="text-center">Education:Schematics</h2>
          <Education />
        </section>

        <SectionDivider />

        <section id="experience" className="playful-creative-section">
          <h2 className="text-center">Experience:Timeline</h2>
          <Experience />
        </section>

        <SectionDivider />

        <section id="projects" className="playful-creative-section">
          <h2 className="text-center">Projects:Gallery</h2>
          <Projects />
        </section>

        <SectionDivider />

        <section id="contact" className="playful-creative-section">
          <h2 className="text-center">Contact:Node</h2>
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default PlayfulCreativeTheme;
