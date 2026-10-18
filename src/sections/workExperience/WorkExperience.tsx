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
    gsap.from(".ac-bar", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      ease: EASE_OUT,
      scrollTrigger: { trigger: ".ac-frame", start: REVEAL_START, once: true },
    });
    revealLines(".work-title", ".work-title");
    fadeLines(".work-lede", ".work-title", { delay: 0.3 });

    // Each role reveals on its own as it scrolls into view
    gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: REVEAL_START, once: true },
      });

      tl.from(item.querySelector(".work-item__bar"), {
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
        ease: EASE_OUT,
      }).from(
        item.querySelectorAll(".work-item__main > *"),
        { opacity: 0, y: 30, duration: 1, stagger: 0.08, ease: EASE_OUT },
        0.15,
      );

      const chips = item.querySelectorAll(".ac-chip");
      tl.from(
        chips,
        {
          opacity: 0,
          y: 8,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          ...pauseTransitions(chips),
        },
        0.3,
      );
    });
  });

  return (
    <section className="ac-section" id="experience" ref={sectionRef}>
      <div className="ac-frame">
        <div className="ac-bar">
          <span>
            <span className="ac-bar__index">02 /</span> Experience
          </span>
          <span className="ac-bar__aside">
            2+ years · {experiences.length} roles
          </span>
        </div>

        <div className="ac-intro">
          <h2 className="ac-title work-title">
            My <em>working</em> journey.
          </h2>
          <p className="ac-lede work-lede">
            Over the past 2+ years, I've had the opportunity to work on a wide
            range of projects, collaborating with diverse teams and clients to
            deliver innovative software solutions.
          </p>
        </div>

        <ol className="work-list">
          {experiences.map((exp, i) => (
            <li key={exp.id} className="work-item">
              <div className="ac-label work-item__bar">
                <span>
                  <span className="ac-faint">
                    {String(i + 1).padStart(2, "0")} /
                  </span>{" "}
                  {exp.company}
                  <span className="ac-faint work-item__location">
                    {" "}
                    · {exp.location}
                  </span>
                </span>
                <span className="ac-faint">{exp.date}</span>
              </div>

              <div className="work-item__body">
                <div className="work-item__main">
                  <h3 className="ac-heading">{exp.role}</h3>
                  <p className="ac-body">{exp.description}</p>
                </div>
                <div className="work-item__stack">
                  <span className="ac-label ac-faint">Stack</span>
                  <div className="ac-chips">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="ac-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
