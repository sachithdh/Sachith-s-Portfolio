import "./SynthEraHero.css";
import { useState, useEffect, useRef } from "react";
import RoleCard from "../RoleCard";
import SocialLinks from "../socialLinks/SocialLinks";

const SynthEraHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const techStack = ["React", "Node.js", "Nest.js", "SpringBoot", "Next.js"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculate 3D transform values based on mouse position
  const getTransformStyle = () => {
    const moveX = (mousePosition.x - 0.5) * 30; // Max 20px movement
    const moveY = (mousePosition.y - 0.5) * 30; // Max 20px movement
    return {
      transform: `translate(${moveX}px, ${moveY}px) scale(1.05)`,
    };
  };

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg" style={getTransformStyle()}></div>
      {/* Navigation */}
      <nav className="hero-nav">
        <div className="nav-brand">
          <div className="brand-icon"></div>
          <div className="brand-text">
            <span className="brand-name">Sachith</span>
            <span className="brand-name">Dhanushka</span>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#blog">Blog</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Background Text */}
      {/* <div className="bg-text">DHANUSHKA</div> */}

      {/* Main Content */}
      <div className="content">
        {/* Tech Stack Card - Absolute Position */}
        <div className="tech-card card-absolute">
          <h3 className="card-title">TECH STACK</h3>
          <p className="card-description">{techStack.join(" • ")}</p>
        </div>

        {/* Center Content - Moved Left */}
        <div className="center">
          <h1 className="headline">
            <span className="headline-armor">SACHITH</span>
          </h1>
          <p className="tagline">Building the future.</p>
          {/* Call-to-action buttons */}
          <div className="cta-group">
            <a href="#work" className="see-more-btn">
              View Projects
              <span className="btn-arrow">→</span>
            </a>
            <a
              href="/resume.pdf"
              className="see-more-btn download-btn"
              download
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Right Card - Absolute Position */}
        <div className="role-card-absolute">
          <RoleCard />
        </div>
        <div className="social-links">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
};

export default SynthEraHero;
