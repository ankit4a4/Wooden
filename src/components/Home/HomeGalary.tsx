import React from "react";
import style from "../././../Style/Home/HomeGalary.module.css";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Fgallery from "../../utils/Shimmer/Fgallery";
import { useNavigate } from "react-router-dom";

interface HomeGalaryData {
  img: string;
  title: string;
}

// Define the props to accept an array of HomeGalaryData
interface HomeGalaryProps {
  HomeGalaryData: HomeGalaryData[];
}

const HomeGalary: React.FC<HomeGalaryProps> = ({ HomeGalaryData }) => {
  // all redirect functionality
  const navigate = useNavigate();
  const handleNavigate = (title: string) => {
    navigate(`/subCategory/?subCat=${title}`);
  };
  // checking shimmer effect
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (load) {
    return <Fgallery />;
  }
  const handleChangeRoute = () => {
    navigate("/AllCollection");
  };

  return (
    <>
      <div className={style.HomeGalaryTopDesign}>
        <div className={style.HomeGalaryTopDesign_line}></div>
        <div className={style.HomeGalaryTopDesign_center}></div>
        <div className={style.HomeGalaryTopDesign_line}></div>
      </div>

      <div className={style.galary_main_container}>
        <Fade>
          {" "}
          <h1>
            Welcome to the{" "}
            <u>
              <i>Furniture</i>
            </u>{" "}
            Gallery
          </h1>
        </Fade>
        <p>
          Your one-stop shop for stylish furniture and decor, delivering the
          latest trends exclusively to Perth.
        </p>

        <div className={style.HomeGalary_allCardBox}>
          {HomeGalaryData &&
            HomeGalaryData?.map((item) => {
              return (
                <div
                  className={style.HomeGalaryCard}
                  key={item?.title}
                  onClick={() => handleNavigate(item?.title)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={item.img} alt="" />
                  <div className={style.hoverBoxHomePage}>
                    <p>
                      <u>{item.title}</u>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <button onClick={handleChangeRoute}>View All Collection</button>
      </div>
    </>
  );
};

export default HomeGalary;
