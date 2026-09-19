import { useNavigate, Link } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";
import { useBlogPosts, type BlogPostMeta } from "./useBlogPosts";
import "./Blog.css";

export default function BlogList() {
  const posts = useBlogPosts();
  const navigate = useNavigate();

  return (
    <div className="blog-page">
      <nav className="blog-topbar">
        <Link to="/" className="blog-back-to-portfolio">
          <LuArrowLeft size={16} />
          <span>Go to Portfolio</span>
        </Link>
      </nav>

      <div className="blog-list">
        <header className="blog-list__header">
          <h1 className="blog-list__title">Sachith's Blog</h1>
          <p className="blog-list__subtitle">
            Thoughts, ideas &amp; things I've learned · {posts.length}{" "}
            {posts.length === 1 ? "post" : "posts"}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-empty">No posts yet.</p>
        ) : (
          <div className="blog-list__entries">
            {posts.map((post: BlogPostMeta) => (
              <article
                key={post.slug}
                className="blog-entry"
                onClick={() => navigate(`/blog/${post.slug}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate(`/blog/${post.slug}`);
                }}
              >
                <div className="blog-entry__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="blog-entry__meta-dot" aria-hidden="true" />
                  <span>{post.readTime}</span>
                </div>

                <h2 className="blog-entry__title">{post.title}</h2>

                {post.description && (
                  <p className="blog-entry__description">{post.description}</p>
                )}

                {post.tags.length > 0 && (
                  <div className="blog-entry__tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-entry__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}
