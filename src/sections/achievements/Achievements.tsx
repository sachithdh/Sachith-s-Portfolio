import "./Achievements.css";
import gsap from "gsap";
import {
  useGsap,
  revealLines,
  fadeLines,
  EASE_OUT,
  REVEAL_START,
} from "../../utils/gsapAnimations";

interface Placing {
  place: string;
  event: string;
  years: string;
}

interface Achievement {
  id: number;
  category: string;
  org: string;
  title: string;
  description: string;
  stat?: { value: string; label: string };
  records?: { group: string; placings: Placing[] }[];
}

const SECTION = "03";

const achievements: Achievement[] = [
  {
    id: 1,
    category: "Academic",
    org: "UCSC",
    title: "Director's List",
    description:
      "Selected for 4 out of 5 semesters in recognition of academic excellence.",
    stat: { value: "4/5", label: "Semesters" },
  },
  {
    id: 2,
    category: "Hackathon",
    org: "UCSC IEEE Student Branch",
    title: "CodeQuest CTF 2025",
    description:
      "Ranked among the Top 10 teams in the CodeQuest Capture the Flag Hackathon.",
    stat: { value: "Top 10", label: "Team ranking" },
  },
  {
    id: 3,
    category: "Sports",
    org: "UCSC Baseball & Elle Teams",
    title: "Baseball & Elle",
    description:
      "Representing UCSC in the Baseball and Elle teams at inter-faculty championships.",
    records: [
      {
        group: "Baseball",
        placings: [
          {
            place: "1st Runners-up",
            event: "Inter-Faculty Championship",
            years: "2023, 2025",
          },
          {
            place: "2nd Runners-up",
            event: "University Inter-Faculty Championship",
            years: "2024",
          },
        ],
      },
      {
        group: "Elle",
        placings: [
          {
            place: "2nd Runners-up",
            event: "Inter-Faculty Championship",
            years: "2023, 2024",
          },
        ],
      },
    ],
  },
];

export default function Achievements() {
  const sectionRef = useGsap<HTMLElement>(() => {
    gsap.from(".ac-bar", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      ease: EASE_OUT,
      scrollTrigger: { trigger: ".ac-frame", start: REVEAL_START, once: true },
    });
    revealLines(".ach-title", ".ach-title");
    fadeLines(".ach-lede", ".ach-title", { delay: 0.3 });

    gsap.utils.toArray<HTMLElement>(".ach-item").forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: REVEAL_START, once: true },
      });

      tl.from(item.querySelector(".ach-item__bar"), {
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
        ease: EASE_OUT,
      }).from(
        item.querySelectorAll(".ach-item__main > *, .ach-item__side > *"),
        { opacity: 0, y: 30, duration: 1, stagger: 0.08, ease: EASE_OUT },
        0.15,
      );
    });
  });

  return (
    <section className="ac-section" id="achievements" ref={sectionRef}>
      <div className="ac-frame">
        <div className="ac-bar">
          <span>
            <span className="ac-bar__index">{SECTION} /</span> Achievements
          </span>
          <span className="ac-bar__aside">
            Academic · Hackathons · Sports
          </span>
        </div>

        <div className="ac-intro">
          <h2 className="ac-title ach-title">
            A few <em>milestones</em> along the way.
          </h2>
          <p className="ac-lede ach-lede">
            Recognition earned in the classroom, at hackathons and on the
            field while studying at UCSC.
          </p>
        </div>

        <ol className="ach-list">
          {achievements.map((ach, i) => (
            <li key={ach.id} className="ach-item">
              <div className="ac-label ach-item__bar">
                <span>
                  <span className="ac-faint">{`${SECTION}.${i + 1}`} /</span>{" "}
                  {ach.category}
                </span>
                <span className="ac-faint">{ach.org}</span>
              </div>

              <div className="ach-item__body">
                <div className="ach-item__main">
                  <h3 className="ac-heading">{ach.title}</h3>
                  <p className="ac-body">{ach.description}</p>
                </div>

                <div className="ach-item__side">
                  {ach.stat && (
                    <div className="ach-stat">
                      <span className="ach-stat__value">{ach.stat.value}</span>
                      <span className="ac-label ac-faint">{ach.stat.label}</span>
                    </div>
                  )}

                  {ach.records?.map((record) => (
                    <div key={record.group} className="ach-record">
                      <span className="ac-label ac-faint">{record.group}</span>
                      <ul className="ach-record__list">
                        {record.placings.map((p) => (
                          <li key={p.place + p.event} className="ach-record__row">
                            <span className="ach-record__place">{p.place}</span>
                            <span className="ach-record__event">{p.event}</span>
                            <span className="ac-chip">{p.years}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
