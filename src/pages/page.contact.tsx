import { FormEvent, useReducer, useRef, useState } from "react";
import NextPage from "../components/component.next-page-btn";
import PreviousPage from "../components/component.previous-page-btn";
import store from "../app/store";
import { sendEmail } from "../features/email/email.slice";

interface UserFormState {
  validated: boolean;
  errorMessage: {
    email: string;
    name: string;
    message: string;
  };
}

interface UserFormAction {
  type: "VALIDATED" | "INVALIDATED";
  errorMessage: {
    email: string;
    name: string;
    message: string;
  };
}

const reducer = (
  state: UserFormState,
  action: UserFormAction
): UserFormState => {
  state.validated = action.type === "VALIDATED" ? true : false;
  state.errorMessage = action.errorMessage;
  switch (action.type) {
    case "VALIDATED":
      state.validated = true;
      break;
    case "INVALIDATED":
      state.validated = false;
      break;
  }

  return { ...state };
};

export default function Contact() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const emailInputElement = useRef<HTMLInputElement | null>(null);
  const nameInputElement = useRef<HTMLInputElement | null>(null);
  const messageInputElement = useRef<HTMLTextAreaElement | null>(null);

  const [formState, dispatchForm] = useReducer(reducer, {
    errorMessage: { email: "", message: "", name: "" },
    validated: false,
  } as UserFormState);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const errorMessage = {
      email: "",
      name: "",
      message: "",
    } as UserFormAction["errorMessage"];
    let type = "VALIDATED" as UserFormAction["type"];

    const emailRegex = /^[a-zA-Z0-9._%±]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    const nameLengthLimit = 50;

    // Check empty string
    if (!email.length) {
      errorMessage.email = "Please enter your email!";
      type = "INVALIDATED";
    } else {
      errorMessage.email = "";
    }

    if (!name.length) {
      errorMessage.name = "Please enter your name!";
      type = "INVALIDATED";
    } else {
      errorMessage.name = "";
    }

    if (!message.length) {
      errorMessage.message = "Please enter the message!";
      type = "INVALIDATED";
    } else {
      errorMessage.message = "";
    }

    if (type === "INVALIDATED") {
      dispatchForm({ type: type, errorMessage: errorMessage });
      return;
    }

    // Check the string with a validation
    if (emailRegex.test(email)) {
      errorMessage.email = "";
    } else {
      errorMessage.email = "The entered email is invalid!";
      type = "INVALIDATED";
    }

    if (name.length <= nameLengthLimit) {
      errorMessage.name = "";
    } else {
      errorMessage.name = `The entered name has to be within ${nameLengthLimit} characters!`;
      type = "INVALIDATED";
    }

    if (type === "INVALIDATED") {
      dispatchForm({ type: type, errorMessage: errorMessage });
      return;
    }

    if (type === "VALIDATED") {
      // Erase all texts in the all fields on the form
      if (emailInputElement.current) emailInputElement.current.value = "";
      if (nameInputElement.current) nameInputElement.current.value = "";
      if (messageInputElement.current) messageInputElement.current.value = "";

      // Submit the form to server
      store.dispatch(sendEmail({ email, name,  message: message.replace(/\n/g, "<br />") }));

      // Set the form was already submitted
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  }

  return (
    <>
      <section className="contact container">
        <div
          style={{
            width: "fit-content",
            display: `${window.location.href.includes("about") ? "block" : "none"}`,
          }}
        >
          <PreviousPage />
        </div>
        <div className={`contact__inner ${submitted ? "hide" : ""}`}>
          <h1>Contact 👜</h1>
          <h3>
            <p>Please fill up the following and submit it 🚀</p>
            <p>I will reach out to you very soon 😁</p>
          </h3>
          <form onSubmit={submitMessage}>
            <div className="field">
              <label htmlFor="email">Email: </label>
              <input ref={emailInputElement} name="email" type="text" />
              <p>{`${formState.validated ? "" : formState.errorMessage.email}`}</p>
            </div>
            <div className="field">
              <label htmlFor="name">Your Name: </label>
              <input ref={nameInputElement} name="name" type="text" />
              <p>{`${formState.validated ? "" : formState.errorMessage.name}`}</p>
            </div>
            <div className="field">
              <label htmlFor="message">Message: </label>
              <textarea ref={messageInputElement} name="message"></textarea>
              <p>{`${formState.validated ? "" : formState.errorMessage.message}`}</p>
            </div>
            <div className="button">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className={`greeting ${submitted ? "" : "hide"}`}>
          <h1>Thank you so much! 👏👏👏</h1>
          <h3>I will reach out to you as soon as possible 🙏</h3>
          <div className="button">
            <button
              type="button"
              onClick={() => {
                const errorMessage = {
                  email: "",
                  name: "",
                  message: "",
                } as UserFormAction["errorMessage"];
                setSubmitted(false);

                dispatchForm({ type: "INVALIDATED", errorMessage: errorMessage });
              }}
            >
              Retry!
            </button>
          </div>
        </div>
        <div
          style={{
            width: "fit-content",
            display: `${window.location.href.includes("about") ? "block" : "none"}`,
          }}
        >
          <NextPage />
        </div>
      </section>
    </>
  );
}
