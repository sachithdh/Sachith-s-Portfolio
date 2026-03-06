import "./ProfileCard.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const Card = () => {
  const githubUrl = "https://github.com/sachithdh";
  const linkedinUrl = "https://www.linkedin.com/in/sachithdh/";
  const instagramUrl = "https://www.instagram.com/sachithdh/";
  const email = "sachith.devx@gmail.com";

  return (
    <div className="card">
      <a className="mail" href={`mailto:${email}`} aria-label="Email">
        <MdOutlineEmail />
      </a>
      <div className="profile-pic">
        <img
          src="/images/xeptagon_logo.webp"
          alt="Devanta Ebison Profile"
          className="profile-cutout"
        />
      </div>
      <div className="bottom">
        <div className="content">
          <span className="name">Sachith Dhanushka</span>
          <span className="about-me">
            A developer passionate about building high-performance software.
          </span>
        </div>
        <div className="bottom-bottom">
          <div className="social-links-container">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
          <a className="button" href={`mailto:${email}`}>
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
