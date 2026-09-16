import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../../utils/supabase";
import "./CreatePost.css";

// ─── Markdown Parser (reused from Blog.tsx) ────────────────────────────────
function parseMarkdown(markdown: string): string {
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
        codeLines.push(line2esc(lines[i]));
        i++;
      }
      result.push(
        `<pre class="md-code-block"><div class="md-code-header"><span class="md-code-lang">${lang || "code"}</span></div><code class="md-code">${codeLines.join("\n")}</code></pre>`
      );
      i++;
      continue;
    }

    const h6 = line.match(/^######\s+(.*)/);
    const h5 = line.match(/^#####\s+(.*)/);
    const h4 = line.match(/^####\s+(.*)/);
    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);

    if (h6) { result.push(`<h6 class="md-h6">${inlineMD(h6[1])}</h6>`); i++; continue; }
    if (h5) { result.push(`<h5 class="md-h5">${inlineMD(h5[1])}</h5>`); i++; continue; }
    if (h4) { result.push(`<h4 class="md-h4">${inlineMD(h4[1])}</h4>`); i++; continue; }
    if (h3) { result.push(`<h3 class="md-h3">${inlineMD(h3[1])}</h3>`); i++; continue; }
    if (h2) { result.push(`<h2 class="md-h2">${inlineMD(h2[1])}</h2>`); i++; continue; }
    if (h1) { result.push(`<h1 class="md-h1">${inlineMD(h1[1])}</h1>`); i++; continue; }

    if (line.match(/^>\s/)) {
      const ql: string[] = [];
      while (i < lines.length && lines[i].match(/^>\s?/)) {
        ql.push(inlineMD(lines[i].replace(/^>\s?/, "")));
        i++;
      }
      result.push(`<blockquote class="md-blockquote">${ql.join("<br>")}</blockquote>`);
      continue;
    }

    if (line.match(/^- \[[ x]\]/)) {
      const tl: string[] = [];
      while (i < lines.length && lines[i].match(/^- \[[ x]\]/)) {
        const checked = lines[i].match(/^- \[x\]/i);
        const text = lines[i].replace(/^- \[[ x]\]\s*/i, "");
        tl.push(
          `<li class="md-task-item ${checked ? "md-task--done" : ""}"><span class="md-checkbox">${checked ? "✓" : ""}</span>${inlineMD(text)}</li>`
        );
        i++;
      }
      result.push(`<ul class="md-task-list">${tl.join("")}</ul>`);
      continue;
    }

    if (line.match(/^[-*+]\s/)) {
      const ll: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*+]\s/)) {
        ll.push(`<li class="md-li">${inlineMD(lines[i].replace(/^[-*+]\s/, ""))}</li>`);
        i++;
      }
      result.push(`<ul class="md-ul">${ll.join("")}</ul>`);
      continue;
    }

    if (line.match(/^\d+\.\s/)) {
      const ll: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        ll.push(`<li class="md-li">${inlineMD(lines[i].replace(/^\d+\.\s/, ""))}</li>`);
        i++;
      }
      result.push(`<ol class="md-ol">${ll.join("")}</ol>`);
      continue;
    }

    if (line.match(/^---+$/)) { result.push(`<hr class="md-hr" />`); i++; continue; }
    if (line.match(/^!\[\[(.+)\]\]/)) {
      const imgUrl = line.match(/^!\[\[(.+)\]\]/)![1];
      result.push(`<figure class="md-figure"><img src="${imgUrl}" alt="" class="md-img" loading="lazy" /></figure>`);
      i++;
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

function line2esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineMD(text: string): string {
  return text
    .replace(/!\[\[(.+?)\]\]/g, (_m, url) => `<img src="${url}" alt="Image" class="md-img-inline" loading="lazy" />`)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt, url) => `<img src="${url}" alt="${alt}" class="md-img-inline" loading="lazy" />`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt, url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="md-link">${txt}</a>`)
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, `<code class="md-inline-code">$1</code>`)
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    .replace(/==(.+?)==/g, `<mark class="md-highlight">$1</mark>`);
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────
interface ToolbarAction {
  label: string;
  icon: string;
  syntax: string;
  wrap?: boolean;
  block?: boolean;
  tooltip: string;
}

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { label: "H1", icon: "H1", syntax: "# ", block: true, tooltip: "Heading 1" },
  { label: "H2", icon: "H2", syntax: "## ", block: true, tooltip: "Heading 2" },
  { label: "H3", icon: "H3", syntax: "### ", block: true, tooltip: "Heading 3" },
  { label: "Bold", icon: "B", syntax: "**", wrap: true, tooltip: "Bold (**text**)" },
  { label: "Italic", icon: "I", syntax: "*", wrap: true, tooltip: "Italic (*text*)" },
  { label: "Strike", icon: "S̶", syntax: "~~", wrap: true, tooltip: "Strikethrough (~~text~~)" },
  { label: "Code", icon: "`", syntax: "`", wrap: true, tooltip: "Inline code" },
  { label: "Highlight", icon: "H̲", syntax: "==", wrap: true, tooltip: "Highlight (==text==)" },
  { label: "Quote", icon: "❝", syntax: "> ", block: true, tooltip: "Blockquote" },
  { label: "Bullet", icon: "•", syntax: "- ", block: true, tooltip: "Bullet list" },
  { label: "Numbered", icon: "1.", syntax: "1. ", block: true, tooltip: "Numbered list" },
  { label: "Task", icon: "☐", syntax: "- [ ] ", block: true, tooltip: "Task / checkbox" },
  { label: "Code Block", icon: "< >", syntax: "```\n\n```", block: false, tooltip: "Code block" },
  { label: "Image", icon: "🖼", syntax: "![[image-url]]", block: true, tooltip: "Image embed ![[url]]" },
  { label: "Link", icon: "🔗", syntax: "[text](url)", block: false, tooltip: "Link [text](url)" },
  { label: "HR", icon: "―", syntax: "\n---\n", block: false, tooltip: "Horizontal rule" },
];

// ─── CreatePost Page ──────────────────────────────────────────────────────────
export default function CreatePost() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState(
    `# Start writing your post here…\n\nUse the toolbar above or write markdown directly.\n\n## Obsidian-style Markdown Supported\n\n- **Bold**, *italic*, ~~strikethrough~~, ==highlight==\n- \`inline code\` and code blocks\n- ![[image-url]] for image embeds\n- [Link text](https://example.com)\n\n> Blockquotes look like this\n\n- [ ] Task list item\n- [x] Completed task\n`
  );
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ── Save Draft ─────────────────────────────────────────────────────────────
  const handleSaveDraft = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
    console.log("[Draft saved]", { title, tags, coverImage, content });
  };

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // ── Publish ────────────────────────────────────────────────────────────────
  const handlePublish = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const postData = {
        title,
        excerpt: content.substring(0, 150) + "...",
        content,
        coverImage: coverImage || "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
        author: session.user.email?.split("@")[0] || "Admin",
        authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=b6e3f4",
        publishedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        readTime: `${readTime} min read`,
        tags,
        claps: 0
      };

      const { data, error } = await supabase.from('posts').insert([postData]).select();

      if (error) {
        console.error("Publish error:", error);
        alert("Failed to publish post. " + error.message);
      } else {
        setShowPublishModal(false);
        alert("Post published!");
        if (data && data.length > 0) {
           navigate(`/blog/${data[0].id}`);
        } else {
           navigate("/blog");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ── Toolbar insert ─────────────────────────────────────────────────────────
  const insertSyntax = useCallback(
    (action: ToolbarAction) => {
      const ta = textareaRef.current;
      if (!ta) return;

      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = content.substring(start, end);
      let newContent: string;
      let newCursor: number;

      if (action.wrap) {
        // Wrap around selection: **selected**
        const wrapped = `${action.syntax}${selected || "text"}${action.syntax}`;
        newContent = content.substring(0, start) + wrapped + content.substring(end);
        newCursor = start + action.syntax.length + (selected || "text").length + action.syntax.length;
      } else if (action.block) {
        // Prepend to line
        const lineStart = content.lastIndexOf("\n", start - 1) + 1;
        newContent =
          content.substring(0, lineStart) +
          action.syntax +
          content.substring(lineStart);
        newCursor = lineStart + action.syntax.length + (start - lineStart);
      } else {
        // Insert at cursor
        newContent = content.substring(0, start) + action.syntax + content.substring(end);
        newCursor = start + action.syntax.length;
      }

      setContent(newContent);
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(newCursor, newCursor);
      });
    },
    [content]
  );

  // ── Tag handling ───────────────────────────────────────────────────────────
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const t = tagInput.trim().replace(/,$/, "");
      if (t && !tags.includes(t) && tags.length < 5) {
        setTags([...tags, t]);
      }
      setTagInput("");
    }
  };

  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t));

  return (
    <div className="cp-page">
      {/* ── Top Nav ── */}
      <header className="cp-nav">
        <Link to="/blog" className="cp-nav__back">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Blog
        </Link>

        <div className="cp-nav__center">
          <span className="cp-word-count">{wordCount} words · {readTime} min read</span>
        </div>

        <div className="cp-nav__actions">
          <button
            className="cp-btn cp-btn--ghost"
            style={{ border: "1px solid rgba(255,255,255,0.2)", marginRight: "8px" }}
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/blog");
            }}
          >
            Logout
          </button>
          <button
            className={`cp-btn cp-btn--ghost ${isSaved ? "cp-btn--saved" : ""}`}
            onClick={handleSaveDraft}
          >
            {isSaved ? "✓ Saved" : "Save Draft"}
          </button>
          <button
            className="cp-btn cp-btn--primary"
            onClick={() => setShowPublishModal(true)}
            disabled={!title.trim()}
          >
            Publish →
          </button>
        </div>
      </header>

      {/* ── Editor Body ── */}
      <main className="cp-main">
        {/* Cover Image input */}
        <div className="cp-cover-section">
          {coverImage ? (
            <div className="cp-cover-preview">
              <img src={coverImage} alt="Cover" />
              <button
                className="cp-cover-remove"
                onClick={() => setCoverImage("")}
              >
                ✕ Remove
              </button>
            </div>
          ) : (
            <div className="cp-cover-placeholder">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Add a cover image URL</span>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className="cp-cover-input"
              />
            </div>
          )}
        </div>

        {/* Title */}
        <textarea
          className="cp-title-input"
          placeholder="Post title…"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            // Auto-resize
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          rows={1}
          maxLength={150}
        />

        {/* Tags */}
        <div className="cp-tags-row">
          {tags.map((t) => (
            <span key={t} className="cp-tag">
              {t}
              <button className="cp-tag-remove" onClick={() => removeTag(t)}>×</button>
            </span>
          ))}
          {tags.length < 5 && (
            <input
              className="cp-tag-input"
              placeholder={tags.length === 0 ? "Add up to 5 tags (press Enter)…" : "Add tag…"}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
            />
          )}
        </div>

        {/* Tab Bar */}
        <div className="cp-tabs">
          <button
            className={`cp-tab ${activeTab === "write" ? "active" : ""}`}
            onClick={() => setActiveTab("write")}
          >
            Write
          </button>
          <button
            className={`cp-tab ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </div>

        {/* ── Markdown Toolbar ── */}
        {activeTab === "write" && (
          <div className="cp-toolbar">
            {TOOLBAR_ACTIONS.map((action) => (
              <button
                key={action.label}
                className="cp-toolbar-btn"
                title={action.tooltip}
                onClick={() => insertSyntax(action)}
              >
                {action.icon}
              </button>
            ))}
          </div>
        )}

        {/* ── Write Panel ── */}
        {activeTab === "write" ? (
          <div className="cp-write-panel">
            <textarea
              ref={textareaRef}
              className="cp-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing in Markdown…"
              spellCheck
            />
            {/* Markdown Quick Reference */}
            <aside className="cp-cheatsheet">
              <h4 className="cp-cheatsheet__title">Markdown Reference</h4>
              <ul className="cp-cheatsheet__list">
                <li><code># H1</code> to <code>###### H6</code></li>
                <li><code>**bold**</code></li>
                <li><code>*italic*</code></li>
                <li><code>~~strikethrough~~</code></li>
                <li><code>==highlight==</code></li>
                <li><code>`inline code`</code></li>
                <li><code>```lang\ncode\n```</code></li>
                <li><code>&gt; blockquote</code></li>
                <li><code>- bullet</code></li>
                <li><code>1. numbered</code></li>
                <li><code>- [ ] task</code></li>
                <li><code>- [x] done</code></li>
                <li><code>![[image-url]]</code></li>
                <li><code>[text](url)</code></li>
                <li><code>---</code> (hr)</li>
              </ul>
            </aside>
          </div>
        ) : (
          /* ── Preview Panel ── */
          <div className="cp-preview-panel">
            {coverImage && (
              <div className="cp-preview-cover">
                <img src={coverImage} alt="Cover" />
              </div>
            )}
            {title && <h1 className="cp-preview-title">{title}</h1>}
            {tags.length > 0 && (
              <div className="cp-preview-tags">
                {tags.map((t) => (
                  <span key={t} className="blog-tag blog-tag--sm">{t}</span>
                ))}
              </div>
            )}
            <div
              className="md-body cp-preview-body"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
            />
          </div>
        )}
      </main>

      {/* ── Publish Modal ── */}
      {showPublishModal && (
        <div className="cp-overlay" onClick={() => setShowPublishModal(false)}>
          <div className="cp-publish-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="cp-publish-modal__close"
              onClick={() => setShowPublishModal(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="cp-publish-modal__title">Ready to Publish?</h2>
            <p className="cp-publish-modal__sub">
              Your post will be visible to everyone. Make sure everything looks good in the Preview tab first.
            </p>

            <div className="cp-publish-modal__summary">
              <div className="cp-publish-summary-item">
                <span className="cp-publish-summary-label">Title</span>
                <span className="cp-publish-summary-value">{title || "(untitled)"}</span>
              </div>
              <div className="cp-publish-summary-item">
                <span className="cp-publish-summary-label">Tags</span>
                <span className="cp-publish-summary-value">{tags.join(", ") || "None"}</span>
              </div>
              <div className="cp-publish-summary-item">
                <span className="cp-publish-summary-label">Reading Time</span>
                <span className="cp-publish-summary-value">{readTime} min · {wordCount} words</span>
              </div>
            </div>

            <div className="cp-publish-modal__actions">
              <button
                className="cp-btn cp-btn--ghost"
                onClick={() => setShowPublishModal(false)}
              >
                Cancel
              </button>
              <button className="cp-btn cp-btn--primary" onClick={handlePublish}>
                Publish Now →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
