import "./RoleCard.css";

const Card = () => {
  return (
    <article className="card">
      <footer className="card__footer">
        <div className="card__job-summary">
          <div className="card__job-icon">
            <img src="/images/xep-logo-white.png" alt="" />
          </div>
          <div className="card__job">
            <p className="card__job-title">
              Intern Software Engineer @Xeptagon
            </p>
          </div>
        </div>
      </footer>
    </article>
  );
};

export default Card;
