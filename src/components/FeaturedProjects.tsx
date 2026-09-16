import "./FeaturedProjects.css";
import {
  useFadeInUp,
  useFadeInLeft,
  useScaleIn,
} from "../utils/gsapAnimations";

export default function FeaturedProjects() {
  const headerRef = useFadeInUp(0);
  const mainProjectRef = useScaleIn(0.2);
  const aboutBlockRef = useFadeInLeft(0.3);

  return (
    <section className="projects-section section-container" id="projects">
      <div className="projects-header" ref={headerRef as any}>
        <h2 className="projects-title">SELECTED</h2>
        <span className="projects-script text-accent-pink">Projects</span>
      </div>

      <div className="projects-grid">
        {/* Main Large Project Left */}
        <div className="project-card main-project" ref={mainProjectRef as any}>
          <div className="project-meta meta-text">
            <span>FULL STACK</span>
            <span>2024</span>
            <span>COLLABORATION PLATFORM</span>
          </div>
          <div className="project-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop"
              alt="brainMap Project"
              className="project-img"
            />
            <div className="project-overlay">
              <h3>brainMap</h3>
              <p style={{ fontSize: "0.9em" }}>
                Project Management & Mentoring Platform
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Layout */}
        <div className="projects-right-column">
          <div className="projects-about-block" ref={aboutBlockRef as any}>
            <p className="projects-desc">
              A showcase of my recent projects leveraging modern technologies
              like React, Next.js, Spring Boot, and cloud platforms. Each
              project demonstrates full-stack development, scalable
              architecture, and effective problem-solving.
            </p>
            <a
              href="https://github.com/sachithdh"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn accent-outline mt-4"
            >
              See More Work
            </a>
          </div>

          <div className="secondary-projects-row">
            <div className="project-card secondary-project">
              <div className="project-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1516534775068-bb57cd900bbb?w=400&h=400&fit=crop"
                  alt="Learnhub Project"
                  className="project-img"
                />
                <div className="project-overlay">
                  <h4>Learnhub</h4>
                  <p style={{ fontSize: "0.85em" }}>E-Learning Platform</p>
                </div>
              </div>
            </div>

            <div className="project-card secondary-project">
              <div className="project-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178f50002c4b?w=400&h=400&fit=crop"
                  alt="Eventer Project"
                  className="project-img"
                />
                <div className="project-overlay">
                  <h4>Eventer</h4>
                  <p style={{ fontSize: "0.85em" }}>Event Management System</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
