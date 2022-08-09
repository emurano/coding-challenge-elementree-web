import React from 'react';
import styles from './hovering-loader.module.css';

function HoveringLoader() {
  return (
    <div className="popOver">
      <span className={styles.ldsDualRing}></span>
      <span>Loading ...</span>
    </div>
  );
}

export { HoveringLoader };
