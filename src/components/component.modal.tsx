import { forwardRef, useImperativeHandle, useState } from "react";

export type ModalControl = {
    closeModal: () => void;
    openModal: () => void;
  }
  

const Modal = forwardRef<ModalControl, {title: string, message: string}>((_props, ref)  => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        closeModal() {
            setIsOpened(false);
        },
        openModal() {
            setIsOpened(true);
        }
    }))
    

    return <>
        <div className={`modal ${isOpened ? 'open' : 'close'}`}>
            <div className="modal__inner">
                <h3 className="modal__title">{_props.title}</h3>
                <div className="modal__message"><span>{_props.message}</span></div>
                <button className="modal__button" onClick={()=> setIsOpened(false)}>OK</button>
            </div>
        </div>
    </>
});

export default Modal;