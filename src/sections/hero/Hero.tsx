import "./Hero.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LuArrowUpRight, LuBookOpen } from "react-icons/lu";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useBlogPosts } from "../blog/useBlogPosts";
import HeroVortex from "./HeroVortex";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDMARK = "SACHITH";

const techStack = [
  "React",
  "Node.js",
  "Nest.js",
  "Spring Boot",
  "Next.js",
  "TypeScript",
  "Java",
  "Docker",
  "AWS",
  "Supabase",
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [latestPost] = useBlogPosts();

  // GSAP entrance: wordmark letters rise in one by one, then the copy reveals,
  // followed by a scroll-driven exit
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions!.reduceMotion) return;

          const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
          // The spiral runs its own reveal wave, so only the copy is staged here
          intro
            .fromTo(
              ".hero-wordmark__letter",
              { yPercent: 60, opacity: 0, filter: "blur(12px)" },
              {
                yPercent: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.1,
                stagger: 0.07,
              },
              0.2,
            )
            .fromTo(
              "[data-hero-reveal]",
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
              },
              "-=0.6",
            );

          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            })
            .to(".hero-copy", { y: -120, opacity: 0, duration: 1 }, 0)
            .to(".hero-vortex", { opacity: 0, duration: 1 }, 0);
        },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="hero" id="hero" ref={heroRef}>
        <HeroVortex />

        <div className="hero-copy">
          <div className="hero-copy__glow" aria-hidden="true" />

          <div className="hero-wordmark">
            <div className="hero-wordmark__blur" aria-hidden="true" />
            <h1 className="hero-wordmark__text" aria-label={WORDMARK}>
              {WORDMARK.split("").map((letter, i) => (
                <span
                  key={i}
                  className="hero-wordmark__letter"
                  aria-hidden="true"
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          <h2 className="hero-title" data-hero-reveal>
            Software engineer{" "}
            <span className="hero-title__serif">& CS undergrad.</span>
          </h2>

          <p className="hero-lede" data-hero-reveal>
            I design and build reliable, scalable software, from full-stack web
            apps to cloud-backed platforms.
          </p>

          <div className="hero-actions" data-hero-reveal>
            <Link to="/blog" className="hero-btn hero-btn--solid">
              <LuBookOpen size={16} />
              Read my blog
            </Link>
            <a href="#projects" className="hero-btn hero-btn--outline">
              View projects
            </a>
          </div>

          <div className="hero-meta" data-hero-reveal>
            {latestPost && (
              <Link to={`/blog/${latestPost.slug}`} className="hero-meta__item">
                <LuArrowUpRight size={14} />
                <span className="hero-meta__clamp">
                  Latest: {latestPost.title}
                </span>
              </Link>
            )}
            <a
              href="https://www.github.com/sachithdh"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-meta__item"
            >
              <FaGithub size={14} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sachithdh/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-meta__item"
            >
              <FaLinkedin size={14} />
              LinkedIn
            </a>
            <a href="mailto:sachith.devx@gmail.com" className="hero-meta__item">
              <MdOutlineEmail size={15} />
              Email
            </a>
          </div>
        </div>
      </section>

      <div className="hero-marquee" aria-label="Tech stack">
        {[0, 1].map((track) => (
          <ul
            key={track}
            className="hero-marquee__track"
            aria-hidden={track === 1 || undefined}
          >
            {techStack.map((tech) => (
              <li key={tech} className="hero-marquee__item">
                <span className="hero-marquee__dot" aria-hidden="true">
                  ▪
                </span>
                {tech}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
};

export default Hero;
