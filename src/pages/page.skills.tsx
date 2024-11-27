import SkillDetails, {
  SkillDetailsControl,
} from "../components/component.skill-details";
import store from "../app/store";
import {
  fetchSkills,
  Skill,
  SkillResponse,
} from "../features/skills/skills.slice";
import { useAppSelector } from "../app/hooks";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { ClipLoader } from "react-spinners";
import PreviousPage from "../components/component.previous-page-btn";
import NextPage from "../components/component.next-page-btn";

export default function Skills() {
  const { skills, loading } = useAppSelector((state) => state.skillManager);
  const skillDetailsRef = useRef<SkillDetailsControl>(null);
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

  useEffect(() => {
    store.dispatch(fetchSkills()).then((data) => {
      const skillResponse = data.payload as SkillResponse;
      if (skillResponse.skills.length) {
        setCurrentSkill(skillResponse.skills[0]);
      }
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
