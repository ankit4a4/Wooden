import React from "react";
import style from "../../Style/AboutUs/ChooseUs.module.css";
import { Bounce, Fade, JackInTheBox } from "react-awesome-reveal";

const ChooseUs: React.FC = () => {
  return (
    <>
      <div className={style.choosUsContainer}>
        <div className={style.choosUsContainer_leftData}>
          <div className={style.choosUsContainer_leftData_details}>
            <h3>Find Your Perfect Piece:</h3>
            <p>
              <Fade>
              Browse our extensive selection of handcrafted wooden furniture and discover the perfect pieces to enhance your home. Enjoy exclusive offers and discounts when you shop with us.
              </Fade>
            </p>
            <button>
              <JackInTheBox>Find A Store</JackInTheBox>
            </button>
          </div>
        </div>

        <div className={style.choosUsContainer_RightData}>
          <h2>
            <Bounce>Why choose us?</Bounce>
          </h2>

          <div className={style.choosUsContainer_RightData_box}>
            <h3>
              <JackInTheBox>Expert Craftsmanship</JackInTheBox>
            </h3>
            <p>
              <Fade>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore{" "}
              </Fade>
            </p>
          </div>

          <div className={style.choosUsContainer_RightData_box}>
            <h3>
              <JackInTheBox>Customer-Focused Approach</JackInTheBox>
            </h3>
            <p>
              <Fade>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore{" "}
              </Fade>
            </p>
          </div>

          <div className={style.choosUsContainer_RightData_box}>
            <h3>
              <JackInTheBox>Versatility in Design</JackInTheBox>
            </h3>
            <p>
              <Fade>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore{" "}
              </Fade>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseUs;
