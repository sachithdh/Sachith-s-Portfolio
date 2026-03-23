import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../utils/supabase";
import "./BlogOverview.css";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
}

export default function BlogOverview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  /* ── Intersection Observer for scroll-in animation ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ── Fetch latest 3 posts ── */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("id, title, excerpt, coverImage, publishedAt, readTime, tags")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        if (data) setPosts(data);
      } catch (err: any) {
        console.error("BlogOverview fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section ref={sectionRef} className={`bo-section ${visible ? "bo-visible" : ""}`}>
      {/* ── Ambient glow ── */}
      <div className="bo-glow bo-glow--a" aria-hidden="true" />
      <div className="bo-glow bo-glow--b" aria-hidden="true" />

      <div className="bo-inner">
        {/* ── Header ── */}
        <div className="bo-header">
          <div className="bo-header__left">
            <span className="bo-eyebrow">THOUGHTS &amp; WRITINGS</span>
            <h2 className="bo-title">
              The <span className="bo-title--accent">Blog</span>
            </h2>
            <p className="bo-subtitle">
              Exploring ideas at the intersection of technology,&nbsp;creativity,
              and human experience.
            </p>
          </div>
          <Link to="/blog" className="bo-view-all">
            View all posts
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="bo-loading">
            <span className="bo-loading__dot" />
            <span className="bo-loading__dot" />
            <span className="bo-loading__dot" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bo-empty">
            <p>No posts yet — check back soon.</p>
            <Link to="/blog" className="bo-view-all bo-view-all--inline">
              Visit the blog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="bo-grid">
            {/* ── Featured (first) post ── */}
            <article
              className="bo-card bo-card--featured"
              onClick={() => navigate(`/blog/${posts[0].id}`)}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/blog/${posts[0].id}`)}
              aria-label={`Read: ${posts[0].title}`}
            >
              <div className="bo-card__img-wrap">
                {posts[0].coverImage ? (
                  <img
                    src={posts[0].coverImage}
                    alt={posts[0].title}
                    className="bo-card__img"
                    loading="lazy"
                  />
                ) : (
                  <div className="bo-card__img-placeholder" />
                )}
                <div className="bo-card__img-overlay" />
                {posts[0].tags?.[0] && (
                  <span className="bo-card__badge">{posts[0].tags[0]}</span>
                )}
              </div>
              <div className="bo-card__body">
                <div className="bo-card__meta">
                  {posts[0].publishedAt && (
                    <span className="bo-card__date">{posts[0].publishedAt}</span>
                  )}
                  {posts[0].readTime && (
                    <>
                      <span className="bo-card__dot" />
                      <span className="bo-card__read">{posts[0].readTime}</span>
                    </>
                  )}
                </div>
                <h3 className="bo-card__title">{posts[0].title}</h3>
                {posts[0].excerpt && (
                  <p className="bo-card__excerpt">{posts[0].excerpt}</p>
                )}
                <span className="bo-card__cta">
                  Read article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </article>

            {/* ── Side cards (2 & 3) ── */}
            {posts.length > 1 && (
              <div className="bo-side-stack">
                {posts.slice(1).map((post) => (
                  <article
                    key={post.id}
                    className="bo-card bo-card--side"
                    onClick={() => navigate(`/blog/${post.id}`)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && navigate(`/blog/${post.id}`)}
                    aria-label={`Read: ${post.title}`}
                  >
                    <div className="bo-card__img-wrap bo-card__img-wrap--side">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="bo-card__img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="bo-card__img-placeholder" />
                      )}
                      <div className="bo-card__img-overlay" />
                    </div>
                    <div className="bo-card__body bo-card__body--side">
                      <div className="bo-card__meta">
                        {post.tags?.[0] && (
                          <span className="bo-card__tag">{post.tags[0]}</span>
                        )}
                        {post.readTime && (
                          <>
                            <span className="bo-card__dot" />
                            <span className="bo-card__read">{post.readTime}</span>
                          </>
                        )}
                      </div>
                      <h3 className="bo-card__title bo-card__title--side">{post.title}</h3>
                      {post.excerpt && (
                        <p className="bo-card__excerpt bo-card__excerpt--side">{post.excerpt}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Mobile CTA ── */}
        <div className="bo-footer-cta">
          <Link to="/blog" className="bo-view-all">
            Explore all articles
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
