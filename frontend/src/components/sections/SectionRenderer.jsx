import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { submitLead } from "../../services/contactApi";

function TextSection({ section }) {
  return (
    <section className="section container">
      <h2>{section.title}</h2>
      {(section.paragraphs || []).map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
    </section>
  );
}

function IntroCenterSection({ section }) {
  return (
    <section className="intro-center section">
      <div className="container intro-inner">
        <h2>{section.title}</h2>
        <div className="intro-line" />
        <p>{section.description}</p>
        {section.action ? (
          <Link to={section.action.path} className="btn btn-primary intro-btn">
            {section.action.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}

function ServiceGridSection({ section }) {
  return (
    <section className="services-block section">
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <div className="services-grid-2">
          {(section.items || []).map((item) => (
            <article className="service-card" key={item.title}>
              {item.icon ? <img src={item.icon} alt="" className="service-icon" /> : null}
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.path ? <Link to={item.path}>View More →</Link> : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSplitSection({ section }) {
  return (
    <section className="about-split section">
      <div className="container about-grid">
        <div>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.action ? <Link className="about-btn" to={section.action.path}>{section.action.label}</Link> : null}
        </div>
        <div>
          {section.image ? <img src={section.image} alt={section.title} className="about-image" /> : null}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection({ section }) {
  return (
    <section className="reviews-section section">
      <div className="container">
        <div className="reviews-head">
          <h2>{section.title}</h2>
          <p>{section.ratingText}</p>
        </div>
        <div className="reviews-grid">
          {(section.items || []).map((item, idx) => (
            <article key={idx} className="review-card">
              <p className="review-score">{item.score} ★★★★★</p>
              <p className="review-quote">“{item.quote}”</p>
              <p className="review-author">{item.author}</p>
              <p className="review-verified">✓ Verified Review</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoWeAreSection({ section }) {
  return (
    <section className="who-section section">
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <p className="who-desc">{section.description}</p>
        <div className="who-stats">
          {(section.items || []).map((item) => (
            <article key={item.label} className="who-item">
              {item.icon ? <img src={item.icon} alt="" /> : null}
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection({ section }) {
  return (
    <section className="philosophy section">
      <div className="container philosophy-grid">
        <div>
          <p className="philo-eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.action ? <Link to={section.action.path} className="btn philo-btn">{section.action.label}</Link> : null}
        </div>
        <div className="philo-images">
          {(section.images || []).map((img, idx) => (
            <img key={idx} src={img} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection({ section }) {
  return (
    <section className="partners section">
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <div className="partners-row">
          {(section.logos || []).map((logo, idx) => (
            <img key={idx} src={logo} alt="Partner" />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWorkSection({ section }) {
  return (
    <section className="how-work section">
      <div className="container">
        <h2 className="center-title how-title">How <span>We</span> Work</h2>
        <div className="how-grid">
          <div className="how-col">
            {(section.left || []).map((item) => (
              <article key={item.title} className="how-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className="how-image-col">
            {section.image ? <img src={section.image} alt="How we work" /> : null}
          </div>
          <div className="how-col">
            {(section.right || []).map((item) => (
              <article key={item.title} className="how-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqGridSection({ section }) {
  const buildInitialState = React.useCallback(() => {
    const items = section.items || [];
    const initial = {};
    items.forEach((_, idx) => {
      initial[idx] = idx < 2;
    });
    return initial;
  }, [section.items]);

  const [openItems, setOpenItems] = React.useState(buildInitialState);

  React.useEffect(() => {
    setOpenItems(buildInitialState());
  }, [buildInitialState, section.title]);

  const toggleItem = (idx) => {
    setOpenItems((current) => ({
      ...current,
      [idx]: !current[idx],
    }));
  };

  return (
    <section className="faq-grid-section section">
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <div className="faq-grid-2">
          {(section.items || []).map((item, idx) => (
            <article key={idx} className="faq-card">
              <button
                type="button"
                className="faq-q-row"
                onClick={() => toggleItem(idx)}
                aria-expanded={Boolean(openItems[idx])}
              >
                <h3>{item.question}</h3>
                <span>{openItems[idx] ? "×" : "+"}</span>
              </button>
              {openItems[idx] && item.answer?.trim() ? <p>{item.answer}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardsSection({ section }) {
  return (
    <section className="awards-section section">
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <div className="awards-grid">
          {(section.logos || []).map((logo, idx) => (
            <img key={idx} src={logo} alt="Award" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFormSplitSection({ section }) {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    fullName: "",
    phone: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      await submitLead(formData);
      setFormData({
        email: "",
        fullName: "",
        phone: "",
        message: "",
        website: "",
      });
      navigate("/thank-you");
    } catch (error) {
      setSubmitError(error.message || "Unable to submit form right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-split section">
      <div className="contact-form-grid">
        <div className="contact-form-image-wrap">
          <img src={section.image} alt={section.title || "Contact"} />
        </div>
        <div className="contact-form-panel">
          <h2>{section.title}</h2>
          <p>{section.subtitle}</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
            />
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />
            {submitError ? (
              <p className="status error" role="alert">
                {submitError}
              </p>
            ) : null}
            <button type="submit" className="btn btn-primary">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoSplitSection({ section }) {
  return (
    <section className="info-split section">
      <div className="container info-split-grid">
        <div>
          <img src={section.image} alt={section.title || "Information"} className="info-split-image" />
        </div>
        <div>
          <h2>{section.title}</h2>
          {(section.paragraphs || []).map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          {section.highlights?.length ? (
            <ul>
              {section.highlights.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          ) : null}
          {section.action ? (
            <Link to={section.action.path} className="btn info-quote-btn">
              {section.action.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function CtaBannerSection({ section }) {
  const actionPath = section.action?.path || "/contact";
  const actionLabel = section.action?.label || "Connect with Us Now!";

  return (
    <section className="cta-banner section" style={{ backgroundImage: `url(${section.image})` }}>
      <div className="cta-banner-overlay">
        <div className="container cta-banner-inner">
          <h2>{section.title}</h2>
          <Link to={actionPath} className="btn btn-primary">
            {actionLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutImageTextSection({ section }) {
  const actionClass =
    section.actionStyle === "link"
      ? "about-image-text-link"
      : "btn about-image-text-btn";

  return (
    <section className="about-image-text section">
      <div className={`container about-image-text-grid ${section.reverse ? "reverse" : ""}`}>
        <div className="about-image-text-copy">
          <h2>{section.title}</h2>
          {section.subtitle ? <h3>{section.subtitle}</h3> : null}
          {(section.paragraphs || []).map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          {section.action ? (
            <Link to={section.action.path} className={actionClass}>
              {section.action.label}
            </Link>
          ) : null}
        </div>
        <div className="about-image-text-media">
          {section.image ? <img src={section.image} alt={section.title || "About"} /> : null}
        </div>
      </div>
    </section>
  );
}

function TeamShowcaseSection({ section }) {
  return (
    <section className="about-team section">
      <div className="container about-team-grid">
        <div className="about-team-photos">
          {(section.images || []).map((img, idx) => (
            <img key={idx} src={img} alt="" />
          ))}
        </div>
        <div className="about-team-copy">
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </div>
      </div>
    </section>
  );
}

function ValuesCenterSection({ section }) {
  return (
    <section className="about-values section">
      <div className="container">
        <h2 className="about-values-title">{section.title}</h2>
        <p className="about-values-description">{section.description}</p>
      </div>
    </section>
  );
}

function WhyChooseSection({ section }) {
  return (
    <section className="about-why section">
      <div className="container">
        <h2 className="about-why-title">{section.title}</h2>
        <div className="about-why-grid">
          {(section.items || []).map((item, idx) => (
            <article key={`${item.title}-${idx}`} className="about-why-item">
              <div className="about-why-head">
                <span className="about-why-icon" aria-hidden="true">✓</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialPlatformsSection({ section }) {
  const usePlainIcons = section.variant === "ppc" || section.variant === "plain";

  return (
    <section className={`smm-platforms section ${usePlainIcons ? "smm-platforms-ppc" : ""}`}>
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <p className="smm-platforms-intro">{section.description}</p>
        <div className="smm-platforms-grid">
          {(section.items || []).map((item, idx) => (
            <article key={`${item.title}-${idx}`} className="smm-platform-item">
              <div className={`smm-platform-head ${(() => {
                const title = String(item.title || "");
                const iconValue = String(item.icon || "").trim();
                const hasLeadingNumberInTitle = /^\d+\./.test(title);
                const hasNumericIcon = /^\d+$/.test(iconValue);
                return hasLeadingNumberInTitle && hasNumericIcon ? "no-icon" : "";
              })()}`}>
                <h3>{item.title}</h3>
                {(() => {
                  const title = String(item.title || "");
                  const iconValue = String(item.icon || "").trim();
                  const hasLeadingNumberInTitle = /^\d+\./.test(title);
                  const hasNumericIcon = /^\d+$/.test(iconValue);
                  const shouldHideDuplicateNumber = hasLeadingNumberInTitle && hasNumericIcon;
                  if (shouldHideDuplicateNumber) return null;
                  return (
                    <span className={`smm-platform-icon ${usePlainIcons ? "smm-platform-icon-plain" : ""}`} aria-hidden="true">
                      {item.icon || "•"}
                    </span>
                  );
                })()}
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitChecklistSection({ section }) {
  return (
    <section className="smm-benefits section">
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <p className="smm-benefits-intro">{section.description}</p>
        <div className="smm-benefits-list">
          {(section.items || []).map((item, idx) => (
            <article key={`${item.title}-${idx}`} className="smm-benefit-item">
              <span className="smm-check-icon" aria-hidden="true">✓</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        {section.footerText ? <p className="smm-benefits-footer">{section.footerText}</p> : null}
      </div>
    </section>
  );
}

function ProcessDarkSplitSection({ section }) {
  return (
    <section className="smm-process section">
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <div className="smm-process-grid">
          <div className="smm-process-list">
            {(section.steps || []).map((step, idx) => (
              <article key={`${step.title}-${idx}`} className="smm-process-item">
                <span className="smm-process-icon" aria-hidden="true">{step.icon || "◌"}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="smm-process-image-wrap">
            {section.image ? <img src={section.image} alt={section.title || "Process"} className="smm-process-image" /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function DifferenceSplitSection({ section }) {
  return (
    <section className="smm-difference section">
      <div className="smm-difference-grid">
        <div className="smm-difference-copy">
          <h2>{section.title}</h2>
          {(section.paragraphs || []).map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
          <div className="smm-difference-list">
            {(section.points || []).map((point, idx) => (
              <article key={`${point.title}-${idx}`} className="smm-difference-item">
                <span className="smm-check-icon" aria-hidden="true">✓</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="smm-difference-image-wrap">
          {section.image ? <img src={section.image} alt={section.title || "Difference"} className="smm-difference-image" /> : null}
        </div>
      </div>
    </section>
  );
}

function DarkTwoColumnChecklistSection({ section }) {
  return (
    <section className="tech-dark-services section">
      <div className="container">
        <h2 className="center-title">{section.title}</h2>
        <div className="tech-dark-grid">
          {(section.items || []).map((item, idx) => (
            <article key={`${item.title}-${idx}`} className="tech-dark-item">
              <div className="tech-dark-head">
                <span className="smm-check-icon" aria-hidden="true">✓</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RefundPolicySection({ section }) {
  return (
    <section className="refund-policy section">
      <div className="container refund-policy-inner">
        {section.kicker ? <p className="refund-policy-kicker">{section.kicker}</p> : null}

        {(section.intro || []).map((paragraph, idx) => (
          <p key={`intro-${idx}`}>{paragraph}</p>
        ))}

        {(section.groups || []).map((group, idx) => (
          <div key={`${group.title}-${idx}`} className="refund-policy-group">
            <h3>{group.title}</h3>
            <ul>
              {(group.items || []).map((item, itemIdx) => (
                <li key={`${item.label}-${itemIdx}`}>
                  {item.label ? <strong>{item.label}: </strong> : null}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {section.finalNotes ? (
          <div className="refund-policy-final">
            <h3>{section.finalNotes.title}</h3>
            {(section.finalNotes.paragraphs || []).map((paragraph, idx) => (
              <p key={`final-${idx}`}>{paragraph}</p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function LegalDocumentSection({ section }) {
  return (
    <section className="legal-document section">
      <div className="container legal-document-inner">
        {(section.blocks || []).map((block, idx) => {
          if (block.type === "title") {
            return <h2 key={`block-${idx}`}>{block.text}</h2>;
          }

          if (block.type === "heading") {
            return <h3 key={`block-${idx}`}>{block.text}</h3>;
          }

          if (block.type === "paragraph") {
            return <p key={`block-${idx}`}>{block.text}</p>;
          }

          if (block.type === "list") {
            return (
              <ul key={`block-${idx}`}>
                {(block.items || []).map((item, itemIdx) => (
                  <li key={`block-${idx}-item-${itemIdx}`}>{item}</li>
                ))}
              </ul>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
}

function CardsSection({ section }) {
  return (
    <section className="section container">
      <h2>{section.title}</h2>
      <div className="cards-grid">
        {(section.items || []).map((item, idx) => (
          <article className="card" key={`${item.title}-${idx}`}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.path ? <Link to={item.path}>Read more</Link> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ section }) {
  return (
    <section className="section container">
      <h2>{section.title}</h2>
      <div className="cards-grid">
        {(section.items || []).map((item, idx) => (
          <article className="card" key={`${item.label}-${idx}`}>
            <h3>{item.label}</h3>
            <p>{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SectionRenderer({ section }) {
  switch (section.type) {
    case "text":
      return <TextSection section={section} />;
    case "introCenter":
      return <IntroCenterSection section={section} />;
    case "servicesGrid":
      return <ServiceGridSection section={section} />;
    case "aboutSplit":
      return <AboutSplitSection section={section} />;
    case "reviews":
      return <ReviewsSection section={section} />;
    case "whoWeAre":
      return <WhoWeAreSection section={section} />;
    case "philosophy":
      return <PhilosophySection section={section} />;
    case "partners":
      return <PartnersSection section={section} />;
    case "howWeWork":
      return <HowWeWorkSection section={section} />;
    case "faqGrid":
      return <FaqGridSection section={section} />;
    case "awards":
      return <AwardsSection section={section} />;
    case "contactFormSplit":
      return <ContactFormSplitSection section={section} />;
    case "infoSplit":
      return <InfoSplitSection section={section} />;
    case "ctaBanner":
      return <CtaBannerSection section={section} />;
    case "aboutImageText":
      return <AboutImageTextSection section={section} />;
    case "teamShowcase":
      return <TeamShowcaseSection section={section} />;
    case "valuesCenter":
      return <ValuesCenterSection section={section} />;
    case "whyChoose":
      return <WhyChooseSection section={section} />;
    case "socialPlatforms":
      return <SocialPlatformsSection section={section} />;
    case "benefitChecklist":
      return <BenefitChecklistSection section={section} />;
    case "processDarkSplit":
      return <ProcessDarkSplitSection section={section} />;
    case "differenceSplit":
      return <DifferenceSplitSection section={section} />;
    case "darkTwoColumnChecklist":
      return <DarkTwoColumnChecklistSection section={section} />;
    case "refundPolicy":
      return <RefundPolicySection section={section} />;
    case "legalDocument":
      return <LegalDocumentSection section={section} />;
    case "cards":
      return <CardsSection section={section} />;
    case "contact":
      return <ContactSection section={section} />;
    default:
      return null;
  }
}

export default SectionRenderer;
