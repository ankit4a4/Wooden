import React from "react";
import style from "../../Style/Home/Homeimagesection.module.css";
import img from "../../assets/Home/HomeImages.webp";
// import HomeImageShimmer from "../../utils/Shimmer/HomeImageShimmer";
// import { useState, useEffect } from "react";
interface CardData {
  img: string;
}

interface HomeimageProps {
  Homeimage: CardData[];
}

const Homeimagesection: React.FC<HomeimageProps> = ({ Homeimage }) => {
  // const [loading, setLoading] = useState(true);

  // Effect to change loading state after 2 seconds
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return (
  //     <>
  //       <HomeImageShimmer />
  //     </>
  //   );
  // }

  return (
    <>
      <div className={style.Homeimagesection_Container}>
        <div className={style.Homeimagesection_leftImage}>
          <img src={img} alt="" />
        </div>
        <div className={style.Homeimagesection_rightImage}>
          {Homeimage.map((item) => {
            return (
              <div
                className={style.Homeimagesection_rightImage1}
                key={item.img}
              >
                <img src={item.img} alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Homeimagesection;
