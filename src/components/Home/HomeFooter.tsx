import React from "react";
import style from "../../Style/Home/HomeFooter.module.css";

interface CardData {
  img: string;
  heading: string;
  description: string;
  id: string; // Make sure id is included in the CardData interface
}

interface HomeFooterProps {
  HomeFoo: CardData[];
}

const HomeFooter: React.FC<HomeFooterProps> = ({ HomeFoo }) => {
  const myWhatsAppNumber = +918881444848;
  const whatsAppLink = `https://wa.me/${myWhatsAppNumber}`;

  return (
    <div className={style.HomeFooter_container}>
      {HomeFoo.map((item, index) => (
        <div className={style.HomeFooter_div} key={index}>
          <img src={item.img} alt={item.heading} />
          {item.id === "3" ? (
            <a
              href={whatsAppLink}
              rel="noopener noreferrer"
              target="_blank"
              style={{ cursor: "pointer" }}
            >
              <h2>
                {item.heading}
              </h2>
            </a>
          ) : (
            <h2>
              {item.heading}
            </h2>
          )}

        </div>
      ))}
    </div>
  );
};

export default HomeFooter;
