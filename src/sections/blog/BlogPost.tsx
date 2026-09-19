import { useParams, useNavigate, Link } from "react-router-dom";
import Markdown, { type Components } from "react-markdown";
import { LuArrowLeft } from "react-icons/lu";
import { useBlogPosts, blogImageMap } from "./useBlogPosts";
import "./Blog.css";

/**
 * Resolve a markdown image src to a Vite-processed asset URL.
 */
function resolveImageSrc(src: string | undefined): string {
  if (!src) return "";
  // Absolute URLs or root-relative paths - use as-is
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }
  // Strip leading "./" if present, and decode URI components (e.g. %20 -> space)
  const decoded = decodeURIComponent(src.replace(/^\.\//, ""));
  return blogImageMap[decoded] || src;
}

// Custom react-markdown components with image resolution
const markdownComponents: Components = {
  img: ({ src, alt, ...props }) => (
    <figure className="blog-reader__figure">
      <img
        {...props}
        src={resolveImageSrc(src)}
        alt={alt || ""}
        loading="lazy"
        decoding="async"
      />
      {alt && <figcaption className="blog-reader__figcaption">{alt}</figcaption>}
    </figure>
  ),
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const posts = useBlogPosts();

  const post = posts.find((p) => p.slug === id);

  if (!post) {
    return (
      <div className="blog-page">
        <nav className="blog-topbar">
          <Link to="/" className="blog-back-to-portfolio">
            <LuArrowLeft size={16} />
            <span>Go to Portfolio</span>
          </Link>
        </nav>

        <div className="blog-reader">
          <button
            className="blog-reader__back"
            onClick={() => navigate("/blog")}
          >
            <span className="blog-reader__back-arrow">←</span>
            All posts
          </button>
          <div className="blog-not-found">
            <h1 className="blog-not-found__title">Post not found</h1>
            <p className="blog-not-found__text">
              The post you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <nav className="blog-topbar">
        <Link to="/" className="blog-back-to-portfolio">
          <LuArrowLeft size={16} />
          <span>Go to Portfolio</span>
        </Link>
      </nav>

      <div className="blog-reader">
        <button
          className="blog-reader__back"
          onClick={() => navigate("/blog")}
        >
          <span className="blog-reader__back-arrow">←</span>
          All posts
        </button>

        <header className="blog-reader__header">
          <h1 className="blog-reader__title">{post.title}</h1>
          <div className="blog-reader__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="blog-entry__meta-dot" aria-hidden="true" />
            <span>{post.readTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div className="blog-reader__tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-reader__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="blog-reader__body">
          <Markdown components={markdownComponents}>{post.content}</Markdown>
        </article>
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
