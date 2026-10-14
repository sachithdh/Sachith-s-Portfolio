import { useParams, Link } from "react-router-dom";
import Markdown, { type Components } from "react-markdown";
import { LuArrowLeft, LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import BlogTopbar from "./BlogTopbar";
import { useBlogPosts, blogImageMap, formatDate } from "./useBlogPosts";
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
  const posts = useBlogPosts();
  const index = posts.findIndex((p) => p.slug === id);
  const post = posts[index];
  // Posts are sorted newest first: the next entry is the older one
  const older = index >= 0 ? posts[index + 1] : undefined;
  const newer = index > 0 ? posts[index - 1] : undefined;

  if (!post) {
    return (
      <div className="blog-page">
        <BlogTopbar />
        <main className="ac-section blog-main">
          <div className="ac-frame">
            <div className="ac-bar">
              <Link to="/blog" className="blog-reader__crumb ac-focus">
                <LuArrowLeft size={13} /> All posts
              </Link>
              <span className="ac-bar__aside">404</span>
            </div>
            <div className="ac-intro blog-not-found">
              <div>
                <h1 className="ac-title">
                  Post not <em>found.</em>
                </h1>
                <p className="ac-lede">
                  The post you're looking for doesn't exist or has been removed.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <BlogTopbar />

      <main className="ac-section blog-main">
        <div className="ac-frame">
          <div className="ac-bar">
            <Link to="/blog" className="blog-reader__crumb ac-focus">
              <LuArrowLeft size={13} /> All posts
            </Link>
            <span className="ac-bar__aside">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.readTime && <> · {post.readTime}</>}
            </span>
          </div>

          <header className="blog-reader__header">
            <h1 className="ac-title blog-reader__title">{post.title}</h1>
            {post.description && (
              <p className="ac-lede blog-reader__lede">{post.description}</p>
            )}
            {post.tags.length > 0 && (
              <div className="ac-chips">
                {post.tags.map((tag) => (
                  <span key={tag} className="ac-chip">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <article className="blog-reader__body">
            <Markdown components={markdownComponents}>{post.content}</Markdown>
          </article>

          <nav className="blog-pager" aria-label="More posts">
            {newer ? (
              <Link to={`/blog/${newer.slug}`} className="blog-pager__cell ac-focus">
                <span className="ac-label ac-faint">
                  <LuArrowLeft size={12} /> Newer
                </span>
                <span className="ac-heading blog-pager__title">{newer.title}</span>
              </Link>
            ) : (
              <span className="blog-pager__cell blog-pager__cell--empty" />
            )}
            {older ? (
              <Link
                to={`/blog/${older.slug}`}
                className="blog-pager__cell blog-pager__cell--next ac-focus"
              >
                <span className="ac-label ac-faint">
                  Older <LuArrowRight size={12} />
                </span>
                <span className="ac-heading blog-pager__title">{older.title}</span>
              </Link>
            ) : (
              <span className="blog-pager__cell blog-pager__cell--empty" />
            )}
          </nav>

          <Link to="/blog" className="ac-label ac-link-row">
            <span>
              All posts <span className="ac-faint">· /blog</span>
            </span>
            <LuArrowUpRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}
