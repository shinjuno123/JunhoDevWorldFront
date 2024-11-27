import { forwardRef, useImperativeHandle, useRef } from "react";

export type SkillDetailsControl = {
  scrollToDetails: () => void;
};

export type Callback = () => void;

const SkillDetails = forwardRef<
  SkillDetailsControl,
  { imageLink: string; skillName: string; description: string }
>((_props, ref) => {
  const skillDetailsRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    /**
     * Scrolls the element referenced by skillDetailsRef into view smoothly.
     * This function is intended to be used to bring the skill details section
     * into the user's viewport.
     * @returns {void}
     */
    scrollToDetails: () => {
      const toTopElement = document.querySelector('.skill-details .to-top');
      if (toTopElement) window.scrollTo({ top: Math.round(toTopElement.getBoundingClientRect().top + document.documentElement.scrollTop) - 400, behavior: "smooth" });
    },
  }));

  /**
   * Scrolls the window to the top smoothly. This is intended to be
   * called when the user is done viewing the skill details section
   * and wants to return to the top of the page.
   */
  function toTop() {
    const ulElement = document.querySelector('.skills');
    if (ulElement) window.scrollTo({ top: Math.round(ulElement.getBoundingClientRect().top + document.documentElement.scrollTop) - 100, behavior: "smooth" });
  }

  return (
    <>
      <div className="skill-details" ref={skillDetailsRef}>
        <h3 className="skill-details__skillname">{_props.skillName}</h3>
        <hr />
        <div className="skill-details__description-box">
          <img src={_props.imageLink} alt={_props.skillName} />
          <p
            className="skill-details__description"
            dangerouslySetInnerHTML={{ __html: _props.description }}
          ></p>
        </div>
        <button type="button" className="to-top" onClick={toTop}>
          <i className="material-icons">arrow_forward_ios</i>
          <span>To the top</span>
        </button>
      </div>
    </>
  );
});

export default SkillDetails;
