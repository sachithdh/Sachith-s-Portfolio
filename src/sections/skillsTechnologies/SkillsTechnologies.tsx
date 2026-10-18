import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
    useGsap,
    revealLines,
    fadeLines,
    pauseTransitions,
    EASE_OUT,
    REVEAL_START,
} from "../../utils/gsapAnimations";
import "./SkillsTechnologies.css";
import { FaReact, FaNodeJs, FaVuejs, FaDocker, FaGitAlt } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiNestjs, SiDjango, SiExpress, SiMongodb, SiKeycloak } from "react-icons/si";

const SECTION = "05";

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
    "Vercel", "Keycloak", "Nginx", "Linux",
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
    const sectionRef = useGsap<HTMLElement>(() => {
        gsap.from(".ac-bar, .st-cells, .st-langs, .st-tools, .st-stack", {
            clipPath: "inset(0 100% 0 0)",
            duration: 1.2,
            stagger: 0.1,
            ease: EASE_OUT,
            scrollTrigger: { trigger: ".ac-frame", start: REVEAL_START, once: true },
        });
        revealLines(".st-title", ".st-title");
        fadeLines(".st-lede", ".st-title", { delay: 0.3 });

        // Cells: heading and copy rise in, then the chips follow one by one
        gsap.utils.toArray<HTMLElement>(".st-cell, .st-tools").forEach((block) => {
            const chips = block.querySelectorAll(".ac-chip");
            gsap.timeline({
                scrollTrigger: { trigger: block, start: REVEAL_START, once: true },
            })
                .from(block.querySelectorAll(".ac-heading, .ac-body"), {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    stagger: 0.08,
                    ease: EASE_OUT,
                })
                .from(
                    chips,
                    {
                        opacity: 0,
                        y: 8,
                        duration: 0.5,
                        stagger: 0.025,
                        ease: "power3.out",
                        ...pauseTransitions(chips),
                    },
                    0.25,
                );
        });

        gsap.from(".st-carousel-wrapper", {
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: EASE_OUT,
            scrollTrigger: { trigger: ".st-stack", start: REVEAL_START, once: true },
        });

        // Language meters fill from the left while their percentages count up
        const bars = gsap.timeline({
            scrollTrigger: { trigger: ".st-langs", start: REVEAL_START, once: true },
        });
        gsap.utils.toArray<HTMLElement>(".st-lang").forEach((row, i) => {
            const label = row.querySelector<HTMLElement>(".st-lang__value")!;
            const level = Number(label.dataset.level);
            const counter = { value: 0 };
            label.textContent = "0%";

            bars.fromTo(
                row.querySelector(".st-lang__fill"),
                { scaleX: 0 },
                { scaleX: 1, duration: 1.4, ease: "power4.out" },
                i * 0.06,
            ).to(
                counter,
                {
                    value: level,
                    duration: 1.4,
                    ease: "power4.out",
                    onUpdate: () => {
                        label.textContent = `${Math.round(counter.value)}%`;
                    },
                },
                i * 0.06,
            );
        });
    });

    const carouselTrackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const track = carouselTrackRef.current;
        const wrapper = track?.parentElement;
        if (!track || !wrapper) return;

        let setWidth = 0;
        let isMouseDown = false;
        let hasMouseDragged = false;
        let mouseStartX = 0;
        let lastMouseX = 0;
        let lastMouseTime = 0;
        let mouseVelocityX = 0;

        let isTouchDown = false;
        let isTouchDragging = false;
        let touchStartX = 0;
        let touchStartY = 0;
        let lastTouchX = 0;
        let lastTouchTime = 0;
        let touchVelocityX = 0;

        let currentTrackX = 0;

        const updateSetWidth = () => {
            const cards = track.querySelectorAll(".st-showcase-card");
            const totalCards = frameworkShowcases.length;
            const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            let width = 0;
            for (let i = 0; i < totalCards; i++) {
                const card = cards[i] as HTMLElement;
                if (card) {
                    width += card.offsetWidth + gap;
                }
            }
            if (width > 0) {
                setWidth = width;
                track.style.width = `${setWidth * 2}px`;
            }
        };

        const getTrackX = () => {
            return (gsap.getProperty(track, "x") as number) || 0;
        };

        const setTrackX = (x: number) => {
            if (setWidth <= 0) return;
            const wrappedX = gsap.utils.wrap(-setWidth, 0, x);
            gsap.set(track, { x: wrappedX });
            currentTrackX = wrappedX;
        };

        const moveCarousel = (delta: number) => {
            if (setWidth <= 0) return;
            tweenRef.current = gsap.to(track, {
                x: `-=${delta}`,
                duration: 0.4,
                ease: "power1.out",
                overwrite: true,
                modifiers: {
                    x: gsap.utils.unitize((x: number) =>
                        gsap.utils.wrap(-setWidth, 0, x)
                    ),
                },
            });
        };

        // Initialize dimensions
        requestAnimationFrame(() => {
            updateSetWidth();
        });

        // Window resize handler
        const handleResize = () => {
            updateSetWidth();
        };
        window.addEventListener("resize", handleResize);

        // ── Mouse Drag (Desktop) ──
        const handleMouseDown = (e: MouseEvent) => {
            if (e.button !== 0) return; // Only main left click
            tweenRef.current?.kill();

            isMouseDown = true;
            hasMouseDragged = false;
            mouseStartX = e.clientX;
            lastMouseX = e.clientX;
            lastMouseTime = performance.now();
            mouseVelocityX = 0;
            currentTrackX = getTrackX();

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isMouseDown) return;

            const dx = e.clientX - mouseStartX;
            if (!hasMouseDragged) {
                if (Math.abs(dx) > 3) {
                    hasMouseDragged = true;
                    wrapper.classList.add("is-dragging");
                } else {
                    return;
                }
            }

            e.preventDefault();
            const now = performance.now();
            const dt = now - lastMouseTime;
            const moveDelta = e.clientX - lastMouseX;

            if (dt > 0) {
                mouseVelocityX = 0.75 * (moveDelta / dt) + 0.25 * mouseVelocityX;
            }

            lastMouseX = e.clientX;
            lastMouseTime = now;
            setTrackX(currentTrackX + moveDelta);
        };

        const handleMouseUp = () => {
            if (!isMouseDown) return;
            isMouseDown = false;

            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);

            if (hasMouseDragged) {
                wrapper.classList.remove("is-dragging");
                const now = performance.now();
                if (now - lastMouseTime > 80) {
                    mouseVelocityX = 0;
                }

                const clampedV = Math.max(-2.5, Math.min(2.5, mouseVelocityX));
                const throwDist = clampedV * 350;
                const duration = Math.min(1.2, Math.max(0.4, Math.abs(clampedV) * 0.8));

                if (Math.abs(throwDist) > 5 && setWidth > 0) {
                    tweenRef.current = gsap.to(track, {
                        x: `+=${throwDist}`,
                        duration: duration,
                        ease: "power2.out",
                        overwrite: true,
                        modifiers: {
                            x: gsap.utils.unitize((x: number) =>
                                gsap.utils.wrap(-setWidth, 0, x)
                            ),
                        },
                    });
                }
            }
        };

        wrapper.addEventListener("mousedown", handleMouseDown);

        // Touch Drag (Mobile)
        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length !== 1) return;
            tweenRef.current?.kill();

            isTouchDown = true;
            isTouchDragging = false;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            lastTouchX = touchStartX;
            lastTouchTime = performance.now();
            touchVelocityX = 0;
            currentTrackX = getTrackX();
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isTouchDown || e.touches.length !== 1) return;

            const touch = e.touches[0];
            const dx = touch.clientX - touchStartX;
            const dy = touch.clientY - touchStartY;

            if (!isTouchDragging) {
                // If gesture is predominantly vertical, allow normal page scroll
                if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 7) {
                    isTouchDown = false;
                    return;
                }
                // If gesture is horizontal, lock into carousel drag
                if (Math.abs(dx) > 6) {
                    isTouchDragging = true;
                    wrapper.classList.add("is-dragging");
                } else {
                    return;
                }
            }

            if (e.cancelable) e.preventDefault();

            const now = performance.now();
            const dt = now - lastTouchTime;
            const moveDelta = touch.clientX - lastTouchX;

            if (dt > 0) {
                touchVelocityX = 0.75 * (moveDelta / dt) + 0.25 * touchVelocityX;
            }

            lastTouchX = touch.clientX;
            lastTouchTime = now;
            setTrackX(currentTrackX + moveDelta);
        };

        const handleTouchEnd = () => {
            if (!isTouchDown) return;
            isTouchDown = false;

            if (isTouchDragging) {
                isTouchDragging = false;
                wrapper.classList.remove("is-dragging");

                const now = performance.now();
                if (now - lastTouchTime > 80) {
                    touchVelocityX = 0;
                }

                const clampedV = Math.max(-2.5, Math.min(2.5, touchVelocityX));
                const throwDist = clampedV * 350;
                const duration = Math.min(1.2, Math.max(0.4, Math.abs(clampedV) * 0.8));

                if (Math.abs(throwDist) > 5 && setWidth > 0) {
                    tweenRef.current = gsap.to(track, {
                        x: `+=${throwDist}`,
                        duration: duration,
                        ease: "power2.out",
                        overwrite: true,
                        modifiers: {
                            x: gsap.utils.unitize((x: number) =>
                                gsap.utils.wrap(-setWidth, 0, x)
                            ),
                        },
                    });
                }
            }
        };

        wrapper.addEventListener("touchstart", handleTouchStart, { passive: true });
        wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
        wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });
        wrapper.addEventListener("touchcancel", handleTouchEnd, { passive: true });

        // Mouse Wheel / Trackpad Scroll
        const handleWheel = (e: WheelEvent) => {
            const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            if (isHorizontal || e.shiftKey) {
                e.preventDefault();
                let delta = (isHorizontal ? e.deltaX : e.deltaY) * 3;
                if (delta > 350) delta = 350;
                if (delta < -350) delta = -350;
                moveCarousel(delta);
            }
        };

        wrapper.addEventListener("wheel", handleWheel, { passive: false });

        // ── Window Scroll Sync 
        let lastScrollY = window.scrollY;
        let rafId: number | null = null;

        const handleWindowScroll = () => {
            if (rafId !== null) return;

            rafId = requestAnimationFrame(() => {
                rafId = null;

                // Don't fight active dragging
                if (isMouseDown || isTouchDragging) {
                    lastScrollY = window.scrollY;
                    return;
                }

                const rect = wrapper.getBoundingClientRect();
                const viewH = window.innerHeight;

                const isVisible = rect.bottom > 0 && rect.top < viewH;
                if (!isVisible) {
                    lastScrollY = window.scrollY;
                    return;
                }

                const scrollDelta = window.scrollY - lastScrollY;
                lastScrollY = window.scrollY;

                let delta = scrollDelta * 3;
                if (delta > 300) delta = 300;
                if (delta < -300) delta = -300;

                if (delta !== 0) moveCarousel(delta);
            });
        };

        window.addEventListener("scroll", handleWindowScroll, { passive: true });

        return () => {
            tweenRef.current?.kill();
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleWindowScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            wrapper.removeEventListener("mousedown", handleMouseDown);
            wrapper.removeEventListener("touchstart", handleTouchStart);
            wrapper.removeEventListener("touchmove", handleTouchMove);
            wrapper.removeEventListener("touchend", handleTouchEnd);
            wrapper.removeEventListener("touchcancel", handleTouchEnd);
            wrapper.removeEventListener("wheel", handleWheel);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    const categories = [
        {
            label: "Frontend & backend",
            title: "Modern web applications",
            body: "Clean architecture and scalable design patterns, from component-based frontends to server-side rendering and APIs.",
            groups: [
                { name: "Frontend", skills: frontendSkills },
                { name: "Backend", skills: backendSkills },
            ],
        },
        {
            label: "Database & DevOps",
            title: "Data and delivery",
            body: "SQL and NoSQL schemas tuned for query performance, deployed and managed in containerised cloud environments.",
            groups: [
                { name: "Database", skills: databaseSkills },
                { name: "DevOps", skills: devopsSkills },
            ],
        },
    ];

    return (
        <section className="ac-section" id="skills" ref={sectionRef}>
            <div className="ac-frame">
                <div className="ac-bar">
                    <span>
                        <span className="ac-bar__index">{SECTION} /</span> Skills & tech
                    </span>
                    <span className="ac-bar__aside">Languages · stack · tooling</span>
                </div>

                <div className="ac-intro">
                    <h2 className="ac-title st-title">
                        The <em>tools</em> I build with.
                    </h2>
                    <p className="ac-lede st-lede">
                        A full-stack toolkit, from the database schema to the
                        deploy pipeline, picked for building systems that stay
                        reliable as they grow.
                    </p>
                </div>

                <div className="st-cells">
                    {categories.map((cat, i) => (
                        <article className="st-cell" key={cat.label}>
                            <span className="ac-label ac-faint">
                                {`${SECTION}.${i + 1}`} · {cat.label}
                            </span>
                            <h3 className="ac-heading st-cell__title">{cat.title}</h3>
                            <p className="ac-body">{cat.body}</p>
                            {cat.groups.map((group) => (
                                <div className="st-group" key={group.name}>
                                    <span className="ac-label ac-faint">{group.name}</span>
                                    <div className="ac-chips">
                                        {group.skills.map((skill) => (
                                            <span key={skill} className="ac-chip">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </article>
                    ))}
                </div>

                {/* Languages: proficiency meters */}
                <div className="st-langs">
                    <div className="ac-label st-subbar">
                        <span>Languages</span>
                        <span className="ac-faint">Proficiency</span>
                    </div>
                    <ul className="st-lang-list">
                        {languageColors.map((lang, i) => (
                            <li
                                className="st-lang"
                                key={lang.name}
                                style={{ "--lang-color": lang.color } as React.CSSProperties}
                            >
                                <span className="ac-label ac-faint st-lang__num">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="st-lang__name">{lang.name}</span>
                                <span className="st-lang__track" aria-hidden="true">
                                    <span
                                        className="st-lang__fill"
                                        style={{ width: `${lang.level}%` }}
                                    />
                                </span>
                                <span className="ac-label st-lang__value" data-level={lang.level}>
                                    {lang.level}%
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tools & methodology */}
                <div className="st-tools">
                    <span className="ac-label ac-faint st-tools__label">C · Tools & methodology</span>
                    <div className="ac-chips">
                        {toolsSkills.map((skill) => (
                            <span key={skill} className="ac-chip">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tech stack carousel */}
                <div className="st-stack">
                    <div className="ac-label st-subbar">
                        <span>Tech stack</span>
                        <span className="ac-faint">Drag ↔</span>
                    </div>
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
            </div>
        </section>
    );
}
