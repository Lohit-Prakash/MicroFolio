import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";

const CorporateCleanTheme = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black text-gray-200 font-sans leading-relaxed min-h-screen">
      <style>{`
        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .corporate-clean-section {
          background-color: rgba(30, 30, 30, 0.7); /* Darker, semi-transparent background */
          border-radius: 10px; /* Slightly more rounded */
          padding: 2.5rem;
          margin-bottom: 3rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(70, 70, 70, 0.5); /* Deeper shadow with subtle border */
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          opacity: 0; /* Initial state for animation */
          animation: fadeInSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .corporate-clean-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px; /* Glowing accent bar */
          height: 100%;
          background: linear-gradient(to bottom, #00C6FF, #0072FF);
          box-shadow: 0 0 10px #00C6FF;
          transition: width 0.3s ease;
        }
        .corporate-clean-section:hover::before {
          width: 10px; /* Thicker bar on hover */
        }
        .corporate-clean-section:hover {
          transform: translateY(-8px); /* More pronounced lift */
          box-shadow: 0 15px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(0, 114, 255, 0.7); /* Enhanced shadow and accent border */
        }
        .corporate-clean-section h2 {
          color: #00C6FF; /* Bright accent color for headings */
          font-weight: 700;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(0, 198, 255, 0.3); /* Subtle accent line */
          padding-bottom: 0.8rem;
          letter-spacing: 0.05em; /* Slightly increased letter spacing */
        }
        .corporate-clean-section p {
          color: #B0B0B0;
        }
      `}</style>
      <div className="container mx-auto px-8 py-16 max-w-6xl">
        <section id="about" className="corporate-clean-section">
          <h2 className="text-3xl">About_Client</h2>
          <About />
        </section>

        <SectionDivider />

        <section id="education" className="corporate-clean-section">
          <h2 className="text-3xl">Education_Profile</h2>
          <Education />
        </section>

        <SectionDivider />

        <section id="experience" className="corporate-clean-section">
          <h2 className="text-3xl">Experience_Record</h2>
          <Experience />
        </section>

        <SectionDivider />

        <section id="projects" className="corporate-clean-section">
          <h2 className="text-3xl">Projects_Portfolio</h2>
          <Projects />
        </section>

        <SectionDivider />

        <section id="contact" className="corporate-clean-section">
          <h2 className="text-3xl">Contact_Hub</h2>
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default CorporateCleanTheme;