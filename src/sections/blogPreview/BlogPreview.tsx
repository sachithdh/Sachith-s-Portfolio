import { Link } from "react-router-dom";
import gsap from "gsap";
import { LuArrowRight } from "react-icons/lu";
import {
  useGsap,
  revealLines,
  pauseTransitions,
  EASE_OUT,
  REVEAL_START,
} from "../../utils/gsapAnimations";
import { useBlogPosts, formatDate } from "../blog/useBlogPosts";
import "./BlogPreview.css";

export default function BlogPreview() {
  const posts = useBlogPosts().slice(0, 2);

  const sectionRef = useGsap<HTMLElement>(() => {
    revealLines(".bp-heading", ".bp-heading");

    const cards = gsap.utils.toArray<HTMLElement>(".bp-card");
    gsap.from(cards, {
      opacity: 0,
      y: 60,
      duration: 1.1,
      stagger: 0.15,
      ease: EASE_OUT,
      ...pauseTransitions(cards),
      // hand transform back to the stylesheet so hover lift still works
      clearProps: "transition,transform",
      scrollTrigger: { trigger: ".bp-grid", start: REVEAL_START, once: true },
    });

    gsap.from(".bp-see-all-wrapper", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: EASE_OUT,
      scrollTrigger: {
        trigger: ".bp-see-all-wrapper",
        start: "top 95%",
        once: true,
      },
    });
  });

  if (posts.length === 0) return null;

  return (
    <section className="bp-section" id="blog" ref={sectionRef}>
      <div className="bp-container">
        <h2 className="bp-heading">LATEST FROM THE BLOG</h2>

        <div className="bp-grid">
          {posts.map((post) => (
            <Link to={`/blog/${post.slug}`} className="bp-card" key={post.slug}>
              <div className="bp-card__meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.readTime && (
                  <>
                    <span className="bp-card__meta-dot" aria-hidden="true" />
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>

              <h3 className="bp-card__title">{post.title}</h3>

              {post.description && (
                <p className="bp-card__desc">{post.description}</p>
              )}

              {post.tags.length > 0 && (
                <div className="bp-card__tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="bp-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <span className="bp-card__read">
                Read post
                <LuArrowRight size={16} className="bp-card__read-icon" />
              </span>
            </Link>
          ))}
        </div>

        <div className="bp-see-all-wrapper">
          <Link to="/blog" className="bp-see-all-btn">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
