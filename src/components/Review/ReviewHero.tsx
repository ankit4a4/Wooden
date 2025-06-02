import React from "react";
import style from "../../Style/Review/ReviewHero.module.css";
import img from "../../assets/Review/img.png";
import img2 from "../../assets/Review/ReviewImage1.png";
import { MdOutlineSecurity } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import rightSaidimage from "../../assets/Review/rightsaidImage.png";

interface CardData {
  img: string;
  description: string;
}

interface CardProps {
  onclose2: () => void;
}

const ReviewHero: React.FC<CardProps> = ({ onclose2 }) => {
  const data: CardData[] = [
    {
      img: rightSaidimage,
      description:
        "Poe Lift Top Coffee Table with Storage Coffee and center table",
    },
    {
      img: rightSaidimage,
      description:
        "Poe Lift Top Coffee Table with Storage Coffee and center table",
    },
  ];
  return (
    <div className={style.ReviewHero_main_container}>
      <div className={style.ReviewHero_container}>
        {/* left  */}

        <div className={style.ReviewHero_container_left}>
          <img src={img} alt="" />

          <div>
            <img src={img2} alt="" />
            <img src={img2} alt="" />
          </div>
        </div>
        {/* right */}
        <div className={style.ReviewHero_container_right}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <p>Brooklyn Simmons</p>
              <span>
                {" "}
                <MdOutlineSecurity />
              </span>
            </div>

            <h1>
              <TiDeleteOutline onClick={onclose2} />
            </h1>
          </div>

          <div className={style.ReviewHero_Right_FlexBox}>
            <div>
              <div>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
                <span>
                  <FaStar />
                </span>
              </div>
              <p>8/02/2023</p>
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,{" "}
          </p>
          <hr />

          {data.map((item) => (
            <div className={style.ReviewHero_container_bottomDesign}>
              <div className={style.ReviewHero_container_bottomDesign_image}>
                <img src={item.img} alt="" />
              </div>
              <div className={style.ReviewHero_container_bottomDesign_details}>
                <p>{item.description}</p>
                <button>View product</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewHero;
