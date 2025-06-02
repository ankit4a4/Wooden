import ProductHero from "../components/product/ProductHero";
import SofasForm from "../components/product/SofasForm";

///////////////////// Chair Image ////////////////////////////

import chair2 from '../assets/Product/chair2.webp'
import chair3 from '../assets/Product/chair3.webp'
import chair4 from '../assets/Product/chair4.webp'
import chair5 from '../assets/Product/chair5.webp'
import chair6 from '../assets/Product/chair6.webp'
import chair7 from '../assets/Product/chair7.webp'
import chair8 from '../assets/Product/chair8.webp'

///////////////////// Table Image ////////////////////////////

import table from "../assets/Product/table.webp"

import table3 from "../assets/Product/table3.webp"

import table5 from "../assets/Product/table5.webp"
import table6 from "../assets/Product/table6.webp"
import table7 from "../assets/Product/table7.webp"
import table8 from "../assets/Product/table8.webp"
import table9 from "../assets/Product/table9.webp"

///////////////////// Sofa Image ////////////////////////////

import sofaa from "../assets/Product/sofaa1.webp"
import sofaa2 from "../assets/Product/sofaa2.webp"
import sofaa3 from "../assets/Product/sofaa3.webp"
import sofaa5 from "../assets/Product/Sofaa5.webp"
import sofaa6 from "../assets/Product/sofaa6.webp"
import sofaa7 from "../assets/Product/sofaa7.webp"
import sofaa8 from "../assets/Product/sofaa8.webp"
import sofaa9 from "../assets/Product/sofaa9.webp"

///////////////////// Dining Room Image ////////////////////////////

import dining1 from "../assets/Product/diningroom1.webp"
import dining2 from "../assets/Product/diningRoom2.webp"
import dining3 from "../assets/Product/diningRoom3.webp"
import dining4 from "../assets/Product/diningRoom4.webp"
import dining5 from "../assets/Product/diningRoom5.webp"
import dining6 from "../assets/Product/diningRoom6.webp"
import dining7 from "../assets/Product/diningroom7.webp"
import dining8 from "../assets/Product/diningRoom8.webp"
import dining9 from "../assets/Product/diningroom 9.webp"
import dining10 from "../assets/Product/diningroom10.webp"

///////////////////// Bad Room Image ////////////////////////////

import badRoom from "../assets/Product/badroom.webp"
import badRoom2 from "../assets/Product/badroom2.webp"
import badRoom3 from "../assets/Product/badroom3.webp"
import badRoom4 from "../assets/Product/badroom4.webp"
import badRoom5 from "../assets/Product/badroom5.webp"
import badRoom6 from "../assets/Product/badroom6.webp"
import badRoom7 from "../assets/Product/badroom7.webp"
import badRoom8 from "../assets/Product/badroom8.webp"

///////////////////// Out Door Furniture Image ////////////////////////////

import outDoor from "../assets/Product/OutDoor.webp"
import outDoor2 from "../assets/Product/outDoor2.webp"
import outDoor3 from "../assets/Product/outDoor3.webp"
import outDoor4 from "../assets/Product/outDoor4.webp"
import outDoor5 from "../assets/Product/outDoor5.webp"

///////////////////// Study and Office Image ////////////////////////////

import studyoffice from "../assets/Product/study&office.webp"
import studyoffice4 from "../assets/Product/Study&office4.webp"
import studyoffice5 from "../assets/Product/study&office5.webp"
import studyoffice6 from "../assets/Product/study&office6.webp"
import studyoffice7 from "../assets/Product/study&office7.webp"
import studyoffice8 from "../assets/Product/study&office.webp"

///////////////////// Home Decor Image ////////////////////////////

import homeDecor from "../assets/Product/Homedecor.webp"
import homeDecor2 from "../assets/Product/homedecor2.webp"
import homeDecor3 from "../assets/Product/homedecor3.webp"
import homeDecor4 from "../assets/Product/homedecor4.webp"
import homeDecor5 from "../assets/Product/homedecor5.webp"
import homeDecor6 from "../assets/Product/homedecor6.webp"
import homeDecor7 from "../assets/Product/Homedecore7.webp"
import homeDecor8 from "../assets/Product/homedecor8.webp"

///////////////////// Cabinets Image ////////////////////////////


import cabinets2 from "../assets/Product/cabinets2.webp"
import cabinets3 from "../assets/Product/cabinets3.webp"
import cabinets4 from "../assets/Product/cabinets4.webp"

