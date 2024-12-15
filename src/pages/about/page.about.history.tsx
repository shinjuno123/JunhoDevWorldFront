import PreviousPage from "../../components/component.previous-page-btn";
import NextPage from "../../components/component.next-page-btn";
import store from "../../app/store";
import { fetchAdminHistory } from "../../features/admin/admin-history.slice";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import React from "react";
import { ClipLoader } from "react-spinners";

export default function History() {
  const { histories, experiences, loading } = useAppSelector(state => state.adminHistoryManager);

  useEffect(() => {
    store.dispatch(fetchAdminHistory());

    return;
  }, []);

  return (
    <>
      <section className="about__history local-page">
        <PreviousPage />

        <h2>History</h2>

        <div className="records">
          <ol className="records__list">
            <li className="record"
              style={{
                display: loading === 'pending' ? "block" : "none",
                padding: '15rem 0',
                textAlign: "center",
              }}
            >
              <ClipLoader />
            </li>
            {Object.entries(histories).sort(() => 1).map((history) => {

              return <React.Fragment key={history[1].id}>
                <li className="record">
                  <span className="record__month-year">
                    <i className="material-symbols-outlined">{history[1].place}</i>
                    <span>{history[1].date}</span>
                  </span>
                  <section className="description">
                    <span>{history[1].title}</span>
                  </section>
                </li>

              </React.Fragment>
            })}
          </ol>
        </div>

        <h2>Work Experience</h2>

        <div className="work-experience container">
          <ul className="experiences">
            <li className="experience"
              style={{
                display: loading === 'pending' ? "block" : "none",
                padding: '15rem 0',
                textAlign: "center",
              }}
            >
              <ClipLoader />
            </li>
            {Object.entries(experiences).sort(() => -1).map((experience) => {

              return <React.Fragment key={experience[0]}>
                <li className="experience">
                  <div className="company-logo">
                    <img
                      src={experience[1].icon}
                      alt={experience[1].company}
                    />
                    <h4>Company name: <p dangerouslySetInnerHTML={{__html: experience[1].company}}></p></h4>
                  </div>
                  <div className="experience-description">
                    <h4>Period: {experience[1].from} ~ {experience[1].to ? experience[1].to : 'now'}</h4>
                    <div className="experience-description-details" dangerouslySetInnerHTML={{ __html: experience[1].description }}></div>
                  </div>
                </li>

              </React.Fragment>
            })}



          </ul>
        </div>

        <NextPage />
      </section>
    </>
  );
}
