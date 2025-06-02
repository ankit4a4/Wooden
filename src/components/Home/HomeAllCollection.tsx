import style from "../../Style/Home/HomeAllCollection.module.css";
import { useNavigate } from "react-router-dom";

// Importing images
import HomeGalary1 from "../../assets/Product/chair1.webp";
import HomeGalary2 from "../../assets/Product/chair2.webp";
import HomeGalary3 from "../../assets/Product/chair3.webp";
import HomeGalary4 from "../../assets/Product/chair4.webp";
import HomeGalary5 from "../../assets/Product/chair5.webp";
import HomeGalary6 from "../../assets/Product/chair6.webp";
import HomeGalary7 from "../../assets/Product/chair7.webp";
import HomeGalary8 from "../../assets/Product/chair8.webp";
import HomeGalary9 from "../../assets/Product/table.webp";
import HomeGalary10 from "../../assets/Product/table2.webp";
import HomeGalary11 from "../../assets/Product/table3.webp";
import HomeGalary12 from "../../assets/Product/table4.webp";
import HomeGalary13 from "../../assets/Product/table5.webp";
import HomeGalary14 from "../../assets/Product/table6.webp";
import HomeGalary15 from "../../assets/Product/table7.webp";
import HomeGalary16 from "../../assets/Product/table8.webp";
import HomeGalary17 from "../../assets/Product/table9.webp";
import HomeGalary18 from "../../assets/Product/sofaa1.webp";
import HomeGalary19 from "../../assets/Product/sofaa2.webp";
import HomeGalary20 from "../../assets/Product/sofaa3.webp";
import HomeGalary22 from "../../assets/Product/Sofaa5.webp";
import HomeGalary23 from "../../assets/Product/sofaa6.webp";
import HomeGalary24 from "../../assets/Product/sofaa7.webp";
import HomeGalary25 from "../../assets/Product/sofaa8.webp";
import HomeGalary26 from "../../assets/Product/sofaa9.webp";
import HomeGalary27 from "../../assets/Product/diningroom1.webp";
import HomeGalary28 from "../../assets/Product/diningRoom2.webp";
import HomeGalary29 from "../../assets/Product/diningRoom3.webp";
import HomeGalary30 from "../../assets/Product/diningRoom4.webp";
import HomeGalary31 from "../../assets/Product/diningRoom5.webp";
import HomeGalary32 from "../../assets/Product/diningRoom6.webp";
import HomeGalary33 from "../../assets/Product/diningroom7.webp";
import HomeGalary34 from "../../assets/Product/diningRoom8.webp";
import HomeGalary35 from "../../assets/Product/diningroom 9.webp";
import HomeGalary36 from "../../assets/Product/diningroom10.webp";
import HomeGalary37 from "../../assets/Product/badroom.webp";
import HomeGalary38 from "../../assets/Product/badroom2.webp";
import HomeGalary39 from "../../assets/Product/badroom3.webp";
import HomeGalary40 from "../../assets/Product/badroom4.webp";
import HomeGalary41 from "../../assets/Product/badroom5.webp";
import HomeGalary42 from "../../assets/Product/badroom6.webp";
import HomeGalary43 from "../../assets/Product/badroom7.webp";
import HomeGalary44 from "../../assets/Product/badroom8.webp";
import HomeGalary45 from "../../assets/Product/OutDoor.webp";
import HomeGalary46 from "../../assets/Product/outDoor2.webp";
import HomeGalary47 from "../../assets/Product/outDoor3.webp";
import HomeGalary48 from "../../assets/Product/outDoor4.webp";
import HomeGalary49 from "../../assets/Product/outDoor5.webp";
import HomeGalary50 from "../../assets/Product/study&office.webp";
import HomeGalary53 from "../../assets/Product/Study&office3.webp";
import HomeGalary54 from "../../assets/Product/Study&office4.webp";
import HomeGalary55 from "../../assets/Product/study&office5.webp";

import HomeGalary57 from "../../assets/Product/study&office7.webp";
import HomeGalary58 from "../../assets/Product/Homedecor.webp";
import HomeGalary59 from "../../assets/Product/homedecor2.webp";
import HomeGalary60 from "../../assets/Product/homedecor3.webp";
import HomeGalary61 from "../../assets/Product/homedecor4.webp";
import HomeGalary62 from "../../assets/Product/homedecor5.webp";
import HomeGalary63 from "../../assets/Product/homedecor6.webp";
import HomeGalary64 from "../../assets/Product/Homedecore7.webp";
import HomeGalary65 from "../../assets/Product/homedecor8.webp";

import HomeGalary67 from "../../assets/Product/cabinets2.webp";
import HomeGalary68 from "../../assets/Product/cabinets3.webp";
import HomeGalary69 from "../../assets/Product/cabinets4.webp";
import { useEffect, useState } from "react";
import Fgallery from "../../utils/Shimmer/Fgallery";

