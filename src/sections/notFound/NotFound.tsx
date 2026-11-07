import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuArrowLeft, LuArrowUpRight } from "react-icons/lu";
import "./NotFound.css";

export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    const previous = document.title;
    document.title = "404 — Page not found";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="not-found-page">
      <main className="ac-section not-found-main">
        <div className="ac-frame">
          <div className="ac-bar">
            <span>
              <span className="ac-bar__index">404</span> / Not found
            </span>
            <span className="ac-bar__aside">Error</span>
          </div>

          <div className="ac-intro not-found-intro">
            <div>
              <p className="not-found-code" aria-hidden="true">404</p>
              <h1 className="ac-title">
                Page not <em>found.</em>
              </h1>
              <p className="ac-lede">
                Nothing lives at <code className="not-found-path">{pathname}</code>. It may
                have moved, or the link might be mistyped.
              </p>
              <div className="not-found-actions">
                <Link to="/" className="ac-btn ac-btn--solid">
                  <LuArrowLeft size={14} /> Back home
                </Link>
                <Link to="/blog" className="ac-btn ac-btn--outline">
                  Read the blog <LuArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
