import React from "react";
// import { useState } from 'react';
import { TiTickOutline } from "react-icons/ti";
import styles from "../../Style/Home/ConfirmContact.module.css";

const ConfirmContact: React.FC = () => {
  return (
    <div className={styles.g_container}>
      <div className={styles.container}>
        <TiTickOutline className={styles.Ticktok} />
      </div>
      <p>We will reach you soon!</p>
    </div>
  );
};

export default ConfirmContact;
