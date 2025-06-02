import React from "react";
import style from "../../Style/Home/Woodenbazaar.module.css";
import { useGetCategoryQuery } from "../../store/Features/ProductReducer/ProductReducer";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import WoodenBazaarShimmer from "../../utils/Shimmer/WoodenBazaarShimmer";

interface carddata {
  img: string;
  title: string;
  description: string;
  description2: string;
}

interface WoodenProps {
  Wooden: carddata[];
}

const WoodenBazaar: React.FC<WoodenProps> = () => {
  // functionality of Dining Room
  const navigate = useNavigate();
  const type = "dining room";
  const { data, isLoading, isSuccess } = useGetCategoryQuery({ type, page: 1 });
  const handleViewDining = () => {
    navigate(`/product/?catName=${type}`);
  };
  // handle single page on click
  const handleNavigateSinglePage = (id: string, variantId: string) => {
    navigate(`singleproduct/${id}?variantId=${variantId}`);
  };

  if (isLoading) {
    return (
      <>
        <WoodenBazaarShimmer />
      </>
    );
  }

  return (
    <>
      <div className={style.WoodenBazaar_Container}>
        <div className={style.WoodenBazaar_Heading}>
          <h3>
            <Fade>Dining Room</Fade>
          </h3>
          <p>
            <u style={{ cursor: "pointer" }} onClick={handleViewDining}>
              View all
            </u>
          </p>
        </div>

        <div>
          {isSuccess &&
            data?.allProducts &&
            data?.allProducts?.slice(0, 6).map((item: any, index) => (
              <div className={style.WoodenBazaar_allCards2} key={index}>
                <div
                  className={style.WoodenBazaar_card}
                  onClick={() => handleNavigateSinglePage(item?._id, item?.variants[0]?._id)}
                >
                  <img
                    src={item?.variants[0]?.imgObject?.url}
                    alt="image here"
                  />
                  <h3>{item?.name}</h3>
                  <div className={style.WoodenBazaar_price}>
                    <h3>
                      <FaRupeeSign />
                      {item?.variants[0]?.price}
                    </h3>
                    <h3>
                      <FaRupeeSign size={"0.9vw"} />
                      <s>{item?.variants[0]?.maxPrice}</s>
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

export default WoodenBazaar;
