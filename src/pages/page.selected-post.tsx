// import { useParams } from "react-router-dom";
import { Link, useLocation, useParams, useSearchParams} from "react-router-dom";
import myFace from '../assets/images/myface.jpg'
import { useEffect } from "react";
import store from "../app/store";
import { fetchSelectedPost } from "../features/writing/writing-selected-post.slice";
import { useAppSelector } from "../app/hooks";

export default function SelectedPost() {
  const { postData, loading } = useAppSelector(
    (state) => state.selectedPostFetcher
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { pathname } = location;


  useEffect(()=> {

    async function executeAsync() {
      const postID = Number(pathname.split('/').at(-1));
      await store.dispatch(fetchSelectedPost({id:postID}));
    }

    executeAsync();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <>
      <main className="main container">
        <section className="blog-page__outer">
          <div className="selected-post">
            <div className="selected-post__inner">
              <div className="btn__back-to-post-list__outer">
                <Link className="btn__back-to-post-list" to={`/posts?${searchParams.toString()}`}>
                  <span>Back to list</span> <i className="material-icons icon">arrow_forward</i>
                </Link>
              </div>
              <h2 className="selected-post__title">{postData.post.post_title}</h2>
              <div className="selected-post__info">
                <span className="selected-post__uploaded">{postData.post.post_date}</span> -
                <span>
                  <Link className="selected-post__category" to={`/posts?category=${postData.status.category}`}>
                    {" "+postData.status.category}
                  </Link>
                </span>
              </div>
              <hr />

              <div className="selected-post__content" dangerouslySetInnerHTML={{__html:postData.post.post_content}}></div>
            </div>
            <section className="comments__section">
              <hr />
              <span className="leave-comment__title">Leave yours!</span>
              <div className="leave-comment">
                <img
                  className="leave-comment__profile"
                  src={myFace}
                  alt="profile-image"
                />
                <textarea
                  className="leave-comment__textarea"
                  name=""
                  id=""
                  placeholder="Leave your comment..."
                  rows={3}
                ></textarea>
                <button className="leave-comment__submit" type="button">
                  submit
                </button>
              </div>

              <hr />
              <ul className="comments">
                <span className="comments__title">Comments</span>
                <li className="comment">
                  <img
                    className="comment__profile"
                    src={myFace}
                    alt="profile-image"
                  />
                  <p className="comment__message">
                    Nice work! Keep it up! Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Morbi a finibus nisi. Phasellus
                    congue justo et lectus varius, at vestibulum ipsum dictum.
                    Etiam luctus ac lorem sit amet lobortis. Morbi vestibulum
                    massa non justo bibendum, eget tempor eros porttitor. Fusce
                    vel malesuada purus. Aenean sed velit volutpat, maximus
                    felis sit amet, sagittis orci. Nulla leo libero, maximus ut
                    magna id, mollis pulvinar tortor.
                  </p>
                  <hr />
                </li>

                <li className="comment">
                  <img
                    className="comment__profile"
                    src={myFace}
                    alt="profile-image"
                  />
                  <p className="comment__message">Nice work! Keep it up!</p>
                  <hr />
                </li>

                <li className="comment">
                  <img
                    className="comment__profile"
                    src={myFace}
                    alt="profile-image"
                  />
                  <p className="comment__message">Nice work! Keep it up!</p>
                  <hr />
                </li>

                <li className="comment">
                  <img
                    className="comment__profile"
                    src={myFace}
                    alt="profile-image"
                  />
                  <p className="comment__message">Nice work! Keep it up!</p>
                  <hr />
                </li>
              </ul>

              <hr />
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
