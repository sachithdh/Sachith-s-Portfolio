import "./AboutMe.css";

const AboutMe = () => {
  return (
    <div className="about-me-section">
      <div className="about-content">
        <h1 className="about-title">
          Inspiration Starting
          <br />
          From Designing
        </h1>

        <div className="sparkle sparkle-left">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z" />
          </svg>
        </div>

        <div className="sparkle sparkle-right">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0L22.5 17.5L40 20L22.5 22.5L20 40L17.5 22.5L0 20L17.5 17.5L20 0Z" />
          </svg>
        </div>

        <div className="about-layout">
          <div className="left-content">
            <div className="info-block">
              <h3 className="info-label">YEARS OF EXPERIENCE</h3>
              <p className="info-text">
                Maja Agnes has been operating in the Germany and internationally
                for 20 years and has developed an extensive portfolio of
                award-winning projects.
              </p>
            </div>

            <div className="info-block">
              <h3 className="info-label">CLIENTS ON WORLDWIDE</h3>
              <p className="info-text">
                MajaAgnes provides clients around the globe with high-end
                architectural interior design services.
              </p>
            </div>

            <div className="info-block">
              <h3 className="info-label">GOAL</h3>
              <p className="info-text">
                MajaAgnes's goal is to always exceed our clients' expectations
                with personalized service as we transform their visions into
                timeless designs.
              </p>
            </div>

            <div className="scroll-indicator">
              <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="18"
                  height="28"
                  rx="9"
                  strokeWidth="2"
                />
                <circle cx="10" cy="10" r="3" />
              </svg>
              <span>Scroll for amazing products!</span>
            </div>
          </div>

          <div className="center-content">
            <div className="profile-image-container">
              <img
                src="/images/me.png"
                alt="Maja Agnes"
                className="profile-image"
              />
            </div>
            <p className="brand-info">Brand based in Berlin, since 2010</p>
          </div>

          <div className="right-content">
            <div className="stat-block">
              <h3 className="stat-label">YEARS OF EXPERIENCE</h3>
              <p className="stat-value">12</p>
            </div>

            <div className="stat-block">
              <h3 className="stat-label">CLIENTS ON WORLDWIDE</h3>
              <p className="stat-value">10k+</p>
            </div>

            <div className="stat-block">
              <h3 className="stat-label">COUNTRIES</h3>
              <p className="stat-value">32+</p>
            </div>

            <div className="stat-block">
              <h3 className="stat-label">SALE DONE</h3>
              <p className="stat-value">124k+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
