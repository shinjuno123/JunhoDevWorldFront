import googleIcon from "../assets/icons/google.svg";
import githubIcon from "../assets/icons/github.svg";
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const navigate = useNavigate();

    return <>
        <section className="signup container">
            <div className="signup__form">
                <button className="signup__prev" onClick={()=>navigate('/sign-in')}> <i className="material-icons icon">arrow_backward</i> <p>Back to sign-in</p></button>
                <h2>Sign-Up</h2>
                <div className="signup__form-id">
                    <p>Account Email</p>
                    <input type="text" placeholder="Enter your account Email" />
                </div>
                <div className="signup__form-password">
                    <p>Enter your password</p>
                    <input type="password" placeholder="Enter your password" />
                </div>
                <div className="signup__form-password">
                    <p>Re-enter your password</p>
                    <input type="password" placeholder="Re-Enter your password" />
                </div>

                <div className="signup__buttons">
                    <button className="signup__register">Register</button>
                </div>
                <div className="signup__oauth">
                    <button type="button"><img src={googleIcon} alt={googleIcon} /></button>
                    <button type="button"><img src={githubIcon} alt={githubIcon} /></button>
                </div>
            </div>
        </section>
    </>
}