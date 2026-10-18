import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useGsap,
  revealLines,
  pauseTransitions,
  EASE_OUT,
  REVEAL_START,
} from "../../utils/gsapAnimations";
import { setScrollLocked } from "../../utils/smoothScroll";
import "./FeaturedProjects.css";
import { LuArrowUpRight, LuCodeXml, LuX } from "react-icons/lu";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  codeLink: string;
  keyFeatures: string[];
  technologies: string[];
  gallery?: string[];
}

const SECTION = "04";

const projects: Project[] = [
  {
    id: 1,
    title: "LearnHub - Tutor & Student Discovery Platform",
    subtitle: "Web Platform",
    description:
      "LearnHub is a web platform designed to help independent tutors in Sri Lanka promote their classes while allowing students to discover tutors that match their learning needs. The system was built completely from scratch without using any frameworks, including a custom PHP-based MVC architecture.",
    image: "/images/projects/learnhub.png",
    codeLink: "https://github.com/sachithdh/LearnHub",
    keyFeatures: [
      "Custom-built PHP MVC framework",
      "Dependency Injection container for service management",
      "Secure authentication and middleware pipeline",
      "Course and tutor discovery system",
      "Lightweight custom template engine for fast server-side rendering",
      "Custom MySQL database abstraction layer",
      "Secure session management and route protection",
    ],
    technologies: ["PHP", "MYSQL", "NGINX", "HTML", "CSS", "JAVASCRIPT", "GIT"],
  },
  {
    id: 2,
    title: "brainMap - Project Management & Mentoring Platform",
    subtitle: "Web Platform",
    description:
      "An all-in-one collaboration platform that brings together project management, mentoring, real-time communication, and community engagement into a single ecosystem. The backend is built with Spring Boot using a scalable RESTful architecture, with secure authentication and real-time capabilities to support seamless collaboration.",
    image: "/images/projects/brainMap.png",
    codeLink: "https://github.com/brain-Map",
    keyFeatures: [
      "Project management and mentoring system",
      "Real-time communication and collaboration",
      "Scalable RESTful API built with Spring Boot",
      "PostgreSQL database with Supabase authentication",
      "Secure user authentication and data management",
      "CI/CD pipeline with GitHub Actions",
      "Containerized deployment with Docker",
      "Automated deployment to AWS EC2 via Amazon ECR",
    ],
    technologies: [
      "Spring Boot",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Docker",
      "AWS",
      "GitHub Actions",
    ],
  },
  {
    id: 3,
    title: "Swift Logistics - Logistics & Courier Management Platform",
    subtitle: "Web Platform",
    description:
      "A modern full-stack logistics ecosystem built as a learning project to explore middleware integration patterns. The system connects administrators, drivers, and clients through real-time shipment tracking, automated workflows, and centralized operations management. At its core, the platform uses WSO2 Micro Integrator (ESB) to orchestrate communication between multiple services and protocols across the system.",
    image: "/images/projects/swift.png",
    codeLink: "https://github.com/orgs/SwiftLogistics-co/repositories",
    keyFeatures: [
      "Centralized admin dashboard for logistics operations",
      "Real-time parcel tracking and shipment updates",
      "Driver mobile interface for order handling and navigation",
      "Client portal for shipment tracking and delivery history",
      "Scalable RESTful APIs with Node.js and Express",
      "Real-time caching and tracking with Redis",
      "Interactive route mapping with Google Maps / Mapbox",
      "Containerized deployment with Docker and CI/CD automation",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "Python",
      "Java",
      "PostgreSQL",
      "React.js",
      "Docker",
      "Kafka",
    ],
  },
];

