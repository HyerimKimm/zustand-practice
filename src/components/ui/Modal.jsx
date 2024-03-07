import React from 'react';
import {UiStore} from "../../store/UiStore";
import classes from './Modal.module.scss';

const Modal = () => {
    const modalContents = UiStore(state=>state.modalContents);
    const modalClose = UiStore(state=>state.actions.modalClose)

    const handleCloseClick = () => {
        modalClose()
    }

    return (
        <div className={classes.backdrop}>
            <div className={classes.contents}>
                {modalContents}
                <button className={classes.buttonClose} onClick={handleCloseClick}>닫기</button>
            </div> 
        </div>
    );
};

export default Modal;