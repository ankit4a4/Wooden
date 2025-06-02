import React from "react";
import HeroHome from "../components/Home/HeroHome";
import HomeGalary from "../components/Home/HomeGalary";
import Cabinets from "../components/Home/Cabinets";
import LuxuryCollection from "../components/Home/luxuryCollection";
import UnbeatablePrices from "../components/Home/UnbeatablePrices";
import WoodenBazaar from "../components/Home/WoodenBazaar";
import HomeContactUs from "../components/Home/HomeContactUs";

import LuxuryFurniture from "../components/Home/LuxuryFurniture";
import Homeimagesection from "../components/Home/Homeimagesection";
import HomeFooter from "../components/Home/HomeFooter";
import img1 from "../assets/Home/heroCardImage1.webp";
import img2 from "../assets/Home/heroCardImage2.webp";
import img3 from "../assets/Home/heroCardImage3.webp";
import HomeGalary1 from "../assets/Home/HomeGalaryCardImage1.webp";
import HomeGalary2 from "../assets/Home/HomeGalaryCardImage2.webp";
import HomeGalary3 from "../assets/Home/HomeGalaryCardImage3.webp";
import HomeGalary4 from "../assets/Home/HomeGalaryCardImage4.webp";
import HomeGalary5 from "../assets/Home/HomeGalaryCardImage5.webp";
import HomeGalary6 from "../assets/Home/HomeGalaryCardImage6.webp";
import HomeGalary32 from "../assets/Product/diningRoom6.webp";
import HomeGalary8 from "../assets/Home/HomeGalaryCardImage8.webp";
import HomeGalary9 from "../assets/Home/HomeGalaryCardImage9.webp";
import HomeGalary10 from "../assets/Home/HomeGalaryCardImage10.webp";
import Cabinets1 from "../assets/Home/CabinetsImage1.webp";
import Cabinets2 from "../assets/Home/CabinetsImage2.webp";
import Cabinets3 from "../assets/Home/CabinetsImage3.webp";
import Cabinets4 from "../assets/Home/CabinetsImage4.webp";
import Cabinets5 from "../assets/Home/CabinetsImage5.webp";
import Cabinets6 from "../assets/Home/CabinetsImage6.webp";
import Luxury1 from "../assets/Home/sofa1.webp";
import Luxury2 from "../assets/Home/sofa2.webp";
import Luxury3 from "../assets/Home/sofa3.webp";
import Luxury4 from "../assets/Home/sofa4.webp";
import Luxury5 from "../assets/Home/sofa5.webp";
import Luxury6 from "../assets/Home/sofa6.webp";
import image from "../assets/Home/luxurycollectionImage1.webp";
import image2 from "../assets/Home/luxurycollectionImage2.webp";
import image3 from "../assets/Home/luxurycollectionImage3.webp";
import Unbeatable1 from "../assets/Home/UnbeatablePrices1.webp";
import Unbeatable2 from "../assets/Home/UnbeatablePrices2.webp";
import Unbeatable3 from "../assets/Home/UnbeatablePrices3.webp";
import Unbeatable4 from "../assets/Home/UnbeatablePrices4.webp";
import Wooden1 from "../assets/Home/WoodenBazaar.webp";

