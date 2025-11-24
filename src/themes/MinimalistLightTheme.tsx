import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";

const MinimalistLightTheme = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans min-h-screen">
      <style>{`
        .minimalist-light-section {
          background-color: #ffffff; /* Pure white background for sections */
          border-radius: 12px; /* Slightly more rounded corners */
          padding: 2.5rem;
          margin-bottom: 3.5rem; /* Increased spacing */
          box-shadow: 0 4px 15px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02); /* Refined shadow and subtle border effect */
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(220, 220, 220, 0.5); /* Very delicate border */
        }
        .minimalist-light-section:hover {
          transform: translateY(-5px); /* Subtle lift on hover */
          box-shadow: 0 8px 25px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05);
        }
        .minimalist-light-section h2 {
          color: #2c3e50; /* Slightly darker heading for impact */
          font-weight: 700; /* Bolder headings */
          margin-bottom: 1.8rem;
          border-bottom: 1px solid rgba(200, 200, 200, 0.3); /* Subtle separator */
          padding-bottom: 0.8rem;
        }
        .minimalist-light-section p {
          line-height: 1.7; /* Improved readability */
          color: #555;
        }
      `}</style>
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <section id="about" className="minimalist-light-section">
          <h2 className="text-3xl">About Me</h2>
          <About />
        </section>

        <SectionDivider />

        <section id="education" className="minimalist-light-section">
          <h2 className="text-3xl">Education</h2>
          <Education />
        </section>

        <SectionDivider />

        <section id="experience" className="minimalist-light-section">
          <h2 className="text-3xl">Experience</h2>
          <Experience />
        </section>

        <SectionDivider />

        <section id="projects" className="minimalist-light-section">
          <h2 className="text-3xl">Projects</h2>
          <Projects />
        </section>

        <SectionDivider />

        <section id="contact" className="minimalist-light-section">
          <h2 className="text-3xl">Contact</h2>
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default MinimalistLightTheme;