import React from "react";
import style from "../../Style/Product/SofaForm.module.css";
import { Bounce } from "react-awesome-reveal";
import Fgallery from "../../utils/Shimmer/Fgallery";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface CardData {
  img: string;
  title: string;
}

interface SofasFormProps {
  chairData: CardData[];
  tableData: CardData[];
  sofaData: CardData[];
  diningRoomData: CardData[];
  bedRoomData: CardData[];
  outDoorFurnitureData: CardData[];
  studyAndOfficeData: CardData[];
  homeDecorData: CardData[];
  cabinetsData: CardData[];
}

const SofasForm: React.FC<SofasFormProps> = ({
  chairData,
  tableData,
  sofaData,
  diningRoomData,
  bedRoomData,
  outDoorFurnitureData,
  studyAndOfficeData,
  homeDecorData,
  cabinetsData,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("catName") || "";

  const handleClick = (res: any) => {
    navigate(`/subCategory/?subCat=${res}`);
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

  return (
    <div className={style.SofasForm_container}>
      {/* Example for rendering chairData */}

      {type === "chair"
        ? chairData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item.img} alt={item.title} />
              <p>
                <Bounce>{item.title}</Bounce>
              </p>
            </div>
          ))
        : type === "table"
        ? tableData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item.img} alt={item.title} />
              <p>
                <Bounce>{item.title}</Bounce>
              </p>
            </div>
          ))
        : type === "sofa"
        ? sofaData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item.img} alt={item.title} />
              <p>
                <Bounce>{item?.title}</Bounce>
              </p>
            </div>
          ))
        : type === "dining room"
        ? diningRoomData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item?.img} alt={item?.title} />
              <p>
                <Bounce>{item?.title}</Bounce>
              </p>
            </div>
          ))
        : type === "bedroom"
        ? bedRoomData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item.img} alt={item.title} />
              <p>
                <Bounce>{item.title}</Bounce>
              </p>
            </div>
          ))
        : type === "outdoor furniture"
        ? outDoorFurnitureData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item.img} alt={item.title} />
              <p>
                <Bounce>{item.title}</Bounce>
              </p>
            </div>
          ))
        : type === "study and office"
        ? studyAndOfficeData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item.img} alt={item.title} />
              <p>
                <Bounce>{item.title}</Bounce>
              </p>
            </div>
          ))
        : type === "home decor"
        ? homeDecorData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item.img} alt={item.title} />
              <p>
                <Bounce>{item.title}</Bounce>
              </p>
            </div>
          ))
        : type === "Cabinets"
        ? cabinetsData.map((item, index) => (
            <div
              key={index}
              className={style.SofasForm_container_card}
              onClick={() => handleClick(item.title)}
            >
              <img src={item.img} alt={item.title} />
              <p>
                <Bounce>{item.title}</Bounce>
              </p>
            </div>
          ))
        : null}
    </div>
  );
};

export default SofasForm;
