import "./Footer.css";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-icon-footer"></div>
            <div className="brand-text-footer">
              <span className="brand-name-footer">Sachith</span>
              <span className="brand-name-footer">Dhanushka</span>
            </div>
          </div>

          <nav className="footer-nav">
            <div className="footer-nav-group">
              <h4>Navigation</h4>
              <ul>
                <li>
                  <a href="#hero">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#work">Work</a>
                </li>
                <li>
                  <a href="#projects">Projects</a>
                </li>
              </ul>
            </div>

            <div className="footer-nav-group">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#skills">Skills</a>
                </li>
                <li>
                  <a
                    href="https://github.com/sachithdh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/sachithdh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-nav-group">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="/resume.pdf" download>
                    Download CV
                  </a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="mailto:sachithdhanushka12@gmail.com">Email Me</a>
                </li>
              </ul>
            </div>
          </nav>

          <button
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FiArrowUp />
          </button>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a
              href="https://github.com/sachithdh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              href="https://linkedin.com/in/sachithdh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a
              href="https://twitter.com/sachithdh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="Twitter"
            >
              <FiTwitter />
            </a>
            <a
              href="mailto:sachithdhanushka12@gmail.com"
              className="footer-social-icon"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>

          <div className="footer-copyright">
            <p>
              &copy; {new Date().getFullYear()} Sachith Dhanushka. All rights
              reserved.
            </p>
            <p className="footer-tagline">Crafted with ❤️ and React</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
