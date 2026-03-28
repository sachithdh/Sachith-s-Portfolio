import { useEffect, useState, useRef, useMemo } from "react";
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { useParams, Link } from "react-router-dom";
import { type BlogPost } from "./Blog";
import supabase from "../../utils/supabase";
import { useTheme } from "../../utils/ThemeContext";
import "./Blog.css";

// ─── Markdown Renderer ────────────────────────────────────────────────────────
export function parseMarkdown(markdown: string): string {
  const lines = markdown.split("\n");
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.match(/^```/)) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].match(/^```/)) {
        codeLines.push(
          lines[i]
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;"),
        );
        i++;
      }
      // Render copy button without inline JS. Event handling is delegated in the React component.
      result.push(
        `<pre class="md-code-block"><div class="md-code-header"><span class="md-code-lang">${
          lang || "code"
        }</span><button class="md-copy-btn">Copy</button></div><code class="md-code">${codeLines.join(
          "\n",
        )}</code></pre>`,
      );
      i++;
      continue;
    }

    const h6 = line.match(/^######\s+(.*)/);
    if (h6) {
      result.push(`<h6 class="md-h6">${inlineMD(h6[1])}</h6>`);
      i++;
      continue;
    }
    const h5 = line.match(/^#####\s+(.*)/);
    if (h5) {
      result.push(`<h5 class="md-h5">${inlineMD(h5[1])}</h5>`);
      i++;
      continue;
    }
    const h4 = line.match(/^####\s+(.*)/);
    if (h4) {
      result.push(`<h4 class="md-h4">${inlineMD(h4[1])}</h4>`);
      i++;
      continue;
    }
    const h3 = line.match(/^###\s+(.*)/);
    if (h3) {
      result.push(`<h3 class="md-h3">${inlineMD(h3[1])}</h3>`);
      i++;
      continue;
    }
    const h2 = line.match(/^##\s+(.*)/);
    if (h2) {
      result.push(`<h2 class="md-h2">${inlineMD(h2[1])}</h2>`);
      i++;
      continue;
    }
    const h1 = line.match(/^#\s+(.*)/);
    if (h1) {
      result.push(`<h1 class="md-h1">${inlineMD(h1[1])}</h1>`);
      i++;
      continue;
    }

    if (line.match(/^>\s/)) {
      const ql: string[] = [];
      while (i < lines.length && lines[i].match(/^>\s?/)) {
        ql.push(inlineMD(lines[i].replace(/^>\s?/, "")));
        i++;
      }
      result.push(
        `<blockquote class="md-blockquote">${ql.join("<br>")}</blockquote>`,
      );
      continue;
    }
    if (line.match(/^- \[[ x]\]/)) {
      const tl: string[] = [];
      while (i < lines.length && lines[i].match(/^- \[[ x]\]/)) {
        const checked = lines[i].match(/^- \[x\]/i);
        const text = lines[i].replace(/^- \[[ x]\]\s*/i, "");
        tl.push(
          `<li class="md-task-item ${
            checked ? "md-task--done" : ""
          }"><span class="md-checkbox">${checked ? "✓" : ""}</span>${inlineMD(
            text,
          )}</li>`,
        );
        i++;
      }
      result.push(`<ul class="md-task-list">${tl.join("")}</ul>`);
      continue;
    }
    if (line.match(/^[-*+]\s/)) {
      const ll: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*+]\s/)) {
        ll.push(
          `<li class="md-li">${inlineMD(lines[i].replace(/^[-*+]\s/, ""))}</li>`,
        );
        i++;
      }
      result.push(`<ul class="md-ul">${ll.join("")}</ul>`);
      continue;
    }
    if (line.match(/^\d+\.\s/)) {
      const ll: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        ll.push(
          `<li class="md-li">${inlineMD(lines[i].replace(/^\d+\.\s/, ""))}</li>`,
        );
        i++;
      }
      result.push(`<ol class="md-ol">${ll.join("")}</ol>`);
      continue;
    }
    if (line.match(/^---+$/)) {
      result.push(`<hr class="md-hr" />`);
      i++;
      continue;
    }
    if (line.match(/^!\[\[(.+)\]\]/)) {
      const url = line.match(/^!\[\[(.+)\]\]/)![1];
      result.push(
        `<figure class="md-figure"><img src="${url}" alt="" class="md-img" loading="lazy" /></figure>`,
      );
      i++;
      continue;
    }

    // Table support
    if (line.match(/^\|/)) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].match(/^\|/)) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.filter((r) => !r.match(/^\|[-|: ]+\|$/));
      const tableHtml = rows
        .map((row, ri) => {
          const cells = row
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());
          const tag = ri === 0 ? "th" : "td";
          return `<tr>${cells
            .map((c) => `<${tag} class="md-td">${inlineMD(c)}</${tag}>`)
            .join("")}</tr>`;
        })
        .join("");
      result.push(
        `<div class="md-table-wrapper"><table class="md-table">${tableHtml}</table></div>`,
      );
      continue;
    }

    if (line.trim() === "") {
      result.push(`<div class="md-spacer"></div>`);
      i++;
      continue;
    }
    result.push(`<p class="md-p">${inlineMD(line)}</p>`);
    i++;
  }
  return result.join("\n");
}

