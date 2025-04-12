import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";

export type ModalControl = {
    closeModal: (navigate: string) => void;
    openModal: (title: string, message: string, navigateUrl: string) => void;
  }
  

const Modal = forwardRef<ModalControl, {title: string, message: string, navigateUrl: string}>((_props, ref)  => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [navigateUrl, setNavigateUrl] = useState<string>('');

    useImperativeHandle(ref, () => ({
        closeModal() {
            setIsOpened(false);
        },
        openModal(title: string, message: string, navigateUrl: string) {
            setIsOpened(true);
            setTitle(title);
            setMessage(message);
            setNavigateUrl(navigateUrl);
        }
    }));


    function closeModal() {
        setIsOpened(false);
        
        if(navigateUrl) {
            navigate(navigateUrl);
        }
    }

    const keyupEventListener = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            setIsOpened(false);
        }
    },[])

    useEffect(() => {
        document.addEventListener("keyup", (event) => keyupEventListener(event))
        
        return () => {
            document.removeEventListener("keyup", (event) => keyupEventListener(event))
        }
    },[]);

    useEffect(() => {
        setTitle(_props.title);
        setMessage(_props.message);
        setNavigateUrl(_props.navigateUrl);
    },[_props])
    

    return <>
        <div className={`modal ${isOpened ? 'open' : 'close'}`}>
            <div className="modal__inner">
                <h3  className="modal__title">{title}</h3>
                <div className="modal__message"><span dangerouslySetInnerHTML={{__html: message}}></span></div>
                <button className="modal__button" onClick={closeModal}>OK</button>
            </div>
        </div>
    </>
});

export default Modal;