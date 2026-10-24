import gsap from "gsap";
import type { IconType } from "react-icons";
import { LuArrowUpRight } from "react-icons/lu";
import { SiLeetcode, SiHackthebox } from "react-icons/si";
import {
  useGsap,
  revealLines,
  pauseTransitions,
  EASE_OUT,
  REVEAL_START,
} from "../../utils/gsapAnimations";
import "./CodingProfiles.css";

type Profile = {
  platform: string;
  focus: string;
  handle: string;
  url: string;
  icon: IconType;
  accent: string;
  stats: { label: string; value: string }[];
};

// Neither platform exposes a public, CORS-friendly API, so stats are kept here
// and updated by hand.
const profiles: Profile[] = [
  {
    platform: "LeetCode",
    focus: "Algorithms · data structures",
    handle: "sachithdh",
    url: "https://leetcode.com/u/sachithdh/",
    icon: SiLeetcode,
    accent: "#FFA116",
    stats: [
      { label: "Solved", value: "53" },
      // { label: "Contest rating", value: "—" },
      // { label: "Top", value: "—" },
    ],
  },
  {
    platform: "Hack The Box",
    focus: "Offensive security · CTF",
    handle: "ax0b12",
    url: "https://profile.hackthebox.com/profile/01a14dcb-bdf8-70b6-9b6d-0419e8445eb2",
    icon: SiHackthebox,
    accent: "#9FEF00",
    stats: [
      { label: "Level", value: "24" },
      { label: "Machines owned", value: "13" },
      // { label: "Challenges", value: "—" },
    ],
  },
];

export default function CodingProfiles() {
  const sectionRef = useGsap<HTMLElement>(() => {
    gsap.from(".ac-bar, .cp-grid", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      stagger: 0.15,
      ease: EASE_OUT,
      scrollTrigger: { trigger: ".ac-frame", start: REVEAL_START, once: true },
    });
    revealLines(".cp-title", ".cp-title");

    const items = gsap.utils.toArray<HTMLElement>(".cp-card__body > *");
    gsap.from(items, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.05,
      ease: EASE_OUT,
      ...pauseTransitions(items),
      scrollTrigger: { trigger: ".cp-grid", start: REVEAL_START, once: true },
    });
  });

  return (
    <section className="ac-section" id="profiles" ref={sectionRef}>
      <div className="ac-frame">
        <div className="ac-bar">
          <span>
            <span className="ac-bar__index">06 /</span> Practice
          </span>
          <span className="ac-bar__aside">Problem solving · security</span>
        </div>

        <div className="ac-intro">
          <h2 className="ac-title cp-title">
            Sharpening the <em>craft.</em>
          </h2>
        </div>

        <div className="cp-grid">
          {profiles.map(
            ({ platform, focus, handle, url, icon: Icon, accent, stats }) => (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="cp-card ac-focus"
                key={platform}
                style={{ "--cp-accent": accent } as React.CSSProperties}
              >
                <div className="ac-label cp-card__bar">
                  <span>{focus}</span>
                  <span className="ac-faint">@{handle}</span>
                </div>

                <div className="cp-card__body">
                  <div className="cp-card__head">
                    <Icon className="cp-card__icon" aria-hidden="true" />
                    <h3 className="ac-heading">{platform}</h3>
                  </div>

                  <dl className="cp-stats">
                    {stats.map((stat) => (
                      <div key={stat.label} className="cp-stat">
                        <dt className="ac-label ac-faint">{stat.label}</dt>
                        <dd className="cp-stat__value">{stat.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <span className="ac-label cp-card__visit">
                    View profile
                    <LuArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
