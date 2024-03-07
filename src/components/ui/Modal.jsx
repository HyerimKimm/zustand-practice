import React from 'react';
import {UiStore} from "../../store/UiStore";
import classes from './Modal.module.scss';

const Modal = () => {
    const modalContents = UiStore(state=>state.modalContents);

    return (
        <div className={classes.backdrop}>
            {modalContents}
        </div>
    );
};

export default Modal;