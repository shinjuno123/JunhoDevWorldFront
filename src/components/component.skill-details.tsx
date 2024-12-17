import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

export type SkillDetailsControl = {
  scrollToDetails: () => void;
};

export type Callback = () => void;

const SkillDetails = forwardRef<
  SkillDetailsControl,
  {
    imageLink: string;
    skillName: string;
    description: string;
    proficiency: number;
  }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>((_props, _) => {
  const skillDetailsRef = useRef<HTMLDivElement>(null);
  const [countUp, setCountUp] = useState(0);

  /**
   * Scrolls the window to the top smoothly. This is intended to be
   * called when the user is done viewing the skill details section
   * and wants to return to the top of the page.
   */
  function toTop() {
    const ulElement = document.querySelector(".glide");
    if (ulElement)
      window.scrollTo({
        top:
          Math.round(
            ulElement.getBoundingClientRect().top +
              document.documentElement.scrollTop
          ) - 100,
        behavior: "smooth",
      });
  }


  const countUpHandler = useCallback(() => {
    if (countUp > _props.proficiency) {
      setCountUp(countUp - 1);
      return;
    }

    if (countUp === _props.proficiency) return; 

    if (_props.proficiency >= countUp) {
      setCountUp(countUp + 1);
      return;
    }
  
  },[_props.proficiency, countUp]);

  useEffect(() => {

    const countUpHandle = setInterval(() => {
      countUpHandler();

      if (countUp >= _props.proficiency) return clearInterval(countUpHandle);
    }, 30);

    return () => {
      clearInterval(countUpHandle);
    }
  },[_props.proficiency, countUp, countUpHandler]);

  return (
    <>
      <div className="skill-details" ref={skillDetailsRef}>
        <h3 className="skill-details__skillname">{_props.skillName} <span>(Proficiency: {countUp}%)</span></h3>
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