import { useLocation } from "react-router-dom";


const Product = () => {

    const chairData = [
        { img: chair2, title: "Arm Chair" },
        { img: chair3, title: "Rocking Chair" },
        { img: chair4, title: "Dining Chair" },
        { img: chair5, title: "Barrel Chair" },
        { img: chair6, title: "Wing Chair" },
        { img: chair7, title: "Wooden Chair" },
        { img: chair8, title: "Rattan Chair" }
    ];

  const tableData = [
    { img: table, title: "Coffee Table" },
    { img: table3, title: "Nest Of Table" },
    { img: table5, title: "Console Table" },
    { img: table6, title: "Laptop Table" },
    { img: table7, title: "Study Table" },
    { img: table8, title: "Dressing Table" },
    { img: table9, title: "Side & End Tables" },
  ];

  const sofaData = [
    { img: sofaa, title: "1 Seater Sofas" },
    { img: sofaa2, title: "2 Seater Sofas" },
    { img: sofaa3, title: "3 Seater Sofas" },
    { img: sofaa5, title: "Sofa Set" },
    { img: sofaa6, title: "Wooden Sofa" },
    { img: sofaa7, title: "Wedding Sofa" },
    { img: sofaa8, title: "Chaise Lounges" },
    { img: sofaa9, title: "Luxury Sofa Sets" },
  ];

  const diningRoomData = [
    { img: dining1, title: "Dining Chairs" },
    { img: dining2, title: "Dining Tables Sets" },
    { img: dining3, title: "Dining Tables" },
    { img: dining4, title: "Bar Stools" },
    { img: dining5, title: "Kitchen Trolley Cart" },
    { img: dining6, title: "Luxury Dining Sets" },
    { img: dining7, title: "4 Seater Dining Set" },
    { img: dining8, title: "6 Seater Dining Set" },
    { img: dining9, title: "8 Seater Dining Set" },
    { img: dining10, title: "10 Seater Dining Set" },
  ];

  const bedRoomData = [
    { img: badRoom, title: "BedSide Table" },
    { img: badRoom2, title: "King Size Beds" },
    { img: badRoom3, title: "Queen Size Beds" },
    { img: badRoom4, title: "Upholstered Beds" },
    { img: badRoom5, title: "Luxury Beds" },
    { img: badRoom6, title: "Pouffes & Ottomans" },
    { img: badRoom7, title: "Ottoman Storage" },
    { img: badRoom8, title: "Mattresses" },
  ];

  const outDoorFurnitureData = [
    { img: outDoor, title: "Swing Chair" },
    { img: outDoor2, title: "Outdoor Chair" },
    { img: outDoor3, title: "Outdoor Sofa" },
    { img: outDoor4, title: "Outdoor Furniture" },
    { img: outDoor5, title: "Outdoor Table" },
  ];

  const studyAndOfficeData = [
    { img: studyoffice, title: "Office Chair" },
    { img: studyoffice4, title: "Office Table" },
    { img: studyoffice5, title: "Gaming Tables" },
    { img: studyoffice6, title: "Ergonomic Chairs" },
    { img: studyoffice7, title: "Office Cabinets" },
    { img: studyoffice8, title: "Office Sofa" },
  ];

  const homeDecorData = [
    { img: homeDecor, title: "Wall Art" },
    { img: homeDecor2, title: "Decorative Mirrors" },
    { img: homeDecor3, title: "Vases" },
    { img: homeDecor4, title: "Candles" },
    { img: homeDecor5, title: "Throw Pillows" },
    { img: homeDecor6, title: "Rugs" },
    { img: homeDecor7, title: "Curtains" },
    { img: homeDecor8, title: "Table Lamps" },
  ];

  const cabinetsData = [
    { img: cabinets2, title: "Storage Cabinets" },
    { img: cabinets3, title: "Display Cabinets" },
    { img: cabinets4, title: "Kitchen Cabinets" },
  ];

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("catName") || "";

  return (
    <div>
      {type !== null ? (
        <>
          <SofasForm
            chairData={chairData}
            tableData={tableData}
            sofaData={sofaData}
            diningRoomData={diningRoomData}
            bedRoomData={bedRoomData}
            outDoorFurnitureData={outDoorFurnitureData}
            studyAndOfficeData={studyAndOfficeData}
            homeDecorData={homeDecorData}
            cabinetsData={cabinetsData}
          />
          <ProductHero />
        </>
      ) : (
        <ProductHero />
      )}
    </div>
  );
};
export default Product;
