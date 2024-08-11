import { Link } from "react-router-dom";
import {
  useLazyFetchPostsQuery,
  Post,
  useLazyFetchNextPostsQuery,
} from "../features/writing/writing.slice";
import { ClipLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Writing() {
  const [fetchPosts, { data: posts, isFetching }] = useLazyFetchPostsQuery();
  const [fetchNextPosts, { data: nextPosts, isFetching:isNextPostsFetching }] = useLazyFetchNextPostsQuery();
  const [postList, setPostList] = useState<Post[]>();



  const fetchPostsAsync = useCallback(async () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight && !isNextPostsFetching && !isFetching) {
      let newPosts;

      if(nextPosts && posts && nextPosts.currentPage === posts.maxPage) {
        return;
      }

      if (nextPosts) {
        newPosts = (await fetchNextPosts(nextPosts.next_page_url as string)).data;
      } else if(posts) {
        newPosts = (await fetchNextPosts(posts.next_page_url as string)).data;
      } else {
        newPosts = (await fetchPosts({limit:5, page:1})).data;
      }
    

      if(newPosts) {
        setPostList((oldArray) => {
          if(oldArray) {
            oldArray = oldArray.filter((oldPost, index) => {
              console.log(newPosts.data[index]);
              if (oldPost.id === newPosts.data[index].id) {
                return false;
              }
  
              return true;
            })
  
            return [...oldArray,...newPosts.data];
          }
          
          return newPosts.data;
        
        });
      }
    } 
  }, [fetchNextPosts, posts, isNextPostsFetching, fetchPosts, nextPosts, isFetching]);


  useEffect(() => {
    fetchPostsAsync();
  }, [fetchPostsAsync]);

  useEffect(() => {
    window.addEventListener("scroll", fetchPostsAsync);
    return () => {
      window.removeEventListener("scroll", fetchPostsAsync);
    };
  }, [fetchPostsAsync]);



  return (
    <>
      <main className="main container">
        <div className="blog-page__outer">
          <div className="blog-page">
            <div className="blog-page__header">
              <span>Writing</span>
            </div>

            <div className="blog-page__main">
              
              <ul className="post__list">
                {postList?.map((post) => {
                  return (
                    <React.Fragment key={post.id}>
                      <li className="post">
                        <Link
                          to="/posts/1"
                          className="post__link"
                          dangerouslySetInnerHTML={{ __html: post.title }}
                        ></Link>
                        <p className="post__date-category">
                          {post.modified}
                          {post.categories.map((category) => {
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
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        ></p>
                      </li>
                    </React.Fragment>
                  );
                })}
               {/* 'display': isFetching || isNextPostsFetching? 'block': 'none', */}
                <li style={{display: isFetching || isNextPostsFetching? 'block': 'none', paddingBottom: '5rem', textAlign: 'center'}}>
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
