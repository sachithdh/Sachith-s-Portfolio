import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export const dummyPosts: BlogPost[] = [
  {
    id: "1",
    title: "Necessary Discomfort",
    excerpt:
      "After a long run… again, I'm back to my corner. It might be messy. It might be unorganized… But as always, I just need to let the thoughts flow.",
    content: `# Necessary Discomfort

After a long run… again, I'm back to my corner. It might be messy. It might be unorganized… But as always, I just need to let the thoughts flow.

## Why Discomfort Matters

Life has a funny way of reminding us that **growth and comfort never coexist**. The moment you stop feeling a little uneasy, you've stopped growing.

> "Do not pray for an easy life, pray for the strength to endure a difficult one." — Bruce Lee

### The Three Pillars of Productive Discomfort

1. Embrace uncertainty as a feature, not a bug
2. Track your reactions — not just your actions
3. Reframe failure as *data collection*

#### Practical Steps

- [ ] Morning reflection: What made you uncomfortable yesterday?
- [x] Journaling about resistance
- [ ] One scary thing per week

\`\`\`javascript
// A simple discomfort tracker
const trackDiscomfort = (event) => {
  const entry = {
    date: new Date().toISOString(),
    situation: event,
    reaction: "initial discomfort",
    outcome: "pending"
  };
  return entry;
};
\`\`\`

Check out this amazing framework for mindset shifts: [Atomic Habits by James Clear](https://jamesclear.com/atomic-habits)

![[https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80]]

##### The Long Game

The discomfort you feel today is the **strength** you'll rely on tomorrow. It's not about suffering for the sake of suffering — it's about choosing the *right* discomfort.

###### Final Thought

Stay in the arena. Get comfortable being uncomfortable.`,
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    author: "Sachith Dhanushka",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sachith&backgroundColor=b6e3f4",
    publishedAt: "Feb 23",
    readTime: "4 min read",
    tags: ["Mindset", "Personal Growth"],
    claps: 42,
  },
  {
    id: "2",
    title: "Negative Visualization?? But How... and For What?",
    excerpt:
      "Life has a funny way of throwing us into situations we never saw coming. One day everything's smooth, the next you're hit with a curve ball.",
    content: `# Negative Visualization? But How… and For What?

Life has a funny way of throwing us into situations we never saw coming.

## The Stoic Practice

Negative visualization — or *premeditatio malorum* — is one of the most powerful tools in the Stoic philosopher's toolkit.

> "Hoping for the best, prepared for the worst, and unsurprised by anything in between." — Maya Angelou

### What Is Negative Visualization?

1. Appreciate what you currently have
2. Reduce anxiety about the unknown
3. Build genuine psychological resilience

- [ ] Set aside 5 minutes each morning
- [x] Visualize losing something you value
- [ ] Return to the present with renewed gratitude

\`\`\`python
def practice_negative_visualization(minutes=5):
    steps = [
        "Breathe deeply — settle into stillness",
        "Choose one thing you value today",
        "Vividly imagine losing it",
        "Return to gratitude for the present moment"
    ]
    for i, step in enumerate(steps, 1):
        print(f"Step {i}: {step}")
\`\`\`

![[https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80]]

Learn more: [The Daily Stoic](https://dailystoic.com)

###### Bottom Line

The obstacle is the way. Imagine it. Face it. Overcome it.`,
    coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
    author: "Sachith Dhanushka",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sachith&backgroundColor=b6e3f4",
    publishedAt: "Aug 11, 2025",
    readTime: "6 min read",
    tags: ["Stoicism", "Philosophy", "Mindset"],
    claps: 87,
  },
  {
    id: "3",
    title: "The Science of Vibrations: Tuning into Your Inner Energy ✨",
    excerpt:
      "Everything in the universe is made of energy, and science shows that everything vibrates. From atoms in our bodies to distant stars.",
    content: `# The Science of Vibrations: Tuning into Your Inner Energy ✨

Everything in the universe is made of energy, and science shows that everything vibrates.

## Quantum Mechanics & Consciousness

> "Be the energy you want to attract." — Unknown

### The Seven Frequencies of Being

1. **Fear** — 100 Hz (survival state)
2. **Courage** — 200 Hz (the critical threshold)
3. **Love** — 500 Hz (heart coherence)
4. **Joy** — 540 Hz (flow state)

- [ ] Morning meditation (10+ minutes)
- [x] Cold shower protocol
- [x] Deep breathing exercises

\`\`\`typescript
interface VibrationLog {
  timestamp: Date;
  frequency: number;
  mood: "low" | "neutral" | "elevated" | "high";
}
\`\`\`

![[https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800&q=80]]

[HeartMath Institute](https://www.heartmath.org)

###### Closing Thought

Tune your instrument. The universe will play the song.`,
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    author: "Sachith Dhanushka",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sachith&backgroundColor=b6e3f4",
    publishedAt: "Jul 18, 2025",
    readTime: "7 min read",
    tags: ["Energy", "Science", "Wellness"],
    claps: 134,
  },
  {
    id: "4",
    title: "Energy Wheels 🔵 — Understanding Chakras Through a Developer's Lens",
    excerpt:
      "As someone who spends most of their time debugging code, I found an unexpected parallel between system architecture and the ancient chakra system.",
    content: `# Energy Wheels 🔵 — Understanding Chakras Through a Developer's Lens

As someone who spends most of their time debugging code, I found an unexpected parallel between **system architecture** and the ancient chakra system.

## The Stack

> "A system is only as strong as its weakest layer."

### The Chakra Stack

| Chakra | Developer Equivalent |
|--------|---------------------|
| Root | Hardware / OS |
| Sacral | Filesystem |
| Heart | API / Middleware |
| Crown | Cloud / Universal Connection |

\`\`\`bash
./check_chakra --layer=all --verbose
# [ROOT]        ✅ Grounded
# [HEART]       ✅ Open
# [CROWN]       ✅ Connected
\`\`\`

- [ ] Daily grounding exercises
- [x] Sacral creativity practices

![[https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80]]

[Mindvalley — Chakra Healing](https://www.mindvalley.com)

###### Ship It

Your energy is your most valuable product. Ship it wisely.`,
    coverImage: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
    author: "Sachith Dhanushka",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sachith&backgroundColor=b6e3f4",
    publishedAt: "Jul 22, 2025",
    readTime: "5 min read",
    tags: ["Chakras", "Wellness", "Dev Philosophy"],
    claps: 56,
  },
];


