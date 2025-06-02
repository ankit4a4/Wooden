import React from "react";
import styles from "./HomeHeroShimmer.module.css";

const HomeheroShimmer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.HomeheroShimmer_container}>
        <div className={styles.child_1}></div>
        <div className={styles.child_2}></div>
      </div>
      <div className={styles.divs_parent}>
        <div className={styles.divs_child}></div>
        <div className={styles.divs_child}></div>
        <div className={styles.divs_child}></div>
      </div>
    </div>
  );
};

export default HomeheroShimmer;
