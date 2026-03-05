import { useEffect, useState, useRef } from "react";
import { aboutParagraphs, contactLinks, projects } from "./data/content";
import InteractiveGrid from "./InteractiveGrid";
import TechShowcase from "./TechShowcase";
import ParticleNetwork from "./ParticleNetwork";

const SECTIONS = ["about", "projects", "contact"];

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const MagneticNavLink = ({ href, active, children }) => {
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate distance from center (magnetic strength)
    const moveX = (x - rect.width / 2) * 0.05; // 0.2 = 20% movement (subtler)
    const moveY = (y - rect.height / 2) * 0.05;

    button.style.transition = 'none';
    button.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;

    // Restore CSS transitions and reset position
    button.style.transition = '';
    button.style.transform = `translate(0px, 0px)`;
  };

  return (
    <div
      className="nav-link-container"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button
        style={{ border: 'none', background: 'none' }}
        className={`nav-link ${active ? "active" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', href);
          }
        }}
        ref={buttonRef}
      >
        {children}
      </button>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      // Find the current active section
      for (const section of SECTIONS.reverse()) { // Reverse to check bottom sections first
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          SECTIONS.reverse(); // Restore original order
          return;
        }
      }
      SECTIONS.reverse(); // Restore original order
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const highlightedProjects = projects.slice(0, 2);

  return (
    <div className="page">
      <ParticleNetwork />
      {/* <InteractiveGrid /> */}
      <div className="glow-container">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
      </div>

      <nav className="top-nav animate-in" aria-label="Primary">
        <MagneticNavLink href="#about" active={activeSection === "about"}>
          About
        </MagneticNavLink>
        <MagneticNavLink href="#projects" active={activeSection === "projects"}>
          Projects
        </MagneticNavLink>
        <MagneticNavLink href="#contact" active={activeSection === "contact"}>
          Contact
        </MagneticNavLink>
      </nav>

      <header className="hero animate-in delay-1">
        <div className="eyebrow">
          <span className="blink">_</span>
          System.out.println("Portfolio")
        </div>
        <h1>
          Hi, I am <span className="name-highlight">Lehi Gracia</span>.
        </h1>
        <p className="lead">
          I build practical software products that blend security, performance, and usability so technology feels effortless for users.
        </p>
      </header>

      <main className="page-content delay-2">
        <div className="fade-in-section">
          {/* ABOUT SECTION */}
          <section className="panel" id="about" style={{ scrollMarginTop: '100px' }}>
            <h2>A Little Bit About Me</h2>
            <div className="about-content">
              {aboutParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          <TechShowcase />

          {/* FEATURED CODE MOVED UNDER ALL PROJECTS OR REMOVED? 
              Since "All Projects" includes everything, we can just show "All Projects"
              as the projects section, filtering out the need for two separate project views 
              on a single-page scrolling architecture. */}

          {/* PROJECTS SECTION */}
          <section className="panel" id="projects" style={{ scrollMarginTop: '100px' }}>
            <h2>Engineering Projects</h2>
            <div className="grid">
              {projects.map((project, i) => (
                <article key={i} className="card slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="card-tech-corners" />
                  {project.image && (
                    <div className="card-image-wrapper">
                      <img src={project.image} alt={project.title} className="card-image" />
                      <div className="card-image-overlay" />
                    </div>
                  )}
                  <div className="card-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <a href={project.url} className="card-link" target="_blank" rel="noreferrer">
                        View Source <ExternalLinkIcon />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section className="panel contact-panel" id="contact" style={{ scrollMarginTop: '100px' }}>
            <h2>Initiate Connection</h2>
            <p className="lead" style={{ margin: '0 auto' }}>
              Open to opportunities in backend engineering, data science, and full-stack development.
            </p>
            <p className="lead" style={{ margin: '0 auto 2.5rem' }}>
              Let's build something remarkable together.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              {contactLinks.map((link, index) => (
                <a
                  key={link.label}
                  className={`btn ${index === 0 ? "btn-primary" : "btn-ghost"}`}
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"}
                >
                  {link.label} {index === 0 && <ArrowRightIcon />}
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
