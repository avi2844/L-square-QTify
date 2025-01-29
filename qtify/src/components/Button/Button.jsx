import React from "react";
import styles from "./Button.module.css";

function Button({text}) {
  return (
      <div className={styles.button}>{text}</div>
  );
}

export default Button;