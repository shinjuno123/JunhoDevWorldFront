import Glide, {
  Controls,
  Breakpoints,
  Swipe,
} from "@glidejs/glide/dist/glide.modular.esm";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "material-icons/iconfont/material-icons.scss";
import { useAppSelector } from "../app/hooks";
import store from "../app/store";
import { fetchOutstandingProjects } from "../features/project/outstanding-project.slice";
import React from "react";
import {
  fetchOtherProjects,
  emptyOtherProjects,
} from "../features/project/other-project.slice";
import { ClipLoader } from "react-spinners";
export default function Projects() {
  const [hover, setHover] = useState("");
  const glideRef = useRef(null);
  const projects = useRef<Element>(null);
  const {
    outstandingProjects: outstandingProjects,
    loading: outstandingProjectsLoader,
  } = useAppSelector((state) => state.outstandingProjectManager);
  const {
    otherProjects,
    loading: otherProjectsLoader,
    previousPageUrl,
    nextPageUrl,
    maxPage,
    currentPage,
  } = useAppSelector((state) => state.otherProjectManager);
  const [glide, setGlide] = useState<Glide | null>(null);
  const [intervalEvent, setIntervalEvent] = useState<NodeJS.Timeout | null>(
    null
  );


  const swipeInterval = () => {
    const arrowRight = document.querySelector(".glide__arrow--right");
    arrowRight?.dispatchEvent(new Event("click"));
  };

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  const addDeviceEvent = useCallback((tmpGlide: Glide | null) => {
    console.log(isMobile());
    if (isMobile()) {
      document.querySelector('.glide__arrows')?.classList.add('hidden');
      tmpGlide?.mount({ Controls, Breakpoints, Swipe }).play();
    } else {
      
      tmpGlide?.mount({ Controls, Breakpoints }).play();
    }
  },[])

  const createGlide = useCallback(() => {
    if (!glide) {
      const tmpGlide = new Glide(".glide", {
        type: "carousel",
        perView: 1,
      });
      addDeviceEvent(tmpGlide);
      setGlide(tmpGlide);
    }

    if (!intervalEvent) {
      setIntervalEvent(setInterval(swipeInterval, 7000));
    }
  }, []);

  const fetchOutstandingProjectsAsync = useCallback(async () => {
    await store.dispatch(fetchOutstandingProjects());
    createGlide();
  }, []);

  const fetchOtherProjectsAsync = useCallback(
    async (
      page: number,
      limit: number,
      nextPage: { activated: boolean; url: string }
    ) => {
      await store.dispatch(
        fetchOtherProjects({ page: page, limit: limit, nextPage: nextPage })
      );
    },
    []
  );

  useEffect(() => {
    if (glideRef.current) {
      fetchOutstandingProjectsAsync();
      fetchOtherProjectsAsync(1, 8, { activated: false, url: "" });
    }

    return;
  }, []);

  const scrollTo = (element: Element) => {
    element.scrollIntoView({behavior: 'smooth' })    
  }


  const clickNext = async () => {
    if (projects.current) scrollTo(projects.current);

    await store.dispatch(emptyOtherProjects());
    await store.dispatch(
      fetchOtherProjects({
        page: 0,
        limit: 0,
        nextPage: { activated: true, url: nextPageUrl },
      })
    );
  };

  const clickPrev = async () => {
    if (projects.current) scrollTo(projects.current);

    await store.dispatch(emptyOtherProjects());
    await store.dispatch(
      fetchOtherProjects({
        page: 0,
        limit: 0,
        nextPage: { activated: true, url: previousPageUrl },
      })
    );

  };

  const toPage = async (page: number) => {
    if (projects.current) scrollTo(projects.current);

    await store.dispatch(emptyOtherProjects());
    await store.dispatch(
      fetchOtherProjects({
        page: page,
        limit: 8,
        nextPage: { activated: false, url: "" },
      })
    );
  };

  return (
    <>
      <section className="project__page">
        <section className="hero_projects local-page">
          <h1>Amazing Projects!</h1>

          <div className="glide" ref={glideRef}>
            <li
              style={{
                display:
                  outstandingProjectsLoader === "pending" ? "block" : "none",
                padding: "15rem 0",
                textAlign: "center",
              }}
            >
              <ClipLoader />
            </li>

            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {Object.entries(outstandingProjects)
                  .reverse()
                  .map((project) => {
                    return (
                      <React.Fragment key={project[0]}>
                        <li
                          className="glide__slide"
                          onClick={() => {
                            window.open(project[1].github_link, "_blank");
                          }}
                          onMouseEnter={() => setHover("hover")}
                          onMouseLeave={() => setHover("")}
                        >
                          <div className={"slide__wrapper"}>
                            <div
                              className={`slide__background ${hover}`}
                              style={{
                                background: `url(${project[1].background}) no-repeat center center fixed`,
                                backgroundSize: "cover",
                              }}
                            >
                              {hover === "hover" ? (
                                <>
                                  <div>
                                    <span>{project[1].title}</span>
                                    <span>Click this to see the details</span>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className={`slide__description ${hover}`}>
                              <h3>
                                {project[1].title}
                                <br />
                                {`(Click this slide to see the details)`}
                              </h3>
                              <p>{project[1].description}</p>
                              <h4>Skills</h4>
                              <ol>
                                {project[1].skills.map((skill, index) => {
                                  return (
                                    <React.Fragment key={index}>
                                      <li>
                                        <span className="material-symbols-outlined">
                                          {skill}
                                        </span>
                                      </li>
                                    </React.Fragment>
                                  );
                                })}
                              </ol>
                            </div>
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  })}
              </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
              <button
                className="glide__arrow glide__arrow--left"
                data-glide-dir="<"
              >
                <span className="material-icons">arrow_back_ios</span>
              </button>
              <button
                className="glide__arrow glide__arrow--right"
                data-glide-dir=">"
              >
                <span className="material-icons">arrow_forward_ios</span>
              </button>
            </div>

            <div className="glide__bullets" data-glide-el="controls[nav]">
              {Object.entries(outstandingProjects)
                .reverse()
                .map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <button
                        className="glide__bullet"
                        data-glide-dir={`=${index}`}
                      ></button>
                    </React.Fragment>
                  );
                })}
            </div>
          </div>

          <h2>Check my other projects!</h2>

          <div className="project-list" ref={projects}>
            <ul className="projects">
              {Object.entries([1, 2, 3, 4, 5, 6, 7, 8]).map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <li
                      className="project"
                      style={{
                        display:
                          otherProjectsLoader === "pending" ? "block" : "none",
                      }}
                    >
                      <div className="project__info">
                        <div className="project__description">
                          <ClipLoader />
                        </div>
                      </div>
                    </li>
                  </React.Fragment>
                );
              })}

              {Object.entries(otherProjects)
                .reverse()
                .map((project) => {
                  return (
                    <React.Fragment key={project[0]}>
                      <li className="project">
                        <div className="project__info">
                          <div className="project__background">
                            <img
                              src={project[1].background}
                              alt={project[1].title}
                            />
                          </div>
                          <div className="project__description">
                            <h4 className="project__title">
                              {project[1].title.length > 30? project[1].title.slice(0, 30) + "...": project[1].title}
                            </h4>
                            <p className="project__excerpt">
                              {project[1].excerpt.length > 250? project[1].excerpt.slice(0, 250) + "...": project[1].excerpt}
                            </p>
                          </div>
                        </div>
                        <div className="project__link-cover">
                          <a
                            className="project__link"
                            href={project[1].github_link}
                            target="_blank"
                          >
                            <h4 className="project__title">
                              {project[1].title}
                            </h4>
                          </a>
                        </div>
                      </li>
                    </React.Fragment>
                  );
                })}
            </ul>

            <div className="pagination">
              <ol className="page-numbers">
                <li className="go-left page-number" onClick={() => clickPrev()}>
                  <span className="material-icons">chevron_left</span>
                </li>

                {[...Array(maxPage).keys()]
                  .map((i) => i + 1)
                  .map((page) => {
                    return (
                      <React.Fragment key={page}>
                        <li
                          className={`page-number ${currentPage == page ? "current-page" : ""}`}
                          onClick={() => toPage(page)}
                        >
                          <span>{page}</span>
                        </li>
                      </React.Fragment>
                    );
                  })}

                <li
                  className="go-right page-number"
                  onClick={() => clickNext()}
                >
                  <span className="material-icons">chevron_right</span>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
