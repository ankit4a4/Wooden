import React from "react";
import style from "../../Style/Home/UnbeatablePrices.module.css";
import {  Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
interface carddata {
  img: string;
  title: string;
  description: string;
}

interface UnbeatableProps {
  Unbeatable: carddata[];
}
const UnbeatablePrices: React.FC<UnbeatableProps> = ({ Unbeatable }) => {

const navigate = useNavigate()

  const handleNavigate = (title: string) => {
    navigate(`/subCategory/?subCat=${title}`);
  };
  return (
    <>
      <div className={style.UnbeatablePrices_container}>
        <p>
          <Fade>Unbeatable Prices for a Limited Time</Fade>
        </p>

        <div className={style.UnbeatablePrices_allCards}>
          {Unbeatable?.map((item, index) => {
            return (
              <div className={style.UnbeatablePrices_card} key={index} onClick={() => handleNavigate(item.title)}>
                <div className={style.UnbeatablePrices_innerDiv}>
                  <img src={item?.img} alt="" />
                  <div className={style.UnbeatablePrices_btn}>
                    <p>
                     {item?.title}
                    </p>
                  </div>
               
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UnbeatablePrices;
