import React from "react";
import styles from "./CategoryShimmer.module.css";

const CategoryShimmer: React.FC = () => {
  return (
    <div className={styles.CategoryShimmer_container}>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
    </div>
  );
};

export default CategoryShimmer;
