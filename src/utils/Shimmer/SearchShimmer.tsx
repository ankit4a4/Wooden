import React from "react";
import styles from "./SearchShimmer.module.css";

const SearchShimmer: React.FC = () => {
  return (
    <div className={styles.SearchShimmer_Container}>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
      <div className={styles.childSearch}></div>
    </div>
  );
};

export default SearchShimmer;
