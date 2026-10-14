import "./SynthEraHero.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LuExternalLink } from "react-icons/lu";
import SocialLinks from "../../components/socialLinks/SocialLinks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SynthEraHero = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

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

  // GSAP entrance animations, followed by scroll-driven exit
  useEffect(() => {
    const ctx = gsap.context(() => {
      const setupScrollEffect = () => {
        const mm = gsap.matchMedia();

        mm.add(
          {
            isDesktop: "(min-width: 1025px)",
            reduceMotion: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const { isDesktop, reduceMotion } = context.conditions!;
            if (reduceMotion) return;

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });

            // Headline drifts down slower than the page, grows and blurs out
            tl.to(
              headlineRef.current,
              {
                yPercent: 60,
                scale: isDesktop ? 1.15 : 1.05,
                opacity: 0,
                filter: "blur(8px)",
                duration: 1,
                ease: "power1.in",
              },
              0,
            )
              // Tagline + CTA lift away faster than the headline
              .to(subRef.current, { y: -80, opacity: 0, duration: 0.5 }, 0)
              .to(".scroll-indicator", { opacity: 0, duration: 0.15 }, 0);

            if (isDesktop) {
              tl.to(".tech-card", { x: -80, opacity: 0, duration: 0.6 }, 0).to(
                ".social-links",
                { x: 80, opacity: 0, duration: 0.6 },
                0,
              );
            }
          },
        );
      };

      const tl = gsap.timeline({
        onComplete: () => ctx.add(setupScrollEffect),
      });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" },
      )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".tech-card",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          ".social-links",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Calculate 3D transform values based on mouse position
  const getTransformStyle = () => {
    const moveX = (mousePosition.x - 0.5) * 100; // Max 20px movement
    const moveY = (mousePosition.y - 0.5) * 100; // Max 20px movement
    return {
      transform: `translate(${moveX}px, ${moveY}px) scale(1.05)`,
    };
  };

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg" style={getTransformStyle()}>
        {/* <video
          className="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/videos/bg.mp4" type="video/mp4" />
        </video> */}
        <div className="hero-bg-overlay"></div>
      </div>
      {/* Main Content */}
      <div className="content" id="content">
        {/* Tech Stack Card - Absolute Position */}
        <div className="tech-card card-absolute">
          <h3 className="card-title">TECH STACK</h3>
          <p className="card-description">{techStack.join(" • ")}</p>
        </div>

        {/* Center Content */}
        <div className="center">
          <h1 className="headline" ref={headlineRef}>
            <span className="headline-armor">SACHITH</span>
          </h1>
          <div className="hero-sub" ref={subRef}>
            <p className="tagline" ref={taglineRef}>
              Computer Science Undergraduate.
            </p>
            {/* Call-to-action buttons */}
            <div className="cta-group" ref={ctaRef}>
              {/* <a href="#projects" className="see-more-btn">
                View Projects
                <span className="btn-arrow">→</span>
              </a> */}
              <button className="blog-cta-btn" onClick={() => navigate("/blog")}>
                READ MY BLOG
                <LuExternalLink size={16} className="blog-cta-icon" />
              </button>
            </div>
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
