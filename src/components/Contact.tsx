import "./Contact.css";
import {
  useFadeInUp,
  useFadeInLeft,
  useFadeInRight,
} from "../utils/gsapAnimations";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiMapPin,
} from "react-icons/fi";

export default function Contact() {
  const headerRef = useFadeInUp(0);
  const formRef = useFadeInLeft(0.2);
  const infoRef = useFadeInRight(0.2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Form submitted");
  };

  return (
    <section className="contact-section section-container" id="contact">
      <div className="contact-header" ref={headerRef as any}>
        <span className="contact-label">• Get In Touch</span>
        <h2 className="contact-title">Let's Work Together</h2>
        <p className="contact-description">
          Have a project in mind or want to collaborate? I'd love to hear from
          you. Drop me a message and let's create something amazing together.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-form-wrapper" ref={formRef as any}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
              <span className="btn-arrow">→</span>
            </button>
          </form>
        </div>

        <div className="contact-info" ref={infoRef as any}>
          <div className="info-card">
            <div className="info-icon">
              <FiMail />
            </div>
            <h3>Email</h3>
            <a href="mailto:sachithdhanushka12@gmail.com">
              sachithdhanushka12@gmail.com
            </a>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <FiMapPin />
            </div>
            <h3>Location</h3>
            <p>Colombo, Sri Lanka</p>
          </div>

          <div className="social-links-contact">
            <h3>Connect With Me</h3>
            <div className="social-icons">
              <a
                href="https://linkedin.com/in/sachithdh"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FiLinkedin />
              </a>
              <a
                href="https://github.com/sachithdh"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FiGithub />
              </a>
              <a
                href="https://twitter.com/sachithdh"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FiTwitter />
              </a>
            </div>
          </div>

          <div className="availability-badge">
            <div className="status-indicator"></div>
            <span>Available for freelance projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}
