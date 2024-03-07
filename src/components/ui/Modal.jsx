import React from "react";
import { UiStore } from "../../store/UiStore";
import classes from "./Modal.module.scss";

const Modal = () => {
  const modalContents = UiStore((state) => state.modalContents);
  const modalClose = UiStore((state) => state.actions.modalClose);

  const handleSubmitClick = () => {};

  const handleCloseClick = () => {
    modalClose();
  };

  return (
    <div className={classes.backdrop}>
      <div className={classes.contents}>
        {modalContents}
        <button className={classes.button} onClick={handleSubmitClick}>
          저장
        </button>
        <button className={classes.button} onClick={handleCloseClick}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
