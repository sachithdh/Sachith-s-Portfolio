import "./Skills.css";
import { useStaggerChildren, useFadeInUp } from "../utils/gsapAnimations";

const skills = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Material-UI",
      "GSAP",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "NestJs",
      "Spring Boot",
      "Express",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Prisma", "Redis"],
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Vercel", "Railway"],
  },
  {
    category: "Languages",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C",
      "C++",
      "PHP",
      "SQL",
    ],
  },
  {
    category: "Tools & Others",
    items: ["Git", "Linux", "Figma", "Postman", "VS Code", "Agile/Scrum"],
  },
];

export default function Skills() {
  const headerRef = useFadeInUp(0);
  const skillsGridRef = useStaggerChildren(0.2, 0.15);

  return (
    <section className="skills-section section-container" id="skills">
      <div className="skills-header" ref={headerRef as any}>
        <span className="skills-label">• Technical Expertise</span>
        <h2 className="skills-title">Skills & Technologies</h2>
        <p className="skills-description">
          Proficient in modern web technologies and frameworks, with a strong
          foundation in both frontend and backend development.
        </p>
      </div>

      <div className="skills-grid" ref={skillsGridRef as any}>
        {skills.map((skillGroup, index) => (
          <div key={index} className="skill-card">
            <h3 className="skill-category">{skillGroup.category}</h3>
            <div className="skill-items">
              {skillGroup.items.map((skill, idx) => (
                <span key={idx} className="skill-tag">
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
