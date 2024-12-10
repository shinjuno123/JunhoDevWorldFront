import SkillDetails, {
  SkillDetailsControl,
} from "../components/component.skill-details";
import store from "../app/store";
import Glide, {
  Controls,
  Breakpoints,
  Swipe,
  Autoplay,
} from "@glidejs/glide/dist/glide.modular.esm";
import {
  fetchSkills,
  Skill,
  SkillResponse,
} from "../features/skills/skills.slice";
import { useAppSelector } from "../app/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { ClipLoader } from "react-spinners";
import PreviousPage from "../components/component.previous-page-btn";
import NextPage from "../components/component.next-page-btn";

export default function Skills() {
  const { skills, loading } = useAppSelector((state) => state.skillManager);
  const skillDetailsRef = useRef<SkillDetailsControl>(null);
  const [glide, setGlide] = useState<Glide | null>(null);
  const [currentSkill, setCurrentSkill] = useState<Skill>({
    name: "",
    id: 0,
    proficiency: 0,
    icon: "",
    description: "",
  });

  /**
   * @function clickSkill
   * @description Update the current skill with the one that matches the given id
   * @param {number} id - The id of the skill to be set as the current one
   */
  function clickSkill(id: number) {
    setCurrentSkill(skills[id]);
  }

  const addDeviceEvent = useCallback((tmpGlide: Glide | null) => {
    tmpGlide?.mount({ Controls, Breakpoints, Swipe, Autoplay}).play(5000);
  }, []);

  const createGlide = useCallback(() => {
    if (!glide) {
      const tmpGlide = new Glide(".glide", {
        type: "carousel",
        perView: 5,
        hoverpause: true,
        autoplay: 5000,
        focusAt: "center",
      });

      tmpGlide.on("run", () => {
        const currentSlide = document.querySelector(".glide__slide--active");
        const nextSlide = document.querySelector(".glide__slide--active + .glide__slide");
        nextSlide?.classList.add('glide__slide--active');
        currentSlide?.classList.remove('glide__slide--active');
      })
      addDeviceEvent(tmpGlide);
      setGlide(tmpGlide);
    }

    return;
  }, []);


  useEffect(() => {
    store
      .dispatch(fetchSkills())
      .then((data) => {
        const skillResponse = data.payload as SkillResponse;
        if (skillResponse.skills.length) {
          setCurrentSkill(skillResponse.skills[0]);
        }
      })
      .then(() => {
        createGlide();
      });

    return;
  }, []);

  return (
    <>
      <section className="about__skill-summary local-page">
        <div
          style={{
            display: window.location.href.endsWith("/about/skills")
              ? "block"
              : "none",
          }}
        >
          <PreviousPage />
        </div>
        <h1>Skill Summary</h1>
        <p>Please click each of skills below to see the details</p>

        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              <li className="glide__slide">0</li>
              <li className="glide__slide">1</li>
              <li className="glide__slide">2</li>
              <li className="glide__slide">3</li>
              <li className="glide__slide">4</li>
              <li className="glide__slide">5</li>
              <li className="glide__slide">6</li>
              <li className="glide__slide">7</li>
              <li className="glide__slide">8</li>
            </ul>
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--left"
              data-glide-dir="<"
            >
              prev
            </button>
            <button
              className="glide__arrow glide__arrow--right"
              data-glide-dir=">"
            >
              next
            </button>
          </div>
          <div className="glide__bullets" data-glide-el="controls[nav]">
            <button className="glide__bullet" data-glide-dir="=0"></button>
            <button className="glide__bullet" data-glide-dir="=1"></button>
            <button className="glide__bullet" data-glide-dir="=2"></button>
            <button className="glide__bullet" data-glide-dir="=3"></button>
            <button className="glide__bullet" data-glide-dir="=4"></button>
            <button className="glide__bullet" data-glide-dir="=5"></button>
            <button className="glide__bullet" data-glide-dir="=6"></button>
            <button className="glide__bullet" data-glide-dir="=7"></button>
            <button className="glide__bullet" data-glide-dir="=8"></button>
          </div>
        </div>

        <div className="skills">
          <ul>
            <li
              style={{
                display: loading === "pending" ? "block" : "none",
                padding: "15rem 0",
                textAlign: "center",
              }}
            >
              <ClipLoader />
            </li>

            {Object.entries(skills)
              .reverse()
              .map((skills) => {
                return (
                  <React.Fragment key={skills[0]}>
                    <li
                      className={`skill ${currentSkill.id === skills[1].id ? "selected" : ""}`}
                      onClick={() => clickSkill(skills[1].id)}
                    >
                      <div className="skill-name">
                        <span>{skills[1].name}</span>
                      </div>
                      <div className="skill-level">
                        <div
                          className="skill-level__gauge"
                          style={{ width: `${skills[1].proficiency}%` }}
                        ></div>
                      </div>
                      <div className="skill-percent">
                        <span>{skills[1].proficiency}%</span>
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}
          </ul>

          <SkillDetails
            ref={skillDetailsRef}
            imageLink={currentSkill.icon}
            skillName={currentSkill.name}
            description={currentSkill.description}
          ></SkillDetails>
        </div>

        <div
          style={{
            display: window.location.href.endsWith("/about/skills")
              ? "block"
              : "none",
          }}
        >
          <NextPage />
        </div>
      </section>
    </>
  );
}
