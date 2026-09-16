import "./Testimonials.css";
import { useStaggerChildren, useFadeInUp } from "../utils/gsapAnimations";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "John Smith",
    role: "CTO at TechCorp",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Sachith is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    role: "Project Manager at DevHub",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Working with Sachith was a pleasure. He brought innovative solutions to our project and exceeded our expectations in every way.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Lead Developer at CloudSoft",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "His expertise in full-stack development and cloud technologies helped us launch our product ahead of schedule. Highly recommended!",
    rating: 5,
  },
];

export default function Testimonials() {
  const headerRef = useFadeInUp(0);
  const testimonialsRef = useStaggerChildren(0.2, 0.2);

  return (
    <section
      className="testimonials-section section-container"
      id="testimonials"
    >
      <div className="testimonials-header" ref={headerRef as any}>
        <span className="testimonials-label">• Testimonials</span>
        <h2 className="testimonials-title">What People Say</h2>
        <p className="testimonials-description">
          Don't just take my word for it - here's what clients and colleagues
          have to say about working with me.
        </p>
      </div>

      <div className="testimonials-grid" ref={testimonialsRef as any}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FiStar key={i} className="star-icon" />
              ))}
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="author-image"
              />
              <div className="author-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
