import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useFadeInUp, useStaggerChildren, useFadeInLeft, useFadeInRight } from "../../utils/gsapAnimations";
import "./SkillsTechnologies.css";
import { FaReact, FaNodeJs, FaVuejs, FaDocker, FaGitAlt } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiNestjs, SiDjango, SiExpress, SiMongodb, SiKeycloak } from "react-icons/si";




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
            let width = 0;
            for (let i = 0; i < totalCards; i++) {
                const card = cards[i] as HTMLElement;
                if (card) {
                    width += card.offsetWidth + 24; // 24px = gap
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

    return (
        <section className="st-section" id="skills">
            <div className="st-container">
                <h2 className="st-main-title" ref={headerRef as any}>
                    SKILLS & TECH
                </h2>

                <div className="st-content">
                    <div className="st-columns">
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

                    {/* Right Color Bar (Programming Languages) */}
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

                {/* Tools & Methodology Bar */}
                <div className="st-tools-bar">
                    <h3 className="st-col-header">[TOOLS & METHODOLOGY]</h3>
                    <div className="st-tag-cloud st-tag-cloud--tools">
                        {toolsSkills.map((skill, i) => (
                            <span key={i} className="st-tag st-tag--tool">{skill}</span>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Carousel */}
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