import supabase from "../../utils/supabase";

// ─── Blog Page ────────────────────────────────────────────────────────────────
export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(dummyPosts);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

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

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  const allTags = ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags)))];
  const filteredPosts = activeFilter === "All" ? posts : posts.filter((p) => p.tags.includes(activeFilter));

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="blog-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <h2 style={{ color: "#fff", fontFamily: "var(--font-sans)" }}>Loading Posts...</h2>
      </div>
    );
  }

  return (
    <>
      <div className="blog-page">
        <header className="blog-page-nav">
          <Link to="/" className="blog-page-nav__back">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 14L6 9l5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Portfolio
          </Link>
          <div className="blog-page-nav__brand">
            <div className="blog-page-nav__brand-dot" />
            <span>Sachith's Blog</span>
          </div>
          {session && (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Link to="/blog/create" className="blog-create-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                New Post
              </Link>
              <button
                className="blog-create-btn"
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
                onClick={async () => {
                  await supabase.auth.signOut();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </header>

        {/* ── Hero ── */}
        <div className="blog-page-hero">
          <span className="blog-label">THOUGHTS &amp; WRITINGS</span>
          <h1 className="blog-title">THE BLOG</h1>
          <p className="blog-subtitle">
            A space where I explore ideas, philosophies, and the intersection of technology with human experience.
          </p>
        </div>

        <div className="blog-container">
          {/* ── Filters ── */}
          <div className="blog-filters">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`blog-filter-btn ${activeFilter === tag ? "active" : ""}`}
                onClick={() => setActiveFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* ── Post list ── */}
          <div className="blog-list">
            {filteredPosts.map((post, idx) => (
              <article key={post.id} className="blog-row" onClick={() => navigate(`/blog/${post.id}`)}>
                {/* Left: text content */}
                <div className="blog-row__left">
                  {post.tags[0] && (
                    <span className="blog-row__category">{post.tags[0]}</span>
                  )}
                  <h2 className="blog-row__title">{post.title}</h2>
                  <p className="blog-row__excerpt">{post.excerpt}</p>

                  {/* Footer: date + badge + actions */}
                  <div className="blog-row__footer">
                    <span className="blog-row__date">{post.publishedAt}</span>
                    {post.claps > 0 && (
                      <span className="blog-row__clap-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11 4.07V2a1 1 0 0 1 2 0v2.07c3.94.49 7 3.85 7 7.93A8 8 0 1 1 4 12c0-4.08 3.06-7.44 7-7.93z" opacity=".3" />
                          <path d="M9 11l3 3 4.5-4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        </svg>
                        {post.claps}
                      </span>
                    )}
                    <div className="blog-row__actions">
                      {/* Clap */}
                      <button className="blog-row__action-btn" title="Clap" onClick={(e) => e.stopPropagation()} aria-label="Clap">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                          <path d="M7 11.5V14a5 5 0 0 0 10 0v-4l-1.35-2.7A1 1 0 0 0 14.76 7H14v4M7 11.5l1.5-5.25A1 1 0 0 1 9.46 6h.04a1 1 0 0 1 .96.72L11 9m-4 2.5 1-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {/* Bookmark */}
                      <button
                        className={`blog-row__action-btn${savedPosts.has(post.id) ? " blog-row__action-btn--saved" : ""}`}
                        title={savedPosts.has(post.id) ? "Saved" : "Save"}
                        onClick={(e) => toggleSave(post.id, e)}
                        aria-label="Bookmark"
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill={savedPosts.has(post.id) ? "currentColor" : "none"}>
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {/* More */}
                      <button className="blog-row__action-btn" title="More" onClick={(e) => e.stopPropagation()} aria-label="More">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                          <circle cx="5" cy="12" r="1.3" fill="currentColor" />
                          <circle cx="12" cy="12" r="1.3" fill="currentColor" />
                          <circle cx="19" cy="12" r="1.3" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: thumbnail */}
                <div className="blog-row__thumb">
                  <img src={post.coverImage} alt={post.title} loading="lazy" />
                </div>

                {/* Divider */}
                {idx < filteredPosts.length - 1 && <div className="blog-row__divider" />}
              </article>
            ))}
          </div>

          {/* ── See More ── */}
          <div className="blog-see-more">
            <a href="https://medium.com" target="_blank" rel="noopener noreferrer" className="fp-see-more-btn">
              Read More on Medium ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
