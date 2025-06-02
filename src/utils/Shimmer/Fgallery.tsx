import React from "react";
import styles from "../Shimmer/Fgallery.module.css";

const Fgallery: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstdiv}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.seconddiv}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Fgallery;
