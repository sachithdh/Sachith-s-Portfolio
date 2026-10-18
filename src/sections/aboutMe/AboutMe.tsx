import "./AboutMe.css";
import gsap from "gsap";
import {
  useGsap,
  revealLines,
  fadeLines,
  EASE_OUT,
} from "../../utils/gsapAnimations";

const SECTION = "01";

const pillars = [
  {
    label: "Education",
    title: "BSc (Hons) Computer Science",
    lines: ["University of Colombo School of Computing"],
  },
];

const specs = [
  { label: "GPA", value: "3.8 / 4.0", note: "Cumulative" },
  { label: "Director's List", value: "4 / 5", note: "Semesters selected" },
];

const AboutMe = () => {
  const sectionRef = useGsap<HTMLElement>(() => {
    const onView = (trigger: string, start = "top 80%") => ({
      scrollTrigger: { trigger, start, once: true },
    });

    // Frame rules draw in, then the copy reveals inside them
    gsap.from(".ac-bar, .about-cells, .about-specs", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      stagger: 0.15,
      ease: EASE_OUT,
      ...onView(".ac-frame"),
    });
    revealLines(".about-title", ".about-title", {
      duration: 1.3,
      stagger: 0.12,
      ...onView(".about-title"),
    });
    fadeLines(".about-lede", ".about-title", {
      delay: 0.3,
      ...onView(".about-title"),
    });
    gsap.from(".about-cell > *, .about-spec > *", {
      opacity: 0,
      y: 24,
      duration: 1,
      stagger: 0.04,
      ease: "power3.out",
      ...onView(".about-cells", "top 85%"),
    });
  });

  return (
    <section className="ac-section" id="about" ref={sectionRef}>
      <div className="ac-frame">
        <div className="ac-bar">
          <span>
            <span className="ac-bar__index">{SECTION} /</span> About me
          </span>
          <span className="ac-bar__aside">
            Software engineer · CS undergrad
          </span>
        </div>

        <div className="ac-intro">
          <div>
            <h2 className="ac-title about-title">
              Turning <em>complex</em> problems into reliable systems.
            </h2>
            <p className="ac-lede about-lede">
              Software Engineer and Computer Science undergraduate with hands-on
              experience designing and developing software solutions. Skilled in
              modern development frameworks and cloud technologies, with a
              strong interest in solving complex problems and building reliable,
              scalable systems that provide a great user experience.
            </p>
          </div>
        </div>

        <div className="about-row">
          <div className="about-cells">
            {pillars.map((pillar, i) => (
              <article className="about-cell" key={pillar.label}>
                <span className="ac-label ac-faint">
                  {`${SECTION}.${i + 1}`} · {pillar.label}
                </span>
                <h3 className="ac-heading about-cell__title">{pillar.title}</h3>
                <ul className="ac-body about-cell__list">
                  {pillar.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <dl className="about-specs">
            {specs.map((spec, i) => (
              <div className="about-spec" key={spec.label}>
                <dt className="ac-label about-spec__bar">
                  <span>{spec.label}</span>
                  <span className="ac-faint">
                    {`${SECTION}.${pillars.length + i + 1}`}
                  </span>
                </dt>
                <dd className="about-spec__value">
                  {spec.value}
                  <span className="ac-label ac-faint about-spec__note">
                    {spec.note}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
