import React from "react";
import styles from "./HomeImageShimmer.module.css";

const HomeImageShimmer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_a}></div>
      <div className={styles.container_b}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default HomeImageShimmer;
