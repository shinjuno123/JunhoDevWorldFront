import { Link } from "react-router-dom";
import {
  Post,
  Posts,
} from "../features/writing/writing.slice";
import { ClipLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { fetchPosts, emptyPosts } from "../features/writing/writing.slice";
import store from "../app/store";
import { useAppSelector } from "../app/hooks";


export default function Writing() {
  const {posts, categories, maxPage, currentPage, loading} = useAppSelector((state) => state.postFetcher);
  const [postParams, setPostParams] = useState({page: 1, limit: 5, categoryName: ""});

  const fetchPostsAsync = useCallback(async() => {
    await store.dispatch(fetchPosts(postParams));
    return;
  }, [postParams]);

 const handleScroll = useCallback(async () => {
    if (Object.entries(posts).length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {

      if (currentPage < maxPage) {
        setPostParams({page: postParams.page + 1, limit: postParams.limit, categoryName: postParams.categoryName});
      
      }
    }

    return;
  }, [posts, currentPage, maxPage, postParams]);


  useEffect(()=> {

    const executeAsync = async () => {
      await fetchPostsAsync();
    };

    return () => {
      executeAsync();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll",  handleScroll);
    }

  }, [handleScroll]);

  useEffect(() => {
    fetchPostsAsync();
    console.log("CALLED!")
  }, [postParams, fetchPostsAsync])




  const onOptionChangehandler = async (event: { target: { value: React.SetStateAction<string>; }; }) => {
    store.dispatch(emptyPosts());
    if (event.target.value === "All") {
      setPostParams({page: 1, limit: postParams.limit, categoryName: ''});
    } else {
      setPostParams({page: 1, limit: postParams.limit, categoryName: event.target.value as string});
    }

  }

  return (
    <>
      <main className="main container">
        <div className="blog-page__outer">
          <div className="blog-page">
            <div className="blog-page__header">
              <span>Writing</span>
              <select defaultValue={'All'} id='categories'name="categories" onChange={onOptionChangehandler}>
                <option value={"All"}>All</option>
                {categories.map((category) => {
                  return (
                    <React.Fragment key={category}>
                      <option value={category}>{category}</option>
                    </React.Fragment>
                  );
                })}
              </select>
            </div>

            <div className="blog-page__main">
              <ul className="post__list">
              {Object.entries(posts).sort().reverse().map((post) => {
                  return (
                    <React.Fragment key={post[0]}>
                      <li className="post">
                        <Link
                          to="/posts/1"
                          className="post__link"
                          dangerouslySetInnerHTML={{ __html: post[1].title }}
                        ></Link>
                        <p className="post__date-category">
                          {post[1].modified}
                          {post[1].categories.map((category) => {
                            return (
                              <React.Fragment key={uuidv4()}>
                                <span style={{ marginLeft: ".5rem" }}>-</span>
                                <span style={{ marginLeft: ".5rem" }}>
                                  {category}
                                </span>
                              </React.Fragment>
                            );
                          })}
                        </p>
                        <p
                          className="post__excerpt"
                          dangerouslySetInnerHTML={{ __html: post[1].excerpt }}
                        ></p>
                      </li>
                    </React.Fragment>
                  );
                })}

                <li
                  style={{
                    display: loading === 'pending'? "block":"none",
                    paddingBottom: "5rem",
                    textAlign: "center",
                  }}
                >
                  {loading}
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
