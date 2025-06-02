import React from "react";
import styles from "./ShimmerLoader.module.css";

const ShimmerCard: React.FC = () => {
  return (
    <div className={styles.shimmerCard}>
      <div className={styles.shimmerImage}></div>
      <div className={styles.shimmerTitle}></div>
      <div className={styles.shimmerPrice}></div>
    </div>
  );
};

const ShimmerLoader = () => {
  const cards = Array.from({ length: 6 }); // Create an array for 6 cards

  return (
    <>
      {/* upper section */}
      <div className={styles.shimmerLoader}>
        {cards.map((_, index) => (
          <ShimmerCard key={index} />
        ))}
      </div>

      {/* Lower section */}
      <div className={styles.mattress_container}>
        <div className={styles.mattress_container_img}></div>
        <div className={styles.mattress_container_content}>
          <span className={styles.mattress_container_content_1}></span>
          <span className={styles.mattress_container_content_2}></span>
        </div>
      </div>
    </>
  );
};

export default ShimmerLoader;
