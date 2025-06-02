import React from "react";
import styles from "./HomeheroCardDivShimmer.module.css";

const HomeheroCardDivShimmer: React.FC = () => {
  return (
    <div className={styles.divs_parent}>
      <div className={styles.divs_child}></div>
      <div className={styles.divs_child}></div>
      <div className={styles.divs_child}></div>
    </div>
  );
};

export default HomeheroCardDivShimmer;
