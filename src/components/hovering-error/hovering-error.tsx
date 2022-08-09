import React from 'react';
import styles from "./hovering-error.module.css";

interface HoveringErrorProps {
  errorMessage: string;
}

function HoveringError({ errorMessage }: HoveringErrorProps) {
  return (
    <div className="popOver">
    <span className={styles.errorIcon}>&#9888;</span>
    <span>{errorMessage}</span>
  </div>
  )
}

export { HoveringError };