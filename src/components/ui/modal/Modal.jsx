import React from "react";
import { useUIStore } from "../../../store/uiStore";
import classes from "./Modal.module.scss";

const Modal = () => {
  const modalContents = useUIStore((state) => state.modalContents);

  return (
    <div className={classes.backdrop}>
      <div className={classes.contents}>{modalContents}</div>
    </div>
  );
};

export default Modal;
