import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useFadeInUp, useStaggerChildren, useFadeInLeft, useFadeInRight } from "../../utils/gsapAnimations";
import "./SkillsTechnologies.css";
import { FaReact, FaNodeJs, FaVuejs, FaDocker, FaGitAlt } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiNestjs, SiDjango, SiExpress, SiMongodb, SiKeycloak } from "react-icons/si";




/* ── Programming Language Color Bar Data ── */
const languageColors = [
    { name: "JavaScript", color: "#F7DF1E", level: 95 },
    { name: "TypeScript", color: "#3178C6", level: 90 },
    { name: "Python", color: "#3776AB", level: 85 },
    { name: "Java", color: "#ED8B00", level: 80 },
    { name: "C++", color: "#00599C", level: 70 },
    { name: "PHP", color: "#777BB4", level: 75 },
    { name: "SQL", color: "#CC2927", level: 85 },
    { name: "C", color: "#A8B9CC", level: 65 },
];

/* ── Skill Categories ── */
const frontendSkills = [
    "React.js", "Next.js", "Vue.js", "TypeScript",
    "Tailwind CSS", "GSAP", "Material-UI", "Redux",
];

const backendSkills = [
    "Node.js", "NestJs", "Spring Boot", "Express",
    "REST APIs", "Microservices", "WebSocket",
];

const databaseSkills = [
    "PostgreSQL", "MySQL", "MongoDB", "Redis",
    "Supabase", "Firebase",
];

const devopsSkills = [
    "Docker", "AWS", "CI/CD", "GitHub Actions",
    "Vercel", "KeyCloack", "Nginx", "Linux",
];

const toolsSkills = [
    "Git", "Grafana", "VS Code",
    "Jira", "Agile/Scrum",
];

const frameworkShowcases = [
    {
        name: "React",
        variants: ["Hooks", "Context", "Server Components"],
        icon: <FaReact />,
        versions: ["18", "17", "16"],
    },
    {
        name: "Node.js",
        variants: ["Express", "NestJS", "Fastify"],
        icon: <FaNodeJs />,
        versions: ["20", "18", "16"],
    },
    {
        name: "Next.js",
        variants: ["App Router", "API Routes", "SSR"],
        icon: <RiNextjsFill />,
        versions: ["14", "13", "12"],
    },
    {
        name: "Spring",
        variants: ["Boot", "Security", "Data JPA"],
        icon: <BiLogoSpringBoot />,
        versions: ["3.x", "2.x", "1.x"],
    },
    {
        name: "NestJS",
        variants: ["Modules", "Guards", "Interceptors"],
        icon: <SiNestjs />,
        versions: ["10", "9", "8"],
    },
    {
        name: "Django",
        variants: ["REST Framework", "ORM", "Flask"],
        icon: <SiDjango />,
        versions: ["5.x", "4.x", "3.x"],
    },
    {
        name: "Express",
        variants: ["Middleware", "Routing", "Rest API"],
        icon: <SiExpress />,
        versions: ["4.x", "5.x"],
    },
    {
        name: "MongoDB",
        variants: ["Mongoose", "Aggregation", "NoSQL"],
        icon: <SiMongodb />,
        versions: ["8.x", "7.x", "6.x"],
    },
    {
        name: "Vue.js",
        variants: ["Composition API", "Vuex", "Pinia"],
        icon: <FaVuejs />,
        versions: ["3.x", "2.x"],
    },
    {
        name: "Docker",
        variants: ["Images", "Containers", "Compose"],
        icon: <FaDocker />,
        versions: ["24.x", "20.x"],
    },
    {
        name: "Keycloak",
        variants: ["OAuth 2.0", "OpenID Connect", "SSO"],
        icon: <SiKeycloak />,
        versions: ["23.x", "22.x"],
    },
    {
        name: "Git",
        variants: ["GitHub", "GitLab", "Version Control"],
        icon: <FaGitAlt />,
        versions: ["2.x"],
    },
];

