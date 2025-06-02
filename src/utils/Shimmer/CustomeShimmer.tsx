import React from "react";
import styles from "./CustomerShimmer.module.css";

const CustomeShimmer: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container_a}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default CustomeShimmer;
