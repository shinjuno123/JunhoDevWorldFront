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

export function SignIn() {
    const navigate = useNavigate();
    const { loading, status } = useAppSelector(state => state.loginManager);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const modal = useRef<ModalControl>(null);


    function login() {
        store.dispatch(loginUser({ username: username, password: password }))
            .then(() => {
                const authKey = localStorage.getItem("auth_key");
                
                if (authKey) {
                    modal.current?.openModal();
                } 
            });
    }

    async function googleLogin() {
        (await store.dispatch(getOauthUrl({platform: 'google'}))).payload as string;
        
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
        if (authKey) {
            navigate('/');
        }

        return;
    }, []);

    return <>
        <Modal title="Message" message="Login successful!" navigateUrl="/" ref={modal}></Modal>
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
                    <button onClick={googleLogin} type="button"><img src={googleIcon} alt={googleIcon}/></button>
                    <button type="button"><img src={githubIcon} alt={githubIcon} /></button>
                </div>
            </div>
        </section>
    </>
}