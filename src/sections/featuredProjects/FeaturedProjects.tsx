import { useState, useEffect } from "react";
import { useFadeInUp, useStaggerChildren } from "../../utils/gsapAnimations";
import "./FeaturedProjects.css";
import { LuExternalLink, LuCodeXml } from "react-icons/lu";

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

// type FilterTab = "exploration" | "case-study";

export default function FeaturedProjects() {
  // const [activeTab, setActiveTab] = useState<FilterTab>("exploration");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const headerRef = useFadeInUp(0);
  const gridRef = useStaggerChildren(0.2, 0.15);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
    <section className="fp-section" id="projects">
      <div className="fp-container">
        {/* Heading */}
        <h2 className="fp-heading" ref={headerRef as any}>
          FEATURED PROJECTS
        </h2>

        {/* Filter Tabs */}
        {/* <div className="fp-tabs">
                    <button
                        className={`fp-tab ${activeTab === "exploration" ? "fp-tab--active" : ""}`}
                        onClick={() => setActiveTab("exploration")}
                    >
                        Exploration
                    </button>
                    <button
                        className={`fp-tab ${activeTab === "case-study" ? "fp-tab--active" : ""}`}
                        onClick={() => setActiveTab("case-study")}
                    >
                        Research Study
                    </button>
                </div> */}

        {/* Projects Grid */}
        <div className="fp-grid" ref={gridRef as any}>
          {projects.map((project) => (
            <div className="fp-card" key={project.id}>
              <div
                className="fp-card__image-wrapper"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="fp-card__image"
                />
              </div>
              <div className="fp-card__content">
                <h3
                  className="fp-card__title"
                  onClick={() => setSelectedProject(project)}
                  style={{ cursor: "pointer" }}
                >
                  {project.title}
                </h3>
                {/* Tech badges – flat list of all tech values */}
                {Object.keys(project.technologies).length > 0 && (
                  <div className="fp-card__tech-stack">
                    {Object.values(project.technologies).map((tech) => (
                      <span key={tech} className="fp-card__tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <p className="fp-card__desc">{project.description}</p>
                <div className="fp-card__actions">
                  <button
                    className="fp-card__btn fp-card__btn--primary"
                    onClick={() => setSelectedProject(project)}
                  >
                    View More
                    <LuExternalLink size={12} className="blog-cta-icon" />
                  </button>
                  <a
                    href={project.codeLink}
                    className="fp-card__btn fp-card__btn--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Code
                    <LuCodeXml size={16} className="blog-cta-icon" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="fp-see-more-wrapper">
          <a
            href="https://github.com/sachithdh?tab=repositories"
            className="fp-see-more-btn"
          >
            See More
          </a>
        </div>
      </div>

      {/* ── Project Detail Modal ── */}
      {selectedProject && (
        <div
          className="fp-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div className="fp-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="fp-modal__close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project detail"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
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
                    <h3 className="fp-modal__title">{selectedProject.title}</h3>
                    <span className="fp-modal__subtitle">
                      {selectedProject.subtitle}
                    </span>

                    <p className="fp-modal__desc">
                      {selectedProject.description}
                    </p>

                    <div className="fp-modal__features">
                      <h4 className="fp-modal__features-heading">
                        Key Features
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
                        <h4 className="fp-modal__features-heading">
                          Technologies
                        </h4>
                        <div className="fp-modal__tech-badges">
                          <ul className="fp-modal__features-list">
                            {Object.values(selectedProject.technologies)
                              .flat()
                              .map((tech, i) => (
                                <li key={i}>{tech}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    <a
                      href={selectedProject.codeLink}
                      className="fp-modal__cta"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      See Code
                      <span className="fp-modal__cta-arrow">↗</span>
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
