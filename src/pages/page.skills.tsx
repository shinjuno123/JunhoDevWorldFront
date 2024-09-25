import { SkillDetails } from "../components/component.skill-details";
import store from "../app/store";
import { fetchSkills, Skill, SkillResponse } from "../features/skills/skills.slice";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import React from "react";
import { ClipLoader } from "react-spinners";

export default function Skills() {
  const { skills, loading } = useAppSelector(state => state.skillManager);
  const [currentSkill, setCurrentSkill] = useState<Skill>({ name: '', id: 0, proficiency: 0, icon: '', description: '' });

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
  }, [])

  return (
    <>
      <section className="about__skill-summary local-page">

        <h1>Skill Summary</h1>
        <p>Please click each of skills below to see the details</p>
        <div className="skills">
          <li
            style={{
              display: loading === 'pending' ? "block" : "none",
              padding: '15rem 0',
              textAlign: "center",
            }}
          >
            <ClipLoader />
          </li>
          {Object.entries(skills).reverse().map((skills) => {

            return <React.Fragment key={skills[0]}>
              <li className="skill" onClick={() => clickSkill(skills[1].id)}>
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
          })}
          <SkillDetails imageLink={currentSkill.icon} skillName={currentSkill.name} description={currentSkill.description}></SkillDetails>
        </div>

      </section>
    </>
  );
}