/* ── Carousel Card Component ── */
function ShowcaseCard({ fw }: { fw: typeof frameworkShowcases[number] }) {
    return (
        <div className="st-showcase-card">
            <div className="st-showcase-top">
                <h4 className="st-showcase-name">{fw.name}</h4>
            </div>
            <div className="st-showcase-variants">
                {fw.variants.map((v, vi) => (
                    <span key={vi} className="st-showcase-variant">{v}</span>
                ))}
            </div>
            <div className="st-showcase-bottom">
                <div className="st-showcase-big-letter">
                    {fw.icon}
                </div>
                <div className="st-showcase-versions">
                    {fw.versions.map((ver, vi) => (
                        <span key={vi} className="st-showcase-version">{ver}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function SkillsTechnologies() {
    const headerRef = useFadeInUp(0);
    const leftColRef = useFadeInLeft(0.2);
    const rightColRef = useFadeInRight(0.2);
    const colorBarRef = useStaggerChildren(0.1, 0.08);

    /* ── GSAP Carousel refs ── */
    const carouselTrackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const track = carouselTrackRef.current;
        const wrapper = track?.parentElement;
        if (!track || !wrapper) return;

        // Wait a frame so the browser can lay out the duplicated cards
        requestAnimationFrame(() => {
            const cards = track.querySelectorAll(".st-showcase-card");
            const totalCards = frameworkShowcases.length;
            // The first half of cards is the "original" set
            // We measure the width of that original set so we know when to loop
            let setWidth = 0;
            for (let i = 0; i < totalCards; i++) {
                const card = cards[i] as HTMLElement;
                setWidth += card.offsetWidth + 24; // 24px = gap
            }

            // Set the track width so all cards sit in one line
            track.style.width = `${setWidth * 2}px`;

            // Handle wheel events directly on the wrapper
            const handleWheel = (e: WheelEvent) => {
                // Determine if the scroll is primarily vertical
                const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);

                // If the user scrolls vertically over the cards, prevent window scroll 
                // and translate it to horizontal carousel movement instead.
                if (isVerticalScroll) {
                    e.preventDefault();
                }

                // Get base delta, but clamp it to prevent massive spikes 
                // from fast trackpad flings or heavy mouse wheels
                let delta = (e.deltaY + e.deltaX) * 5;
                if (delta > 400) delta = 400;
                if (delta < -400) delta = -400;

                // Tween to the new relative position from wherever it CURRENTLY is mid-flight.
                // Because we use overwrite: true, rapid scrolls won't "accumulate" thousand-pixel targets,
                // which prevents the runaway speed behavior.
                tweenRef.current = gsap.to(track, {
                    x: `-=${delta}`,
                    duration: 0.4,
                    ease: "power1.out", // A stronger ease-out makes it feel grounded
                    overwrite: true,
                    modifiers: {
                        x: gsap.utils.unitize((x: number) => {
                            // Infinite wrap around logic using GSAP
                            return gsap.utils.wrap(-setWidth, 0, x);
                        }),
                    },
                });
            };

            // Needs passive: false so we can preventDefault
            wrapper.addEventListener("wheel", handleWheel, { passive: false });

            // Store cleanly
            (wrapper as any)._cleanupWheel = () => {
                wrapper.removeEventListener("wheel", handleWheel);
            };
        });

        return () => {
            tweenRef.current?.kill();
            if (wrapper && (wrapper as any)._cleanupWheel) {
                (wrapper as any)._cleanupWheel();
            }
        };
    }, []);

    return (
        <section className="st-section" id="skills">
            <div className="st-container">
                {/* ── Section Title ── */}
                <h2 className="st-main-title" ref={headerRef as any}>
                    SKILLS & TECH
                </h2>

                {/* ── Main Content Grid ── */}
                <div className="st-content">
                    {/* ── Left + Center Columns ── */}
                    <div className="st-columns">
                        {/* Left Column */}
                        <div className="st-col" ref={leftColRef as any}>
                            <h3 className="st-col-header">[FRONTEND & BACKEND]</h3>
                            <div className="st-text-block">
                                <p className="st-text">
                                    Building <span className="st-highlight">modern web applications</span> with
                                    a focus on clean architecture and
                                    scalable <span className="st-underline">design patterns</span>. Proficient in
                                    component-based frameworks and
                                    server-side rendering techniques.
                                </p>
                                <div className="st-tag-cloud">
                                    {frontendSkills.map((skill, i) => (
                                        <span key={i} className="st-tag">{skill}</span>
                                    ))}
                                </div>
                                <div className="st-tag-cloud st-tag-cloud--secondary">
                                    {backendSkills.map((skill, i) => (
                                        <span key={i} className="st-tag st-tag--accent">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="st-col" ref={rightColRef as any}>
                            <h3 className="st-col-header">[DATABASE & DEVOPS]</h3>
                            <div className="st-text-block">
                                <p className="st-text">
                                    Experienced with both <span className="st-highlight">SQL and NoSQL</span>{" "}
                                    databases, designing efficient schemas
                                    and optimizing <span className="st-underline">query performance</span>.
                                    Comfortable deploying and managing
                                    applications in cloud environments.
                                </p>
                                <div className="st-tag-cloud">
                                    {databaseSkills.map((skill, i) => (
                                        <span key={i} className="st-tag">{skill}</span>
                                    ))}
                                </div>
                                <div className="st-tag-cloud st-tag-cloud--secondary">
                                    {devopsSkills.map((skill, i) => (
                                        <span key={i} className="st-tag st-tag--accent">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right Color Bar (Programming Languages) ── */}
                    <div className="st-color-bar" ref={colorBarRef as any}>
                        {languageColors.map((lang, i) => (
                            <div className="st-color-swatch" key={i}>
                                <div
                                    className="st-swatch-line"
                                    style={
                                        {
                                            "--swatch-color": lang.color,
                                            "--swatch-width": `${lang.level}%`,
                                        } as React.CSSProperties
                                    }
                                />
                                <div className="st-swatch-info">
                                    <span className="st-swatch-name">{lang.name}</span>
                                    <span className="st-swatch-hex">{lang.level}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Tools & Methodology Bar ── */}
                <div className="st-tools-bar">
                    <h3 className="st-col-header">[TOOLS & METHODOLOGY]</h3>
                    <div className="st-tag-cloud st-tag-cloud--tools">
                        {toolsSkills.map((skill, i) => (
                            <span key={i} className="st-tag st-tag--tool">{skill}</span>
                        ))}
                    </div>
                </div>

                {/* ── Tech Stack Carousel ── */}
                <h3 className="st-col-header st-techstack-title">[TECH STACK]</h3>
                <div className="st-carousel-wrapper">
                    <div className="st-carousel-track" ref={carouselTrackRef}>
                        {/* Original set */}
                        {frameworkShowcases.map((fw, i) => (
                            <ShowcaseCard fw={fw} key={`orig-${i}`} />
                        ))}
                        {/* Duplicate set for seamless loop */}
                        {frameworkShowcases.map((fw, i) => (
                            <ShowcaseCard fw={fw} key={`dup-${i}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
