import SkillDetails, {
  SkillDetailsControl,
} from "../components/component.skill-details";
import store from "../app/store";
import Glide, {
  Controls,
  Breakpoints,
  Swipe,
  Keyboard,
} from "@glidejs/glide/dist/glide.modular.esm";
import {
  fetchSkills,
  Skill,
  SkillResponse,
} from "../features/skills/skills.slice";
import { useAppSelector } from "../app/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import PreviousPage from "../components/component.previous-page-btn";
import NextPage from "../components/component.next-page-btn";

export default function Skills() {
  const { skills } = useAppSelector((state) => state.skillManager);
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

  const addDeviceEvent = useCallback((tmpGlide: Glide | null) => {
    tmpGlide?.mount({ Controls, Breakpoints, Swipe, Keyboard }).play();
  }, []);

  function clickSkill(skill: Skill, index: number) {
    if (skill) {
      setCurrentSkill(skill);
      glide?.go(`=${index}`);
    }
  }

  const createGlide = useCallback(
    (skillsData: { skills: Skill[] }) => {
      if (!glide) {
        const tmpGlide = new Glide(".glide", {
          type: "carousel",
          perView: 5,
          hoverpause: true,
          startAt: 0,
          focusAt: "center",
          breakpoints: {
            1000: {
              perView: 3,
            },
            670: {
              perView: 2,
            },
          },
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        tmpGlide.on("run.before", (move: { direction: string }) => {
          if (move.direction === ">") {
            const currentSlide = document.querySelector(
              ".glide__slide--active"
            );
            const nextSlide = document.querySelector(
              ".glide__slide--active + .glide__slide"
            );
            const skill = skillsData.skills.find(
              (skill) =>
                skill.id === Number(nextSlide?.getAttribute("data-skill-id"))
            );
            nextSlide?.classList.add("glide__slide--active");
            setCurrentSkill(skill as Skill);
            currentSlide?.classList.remove("glide__slide--active");
          }

          if (move.direction === "<") {
            const currentSlide = document.querySelector(
              ".glide__slide--active"
            );
            const prevSlide = document.querySelector(
              ".glide__slide:has(+.glide__slide.glide__slide--active)"
            );
            const skill = skillsData.skills.find(
              (skill) =>
                skill.id === Number(prevSlide?.getAttribute("data-skill-id"))
            );
            prevSlide?.classList.add("glide__slide--active");
            setCurrentSkill(skill as Skill);
            currentSlide?.classList.remove("glide__slide--active");
          }
        });

        addDeviceEvent(tmpGlide);
        setGlide(tmpGlide);
      }

      return;
    },
    [addDeviceEvent, glide]
  );

  useEffect(() => {
    store
      .dispatch(fetchSkills())
      .then((data) => {
        const skillResponse = data.payload as SkillResponse;
        if (skillResponse.skills.length) {
          const skills = Object.entries(skillResponse.skills).sort((a, b) => a[1].id - b[1].id);
          if(skills.length) {
            setCurrentSkill(skills[0][1]);
          }
        } 

        return data;
      })
      .then((data) => {
        if (!data || !data.payload || typeof data.payload !== "object") {
          return;
        }
        createGlide(data.payload as { skills: Skill[] });
        return;
      });

    return;
  }, [createGlide]);

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
              {Object.entries(skills).sort((a, b) => a[1].id - b[1].id).map((skill) => {
                return (
                  <li
                    className="glide__slide"
                    key={skill[1].id}
                    data-skill-id={skill[1].id}
                  >
                    <img src={skill[1].icon} alt={skill[1].name} />
                    <h2>{skill[1].name}</h2>
                    <hr />
                    <p>
                      {skill[1].description.length > 80
                        ? skill[1].description.slice(0, 80) + "..."
                        : skill[1].description}
                    </p>
                  </li>
                );
              })}
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
        </div>

        <div className="skills">
          <div className="skill-blocks">
            {Object.entries(skills).sort((a, b) => a[1].id - b[1].id).map((skill, index) => {
              return (
                <button onClick={() => clickSkill(skill[1], index)} className={`skill__block ${skill[1].id === currentSkill.id ? "active" : ""}`} key={skill[1].id}>
                  {skill[1].name}
                </button>
              );
            })}
          </div>
          <SkillDetails
            ref={skillDetailsRef}
            imageLink={currentSkill.icon}
            skillName={currentSkill.name}
            description={currentSkill.description}
            proficiency={currentSkill.proficiency}
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
