import React from "react";
import style from "../../Style/Home/Cabinets.module.css";
import { useGetCategoryQuery } from "../../store/Features/ProductReducer/ProductReducer";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import ShimmerLoader from "../../utils/Shimmer/ShimmerLoader";

interface CardData {
  img: string;
  title: string;
  description: string;
}
interface CabinetsProps {
  Cabinetsdata: CardData[];
}

const Cabinets: React.FC<CabinetsProps> = () => {
  // Handle for single page
  const navigate = useNavigate();
  const handleNavigateSinglePage = (id: string, variantId: string) => {
    navigate(`singleproduct/${id}?variantId=${variantId}`);
  };

  const handleNavigate = () => {
    navigate(`/product/?catName=Cabinets`);
  };

  // for fetching the products
  const type = "Cabinets";
  const { data, isLoading, isSuccess } = useGetCategoryQuery({ type, page: 1 });

  if (isLoading) {
    return (
      <>
        <ShimmerLoader />
      </>
    );
  }

  return (
    <>
      <div className={style.Cabinets_Main_container}>
        <div className={style.Cabinets_heading}>
          <h2>
            <Fade>Cabinets</Fade>
          </h2>
          <p>
            <u onClick={handleNavigate}> View all</u>
          </p>
        </div>
        <div className={style.Cabinets_allCards}>
          {isSuccess &&
            data &&
            data?.allProducts &&
            data?.allProducts?.slice(0, 6).map((item: any, index) => (
              <div
                className={style.Cabinets_Card}
                key={index}
                onClick={() => handleNavigateSinglePage(item?._id, item?.variants[0]?._id)}
              >
                <div>
                  <img
                    src={item?.variants[0]?.imgObject?.url}
                    alt={`Variant image `}
                  />
                  <div className={style.details_card}>
                    <h3>{item?.name}</h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Cabinets;
