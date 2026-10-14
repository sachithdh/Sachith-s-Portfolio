import { Link } from "react-router-dom";
import { LuArrowUpRight } from "react-icons/lu";
import { useBlogPosts, formatDate, type BlogPostMeta } from "./useBlogPosts";
import BlogTopbar from "./BlogTopbar";
import "./Blog.css";

export default function BlogList() {
  const posts = useBlogPosts();
  const count = `${posts.length} ${posts.length === 1 ? "post" : "posts"}`;

  return (
    <div className="blog-page">
      <BlogTopbar />

      <main className="ac-section blog-main">
        <div className="ac-frame">
          <div className="ac-bar">
            <span>
              <span className="ac-bar__index">/</span> Blog
            </span>
            <span className="ac-bar__aside">{count}</span>
          </div>

          <header className="ac-intro">
            <h1 className="ac-title">
              Thoughts, <em>ideas</em> & things I've learned.
            </h1>
            <p className="ac-lede blog-list__lede">
              Notes from building software: what worked, what didn't, and the
              patterns I keep reaching for.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="ac-body blog-empty">No posts yet.</p>
          ) : (
            <ol className="blog-list">
              {posts.map((post: BlogPostMeta, i) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="blog-entry ac-focus">
                    <div className="blog-entry__meta">
                      <span className="ac-label ac-faint">
                        {String(posts.length - i).padStart(2, "0")}
                      </span>
                      <time className="ac-label" dateTime={post.date}>
                        {formatDate(post.date)}
                      </time>
                      {post.readTime && (
                        <span className="ac-label ac-faint">{post.readTime}</span>
                      )}
                    </div>

                    <div className="blog-entry__body">
                      <h2 className="ac-heading blog-entry__title">{post.title}</h2>
                      {post.description && (
                        <p className="ac-body">{post.description}</p>
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
                    </div>

                    <LuArrowUpRight size={18} className="blog-entry__arrow" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ol>
          )}

          <Link to="/" className="ac-label ac-link-row">
            <span>
              Back to portfolio <span className="ac-faint">· /</span>
            </span>
            <LuArrowUpRight size={16} />
          </Link>
        </div>
      </main>
    </div>
  );
}
