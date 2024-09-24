import PreviousPage from "../../components/component.previous-page-btn";
import NextPage from "../../components/component.next-page-btn";
import store from "../../app/store";
import { fetchAdminHistory } from "../../features/admin/admin-history.slice";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import React from "react";

export default function History() {
  const { histories, loading } = useAppSelector(state => state.adminHistoryManager);

  useEffect(() => {
    store.dispatch(fetchAdminHistory());

    return;
  },[]);

  return (
    <>
      <section className="about__history local-page">
        <PreviousPage />

        <h2>History</h2>

        <div className="records">
          <ol className="records__list">
            {Object.entries(histories).sort(()=>1).map((history) => {

              return <React.Fragment key={history[1].id}>
                <li className="record">
                  <span className="record__month-year">
                    <i className="material-symbols-outlined">{history[1].place}</i>
                    <span>{history[1].date}</span>
                  </span>
                  <section className="description">
                    <span>{history[1].title}</span>
                    <p>{history[1].description}</p>
                  </section>
                </li>

              </React.Fragment>
            })}
          </ol>
        </div>

        <h2>Work Experience</h2>

        <div className="work-experience">
          <ul className="experiences">
            <li className="experience">
              <div className="company-logo">
                <img
                  src="https://static.wixstatic.com/media/5c1748_341033b39eac4d43a2908fe4431ef5b2~mv2.png/v1/fill/w_172,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bObsweep-logo-website.png"
                  alt=""
                />
              </div>
              <div className="experience-description">
                <h4>Company name: bObsweep</h4>
                <h4>Period: Oct 30 2023 ~ now</h4>
                <ul className="experience-description-details">
                  <li className="detail">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </li>
                  <li className="detail">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </li>
                  <li className="detail">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </li>
                </ul>
              </div>
            </li>

            <li className="experience">
              <div className="company-logo">
                <img
                  src="https://static.wixstatic.com/media/5c1748_341033b39eac4d43a2908fe4431ef5b2~mv2.png/v1/fill/w_172,h_32,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bObsweep-logo-website.png"
                  alt=""
                />
              </div>
              <div className="experience-description">
                <h4>Company name: bObsweep</h4>
                <h4>Period: Oct 30 2023 ~ now</h4>
                <ul className="experience-description-details">
                  <li className="detail">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </li>
                  <li className="detail">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </li>
                  <li className="detail">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <NextPage />
      </section>
    </>
  );
}
