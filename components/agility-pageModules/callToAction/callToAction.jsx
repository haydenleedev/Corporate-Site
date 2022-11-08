import dynamic from "next/dynamic";
const Heading = dynamic(() => import("../heading"), { ssr: false });
const Media = dynamic(() => import("../media"), { ssr: false });
import style from "./callToAction.module.scss";
import { boolean } from "../../../utils/validation";
const AgilityLink = dynamic(() => import("../../agilityLink"), { ssr: false });
import { renderHTML } from "@agility/nextjs";
import { sanitizeHtmlConfig } from "../../../utils/convert";

const CallToAction = ({ module, customData }) => {
  const { sanitizedHtml } = customData;
  const { fields } = module;
  const heading = JSON.parse(fields.heading);
  const narrowContainer = boolean(fields?.narrowContainer);
  const bannerLayout = boolean(fields?.bannerLayout);

  const itemContentRight = boolean(fields?.itemContentRight);
  const textLeftJustification = boolean(fields?.textLeftJustification);

  const linkBackgroundColor = fields.linkBackgroundColor || "cyan outlined";

  // Margins & Paddings
  const mtValue = fields.marginTop ? fields.marginTop : "";
  const mbValue = fields.marginBottom ? fields.marginBottom : "";
  const ptValue = fields.paddingTop ? fields.paddingTop : "";
  const pbValue = fields.paddingBottom ? fields.paddingBottom : "";

  return (
    <section
      className={`section ${style.callToAction} 
      ${mtValue} ${mbValue} ${ptValue} ${pbValue} ${
        bannerLayout ? style.bannerLayout : ""
      } ${fields.classes ? fields.classes : ""} ${
        itemContentRight ? style.alignRight : style.alignLeft
      } ${fields?.backgroundColor ? fields?.backgroundColor : ""}`}
      id={fields.id ? fields.id : null}
    >
      {fields.backgroundImage && (
        <div className={style.backgroundImage}>
          <Media media={fields.backgroundImage} />
        </div>
      )}
      <div
        className={`container d-flex flex-direction-column justify-content-center align-items-center ${
          narrowContainer ? "max-width-narrow" : ""
        }`}
      >
        <div
          className={`${style.content} ${
            fields.textAlignment ? fields.textAlignment : ""
          } ${textLeftJustification ? style.textLeft : style.textCenter}`}
        >
          {heading.text && (
            <div className={style.heading}>
              <Heading {...heading} />
            </div>
          )}
          {fields.textContent && (
            <div
              className="content"
              dangerouslySetInnerHTML={renderHTML(sanitizedHtml)}
            ></div>
          )}
          <AgilityLink
            agilityLink={fields.link}
            className={`button ${style.link} ${linkBackgroundColor} ${
              fields.linkClasses ? fields.linkClasses : ""
            }`}
            ariaLabel={`Navigate to page ` + fields.link.href}
            title={`Navigate to page ` + fields.link.href}
          >
            {fields.link.text}
          </AgilityLink>
        </div>
      </div>
    </section>
  );
};

CallToAction.getCustomInitialProps = async function ({ item }) {
  const sanitizeHtml = (await import("sanitize-html")).default;
  // sanitize unsafe HTML ( all HTML entered by users and any HTML copied from WordPress to Agility)
  const cleanHtml = (html) => sanitizeHtml(html, sanitizeHtmlConfig);

  const sanitizedHtml = item.fields.textContent
    ? cleanHtml(item.fields.textContent)
    : null;

  return {
    sanitizedHtml,
  };
};

export default CallToAction;
