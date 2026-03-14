import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useTheme } from "../../utils/ThemeContext";
import supabase from "../../utils/supabase";
import "./Blog.css";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  claps: number;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  //   const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Auth Session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (err: any) {
        console.error("Error fetching posts:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div
        className="blog-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <h2 style={{ color: "#fff", fontFamily: "var(--font-sans)" }}>
          Loading Posts...
        </h2>
      </div>
    );
  }

  const [featuredPost, ...gridPosts] = posts && posts.length > 0 ? posts : [];

  return (
    <>
      <div className="blog-page">
        {/* ── Nav ── */}
        <header className="blog-page-nav">
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* Theme Toggle */}
            {/* <button
              className="blog-theme-toggle"
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button> */}
            {session && (
              <>
                <Link to="/blog/create" className="blog-create-btn">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1v14M1 8h14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  New Post
                </Link>
                <button
                  className="blog-create-btn"
                  style={{
                    background: "transparent",
                    border: "1px solid var(--blog-border)",
                    color: "var(--blog-muted-txt)",
                  }}
                  onClick={async () => {
                    await supabase.auth.signOut();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </header>

        {/* ── Hero Title ── */}
        <div className="blog-page-hero">
          <span className="blog-label">THOUGHTS &amp; WRITINGS</span>
          <h1 className="blog-title">THE BLOG</h1>
          <p className="blog-subtitle">
            A space where I explore ideas, philosophies, and the intersection of
            technology with human experience.
          </p>
        </div>

        <div className="blog-container">
          {/* ── Featured Post ── */}
          {featuredPost && (
            <div
              className="blog-featured"
              onClick={() => navigate(`/blog/${featuredPost.id}`)}
            >
              <div className="blog-featured__image-wrap">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="blog-featured__image"
                />
                <div className="blog-featured__image-overlay" />
              </div>
              <div className="blog-featured__content">
                <div className="blog-featured__meta">
                  <span className="blog-featured__date">
                    {featuredPost.publishedAt}
                  </span>
                  <span className="blog-featured__dot" />
                  <span className="blog-featured__tag">
                    {featuredPost.tags[0]}
                  </span>
                </div>
                <h2 className="blog-featured__title">{featuredPost.title}</h2>
                <p className="blog-featured__excerpt">{featuredPost.excerpt}</p>
                <button className="blog-featured__cta">
                  Continue Reading
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── Post Grid ── */}
          {gridPosts.length > 0 && (
            <div className="blog-grid">
              {gridPosts.map((post) => (
                <article
                  key={post.id}
                  className="blog-card"
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <div className="blog-card__image-wrap">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="blog-card__image"
                      loading="lazy"
                    />
                    <div className="blog-card__image-overlay" />
                  </div>
                  <div className="blog-card__body">
                    <h3 className="blog-card__title">{post.title}</h3>
                    {post.excerpt && (
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                    )}
                    <div className="blog-card__meta">
                      <span className="blog-card__date">
                        {post.publishedAt}
                      </span>
                      <span className="blog-card__dot" />
                      <span className="blog-card__tag">{post.tags[0]}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
