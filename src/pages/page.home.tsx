import "material-icons/iconfont/material-icons.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useCallback, useEffect } from "react";
import store from "../app/store";
import { fetchFeaturedPosts } from "../features/writing/writing-featured-posts.slice";
import React from "react";
import { GridLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * The homepage of the site.
 *
 * This component shows a list of featured posts, fetched from the API.
 *
 * @returns {JSX.Element} The JSX element representing the homepage.
 * @constructor
 */
export default function Home() {
  const { featuredPosts, loading } = useAppSelector(
    (state) => state.featuredPostManager
  );
  const navigate = useNavigate();

  const fetchFeaturedPostsAsync = useCallback(async () => {
    await store.dispatch(fetchFeaturedPosts());
  }, []);

  useEffect(() => {
    fetchFeaturedPostsAsync();
  }, []);

  const clickLink = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <>
      <main className="main container">
        <div className="intro">
          <div className="intro__inner">
            <h1 className="intro__title">I do Software Development</h1>
            <h1 className="intro__pretitle">
              <Link to="/about" role="link" aria-label="Link to introduction page">Hello, my name is Junho&nbsp;</Link>
            </h1>
            <div className="intro__content">
              <p>
                I’m a Software Engineer, Quality Assuarance, Quality Control and
                Full stack development, specialized in Web. I also write about
                the web on my blog and elsewhere.
              </p>
            </div>
          </div>
        </div>

        <div className="featured-posts__outer">
          <h2>Featured Posts</h2>
          <div className="featured-posts">
            <ul className="featured-posts__list">
              {loading !== "succeeded" ? (
                <li
                  className="featured-posts__item"
                  style={{ padding: "2rem" }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "fit-content",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    <GridLoader />
                  </div>
                </li>
              ) : (
                ""
              )}
              {Object.entries(featuredPosts)
                .reverse()
                .map((featuredPost) => {
                  return (
                    <React.Fragment key={featuredPost[0]}>
                      <li
                        className="featured-posts__item"
                        onClick={() => clickLink(featuredPost[1].id)}
                      >
                        <div className="featured-post">
                          <LazyLoadImage
                            effect="blur"
                            height={'100%'}
                            width={'100%'}
                            alt={"Link to featured Post" + featuredPost[1].title}
                            className="featured-post__image"
                            src={featuredPost[1].background_image}
                            placeholderSrc={featuredPost[1].background_image}
                          />
                          <div className="featured-post__inner">
                            <Link
                              className="featured-post__link"
                              to={`/posts/${featuredPost[1].id}`}
                            >
                              <h1 className="featured-post__title">
                                {featuredPost[1].title}
                              </h1>
                            </Link>
                            <h2 className="featured-post__description">
                              {featuredPost[1].excerpt}
                            </h2>
                          </div>
                        </div>
                      </li>
                    </React.Fragment>
                  );
                })}
            </ul>
            <p className="featured-posts__footer">
              <Link to="/posts" className="featured-posts__see-all">
                See All Posts&nbsp;
                <i className="material-icons icon">arrow_forward</i>
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
