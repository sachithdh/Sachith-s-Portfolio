import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuArrowUpRight, LuSun, LuMoon, LuMenu, LuX } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "../../utils/ThemeContext";
import { scrollToTarget } from "../../utils/smoothScroll";
import "./TopNavBar.css";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
  { label: "Blog", href: "/blog" },
];
const SECTION_LINKS = NAV_LINKS.filter((link) => link.href.startsWith("/#"));
const BLOG_LINK = NAV_LINKS[NAV_LINKS.length - 1];

export default function TopNavBar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we just navigated to the home page with a hash, perform the scroll
    if (location.pathname === "/" && location.hash) {
      setTimeout(() => {
        scrollToTarget(location.hash);
      }, 100);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Only determine active section based on scroll if on home page
      if (location.pathname !== "/") {
        if (location.pathname.startsWith("/blog")) {
          setActiveLink("Blog");
        }
        return;
      }

      const sections = NAV_LINKS.filter(link => link.href.startsWith("/#")).map((link) => ({
        label: link.label,
        el: document.querySelector(link.href.replace("/", "")) as HTMLElement | null,
      }));

      const offset = window.innerHeight * 0.4;
      let current = "Home";
      for (const { label, el } of sections) {
        if (el && el.getBoundingClientRect().top <= offset) {
          current = label;
        }
      }
      setActiveLink(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const handleNavClick = (link: NavLink) => {
    setMenuOpen(false);

    // Cross-page routing logic
    if (link.href.startsWith("/#")) {
      const hash = link.href.replace("/", "");
      if (location.pathname !== "/") {
        navigate(link.href);
      } else {
        setActiveLink(link.label);
        const target = document.querySelector(hash);
        if (target) {
          scrollToTarget(hash);
        } else {
          navigate(link.href);
        }
      }
    } else {
      setActiveLink(link.label);
      navigate(link.href);
    }
  };

  return (
    <header className={`topnav${scrolled ? " topnav--scrolled" : ""}`}>
      <nav className="topnav__bar" aria-label="Main navigation">
        <button
          type="button"
          className="topnav__cell topnav__logo"
          onClick={() => handleNavClick(NAV_LINKS[0])}
          aria-label="Sachith Dhanushka, back to top"
        >
          SD
        </button>

        <ul className="topnav__links" role="list">
          {SECTION_LINKS.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                className={`topnav__link${activeLink === link.label ? " is-active" : ""}`}
                onClick={() => handleNavClick(link)}
                aria-current={activeLink === link.label ? "location" : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="topnav__right">
          <a
            href="https://www.github.com/sachithdh"
            className="topnav__cell topnav__icon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={16} />
          </a>
          <button
            type="button"
            className="topnav__cell topnav__icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <LuSun size={16} /> : <LuMoon size={16} />}
          </button>
          <button
            type="button"
            className={`topnav__cell topnav__cta${activeLink === "Blog" ? " is-active" : ""}`}
            onClick={() => handleNavClick(BLOG_LINK)}
          >
            Blog
            <LuArrowUpRight size={14} />
          </button>
          <button
            type="button"
            className={`topnav__cell topnav__icon topnav__burger${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="topnav-menu"
          >
            {menuOpen ? <LuX size={18} /> : <LuMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: numbered rows dropping from the bar */}
      <div
        id="topnav-menu"
        className={`topnav__menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label}>
              <button
                type="button"
                className={`topnav__menu-link${activeLink === link.label ? " is-active" : ""}`}
                onClick={() => handleNavClick(link)}
              >
                <span className="topnav__menu-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="topnav__menu-label">{link.label}</span>
                <LuArrowUpRight size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
