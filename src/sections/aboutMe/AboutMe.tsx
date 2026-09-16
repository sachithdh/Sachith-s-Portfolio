import "./AboutMe.css";
import ScrollAnimation from "../../utils/scrollAnimation";
import { useFadeInUp, useExitAnimation } from "../../utils/gsapAnimations";

const AboutMe = () => {
  const titleRef = useFadeInUp(0);
  const profileRef = useFadeInUp(0.2);
  const leftExitRef = useExitAnimation("left");
  const rightExitRef = useExitAnimation("right");

  return (
    <div className="about-me-section">
      <div className="about-content">
        <h1 className="about-title" ref={titleRef as any}>
          Software Engineer &
          <br />
          Computer Science Undergraduate
        </h1>
        <div className="about-profile" ref={profileRef as any}>
          <p className="info-text">
            Software Engineer and Computer Science undergraduate with hands-on
            experience designing and developing software solutions. Skilled in
            modern development frameworks and cloud technologies, with a strong
            interest in solving complex problems and building reliable, scalable
            systems that provide a great user experience.
          </p>
        </div>
        <div className="about-layout">
          <div className="left-content" ref={leftExitRef as any}>
            <div className="info-block">
              <h3 className="info-label">UNDERGRADUATE</h3>
              <p className="info-text">
                University of Colombo School of Computing — BSc (Hons) in
                Computer Science
              </p>
            </div>
            <div className="info-block">
              <h3 className="info-label">PROFESSIONAL EXPERIENCE</h3>
              <p className="info-text">
                Intern Software Engineer — Xeptagon (Nov 2025 - Present)
                <br />
                Associate Software Engineer (Part time) — TheWeb Agency (Oct
                2024 - Nov 2025)
              </p>
            </div>
            <div className="info-block">
              <h3 className="info-label">PROJECT HIGHLIGHTS</h3>
              <p className="info-text">
                brainMap — Project Management & Mentoring (Java, Spring Boot,
                Next.js, Supabase, Docker, AWS)
                <br />
                LearnHub — Custom PHP MVC e-learning platform (PHP, MySQL)
                <br />
                Eventer — Event management system (MERN + Material-UI)
              </p>
            </div>
          </div>
          <div className="right-content" ref={rightExitRef as any}>
            <div className="stat-block">
              <h3 className="stat-label">GPA</h3>
              <p className="stat-value">3.8 / 4.0</p>
            </div>

            <div className="stat-block">
              <h3 className="stat-label">TECH STACK</h3>
              <p className="stat-value">MERN, Nest, Spring Boot, Next</p>
            </div>

            <div className="stat-block">
              <h3 className="stat-label">LANGUAGES</h3>
              <p className="stat-value">
                Python, C, C++, JavaScript, Java, PHP, SQL
              </p>
            </div>

            <div className="stat-block">
              <h3 className="stat-label">TOOLS & CONCEPTS</h3>
              <p className="stat-value">
                CI/CD, Docker, GitHub Actions, PostgreSQL, Supabase
              </p>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          {/* <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect x="1" y="1" width="18" height="28" rx="9" strokeWidth="2" />
            <circle cx="10" cy="10" r="3" />
          </svg> */}
          <ScrollAnimation />
          <span>Scroll to explore more</span>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
