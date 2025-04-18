import googleIcon from "../assets/icons/google.svg";
import githubIcon from "../assets/icons/github.svg";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import store from "../app/store";
import { loginUser } from "../features/login/login.slice";
import { useAppSelector } from "../app/hooks";
import { PulseLoader } from "react-spinners";
import Modal, { ModalControl } from "../components/component.modal";
import { getOauthUrl } from "../features/login/request-oauth.slice";
import InputModal, {InputModalControl} from "../components/component.input-modal";

/**
 * Handles login logic and redirection after login.
 * @returns A SignIn component. This component renders a sign in form and handles the logic for the form, including
 * login and sign-up redirections.
 */

export function SignIn() {
    const navigate = useNavigate();
    const { loading, status } = useAppSelector(state => state.loginManager);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const modal = useRef<ModalControl>(null);
    const inputModal = useRef<InputModalControl>(null);


    function login() {
        store.dispatch(loginUser({ username: username, password: password }))
            .then(() => {
                const authKey = localStorage.getItem("auth_key");
                
                if (authKey) {
                    modal.current?.openModal('Message', 'Login successful!', '/');
                }
            });
    }

    async function oauthLogin(platform: string) {
        if (platform === "github") {
            undefined;
        }
        (await store.dispatch(getOauthUrl({platform: platform}))).payload as string;
    }

    const printErrorMessage = useCallback(()=> {
        if (status.message === 'incorrect_password' || status.message === 'invalid_username') {
            return "Password or Email could be wrong!"
        } else if (status.message === '' || status.message === 'login_success') {
            return '';
        }

        return 'Error happened. Please try this later.';
    },[status, loading]);




    useEffect(() => {
        const authKey = localStorage.getItem("auth_key");
        const accessToken = localStorage.getItem('access_token');
        inputModal.current?.openModal();
        if (authKey || accessToken) {
            navigate('/');
        }

        return;
    }, []);

    return <>
        <Modal title="Message" message="Login successful!" navigateUrl="/" ref={modal}></Modal>
        <InputModal title={"Enter your info for the last step!"} labels={["Email"]} url={""} callBack={function (): void {
            inputModal.current?.closeModal();
        } } ref={inputModal}/>
        <section className="signin container">
            <div className="signin__form">
                <h2>Sign-In</h2>
                <div className="signin__form-id">
                    <p>Account Email</p>
                    <input type="text" onInput={(event) => setUsername((event.target as HTMLTextAreaElement).value)} placeholder="Enter your account Email" />
                </div>
                <div className="signin__form-password">
                    <p>Password</p>
                    <input type="password" onKeyUp={(e) => e.key==='Enter'? login():''} onInput={(event) => setPassword((event.target as HTMLTextAreaElement).value)} placeholder="Enter your password" />
                </div>
                <div className={`signin__message ${status.is_success? 'success':''}`}>
                    <span>{printErrorMessage()}</span>
                </div>
                <div className="signin__buttons">
                    <button className="signin__button" disabled={status.is_success || loading === "pending"} onClick={login}>{loading === "pending" ? <PulseLoader size={5}/>:<>Login</>}</button>
                    <button className="signin__register" onClick={() => navigate('/sign-up')}>Sign-up</button>
                </div>
                <div className="signin__oauth">
                    <button onClick={() => oauthLogin('google')} type="button"><img src={googleIcon} alt={googleIcon}/></button>
                    <button onClick={() => oauthLogin('github')} type="button"><img src={githubIcon} alt={githubIcon} /></button>
                </div>
            </div>
        </section>
    </>
}