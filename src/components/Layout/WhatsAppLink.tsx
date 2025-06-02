import React from "react";
import styles from "../../Style/Layout/WhatsAppLink.module.css";

const WhatsAppLink: React.FC = () => {
  const myWhatsAppNumber = +918881444848;
  const whatsAppLink = `https://wa.me/${myWhatsAppNumber}`;
  return (
    <div>
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsapp_link}
      >
        <span>Chat With Us On WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppLink;
