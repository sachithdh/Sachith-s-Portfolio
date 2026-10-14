import { Link } from "react-router-dom";
import { LuArrowLeft, LuSun, LuMoon } from "react-icons/lu";
import { useTheme } from "../../utils/ThemeContext";

// Square instrument-panel bar shared by the blog index and post pages
export default function BlogTopbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="blog-topbar" aria-label="Blog">
      <Link to="/" className="ac-label blog-topbar__cell blog-topbar__back ac-focus">
        <LuArrowLeft size={14} />
        <span>Portfolio</span>
      </Link>

      <Link to="/blog" className="ac-label blog-topbar__brand ac-focus">
        Sachith <span className="ac-faint">/</span> Blog
      </Link>

      <button
        type="button"
        className="blog-topbar__cell blog-topbar__theme ac-focus"
        onClick={toggleTheme}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        {theme === "dark" ? <LuSun size={16} /> : <LuMoon size={16} />}
      </button>
    </nav>
  );
}
