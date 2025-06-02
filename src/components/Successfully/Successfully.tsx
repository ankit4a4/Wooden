import React from "react";
import style from "../../Style/Successfully/Successfully.module.css";
import img from "../../assets/Successfully/image.png";
import { Bounce } from "react-awesome-reveal";

const Successfully: React.FC = () => {
  return (
    <>
      <div className={style.successfully}>
        <div className={style.successfully_details}>
          <h2>Order Securely placed </h2>
          <h1>
            <Bounce>successfully</Bounce>
          </h1>
          <img src={img} alt="" />

        </div>
      </div>
    </>
  );
};

export default Successfully;
