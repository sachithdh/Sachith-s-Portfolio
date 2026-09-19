import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LuExternalLink } from "react-icons/lu";
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

export default function TopNavBar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we just navigated to the home page with a hash, perform the scroll
    if (location.pathname === "/" && location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
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
          target.scrollIntoView({ behavior: "smooth" });
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
    <header className={`topnav-wrapper${scrolled ? " topnav-scrolled" : ""}`}>
      <nav className="topnav-pill" role="navigation" aria-label="Main navigation">
        <ul className="topnav-links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                className={link.label === "Blog" ? "topnav-cta" : `topnav-link${activeLink === link.label ? " topnav-link--active" : ""}`}
                onClick={() => handleNavClick(link)}
                aria-current={activeLink === link.label ? "page" : undefined}
              >
                {link.label}
                {link.label === "Blog" && <LuExternalLink size={12} style={{ marginLeft: 4 }} />}
                {activeLink === link.label && link.label !== "Blog" && (
                  <span className="topnav-active-dot" aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`topnav-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`topnav-mobile-menu${menuOpen ? " topnav-mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <ul role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button
                className={`topnav-mobile-link${activeLink === link.label ? " topnav-link--active" : ""}`}
                onClick={() => handleNavClick(link)}
                tabIndex={menuOpen ? 0 : -1}
                style={link.label === "Blog" ? { color: "var(--text-primary)", fontWeight: "bold" } : {}}
              >
                {link.label}
                {link.label === "Blog" && <LuExternalLink size={12} style={{ marginLeft: 4 }} />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
