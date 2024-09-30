import googleIcon from "../assets/icons/google.svg";
import githubIcon from "../assets/icons/github.svg";

export function SignIn() {

    return <>
        <section className="signin container">
            <div className="signin__form">
                <div className="signin__form-id">
                    <p>Account Email</p>
                    <input type="text" placeholder="Account Email"/>
                </div>
                <div className="signin__form-password">
                    <p>Password</p>
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="signin__buttons">
                    <button className="signin__button">Sign-in</button>
                    <button className="signin__register">Register</button>
                </div>
                <div className="signin__oauth">
                    <button type="button"><img src={googleIcon} alt={googleIcon}/></button>
                    <button type="button"><img src={githubIcon} alt={githubIcon}/></button>
                </div>
            </div>
        </section>
    </>
}