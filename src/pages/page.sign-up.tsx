import googleIcon from "../assets/icons/google.svg";
import githubIcon from "../assets/icons/github.svg";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useEffect, useRef, useState } from "react";
import { registerUser, setStatus } from "../features/login/register.slice";
import store from "../app/store";
import { PulseLoader } from "react-spinners";
import Modal, { ModalControl } from "../components/component.modal";

export function SignUp() {
    const navigate = useNavigate();
    const {loading,status}  = useAppSelector(state=>state.registerManager);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [reEnteredPassword, setReEnteredPassword] = useState<string>('');
    const modal = useRef<ModalControl>(null);

    const validateEmail = (email: string) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    const validatePassword = (password: string) => {
        return String(password)
            .match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g);
    }

    function register() {
        if (loading === "pending") {
            console.log("lOADIGN")
            return;
        }

        if (password === "" || reEnteredPassword === "" || username === ""){
            setMessage("Please fill all the fields!"); }
        else if (!validateEmail(username)) {
            setMessage("Your email format is not valid!")
        }
        else if (password !== reEnteredPassword) {
            setMessage("Please confirm if your passwords are correct!")
        }
        else if (!validatePassword(password)) {
            setMessage("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters")
        }
        else if (password === reEnteredPassword) {
            store.dispatch(registerUser({username: username, password: password}));
        }
        
    }

    useEffect(() => {
        if (status.is_success) {
            setTimeout(()=> {
                store.dispatch(setStatus({payload: {is_success: false, message: ''}}))
                modal.current?.openModal();
            }, 3000);
        }


        return;
    },[status]);
    
    return <>
        <Modal title="Message" message="Account was created successfully!" navigateUrl="/sign-in" ref={modal}></Modal>
        <section className="signup container">
            <div className="signup__form">
                <button className="signup__prev" onClick={()=>navigate('/sign-in')}> <i className="material-icons icon">arrow_backward</i> <p>Back to sign-in</p></button>
                <h2>Sign-Up</h2>
                <div className="signup__form-id">
                    <p>Account Email<i style={{color:'red'}}>*</i></p>
                    <input type="text" onInput={(event)=> setUsername((event.target as HTMLTextAreaElement).value)} placeholder="Enter your account Email" />
                </div>
                <div className="signup__form-password">
                    <p>Enter your password<i style={{color:'red'}}>*</i></p>
                    <input type="password" onInput={(event)=> setPassword((event.target as HTMLTextAreaElement).value)} placeholder="Enter your password" />
                </div>
                <div className="signup__form-password">
                    <p>Re-enter your password<i style={{color:'red'}}>*</i></p>
                    <input disabled={status.is_success || loading === "pending"} type="password" onKeyUp={(e) => e.key==='Enter'? register():''} onInput={(event)=> setReEnteredPassword((event.target as HTMLTextAreaElement).value)} placeholder="Re-Enter your password" />
                </div>

                <div className={`signup__message ${status.is_success? 'success':''}`}>
                    <span>{status.message? status.message:message}{status.is_success}</span>
                </div>

                <div className="signup__buttons">
                    <button  className="signup__register" disabled={status.is_success || loading === "pending"} onClick={register}>{status.is_success || loading === "pending" ? <PulseLoader size={5}/>:<>Register</>}</button>
                </div>
                <div className="signup__oauth">
                    <button type="button"><img src={googleIcon} alt={googleIcon} /></button>
                    <button type="button"><img src={githubIcon} alt={githubIcon} /></button>
                </div>
            </div>
        </section>
    </>
}