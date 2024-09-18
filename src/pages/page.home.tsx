import "material-icons/iconfont/material-icons.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useCallback, useEffect, useRef } from "react";
import store from "../app/store";
import { fetchFeaturedPosts } from "../features/writing/writing-featured-posts.slice";
import React from "react";

export default function Home() {
    const { featuredPosts, loading } = useAppSelector((state) => state.featuredPostManager);
    const navigate = useNavigate();

    const fetchFeaturedPostsAsync = useCallback(async()=> {
        await store.dispatch(fetchFeaturedPosts());
    },[])

    useEffect(() => {
        fetchFeaturedPostsAsync();
    }, []);

    const clickLink = (id: number) => {
        navigate(`/posts/${id}`);
    }


    return (
        <>
            <main className="main container">
                <div className="intro">
                    <div className="intro__inner">
                        <h1 className="intro__title">I do Software Development</h1>
                        <p className="intro__pretitle">
                            <Link to="/about">
                                Hello, my name is Junho&nbsp;
                            </Link>
                        </p>
                        <div className="intro__content">
                            <p>I’m a Software Engineer, Quality Assuarance, Quality Control and Full stack development, specialized in Web. I
                                also write about the web on my blog and elsewhere.</p>
                        </div>
                    </div>

                </div>

                <div className="featured-posts__outer">
                    <h2>Featured Posts</h2>
                    <div className="featured-posts">
                        <ul className="featured-posts__list">
                            {Object.entries(featuredPosts).reverse().map((featuredPost) => {
                                return <React.Fragment key={featuredPost[0]} >
                                    <li className="featured-posts__item" onClick={()=> clickLink(featuredPost[1].id)}>
                                        <div className="featured-post">
                                            <picture>
                                                <source
                                                    srcSet={`${featuredPost[1].background_image} 500w`}
                                                    type="img/avif" />
                                                <img className="featured-post__image"
                                                    src={featuredPost[1].background_image}
                                                    alt="" loading="eager" decoding="auto" width="500" height="500" />
                                            </picture>
                                            <div className="featured-post__inner">
                                                <Link className="featured-post__link" to={`/posts/${featuredPost[1].id}`}>
                                                    <span className="featured-post__title">{featuredPost[1].title}</span>
                                                </Link>
                                                <p className="featured-post__description">
                                                    {featuredPost[1].excerpt}
                                                </p>
                                                <span className="featured-post__likecount" aria-label="47 Likes">
                                                    <i className="fa-regular fa-heart"></i>
                                                    &nbsp;&nbsp;<span>47</span>
                                                </span>
                                            </div>
                                        </div>
                                    </li>

                                </React.Fragment>
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
    )
}