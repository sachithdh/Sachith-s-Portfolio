import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactMe.css";

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
  { text: "LET'S CONNECT", style: "filled" },
  { text: "✦", style: "sep" },
  { text: "LET'S CONNECT", style: "outline" },
  { text: "✦", style: "sep" },
  { text: "LET'S CONNECT", style: "filled" },
  { text: "✦", style: "sep" },
  { text: "LET'S CONNECT", style: "outline" },
  { text: "✦", style: "sep" },
  { text: "LET'S CONNECT", style: "filled" },
  { text: "✦", style: "sep" },
  { text: "LET'S CONNECT", style: "outline" },
  { text: "✦", style: "sep" },
];

const MarqueeList = () => (
  <>
    {MARQUEE_ITEMS.map((item, i) => (
      <span
        key={i}
        className={`cm-marquee-item cm-marquee-item--${item.style}`}
      >
        {item.text}
      </span>
    ))}
  </>
);

const MarqueeBanner = () => {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tracks = [
      { el: track1Ref.current, dir: -1, x: 0 }, // scrolls left
      { el: track2Ref.current, dir: 1, x: 0 }, // scrolls right
    ];

    // place right-moving track at half-width so the seam is invisible
    tracks.forEach((t) => {
      if (t.el && t.dir === 1) t.x = -t.el.scrollWidth / 2;
    });

    const baseSpeed = 0.6; // px per frame
    let boost = 0;

    // Scrolling the page kicks the marquee forward, then it eases back
    const velocityTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        boost = Math.max(boost, Math.min(Math.abs(self.getVelocity()) / 150, 12));
      },
    });

    const tick = () => {
      const speed = baseSpeed * (1 + boost);
      boost *= 0.94;

      tracks.forEach((t) => {
        if (!t.el) return;
        t.x += t.dir * speed;
        const half = t.el.scrollWidth / 2;
        // reset seamlessly when one full copy has scrolled past
        if (t.dir === -1 && t.x <= -half) t.x += half;
        if (t.dir === 1 && t.x >= 0) t.x -= half;
        gsap.set(t.el, { x: t.x });
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      velocityTrigger.kill();
    };
  }, []);

  return (
    <div className="cm-marquee-banner">
      {/* edge gradient masks */}
      <div className="cm-marquee-fade cm-marquee-fade--left" />
      <div className="cm-marquee-fade cm-marquee-fade--right" />

      {/* Track 1 — scrolls left */}
      <div className="cm-marquee-row">
        <div className="cm-marquee-track" ref={track1Ref}>
          <MarqueeList />
          <MarqueeList />
        </div>
      </div>

      {/* Track 2 — scrolls right */}
      <div className="cm-marquee-row">
        <div className="cm-marquee-track" ref={track2Ref}>
          <MarqueeList />
          <MarqueeList />
        </div>
      </div>
    </div>
  );
};

const socialLinks = [
  { label: "GitHub", href: "https://www.github.com/sachithdh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sachithdh/" },
  { label: "X", href: "https://x.com/_Sachith__" },
  { label: "Instagram", href: "https://www.instagram.com/sachee.10" },
];

const ContactMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // The giant heading drifts up and tightens slightly as you scroll on
      gsap.fromTo(
        ".cm-heading-wrap",
        { yPercent: 30, scale: 1.06 },
        {
          yPercent: -10,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 0.8,
          },
        }
      );

      gsap.from(".cm-divider", {
        opacity: 0,
        scaleX: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cm-divider", start: "top 90%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cm-section" id="contact" ref={sectionRef}>
      {/* Decorative noise/grain overlay */}
      <div className="cm-bg-noise" />

      {/* Ambient glows */}
      <div className="cm-glow cm-glow--left" />
      <div className="cm-glow cm-glow--right" />

      {/* ── Infinite Marquee Banner ── */}
      <MarqueeBanner />

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
          href="mailto:sachith.devx@gmail.com"
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
          Sachith Dhanushka &nbsp;·&nbsp; Software Engineer &nbsp;·&nbsp;{" "}
          {new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
};

export default ContactMe;
