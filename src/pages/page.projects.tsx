import projectImage from "../assets/images/example-project.png";
import Glide , {Autoplay, Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';
import { useCallback, useEffect, useRef } from "react";
import "material-icons/iconfont/material-icons.scss";
import { useAppSelector } from "../app/hooks";
import store from "../app/store";
import { fetchOutstandingProjects } from "../features/project/outstanding-project.slice";
import React from "react";

export default function Projects() {
  const glideRef = useRef(null);
  const { projects: outstandingProjects, loading } = useAppSelector((state) =>
    state.outstandingProjectManager
  );


  const createGlide = () => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      perView: 1,
      autoplay: 10000,
    });


    glide.mount({ Autoplay, Controls, Breakpoints }).play();

    document.querySelectorAll('.glide__slide').forEach((slide) => {
      slide.addEventListener('click', () => {
        window.open(slide.getAttribute('data-url') as string, "_blank");
      })
    })

    return
  }


  const fetchOutstandingProjectsAsync = useCallback(async () => {
    await store.dispatch(fetchOutstandingProjects());
    createGlide();
    return;
  }, []);



  useEffect(() => {
    if (glideRef.current) {
      fetchOutstandingProjectsAsync();
    }
  }, [])


  return (
    <>
      <section className="project__page">
        <section className="hero_projects local-page">
          <h1>Amazing Projects!</h1>

          <div className="glide" ref={glideRef}>
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {Object.entries(outstandingProjects).reverse().map((project) => {
                  return <React.Fragment key={project[1].id}>
                    <li className="glide__slide"  data-url={project[1].github_link}>
                      <div className="slide__wrapper">
                        <div className="slide__background" style={{ background: `url(${project[1].background}) no-repeat center center fixed`, 'backgroundSize': 'cover' }} />
                        <div className="slide__description">
                          <h3>Portfolio Website V1<br/>{`(Click this slide to see the details)`}</h3>
                          <p>
                            {project[1].description}
                          </p>
                          <h4>Skills</h4>
                          <ol>

                            {project[1].skills.map((skill, index) => {
                              return <React.Fragment key={index}>
                                <li >
                                  <span className="material-symbols-outlined" >
                                    {skill}
                                  </span>
                                </li>

                              </React.Fragment>
                            })}

                          </ol>

                        </div>
                      </div>
                    </li>
                  </React.Fragment>
                })}



              </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
              <button
                className="glide__arrow glide__arrow--left"
                data-glide-dir="<"
              >
                <span className="material-icons">
                  arrow_back_ios
                </span>
              </button>
              <button
                className="glide__arrow glide__arrow--right"
                data-glide-dir=">"
              >
                <span className="material-icons">
                  arrow_forward_ios
                </span>
              </button>
            </div>

            <div className="glide__bullets" data-glide-el="controls[nav]">
              {Object.entries(outstandingProjects).reverse().map((_, index) => {
                return <React.Fragment key={index}>
                  <button className="glide__bullet" data-glide-dir={`=${index}`}></button>
                </React.Fragment>
              })}
            </div>
          </div>

          <h2>Check my other projects!</h2>

          <div className="project-list">
            <ul className="projects">
              <li className="project">
                <div className="project__info">
                  <div className="project__background">
                    <img
                      src={projectImage}
                      alt=""
                    />
                  </div>
                  <div className="project__description">
                    <h4 className="project__title">Simon Game</h4>
                    <p className="project__excerpt">
                      Traditional simon game. This game is the best probably in
                      this world!
                    </p>
                  </div>
                </div>
                <div className="project__link-cover">
                  <a className="project__link" href="https://github.com/">
                    <h4 className="project__title">Simon Game</h4>
                  </a>
                </div>
              </li>
              <li className="project">
                <div className="project__info">
                  <div className="project__background">
                    <img
                      src={projectImage}
                      alt=""
                    />
                  </div>
                  <div className="project__description">
                    <h4 className="project__title">Simon Game</h4>
                    <p className="project__excerpt">
                      Traditional simon game. This game is the best probably in
                      this world!
                    </p>
                  </div>
                </div>
                <div className="project__link-cover">
                  <a className="project__link" href="https://github.com/">
                    <h4 className="project__title">Simon Game</h4>
                  </a>
                </div>
              </li>
              <li className="project">
                <div className="project__info">
                  <div className="project__background">
                    <img
                      src={projectImage}
                      alt=""
                    />
                  </div>
                  <div className="project__description">
                    <h4 className="project__title">Simon Game</h4>
                    <p className="project__excerpt">
                      Traditional simon game. This game is the best probably in
                      this world!
                    </p>
                  </div>
                </div>
                <div className="project__link-cover">
                  <a className="project__link" href="https://github.com/">
                    <h4 className="project__title">Simon Game</h4>
                  </a>
                </div>
              </li>
              <li className="project">
                <div className="project__info">
                  <div className="project__background">
                    <img
                      src={projectImage}
                      alt=""
                    />
                  </div>
                  <div className="project__description">
                    <h4 className="project__title">Simon Game</h4>
                    <p className="project__excerpt">
                      Traditional simon game. This game is the best probably in
                      this world!
                    </p>
                  </div>
                </div>
                <div className="project__link-cover">
                  <a className="project__link" href="https://github.com/">
                    <h4 className="project__title">Simon Game</h4>
                  </a>
                </div>
              </li>
              <li className="project">
                <div className="project__info">
                  <div className="project__background">
                    <img
                      src={projectImage}
                      alt=""
                    />
                  </div>
                  <div className="project__description">
                    <h4 className="project__title">Simon Game</h4>
                    <p className="project__excerpt">
                      Traditional simon game. This game is the best probably in
                      this world!
                    </p>
                  </div>
                </div>
                <div className="project__link-cover">
                  <a className="project__link" href="https://github.com/">
                    <h4 className="project__title">Simon Game</h4>
                  </a>
                </div>
              </li>
              <li className="project">
                <div className="project__info">
                  <div className="project__background">
                    <img
                      src={projectImage}
                      alt=""
                    />
                  </div>
                  <div className="project__description">
                    <h4 className="project__title">Simon Game</h4>
                    <p className="project__excerpt">
                      Traditional simon game. This game is the best probably in
                      this world!
                    </p>
                  </div>
                </div>
                <div className="project__link-cover">
                  <a className="project__link" href="https://github.com/">
                    <h4 className="project__title">Simon Game</h4>
                  </a>
                </div>
              </li>
              <li className="project">
                <div className="project__info">
                  <div className="project__background">
                    <img
                      src={projectImage}
                      alt=""
                    />
                  </div>
                  <div className="project__description">
                    <h4 className="project__title">Simon Game</h4>
                    <p className="project__excerpt">
                      Traditional simon game. This game is the best probably in
                      this world!
                    </p>
                  </div>
                </div>
                <div className="project__link-cover">
                  <a className="project__link" href="https://github.com/">
                    <h4 className="project__title">Simon Game</h4>
                  </a>
                </div>
              </li>
              <li className="project">
                <div className="project__info">
                  <div className="project__background">
                    <img
                      src={projectImage}
                      alt=""
                    />
                  </div>
                  <div className="project__description">
                    <h4 className="project__title">Simon Game</h4>
                    <p className="project__excerpt">
                      Traditional simon game. This game is the best probably in
                      this world!
                    </p>
                  </div>
                </div>
                <div className="project__link-cover">
                  <a className="project__link" href="https://github.com/">
                    <h4 className="project__title">Simon Game</h4>
                  </a>
                </div>
              </li>
            </ul>

            <div className="pagination">
              <ol className="page-numbers">
                <li className="go-left page-number">
                  <span className="material-icons">
                    chevron_left
                  </span>
                </li>
                <li className="page-number current-page">
                  <span>1</span>
                </li>

                <li className="page-number">
                  <span>2</span>
                </li>

                <li className="page-number">
                  <span>3</span>
                </li>

                <li className="page-number">
                  <span>4</span>
                </li>

                <li className="page-number">
                  <span>5</span>
                </li>

                <li className="page-number">
                  <span>6</span>
                </li>

                <li className="page-number">
                  <span>7</span>
                </li>

                <li className="page-number">
                  <span>8</span>
                </li>

                <li className="go-right page-number">
                  <span className="material-icons">
                    chevron_right
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
