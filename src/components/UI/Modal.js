import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import ExerciseForm from "../WorkoutDay/exercise/form/ExerciseForm";

const Backdrop = (props) => {
  return <div className={styles.Backdrop} onClick={props.closeModal} />;
};

const ModalOverlay = (props) => {
  return (
    // <div className={styles.Modal}>
    //   <div className={styles.Content}>{props.children}</div>
    // </div>
    <div className={styles.Modal}>
      <ExerciseForm
        hideModal={props.closeModal}
      />
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay hideModal={props.closeModal} />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;
