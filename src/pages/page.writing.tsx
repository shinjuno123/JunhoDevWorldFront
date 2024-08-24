import { Link, useParams, useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchPosts, emptyPosts } from "../features/writing/writing-posts.slice";
import store from "../app/store";
import { useAppSelector } from "../app/hooks";
import Select from "../components/component.select";

export default function Writing() {
  const { posts, categories, maxPage, currentPage, loading } = useAppSelector(
    (state) => state.postFetcher
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const [postParams, setPostParams] = useState({
    page: 1,
    limit: 5,
    categoryName: "",
  });

  const fetchPostsAsync = useCallback(async () => {
    await store.dispatch(fetchPosts(postParams));
    return;
  }, [postParams]);

  const handleScroll = useCallback(async () => {
    if (
      Object.entries(posts).length &&
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
    ) {
      if (currentPage < maxPage) {
        setPostParams({
          page: postParams.page + 1,
          limit: postParams.limit,
          categoryName: postParams.categoryName,
        });
      }
    }

    return;
  }, [posts, currentPage, maxPage, postParams]);

  useEffect(() => {
    const category = searchParams.get('category')

    if (category){
      setPostParams({ page: 1, limit: 5, categoryName: category });
    } else {
      setPostParams({ page: 1, limit: 5, categoryName: "" });
    }

  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchPostsAsync();
  }, [postParams, fetchPostsAsync]);

  const onOptionChangehandler = async (event:  React.MouseEvent<HTMLDivElement>) => {
    store.dispatch(emptyPosts());
    if (event.currentTarget.innerText === "All") {
      setPostParams({ page: 1, limit: postParams.limit, categoryName: "" });
    } else {
      setPostParams({
        page: 1,
        limit: postParams.limit,
        categoryName: event.currentTarget.innerText,
      });
    }
  };

  return (
    <>
      <main className="main container">
        <div className="blog-page__outer">
          <div className="blog-page">
            <div className="blog-page__header">
              <span>Writing</span>
              <Select postParams={postParams} categories={categories} onOptionChangehandler={onOptionChangehandler}></Select>
            </div>

            <div className="blog-page__main">
              <ul className="post__list">
                {Object.entries(posts)
                  .sort()
                  .reverse()
                  .map((post) => {
                    return (
                      <React.Fragment key={post[0]}>
                        <li className="post">
                          <Link
                            to={`/posts/${post[0]}?category=${postParams.categoryName}`}
                            className="post__link"
                            dangerouslySetInnerHTML={{ __html: post[1].title }}
                          ></Link>
                          <p className="post__date-category">
                            {post[1].modified}
                            {post[1].categories.map((category) => {
                              return (
                                <React.Fragment key={uuidv4()}>
                                  <span style={{ marginLeft: ".5rem" }}>-</span>
                                  <span onClick={()=> {
                                    scrollTo(0,0);
                                    store.dispatch(emptyPosts());
                                    setPostParams({page: 1,limit: postParams.limit,categoryName:category});
                                  }} 
                                  className="post__category" style={{ marginLeft: ".5rem" }}>
                                    {category}
                                  </span>
                                </React.Fragment>
                              );
                            })}
                          </p>
                          <p
                            className="post__excerpt"
                            dangerouslySetInnerHTML={{
                              __html: post[1].excerpt,
                            }}
                          ></p>
                        </li>
                      </React.Fragment>
                    );
                  })}

                <li
                  style={{
                    display: loading === "pending" ? "block" : "none",
                    paddingBottom: "5rem",
                    textAlign: "center",
                  }}
                >
                  <ClipLoader></ClipLoader>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
