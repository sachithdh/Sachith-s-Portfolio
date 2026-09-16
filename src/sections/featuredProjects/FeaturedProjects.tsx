import { useState, useEffect } from "react";
import { useFadeInUp, useStaggerChildren } from "../../utils/gsapAnimations";
import "./FeaturedProjects.css";

interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    category: "exploration" | "case-study";
    link: string;
    keyFeatures: string[];
    gallery: string[];
}

const projects: Project[] = [
    {
        id: 1,
        title: "Gege Gemink – Games Streaming Dashboard",
        subtitle: "Web Dashboard",
        description:
            "With the concept of this website you can see your idols playing games when you are live streaming with a very clean display.",
        image: "/images/placeholder.png",
        category: "exploration",
        link: "#",
        keyFeatures: [
            "Live streaming integration",
            "Clean & modern UI",
            "Real-time chat system",
            "Streamer profile cards",
            "Dark theme design",
        ],
        gallery: [
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
        ],
    },
    {
        id: 2,
        title: "Musikin Aja – Music Player App",
        subtitle: "Mobile App Design",
        description:
            "In this exploratory design, I created a mobile app design regarding a music player application.",
        image: "/images/placeholder.png",
        category: "exploration",
        link: "#",
        keyFeatures: [
            "Music streaming interface",
            "Playlist management",
            "Artist discovery",
            "Minimalist UI approach",
            "Cross-platform design",
        ],
        gallery: [
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
        ],
    },
    {
        id: 3,
        title: "Task Management – Mobile App",
        subtitle: "Mobile App Design",
        description:
            "In this exploration design, I created a ui design regarding the task manager with a very clean and pleasing appearance to the eyes. 😊",
        image: "/images/placeholder.png",
        category: "exploration",
        link: "#",
        keyFeatures: [
            "Daily task tracking",
            "Drag & drop interface",
            "Priority categorization",
            "Progress analytics",
            "Clean visual hierarchy",
        ],
        gallery: [
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
            "/images/placeholder.png",
        ],
    },
];

type FilterTab = "exploration" | "case-study";

export default function FeaturedProjects() {
    const [activeTab, setActiveTab] = useState<FilterTab>("exploration");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const headerRef = useFadeInUp(0);
    const gridRef = useStaggerChildren(0.2, 0.15);

    const filteredProjects = projects.filter(
        (p) => p.category === activeTab || activeTab === "exploration"
    );

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
                <div className="fp-tabs">
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
                </div>

                {/* Projects Grid */}
                <div className="fp-grid" ref={gridRef as any}>
                    {filteredProjects.map((project) => (
                        <div
                            className="fp-card"
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="fp-card__image-wrapper">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="fp-card__image"
                                />
                            </div>
                            <div className="fp-card__content">
                                <h3 className="fp-card__title">{project.title}</h3>
                                <p className="fp-card__desc">{project.description}</p>
                                <span className="fp-card__link">
                                    View Full Here{" "}
                                    <span className="fp-card__link-arrow">↗</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* See More Button */}
                <div className="fp-see-more-wrapper">
                    <a href="#" className="fp-see-more-btn">
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
                    <div
                        className="fp-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            className="fp-modal__close"
                            onClick={() => setSelectedProject(null)}
                            aria-label="Close project detail"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>

                        <div className="fp-modal__body">
                            {/* Left – Info */}
                            <div className="fp-modal__info">
                                <h3 className="fp-modal__title">{selectedProject.title}</h3>
                                <span className="fp-modal__subtitle">
                                    {selectedProject.subtitle}
                                </span>

                                <p className="fp-modal__desc">{selectedProject.description}</p>

                                <div className="fp-modal__features">
                                    <h4 className="fp-modal__features-heading">Key Features</h4>
                                    <ul className="fp-modal__features-list">
                                        {selectedProject.keyFeatures.map((feat, i) => (
                                            <li key={i}>{feat}</li>
                                        ))}
                                    </ul>
                                </div>

                                <a
                                    href={selectedProject.link}
                                    className="fp-modal__cta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Live Project
                                    <span className="fp-modal__cta-arrow">↗</span>
                                </a>
                            </div>

                            {/* Right – Image Gallery */}
                            <div className="fp-modal__gallery">
                                {/* Row 1: 2 images side by side */}
                                <div className="fp-modal__gallery-row fp-modal__gallery-row--top">
                                    <div className="fp-modal__gallery-item fp-modal__gallery-item--wide">
                                        <img src={selectedProject.gallery[0]} alt="Gallery 1" />
                                    </div>
                                    <div className="fp-modal__gallery-item fp-modal__gallery-item--tall">
                                        <img src={selectedProject.gallery[1]} alt="Gallery 2" />
                                    </div>
                                </div>
                                {/* Row 2: 1 wide image */}
                                <div className="fp-modal__gallery-row">
                                    <div className="fp-modal__gallery-item fp-modal__gallery-item--full">
                                        <img src={selectedProject.gallery[2]} alt="Gallery 3" />
                                    </div>
                                </div>
                                {/* Row 3: 2 images side by side */}
                                <div className="fp-modal__gallery-row fp-modal__gallery-row--bottom">
                                    <div className="fp-modal__gallery-item">
                                        <img src={selectedProject.gallery[3]} alt="Gallery 4" />
                                    </div>
                                    <div className="fp-modal__gallery-item">
                                        <img src={selectedProject.gallery[4]} alt="Gallery 5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
