import { forwardRef, Fragment, useImperativeHandle, useState } from "react";

export type InputModalControl = {
    closeModal: () => void;
    openModal: () => void;
}

export type CallBack = (url: string) => void;
  

const InputModal = forwardRef<InputModalControl, {title: string, labels: string[], url: string, callBack: CallBack}>((_props, ref)  => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        closeModal() {
            setIsOpened(false);
        },
        openModal() {
            setIsOpened(true);
        }
    }));

    return <>
        <div className={`modal ${isOpened ? 'open' : 'close'}`}>
            <div className="modal__inner">
                <h3 className="modal__title">{_props.title}</h3>
                
                <div className="modal__message">
                    {_props.labels.map((label, index) => {
                        return <Fragment key={index}>
                            <div className="modal__input">
                                <label htmlFor={label}>{label}</label>
                                <input type={label === 'Email'? "email":"text"} id={label}/>
                            </div>
                        </Fragment>
                    })}
                </div>
                <button className="modal__button" onClick={() => _props.callBack(_props.url)}>Enter</button>
            </div>
        </div>
    </>
});

export default InputModal;