// Data array
const LivingData = [
  { id: 1, img: HomeGalary1, title: "Office Chair" },
  { id: 2, img: HomeGalary2, title: "Arm Chair" },
  { id: 3, img: HomeGalary3, title: "Rocking Chair" },
  { id: 4, img: HomeGalary4, title: "Dining Chair" },
  { id: 5, img: HomeGalary5, title: "Barrel Chair" },
  { id: 6, img: HomeGalary6, title: "Wing Chair" },
  { id: 7, img: HomeGalary7, title: "Wooden Chair" },
  { id: 8, img: HomeGalary8, title: "Rattan Chair" },
  { id: 9, img: HomeGalary9, title: "Coffee Table" },
  { id: 10, img: HomeGalary10, title: "BedSide Table" },
  { id: 11, img: HomeGalary11, title: "Nest Of Table" },
  { id: 12, img: HomeGalary12, title: "Dining Tables" },
  { id: 13, img: HomeGalary13, title: "Console Table" },
  { id: 14, img: HomeGalary14, title: "Laptop Table" },
  { id: 15, img: HomeGalary15, title: "Study Table" },
  { id: 16, img: HomeGalary16, title: "Dressing Table" },
  { id: 17, img: HomeGalary17, title: "Side & End Tables" },
  { id: 18, img: HomeGalary18, title: "1 Seater Sofas" },
  { id: 19, img: HomeGalary19, title: "2 Seater Sofas" },
  { id: 20, img: HomeGalary20, title: "3 Seater Sofas" },
  { id: 22, img: HomeGalary22, title: "Sofa Set" },
  { id: 23, img: HomeGalary23, title: "Wooden Sofa" },
  { id: 24, img: HomeGalary24, title: "Wedding Sofa" },
  { id: 25, img: HomeGalary25, title: "Chaise Lounges" },
  { id: 26, img: HomeGalary26, title: "Luxury Sofa Sets" },
  { id: 27, img: HomeGalary27, title: "Dining Chairs" },
  { id: 28, img: HomeGalary28, title: "Dining Tables Sets" },
  { id: 29, img: HomeGalary29, title: "Dining Tables" },
  { id: 30, img: HomeGalary30, title: "Bar Stools" },
  { id: 31, img: HomeGalary31, title: "Kitchen Trolley Cart" },
  { id: 32, img: HomeGalary32, title: "Luxury Dining Sets" },
  { id: 33, img: HomeGalary33, title: "4 Seater Dining Set" },
  { id: 34, img: HomeGalary34, title: "6 Seater Dining Set" },
  { id: 35, img: HomeGalary35, title: "8 Seater Dining Set" },
  { id: 36, img: HomeGalary36, title: "10 Seater Dining Set" },
  { id: 37, img: HomeGalary37, title: "BedSide Table" },
  { id: 38, img: HomeGalary38, title: "King Size Beds" },
  { id: 39, img: HomeGalary39, title: "Queen Size Beds" },
  { id: 40, img: HomeGalary40, title: "Upholstered Beds" },
  { id: 41, img: HomeGalary41, title: "Luxury Beds" },
  { id: 42, img: HomeGalary42, title: "Pouffes & Ottomans" },
  { id: 43, img: HomeGalary43, title: "Ottoman Storage" },
  { id: 44, img: HomeGalary44, title: "Mattresses" },
  { id: 45, img: HomeGalary45, title: "Swing Chair" },
  { id: 46, img: HomeGalary46, title: "Outdoor Chair" },
  { id: 47, img: HomeGalary47, title: "Outdoor Sofa" },
  { id: 48, img: HomeGalary48, title: "Outdoor Furniture" },
  { id: 49, img: HomeGalary49, title: "Outdoor Table" },
  { id: 50, img: HomeGalary50, title: "Office Chair" },

  { id: 53, img: HomeGalary53, title: "Office Table" },
  { id: 54, img: HomeGalary54, title: "Gaming Tables" },
  { id: 55, img: HomeGalary55, title: "Ergonomic Chairs" },
 
  { id: 57, img: HomeGalary57, title: "Office Sofa" },
  { id: 58, img: HomeGalary58, title: "Wall Art" },
  { id: 59, img: HomeGalary59, title: "Decorative Mirrors" },
  { id: 60, img: HomeGalary60, title: "Vases" },
  { id: 61, img: HomeGalary61, title: "Candles" },
  { id: 62, img: HomeGalary62, title: "Throw Pillows" },
  { id: 63, img: HomeGalary63, title: "Rugs" },
  { id: 64, img: HomeGalary64, title: "Curtains" },
  { id: 65, img: HomeGalary65, title: "Table Lamps" },
 
  { id: 67, img: HomeGalary67, title: "Storage Cabinets" },
  { id: 68, img: HomeGalary68, title: "Display Cabinets" },
  { id: 69, img: HomeGalary69, title: "Kitchen Cabinets" },
];

const HomeAllCollection = () => {
  const [shimmer, setShimmer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShimmer(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleNavigate = (title: string) => {
    navigate(`/subCategory/?subCat=${title}`);
  };
  if (!shimmer) {
    return <Fgallery />;
  }
  return (
    <div className={style.main_container}>
      <h1>All Collection</h1>

      {/* Mapping over the LivingData array */}
      <div className={style.gallery_grid}>
        {LivingData.map((item) => (
          <div
            key={item.id}
            className={style.gallery_item}
            onClick={() => handleNavigate(item?.title)}
            style={{ cursor: "pointer" }}
          >
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAllCollection;
