import { boolean } from "../../../utils/validation";
import Media from "../media";
import StarRating from "../../starRating/starRating";
import style from "./clientTestimonial.module.scss";
import AgilityLink from "../../agilityLink";
import { useIntersectionObserver } from "../../../utils/hooks";

const ClientTestimonial = ({ module }) => {
  const { fields } = module;
  // observer for triggering animations if an animation style is selected in agility.
  const intersectionRef = useIntersectionObserver(
    {
      threshold: 0.0,
    },
    0.0,
    fields.animationStyle
      ? () => {
          intersectionRef.current
            .querySelectorAll('*[data-animate="true"]')
            .forEach((elem) => {
              elem.classList.add(fields.animationStyle);
            });
        }
      : null
  );

  return (
    <section
      className={`section ${style.clientTestimonial} ${
        fields.classes ? fields.classes : ""
      } ${fields.testimonialStyle === "logo-left-text-right" ?
        style.logoOnLeft : ""
      } ${fields.testimonialStyle === "text-left-logo-right" ?
        `${style.logoOnLeft} ${style.logoOnRight}` : ""
      }`}
      id={fields.id ? fields.id : null}
      ref={intersectionRef}
    >
      {fields.backgroundImage && (
        <div className={style.backgroundImage}>
          <Media media={fields.backgroundImage} />
        </div>
      )}
      <div className="container">
        {fields.testimonial && (
          <div className={style.content}>
            {boolean(fields.slim) ? (
              <div className={style.slim}>
                {fields?.award?.fields?.image && (
                  <div className={style.awardImage}>
                    <Media media={fields.award.fields.image} />
                  </div>
                )}
                {fields.testimonial.fields?.text && (
                  <div className={style.textContent} data-animate="true">
                    {boolean(fields.displayRating) && (
                      <StarRating
                        starCount={fields.testimonial?.starCount}
                        starWidth="25"
                      />
                    )}
                    <p
                      className={`${style.quote} ${
                        fields.testimonial.fields.textClass
                          ? fields.testimonial.fields.textClass
                          : "null"
                      }`}
                    >
                      {fields.testimonial.fields.text}
                    </p>
                    <div className={style.client}>
                      <p>{fields.testimonial.fields.name}</p>
                      <p>
                        {fields.testimonial.fields.jobTitle
                          ? `${fields.testimonial.fields.jobTitle}`
                          : ""}
                      </p>
                      <p>
                        {fields.testimonial.fields.companyName
                          ? `${fields.testimonial.fields.companyName}`
                          : ""}
                      </p>
                    </div>
                    {fields.link && (
                      <AgilityLink
                        agilityLink={fields.link}
                        className={`chevron-style ${style.slimLink}`}
                        ariaLabel={`Navigate to page ` + fields.link.href}
                        title={`Navigate to page ` + fields.link.href}
                      >
                        {fields.link.text}
                      </AgilityLink>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className={style.normal}>
                {fields?.award?.fields?.image && (
                  <div className={style.awardImage}>
                    <Media media={fields.award.fields.image} />
                  </div>
                )}
                {fields.testimonial.fields?.text && (
                  <div className={style.textContent} data-animate="true">
                    {boolean(fields.displayRating) && (
                      <StarRating
                        starCount={fields.testimonial?.starCount}
                        starWidth="25"
                      />
                    )}
                    <p
                      className={`${style.quote} ${
                        fields.testimonial.fields.textClass
                          ? fields.testimonial.fields.textClass
                          : "null"
                      }`}
                    >
                      {fields.testimonial.fields.text}
                    </p>
                    <div className={style.client}>
                      {fields.testimonial.fields.name && (
                        <p className={style.clientName}>
                          {fields.testimonial.fields.name}
                        </p>
                      )}
                      {fields.testimonial.fields.jobTitle && (
                        <p className={style.jobTitle}>
                          {fields.testimonial.fields.jobTitle}
                        </p>
                      )}
                      {fields.testimonial.fields.companyName && (
                        <p className={style.companyName}>
                          {fields.testimonial.fields.companyName}
                        </p>
                      )}
                      {fields.testimonial.fields.logo && (
                        <div
                          className={`${style.logo}${
                            fields.testimonial.fields.logoSizeBig
                              ? " " + style.logoBig
                              : null
                          }`}
                        >
                          <Media media={fields.testimonial.fields.logo} />
                        </div>
                      )}
                    </div>
                    {fields.link && (
                      <AgilityLink
                        agilityLink={fields.link}
                        className={`button ${
                          fields.cTALinkColor ? fields.cTALinkColor : "white"
                        } ${
                          fields.cTALinkSize ? fields.cTALinkSize : "small"
                        } ${style.link}`}
                        ariaLabel={`Navigate to page ` + fields.link.href}
                        title={`Navigate to page ` + fields.link.href}
                      >
                        {fields.link.text}
                      </AgilityLink>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* fields.link && (
              <AgilityLink
                agilityLink={fields.link}
                className={`button white small ${style.link}`}
                ariaLabel={`Navigate to page ` + fields.link.href}
                title={`Navigate to page ` + fields.link.href}
              >
                {fields.link.text}
              </AgilityLink>
            ) */}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientTestimonial;