export function inlineMD(text: string): string {
  return text
    .replace(
      /!\[\[(.+?)\]\]/g,
      (_m, url) =>
        `<img src="${url}" alt="Image" class="md-img-inline" loading="lazy" />`,
    )
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_m, alt, url) =>
        `<img src="${url}" alt="${alt}" class="md-img-inline" loading="lazy" />`,
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_m, txt, url) =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer" class="md-link">${txt}</a>`,
    )
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, `<code class="md-inline-code">$1</code>`)
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    .replace(/==(.+?)==/g, `<mark class="md-highlight">$1</mark>`);
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const { theme, toggleTheme } = useTheme();
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (data) {
          setPost(data as BlogPost);
        } else if (error) {
          console.error("Fetch error:", error.message);
        }
      } catch (err) {
        console.error("Exception:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Delegate click events for copy buttons inside rendered markdown.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest(".md-copy-btn") as HTMLElement | null;
      if (!btn) return;
      const pre = btn.closest("pre");
      if (!pre) return;
      const code = pre.querySelector("code");
      if (!code) return;
      try {
        navigator.clipboard.writeText((code as HTMLElement).innerText);
      } catch (err) {
        // ignore clipboard errors
      }
    };

    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [post]);

  const sanitizedContent = useMemo(() => {
    if (!post?.content) return "";
    return sanitizeHtml(parseMarkdown(post.content));
  }, [post?.content]);

  if (loading) {
    return (
      <div
        className="blog-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          minHeight: "100vh",
        }}
      >
        <h2 style={{ color: "#fff", fontFamily: "var(--font-sans)" }}>
          Loading Post...
        </h2>
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className="blog-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
          minHeight: "100vh",
        }}
      >
        <h2 style={{ color: "#fff", fontFamily: "var(--font-sans)" }}>
          Post not found
        </h2>
        <Link to="/blog" className="blog-create-btn">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {/* ── Page Nav ── */}
      <header className="blog-page-nav">
        <Link to="/blog" className="blog-page-nav__back">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 14L6 9l5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Blog
        </Link>
        <div className="blog-page-nav__brand">
          <div className="blog-page-nav__brand-dot" />
          <span>Sachith's Blog</span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            className="blog-theme-toggle"
            onClick={toggleTheme}
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
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
          </button>
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

      {/* ── Post Content ── */}
      <div className="blog-container blog-container--post">
        <div className="blog-reader">
          <div className="blog-reader__cover">
            <img src={post.coverImage} alt={post.title} />
            <div className="blog-reader__cover-overlay" />
          </div>
          <article className="blog-reader__article">
            <div className="blog-reader__tags">
              {post.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="blog-reader__title">{post.title}</h1>
            <div className="blog-reader__meta">
              {/* <img
                src={post.authorAvatar}
                alt={post.author}
                className="blog-reader__avatar"
              /> */}
              <div className="blog-reader__meta-info">
                {/* <span className="blog-reader__author">Sachith</span> */}
                <span className="blog-reader__date-read">
                  {post.publishedAt} · {post.readTime}
                </span>
              </div>
            </div>
            <div
              ref={bodyRef}
              className="blog-reader__body md-body"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </article>
        </div>
      </div>
    </div>
  );
}