// "LearnHub - Tutor & Student Discovery Platform" → ["LearnHub", "Tutor & …"]
const splitTitle = (title: string): [string, string | null] => {
  const at = title.indexOf(" - ");
  return at === -1 ? [title, null] : [title.slice(0, at), title.slice(at + 3)];
};

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useGsap<HTMLElement>(() => {
    gsap.from(".ac-bar, .fp-grid", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      stagger: 0.15,
      ease: EASE_OUT,
      scrollTrigger: { trigger: ".ac-frame", start: REVEAL_START, once: true },
    });
    revealLines(".fp-title", ".fp-title");

    const cards = gsap.utils.toArray<HTMLElement>(".fp-card");
    gsap.set(cards, { opacity: 0, y: 60 });

    // Cards entering together (one grid row) stagger in as a group,
    // each screenshot wiping up from the bottom while it settles from a zoom
    ScrollTrigger.batch(cards, {
      start: REVEAL_START,
      once: true,
      onEnter: (batch) => {
        const images = batch
          .map((card) => card.querySelector(".fp-card__image"))
          .filter(Boolean);
        const media = batch
          .map((card) => card.querySelector(".fp-card__media"))
          .filter(Boolean);

        gsap
          .timeline()
          .to(batch, {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.12,
            ease: EASE_OUT,
            ...pauseTransitions(batch),
            clearProps: "transition,transform",
          })
          .fromTo(
            media,
            { clipPath: "inset(100% 0% 0% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              stagger: 0.12,
              ease: "power4.inOut",
              clearProps: "clipPath",
            },
            0,
          )
          .from(
            images,
            {
              scale: 1.25,
              duration: 1.6,
              stagger: 0.12,
              ease: EASE_OUT,
              ...pauseTransitions(images),
              clearProps: "transition,transform",
            },
            0.1,
          );
      },
    });
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setScrollLocked(!!selectedProject);
    return () => {
      document.body.style.overflow = "";
      setScrollLocked(false);
    };
  }, [selectedProject]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="ac-section" id="projects" ref={sectionRef}>
      <div className="ac-frame">
        <div className="ac-bar">
          <span>
            <span className="ac-bar__index">{SECTION} /</span> Featured projects
          </span>
          <span className="ac-bar__aside">Selected work · built from scratch</span>
        </div>

        <div className="ac-intro">
          <h2 className="ac-title fp-title">
            Things I've <em>built.</em>
          </h2>
        </div>

        <div className="fp-grid">
          {projects.map((project, i) => {
            const [name, tagline] = splitTitle(project.title);
            return (
              <article className="fp-card" key={project.id}>
                <div className="ac-label fp-card__bar">
                  <span>{project.subtitle}</span>
                  <span className="ac-faint">{`${SECTION}.${i + 1}`}</span>
                </div>

                <button
                  type="button"
                  className="fp-card__media ac-focus"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View details for ${name}`}
                >
                  <img
                    src={project.image}
                    alt=""
                    className="fp-card__image"
                    loading="lazy"
                  />
                </button>

                <div className="fp-card__body">
                  <h3 className="ac-heading">
                    {name}
                    {tagline && <span className="fp-card__tagline">{tagline}</span>}
                  </h3>
                  <p className="ac-body fp-card__desc">{project.description}</p>
                  <div className="ac-chips">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="ac-chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="fp-card__actions">
                    <button
                      type="button"
                      className="ac-btn ac-btn--solid"
                      onClick={() => setSelectedProject(project)}
                    >
                      View details
                      <LuArrowUpRight size={14} />
                    </button>
                    <a
                      href={project.codeLink}
                      className="ac-btn ac-btn--outline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View code
                      <LuCodeXml size={14} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Closing cell: everything else lives on GitHub */}
          <a
            href="https://github.com/sachithdh?tab=repositories"
            className="fp-card fp-card--more ac-focus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="ac-label fp-card__bar">
              <span>More on GitHub</span>
              <span className="ac-faint">
                {`${SECTION}.${projects.length + 1}`}
              </span>
            </div>
            <div className="fp-more">
              <span className="fp-more__box" aria-hidden="true">
                <LuArrowUpRight size={18} />
              </span>
              <span className="ac-label ac-faint">github.com/sachithdh</span>
            </div>
          </a>
        </div>
      </div>

      {/* ── Project Detail Modal ── */}
      {selectedProject && (
        <div
          className="fp-modal-overlay"
          onClick={() => setSelectedProject(null)}
          data-lenis-prevent
        >
          <div
            className="fp-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="fp-modal__close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project detail"
            >
              <LuX size={18} />
            </button>

            {(() => {
              const hasGallery =
                !!selectedProject.gallery && selectedProject.gallery.length > 0;
              return (
                <div
                  className={`fp-modal__body${
                    hasGallery ? "" : " fp-modal__body--no-gallery"
                  }`}
                >
                  {/* ── Info panel ── */}
                  <div className="fp-modal__info">
                    <span className="ac-label ac-faint">
                      {selectedProject.subtitle}
                    </span>
                    <h3 className="fp-modal__title">{selectedProject.title}</h3>

                    <p className="fp-modal__desc">
                      {selectedProject.description}
                    </p>

                    <div className="fp-modal__features">
                      <h4 className="ac-label ac-faint fp-modal__features-heading">
                        Key features
                      </h4>
                      <ul className="fp-modal__features-list">
                        {selectedProject.keyFeatures.map((feat, i) => (
                          <li key={i}>{feat}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    {Object.keys(selectedProject.technologies).length > 0 && (
                      <div className="fp-modal__tech">
                        <h4 className="ac-label ac-faint fp-modal__features-heading">
                          Technologies
                        </h4>
                        <div className="ac-chips">
                          {selectedProject.technologies.map((tech) => (
                            <span key={tech} className="ac-chip">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <a
                      href={selectedProject.codeLink}
                      className="ac-btn ac-btn--solid fp-modal__cta"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View code
                      <LuCodeXml size={14} />
                    </a>
                  </div>

                  {/* ── Gallery panel (only when images exist) ── */}
                  {hasGallery && (
                    <div className="fp-modal__gallery">
                      {/* Row 1: 2 images side by side */}
                      <div className="fp-modal__gallery-row fp-modal__gallery-row--top">
                        <div className="fp-modal__gallery-item fp-modal__gallery-item--wide">
                          <img
                            src={selectedProject.gallery![0]}
                            alt="Gallery 1"
                          />
                        </div>
                        <div className="fp-modal__gallery-item fp-modal__gallery-item--tall">
                          <img
                            src={selectedProject.gallery![1]}
                            alt="Gallery 2"
                          />
                        </div>
                      </div>
                      {/* Row 2: 1 wide image */}
                      <div className="fp-modal__gallery-row">
                        <div className="fp-modal__gallery-item fp-modal__gallery-item--full">
                          <img
                            src={selectedProject.gallery![2]}
                            alt="Gallery 3"
                          />
                        </div>
                      </div>
                      {/* Row 3: 2 images side by side */}
                      <div className="fp-modal__gallery-row fp-modal__gallery-row--bottom">
                        <div className="fp-modal__gallery-item">
                          <img
                            src={selectedProject.gallery![3]}
                            alt="Gallery 4"
                          />
                        </div>
                        <div className="fp-modal__gallery-item">
                          <img
                            src={selectedProject.gallery![4]}
                            alt="Gallery 5"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
