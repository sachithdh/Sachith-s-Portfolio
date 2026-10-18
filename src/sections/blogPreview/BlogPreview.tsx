import { Link } from "react-router-dom";
import gsap from "gsap";
import { LuArrowUpRight } from "react-icons/lu";
import {
  useGsap,
  revealLines,
  pauseTransitions,
  EASE_OUT,
  REVEAL_START,
} from "../../utils/gsapAnimations";
import { useBlogPosts, formatDate } from "../blog/useBlogPosts";
import "./BlogPreview.css";

const SECTION = "03";

export default function BlogPreview() {
  const posts = useBlogPosts().slice(0, 2);

  const sectionRef = useGsap<HTMLElement>(() => {
    gsap.from(".ac-bar, .bp-grid", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.2,
      stagger: 0.15,
      ease: EASE_OUT,
      scrollTrigger: { trigger: ".ac-frame", start: REVEAL_START, once: true },
    });
    revealLines(".bp-title", ".bp-title");

    const cards = gsap.utils.toArray<HTMLElement>(".bp-card__body > *");
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.05,
      ease: EASE_OUT,
      ...pauseTransitions(cards),
      scrollTrigger: { trigger: ".bp-grid", start: REVEAL_START, once: true },
    });
  });

  if (posts.length === 0) return null;

  return (
    <section className="ac-section" id="blog" ref={sectionRef}>
      <div className="ac-frame">
        <div className="ac-bar">
          <span>
            <span className="ac-bar__index">{SECTION} /</span> Writing
          </span>
          <span className="ac-bar__aside">Latest from the blog</span>
        </div>

        <div className="ac-intro">
          <h2 className="ac-title bp-title">
            Latest from the <em>blog.</em>
          </h2>
        </div>

        <div className="bp-grid">
          {posts.map((post, i) => (
            <Link
              to={`/blog/${post.slug}`}
              className="bp-card ac-focus"
              key={post.slug}
            >
              <div className="ac-label bp-card__bar">
                <span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.readTime && (
                    <span className="ac-faint"> · {post.readTime}</span>
                  )}
                </span>
                <span className="ac-faint">{`${SECTION}.${i + 1}`}</span>
              </div>

              <div className="bp-card__body">
                <h3 className="ac-heading bp-card__title">{post.title}</h3>

                {post.description && (
                  <p className="ac-body bp-card__desc">{post.description}</p>
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

                <span className="ac-label bp-card__read">
                  Read post
                  <LuArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link to="/blog" className="ac-label ac-link-row">
          <span>
            All posts <span className="ac-faint">· /blog</span>
          </span>
          <LuArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
