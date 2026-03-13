import "./WorkExperience.css";
import { useFadeInUp, useStaggerChildren } from "../../utils/gsapAnimations";

const experiences = [
  {
    id: 1,
    date: "NOVEMBER 2025 - PRESENT",
    role: "Intern Software Engineer",
    company: "Xeptogon",
    location: "Port City, Colombo, SL",
    description:
      "Developing digital infrastructure for climate markets, carbon finance and Article 6 implementation.",
    skills: ["React.js", "NestJs", "Docker", "Block Chain", "KeyCloak"],
  },
  {
    id: 2,
    date: "OCTOBER 2024 - NOVEMBER 2025",
    role: "Associate Software Engineer (Part Time)",
    company: "TheWeb Agency (Pvt) Ltd",
    location: "Kandy, SL",
    description:
      "Designing and delivering scalable software solutions for global clients.",
    skills: ["React.js", "PHP", "Wordpress", "Cloud Services"],
  },
];

export default function WorkExperience() {
  const headerRef = useFadeInUp(0);
  const workListRef = useStaggerChildren(0.2, 0.2);

  return (
    <section className="work-section section-container" id="work">
      <div className="work-header" ref={headerRef as any}>
        <div className="work-header-top">
          <div className="work-header-left">
            <span className="work-label">• Experiences</span>
            <h2 className="work-heading">
              Explore My Work
              <br />
              Journey
            </h2>
          </div>
          <div className="work-header-right">
            <p className="work-intro-text">
              Over the past 2+ years, I've had the opportunity to work on a wide
              range of projects, collaborating with diverse teams and clients to
              deliver innovative software solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="work-list" ref={workListRef as any}>
        {experiences.map((exp) => (
          <div key={exp.id} className="work-item">
            <div className="work-item-left">
              <div className="work-company-info">
                <h3 className="work-company-name">
                  {exp.company}, {exp.location}
                </h3>
                <span className="work-date meta-text">{exp.date}</span>
              </div>
              <div className="work-role-section">
                <p className="work-role-text">{exp.description}</p>
                <p className="work-role-title">{exp.role}</p>
              </div>
            </div>
            <div className="work-item-right">
              {exp.skills.map((skill, idx) => (
                <span key={idx} className="work-skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
