import React from 'react';
import styles from './hovering-error.module.css';

interface HoveringErrorProps {
  testId?: string;
  errorMessage: string;
}

function HoveringError({ testId, errorMessage }: HoveringErrorProps) {
  return (
    <div className="popOver" data-testid={testId}>
      <span className={styles.errorIcon}>&#9888;</span>
      <span>{errorMessage}</span>
    </div>
  );
}

export default HoveringError;
