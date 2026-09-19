import { useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { useBlogPosts } from "./useBlogPosts";
import "./Blog.css";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const posts = useBlogPosts();

  const post = posts.find((p) => p.slug === id);

  if (!post) {
    return (
      <div className="blog-page">
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
          <Markdown>{post.content}</Markdown>
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
