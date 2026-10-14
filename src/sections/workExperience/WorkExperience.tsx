import "./WorkExperience.css";
import gsap from "gsap";
import {
  useGsap,
  revealLines,
  fadeLines,
  pauseTransitions,
  EASE_OUT,
  REVEAL_START,
} from "../../utils/gsapAnimations";

const experiences = [
  {
    id: 1,
    date: "NOVEMBER 2025 - MAY 2026",
    role: "Intern Software Engineer",
    company: "Xeptogon",
    location: "Port City, Colombo, SL",
    description:
      "Developing digital infrastructure for climate markets, carbon finance and Article 6 implementation.",
    skills: [
      "React.js",
      "NestJs",
      "Docker",
      "Block Chain",
      "KeyCloak",
      "RabbitMQ",
      "PostgreSQL",
    ],
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
  const sectionRef = useGsap<HTMLElement>(() => {
    revealLines(".work-heading", ".work-header");
    fadeLines(".work-intro-text", ".work-header", { delay: 0.3 });

    // Each role reveals on its own as it scrolls into view
    gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: REVEAL_START, once: true },
      });

      tl.from(item.querySelectorAll(".work-item-left > * > *"), {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.08,
        ease: EASE_OUT,
      });

      const badges = item.querySelectorAll(".work-skill-badge");
      tl.from(
        badges,
        {
          opacity: 0,
          scale: 0.6,
          y: 10,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(2)",
          ...pauseTransitions(badges),
        },
        0.25,
      );
    });
  });

  return (
    <section
      className="work-section section-container"
      id="experience"
      ref={sectionRef}
    >
      <div className="work-header">
        <div className="work-header-top">
          <div className="work-header-left">
            <h2 className="work-heading">
              Explore My Working
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

      <div className="work-list">
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
