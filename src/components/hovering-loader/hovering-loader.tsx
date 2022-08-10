import React from 'react';
import styles from './hovering-loader.module.css';

interface HoveringLoaderProps {
  testId?: string;
};

function HoveringLoader({ testId } : HoveringLoaderProps) {
  return (
    <div className="popOver" data-testid={testId}>
      <span className={styles.ldsDualRing}></span>
      <span>Loading ...</span>
    </div>
  );
}

export default HoveringLoader;