import Furniture1 from "../assets/Home/WoodenBazaar.webp";
import Furniture2 from "../assets/Home/LuxuryFurniture1.webp";
import Furniture3 from "../assets/Home/LuxuryFurniture2.webp";
import Furniture4 from "../assets/Home/LuxuryFurniture3.webp";
import Furniture5 from "../assets/Home/LuxuryFurniture4.webp";
import Furniture6 from "../assets/Home/LuxuryFurniture5.webp";
import Homeimage1 from "../assets/Home/Homeimage1.webp";
import Homeimage2 from "../assets/Home/Homeimage2.webp";
import Homeimage3 from "../assets/Home/Homeimage3.webp";
import Homeimage4 from "../assets/Home/Homeimage4.webp";
import HomeFoo1 from "../assets/Home/homeFooter.png";
import HomeFoo2 from "../assets/Home/homeFooter2.png";
import HomeFoo3 from "../assets/Home/homeFooter3.png";
import HomeFoo4 from "../assets/Home/homeFooter4.png";
import WhatsAppLink from "../components/Layout/WhatsAppLink";
const Home: React.FC = () => {
  const HerocardData = [
    {
      img: img1,
      description: "2 Seater Sofas",
      description2: "Perfect for Relaxation",
    },
    {
      img: img2,
      description: "Arm Chair",
      description2: "Versatile design for spaces",
      description3: "Upto 20% off",
    },
    {
      img: img3,
      description: "4 Seater Dining Set",
      description2: "Crafted with care, beauty",
      description3: "Upto 20% off",
    },
  ];

  const HomeGalaryData = [
    {
      id: 1,
      img: HomeGalary1,
      title: "Arm Chair",
    },
    {
      id: 2,
      img: HomeGalary2,
      title: "Dining Tables Sets",
    },
    {
      id: 3,
      img: HomeGalary3,
      title: "Sofa Set",
    },
    {
      id: 4,
      img: HomeGalary4,
      title: "Coffee Table",
    },
    {
      id: 5,
      img: HomeGalary5,
      title: "Rocking Chair",
    },
    {
      id: 6,
      img: HomeGalary6,
      title: "Ottoman Storage",
    },
    {
      id: 7,
      img: HomeGalary32,
      title: "Luxury Sofa Sets",
    },
    {
      id: 8,
      img: HomeGalary8,
      title: "Decorative Mirrors",
    },
    {
      id: 9,
      img: HomeGalary9,
      title: "Side & End Tables",
    },
    {
      id: 10,
      img: HomeGalary10,
      title: "Display Cabinets",
    },
  ];

  const Cabinetsdata = [
    {
      img: Cabinets1,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Cabinets2,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Cabinets3,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Cabinets4,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Cabinets5,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Cabinets6,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
  ];

  const Luxury = [
    {
      img: Luxury1,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Luxury2,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Luxury3,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Luxury4,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Luxury5,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
    {
      img: Luxury6,
      title: "Rowan Modern Rustic",
      description: "30000/-",
    },
  ];

  const LuxuryCollectionData = [
    {
      index: 0,
      img: image,
      title: "Bedroom",
    },
    { index: 1, img: image2, title: "Dining Room" },
    {
      index: 2,
      img: image3,
      title: "Home Decor",
    },
  ];

  const Unbeatable = [
    {
      img: Unbeatable1,
      title: "Arm chair",
      description: "Upto 50% off ",
    },
    {
      img: Unbeatable2,
      title: "Coffee Table",
      description: "Upto 50% off ",
    },
    {
      img: Unbeatable3,
      title: "Wall Art",
      description: "Upto 50% off ",
    },
    {
      img: Unbeatable4,
      title: "Dressing Table",
      description: "Upto 50% off ",
    },
  ];

  const Wooden = [
    {
      img: Wooden1,
      title: "Lighted mirror wood makeup ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Wooden1,
      title: "Lighted mirror wood makeup ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Wooden1,
      title: "Lighted mirror wood makeup ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Wooden1,
      title: "Lighted mirror wood makeup ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Wooden1,
      title: "Lighted mirror wood makeup ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Wooden1,
      title: "Lighted mirror wood makeup ",
      description: "30000/-",
      description2: "30000/-",
    },
  ];

  const Furniture = [
    {
      img: Furniture1,
      title: "Rowan Modern Rustic ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Furniture2,
      title: "Rowan Modern Rustic ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Furniture3,
      title: "Rowan Modern Rustic ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Furniture4,
      title: "Rowan Modern Rustic ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Furniture5,
      title: "Rowan Modern Rustic ",
      description: "30000/-",
      description2: "30000/-",
    },
    {
      img: Furniture6,
      title: "Rowan Modern Rustic ",
      description: "30000/-",
      description2: "30000/-",
    },
  ];

  const Homeimage = [
    {
      img: Homeimage1,
    },
    {
      img: Homeimage2,
    },
    {
      img: Homeimage3,
    },
    {
      img: Homeimage4,
    },
  ];

  const HomeFoo = [
    {
      id: "1",
      img: HomeFoo1,
      heading: "Free Delivery",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    },
    {
      id: "2",
      img: HomeFoo2,
      heading: "Free return",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    },
    {
      id: "3",
      img: HomeFoo3,
      heading: "Top-notch support",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    },
    {
      id: "4",
      img: HomeFoo4,
      heading: "Secure payments",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
    },
  ];

  return (
    <div>
      {/* <ShimmerEffect /> */}
      <HomeGalary HomeGalaryData={HomeGalaryData} />
      <HeroHome HerocardData={HerocardData} />
      <Cabinets Cabinetsdata={Cabinetsdata} />
      <LuxuryCollection
        Luxury={Luxury}
        LuxuryCollectionData={LuxuryCollectionData}
      />
      <UnbeatablePrices Unbeatable={Unbeatable} />
      <WoodenBazaar Wooden={Wooden} />
      <HomeContactUs />
      {/* <CustomerReviews CustomerReview={CustomerReview} Data={CustomerReview}/> */}
      <LuxuryFurniture Furniture={Furniture} />
      <Homeimagesection Homeimage={Homeimage} />
      <HomeFooter HomeFoo={HomeFoo} />
      <WhatsAppLink />
    </div>
  );
};

export default Home;
