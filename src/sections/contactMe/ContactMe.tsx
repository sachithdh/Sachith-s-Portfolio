import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactMe.css";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { label: "GitHub", href: "https://www.github.com/sachithdh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sachithdh/" },
  { label: "Twitter", href: "https://twitter.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "Dribbble", href: "https://dribbble.com/" },
  { label: "Medium", href: "https://medium.com/" },
];

const ContactMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 80, skewY: 4 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
        "-=0.4"
      )
      .fromTo(
        ".cm-social-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.2"
      );
  }, []);

  return (
    <section className="cm-section" id="contact" ref={sectionRef}>
      {/* Decorative noise/grain overlay */}
      <div className="cm-bg-noise" />

      {/* Ambient glows */}
      <div className="cm-glow cm-glow--left" />
      <div className="cm-glow cm-glow--right" />

      <div className="cm-container">
        {/* Big heading */}
        <div className="cm-heading-wrap">
          <h2 className="cm-heading" ref={headingRef}>
            GET IN TOUCH
          </h2>
        </div>

        {/* Subtitle */}
        <p className="cm-subtitle" ref={subtitleRef}>
          LOOKING FOR A DEVELOPER? JUST GET IN TOUCH.
        </p>

        {/* CTA Button */}
        <a
          href="mailto:sachithdhanushka@gmail.com"
          className="cm-btn"
          ref={btnRef}
        >
          <span className="cm-btn-text">Contact Me</span>
          <span className="cm-btn-shimmer" />
        </a>

        {/* Divider */}
        <div className="cm-divider">
          <span className="cm-divider-label">FOLLOW ALL MY ACCOUNTS</span>
        </div>

        {/* Social links grid */}
        <div className="cm-social-grid" ref={linksRef}>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="cm-social-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cm-social-label">{link.label}</span>
              <span className="cm-social-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="cm-footer-strip">
        <span className="cm-footer-text">
          Sachith Dhanushka &nbsp;·&nbsp; Full Stack Developer &nbsp;·&nbsp;{" "}
          {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
};

export default ContactMe;
