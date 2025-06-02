import React from "react";
import { useState } from "react";
import ProfileAdress from "./ProfileAdress";
import ProfileOrderHistory from "./ProfileOrderHistory";
import styles from "../../Style/Profile/HistoryTabs.module.css";

const HistoryTabs: React.FC = () => {
  const [selectTab, setSelectTab] = useState("Address");

  return (
    <>
    
    <div style={{position: "relative"}}>
      <div className={styles.historyTabs}>
        <button
          className={`${styles.tab} ${selectTab === "Address" ? styles.active : ""
            }`}
          onClick={() => setSelectTab("Address")}
        >
          Address
        </button>
        <button
          onClick={() => setSelectTab("Order History")}
          className={`${styles.tab} ${selectTab === "Order History" ? styles.active : ""
            }`}
        >
          Order History
        </button>
      </div>
    </div>
      {selectTab === "Order History" ? (
        <ProfileOrderHistory />
      ) : (
        <ProfileAdress />
      )}
    </>
  );
};

export default HistoryTabs;
