import NextPage from "../../components/component.next-page-btn";
import PreviousPage from "../../components/component.previous-page-btn";
import store from "../../app/store";
import { fetchAdminInfo } from "../../features/admin/admin.slice";
import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";

export default function Intro() {
  const {adminInfo, loading} = useAppSelector(state=> state.adminManager);

  useEffect(()=> {
    store.dispatch(fetchAdminInfo());
    
    return;
  },[])

  return (
    <>
      <section className="about__intro local-page">
        <PreviousPage />

        <h1>Who am I</h1>
        <div className="card">
          <div className="card__intro">
            <div className="card__profile">
              <img
                src={adminInfo.avatarUrl}
                alt={adminInfo.name}
              />
            </div>
            <div className="card__sentence">
              <p>
                {adminInfo.description}
              </p>
            </div>
          </div>
        </div>

        <NextPage />
      </section>
    </>
  );
}
