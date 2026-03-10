import "./SynthEraHero.css";
import { useState, useEffect, useRef } from "react";
import SocialLinks from "../../components/socialLinks/SocialLinks";
import gsap from "gsap";
const SynthEraHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

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

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
    )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".tech-card",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".role-card-absolute",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".social-links",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      );
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
            <a href="/blog">Blog</a>
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
          <h1 className="headline" ref={headlineRef}>
            <span className="headline-armor">SACHITH</span>
          </h1>
          <p className="tagline" ref={taglineRef}>
            Building the future.
          </p>
          {/* Call-to-action buttons */}
          <div className="cta-group" ref={ctaRef}>
            <a href="#projects" className="see-more-btn">
              View Projects
              <span className="btn-arrow">→</span>
            </a>
          </div>
          <div className="scroll-indicator">
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
              <rect x="1" y="1" width="18" height="28" rx="9" strokeWidth="2" />
              <circle cx="10" cy="10" r="3" />
            </svg>
            <span>Explore more</span>
          </div>
        </div>
        <div className="social-links">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
};

export default SynthEraHero;
