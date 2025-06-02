import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import style from "../../Style/Home/LuxuryFurniture.module.css";
import { useNavigate } from "react-router-dom";
import { useGetCategoryQuery } from "../../store/Features/ProductReducer/ProductReducer";
import { Fade } from "react-awesome-reveal";
import LuxuryFshimmer from "../../utils/Shimmer/LuxuryFshimmer";

interface CardData {
  img: string;
  title: string;
  description: string;
  description2: string;
}

interface FurnitureProps {
  Furniture: CardData[];
}

const LuxuryFurniture: React.FC<FurnitureProps> = () => {
  const navigate = useNavigate();
  //  single page on click
  const handleNavigateSinglePage = (id: string, variantId: string) => {
    navigate(`singleproduct/${id}?variantId=${variantId}`);
  };

  // Functionality for Home Decor
  const type = "home decor";
  const { data, isLoading, isSuccess } = useGetCategoryQuery({ type, page: 1 });

  const handleNavigate = () => {
    navigate(`/product/?catName=${type}`);
  };
  if (isLoading) {
    return <LuxuryFshimmer />;
  }

  return (
    <>
      <div className={style.LuxuryFurniture_Container}>
        <div className={style.LuxuryFurniture_Heading}>
          <h3>
            <Fade>Home Decor</Fade>
          </h3>
          <p>
            <u onClick={handleNavigate}> View all</u>
          </p>
        </div>
        <div className={style.LuxuryFurniture_allCards}>
          {isSuccess &&
            data?.allProducts?.slice(0, 6).map((item: any, index) => (
              <div
                key={index}
                className={style.LuxuryFurniture_allCards}
              >
                <div
                  className={style.LuxuryFurniture_card}
                  onClick={() => handleNavigateSinglePage(item?._id, item?.variants[0]?._id)}
                >
                  {/* <div className={style.LuxuryFurnitureTopDesign}>
                      <p>Sale</p>
                    </div> */}
                  <img src={item.variants[0].imgObject.url} alt={item.name} />
                  <h3>{item?.name}</h3>
                  <div className={style.LuxuryFurniture_price_box}>
                    <h3>
                      <span>
                        <FaRupeeSign />
                      </span>
                      {item?.variants[0]?.price}
                    </h3>
                    <h3>
                      <span>
                        <FaRupeeSign />
                      </span>
                      <s>{item?.variants[0].maxPrice}</s>
                    </h3>
                  </div>
                  <button>Shop now</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default LuxuryFurniture;
