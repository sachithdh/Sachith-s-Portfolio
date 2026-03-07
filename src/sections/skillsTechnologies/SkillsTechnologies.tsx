import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useFadeInUp, useStaggerChildren, useFadeInLeft, useFadeInRight } from "../../utils/gsapAnimations";
import "./SkillsTechnologies.css";

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
        icon: "⚛",
        versions: ["18", "17", "16"],
    },
    {
        name: "Node.js",
        variants: ["Express", "NestJS", "Fastify"],
        icon: "⬡",
        versions: ["20", "18", "16"],
    },
    {
        name: "Next.js",
        variants: ["App Router", "API Routes", "SSR"],
        icon: "▲",
        versions: ["14", "13", "12"],
    },
    {
        name: "Spring",
        variants: ["Boot", "Security", "Data JPA"],
        icon: "🍃",
        versions: ["3.x", "2.x", "1.x"],
    },
    {
        name: "NestJS",
        variants: ["Modules", "Guards", "Interceptors"],
        icon: "🐈",
        versions: ["10", "9", "8"],
    },
    {
        name: "Django",
        variants: ["REST Framework", "ORM", "Flask"],
        icon: "🐍",
        versions: ["5.x", "4.x", "3.x"],
    },
];

/* ── Carousel Card Component ── */
function ShowcaseCard({ fw }: { fw: typeof frameworkShowcases[number] }) {
    return (
        <div className="st-showcase-card">
            <div className="st-showcase-top">
                <span className="st-showcase-icon">{fw.icon}</span>
                <h4 className="st-showcase-name">{fw.name}</h4>
            </div>
            <div className="st-showcase-variants">
                {fw.variants.map((v, vi) => (
                    <span key={vi} className="st-showcase-variant">{v}</span>
                ))}
            </div>
            <div className="st-showcase-big-letter">
                {fw.name.charAt(0)}
                <span className="st-showcase-small-letter">{fw.name.charAt(1)}</span>
            </div>
            <div className="st-showcase-versions">
                {fw.versions.map((ver, vi) => (
                    <span key={vi} className="st-showcase-version">{ver}</span>
                ))}
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
        if (!track) return;

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

            // Infinite scroll tween: translate by exactly one set's width, then repeat
            tweenRef.current = gsap.to(track, {
                x: -setWidth,
                duration: 20,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x: number) => {
                        return x % setWidth;
                    }),
                },
            });

            // Pause on hover
            const handleEnter = () => tweenRef.current?.pause();
            const handleLeave = () => tweenRef.current?.resume();
            track.addEventListener("mouseenter", handleEnter);
            track.addEventListener("mouseleave", handleLeave);

            return () => {
                track.removeEventListener("mouseenter", handleEnter);
                track.removeEventListener("mouseleave", handleLeave);
            };
        });

        return () => {
            tweenRef.current?.kill();
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
