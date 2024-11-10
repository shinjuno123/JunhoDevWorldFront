import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";

export type ModalControl = {
    closeModal: (navigate: string) => void;
    openModal: () => void;
  }
  

const Modal = forwardRef<ModalControl, {title: string, message: string, navigateUrl: string}>((_props, ref)  => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        closeModal() {
            setIsOpened(false);
        },
        openModal() {
            setIsOpened(true);
        }
    }));


    function closeModal() {
        setIsOpened(false);
        
        if(_props.navigateUrl) {
            navigate(_props.navigateUrl);
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
    

    return <>
        <div className={`modal ${isOpened ? 'open' : 'close'}`}>
            <div className="modal__inner">
                <h3 className="modal__title">{_props.title}</h3>
                <div className="modal__message"><span>{_props.message}</span></div>
                <button className="modal__button" onClick={closeModal}>OK</button>
            </div>
        </div>
    </>
});

export default Modal;