import { useRef, useEffect, useState } from "react";
import { LuArrowUpRight, LuCopy, LuCheck, LuMail, LuArrowUp } from "react-icons/lu";
import { useGsap, revealLines, fadeLines, EASE_OUT, REVEAL_START } from "../../utils/gsapAnimations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContactMe.css";

gsap.registerPlugin(ScrollTrigger);

const SECTION = "07";

const EMAIL = "sachith.devx@gmail.com";

const MARQUEE_ITEMS = [
  { text: "LET'S CONNECT", style: "filled" },
  { text: "▪", style: "sep" },
  { text: "LET'S CONNECT", style: "outline" },
  { text: "▪", style: "sep" },
  { text: "LET'S CONNECT", style: "filled" },
  { text: "▪", style: "sep" },
  { text: "LET'S CONNECT", style: "outline" },
  { text: "▪", style: "sep" },
  { text: "LET'S CONNECT", style: "filled" },
  { text: "▪", style: "sep" },
  { text: "LET'S CONNECT", style: "outline" },
  { text: "▪", style: "sep" },
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
  { label: "GitHub", handle: "sachithdh", href: "https://www.github.com/sachithdh" },
  { label: "LinkedIn", handle: "in/sachithdh", href: "https://www.linkedin.com/in/sachithdh/" },
  { label: "X", handle: "@_Sachith__", href: "https://x.com/_Sachith__" },
  { label: "Instagram", handle: "@sachee.10", href: "https://www.instagram.com/sachee.10" },
];

const ContactMe = () => {
  const [copied, setCopied] = useState(false);

  const sectionRef = useGsap<HTMLElement>(() => {
    gsap.from(".ac-bar, .cm-cells, .cm-foot", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      stagger: 0.12,
      ease: EASE_OUT,
      scrollTrigger: { trigger: ".ac-frame", start: REVEAL_START, once: true },
    });
    revealLines(".cm-title", ".cm-title", { duration: 1.3 });
    fadeLines(".cm-lede", ".cm-title", { delay: 0.3 });
    gsap.from(".cm-email > *, .cm-social", {
      opacity: 0,
      y: 24,
      duration: 1,
      stagger: 0.06,
      ease: "power3.out",
      scrollTrigger: { trigger: ".cm-cells", start: REVEAL_START, once: true },
    });
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="ac-section cm-section" id="contact" ref={sectionRef}>
      <MarqueeBanner />

      <div className="ac-frame">
        <div className="ac-bar">
          <span>
            <span className="ac-bar__index">07 /</span> Contact
          </span>
          <span className="ac-bar__aside">Colombo, Sri Lanka</span>
        </div>

        <div className="ac-intro">
          <h2 className="ac-title cm-title">
            Get in <em>touch.</em>
          </h2>
          <p className="ac-lede cm-lede">
            Looking for a developer? Whether it's a role, a project or just a
            question, my inbox is open.
          </p>
        </div>

        <div className="cm-cells">
          <div className="cm-email">
            <span className="ac-label ac-faint">A · Email</span>
            <a href={`mailto:${EMAIL}`} className="ac-heading cm-email__address ac-focus">
              {EMAIL}
            </a>
            <div className="cm-email__actions">
              <a href={`mailto:${EMAIL}`} className="ac-btn ac-btn--solid">
                <LuMail size={14} />
                Contact me
              </a>
              <button type="button" className="ac-btn ac-btn--outline" onClick={copyEmail}>
                {copied ? <LuCheck size={14} /> : <LuCopy size={14} />}
                {copied ? "Copied" : "Copy address"}
              </button>
            </div>
          </div>

          <div className="cm-socials">
            <span className="ac-label ac-faint cm-socials__label">B · Follow all my accounts</span>
            <ul className="cm-social-list">
              {socialLinks.map((link, i) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="cm-social ac-focus"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="ac-label ac-faint">{`${SECTION}.${i + 1}`}</span>
                    <span className="cm-social__name">{link.label}</span>
                    <span className="ac-label ac-faint cm-social__handle">{link.handle}</span>
                    <LuArrowUpRight size={16} className="cm-social__arrow" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ac-label cm-foot">
          <span>
            Sachith Dhanushka <span className="ac-faint">· Software engineer · {new Date().getFullYear()}</span>
          </span>
          <a href="#hero" className="cm-foot__top ac-focus">
            Back to top <LuArrowUp size={13} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
