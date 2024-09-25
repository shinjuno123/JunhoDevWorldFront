import { useCallback, useEffect, useRef, useState } from "react";
import NoteComment, {
  toggleHandle,
} from "../components/component.note-comments";
import { ClipLoader } from "react-spinners";
import { useAppSelector } from "../app/hooks";
import store from "../app/store";
import { emptyNotes, fetchNotes } from "../features/note/note.slice";
import React from "react";

export default function Notes() {
  const noteCommentRefs = useRef<toggleHandle[]>([]);
  const { notes, loading, maxPage, currentPage } = useAppSelector(
    (state) => state.noteManager
  );

  const [delayLoadingActivated, setDelayLoadingActivated] = useState<boolean>(false);

  const [noteParams, setNoteParams] = useState({
    page: -1,
    limit: -1,
  });

  const fetchNotesAsync = useCallback(async () => {
    if (noteParams.page !== -1) {
      await store.dispatch(fetchNotes(noteParams));
      setDelayLoadingActivated(false);
    }

    return;
  }, [noteParams]);

  useEffect(() => {
    store.dispatch(emptyNotes());
    setNoteParams({ page: 1, limit: 5 });
  }, []);

  useEffect(() => {
    fetchNotesAsync();
  }, [fetchNotesAsync]);

  function openPost(ref: toggleHandle) {
    ref.toggleComments();
  }

  const handleScroll = useCallback(async () => {
    if (
      Object.entries(notes).length &&
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight
    ) {
      if (currentPage < maxPage && !delayLoadingActivated && loading === 'succeeded') {

        setDelayLoadingActivated(true);

        setTimeout(()=> {
          setNoteParams({
            page: noteParams.page + 1,
            limit: noteParams.limit,
          });
        }, 1000)

      }
    }

    return;
  }, [notes, currentPage, maxPage, noteParams]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);


  return (
    <>
      <main className="main container">
        <section className="section__notes">
          <span className="notes__header">Notes</span>
          <ul className="notes">
            {Object.entries(notes).reverse().map((note, index) => {
              return (
                <React.Fragment key={note[0]}>
                  <li className="note">
                    <header className="note__header ">
                      <img
                        className="note-profile__image"
                        src={note[1].author.profileImage}
                        alt={note[1].author.name}
                      />
                      <div className="note-profile">
                        <span className="note-profile__name">
                          {note[1].author.name}
                        </span>
                        <span className="note-profile__uploaded">
                          {note[1].created}
                        </span>
                      </div>
                    </header>

                    <main
                      className="note__main"
                      dangerouslySetInnerHTML={{ __html: note[1].content }}
                    ></main>

                    <footer className="note__footer">
                      <div className="left">
                        <i className="material-icons fa-regular">
                          favorite_border
                        </i>
                        <span> You and 201 people like this</span>
                      </div>

                      <div className="right">
                        <button
                          type="button"
                          onClick={() => {
                            if (noteCommentRefs.current) {
                              openPost(noteCommentRefs.current[index]);
                            }
                          }}
                        >
                          <i className="material-icons fa-comment">
                            chat_bubble_outline
                          </i>
                          <span>20</span>
                        </button>
                      </div>
                    </footer>

                    <NoteComment
                      key={index}
                      ref={(el) => {
                        if (noteCommentRefs.current && el) {
                          if (noteCommentRefs.current.at(index)) {
                            noteCommentRefs.current[index] = el;
                          } else {
                            noteCommentRefs.current.push(el);
                          }
                        }
                      }}
                    />
                  </li>
                </React.Fragment>
              );
            })}
            <li
                  style={{
                    display: delayLoadingActivated? "block" : "none",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <ClipLoader></ClipLoader>
                </li>
          </ul>
        </section>
      </main>
    </>
  );
}
