import React from "react";
import { UiStore } from "../../store/UiStore";
import classes from "./Modal.module.scss";

const Modal = () => {
  const modalContents = UiStore((state) => state.modalContents);

  return (
    <div className={classes.backdrop}>
      <div className={classes.contents}>
        {modalContents}
      </div>
    </div>
  );
};

export default Modal;
