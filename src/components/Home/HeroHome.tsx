import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../Style/Home/HeroHome.module.css";
import HomeHeroShimmer from "../../utils/Shimmer/HomeHeroShimmer";

// Define an interface for the card data
interface HerocardData {
  img: string;
  description: string;
  description2: string;
  description3?: string;
}

interface HeroHomeProps {
  HerocardData: HerocardData[];
}

const HeroHome: React.FC<HeroHomeProps> = ({ HerocardData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <HomeHeroShimmer />;
  }

  const handleNavigate = (category: string) => {
    navigate(`/subCategory/?subCat=${category}`);
  };


  return (
    <>
      <div className={style.HeroHome_Main_container}>
        {/* Left side */}
        <div className={style.LeftSaid_box}>
          <div className={style.InnerDetailsBox}>
            <p>
              Royal{" "}
              <span>
                <u>Luxury Dining Sets</u>
              </span>
            </p>
            <button onClick={() => handleNavigate("Luxury Dining Sets")}>
              Shop Now
            </button> 
          </div>
        </div>

        {/* Right side */}
        <div className={style.RigthSaid_box}>
          <div className={style.InnerDetailsBox}>
            <p>
              Royal{" "}
              <span>
                <u>Luxury Sofa Sets</u>
              </span>
            </p>
            <button onClick={() => handleNavigate("Luxury Sofa Sets")}>
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Card section */}
      <div className={style.HeroHomeCardDiv}>
        {HerocardData.map((data, index) => (
          <div className={style.HeroHomeCard} key={index}>
            <div className={style.HeroCardImageBox}>
              <img src={data.img} alt={data.description} />
            </div>
            <div className={style.heroCardDetails}>
              <h5>{data.description}</h5>
              <p>{data.description2}</p>
              {/* {data.description3 && <h6>{data.description3}</h6>} */}
              <button onClick={() => handleNavigate(data.description)}>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HeroHome;
