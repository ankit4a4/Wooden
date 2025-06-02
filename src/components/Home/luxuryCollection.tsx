import React from "react";
import ShimmerLoader from "../../utils/Shimmer/ShimmerLoader";
import style from "../../Style/Home/LuxuryCollection.module.css";
import { useGetCategoryQuery } from "../../store/Features/ProductReducer/ProductReducer";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

interface LuxuryCollection {
  img: string;
  title: string;
}

interface carddata {
  img: string;
  title: string;
  description: string;
}

interface LuxuryCollectionProps {
  Luxury: carddata[];
  LuxuryCollectionData: LuxuryCollection[];
}

const LuxuryCollection: React.FC<LuxuryCollectionProps> = ({
  LuxuryCollectionData,
}) => {
  const navigate = useNavigate();

  // Navigation handler with the index
  const handleNavigate = (index: number) => {
    let type = "home decor";
    if (index === 0) {
      type = "bedroom";
    } else if (index === 1) {
      type = "dining room";
    }
    const name = type.toLocaleLowerCase();
    navigate(`/product/?catName=${name}`);
  };

  // functionality for sofa's
  const type = "sofa";
  const { data, isLoading, isSuccess } = useGetCategoryQuery({ type, page: 1 });


  if (isLoading) {
    return (
      <>
        <ShimmerLoader />
      </>
    );
  }

  // handle single page on click
  const handleNavigateSinglePage = (id: string, variantId: string) => {
    navigate(`singleproduct/${id}?variantId=${variantId}`);
  };

  // handle view all sofas
  const handleViewSofa = () => {
    navigate(`/product/?catName=${type}`);
  };

  return (
    <>
      <div className={style.luxurycollection_container}>
        <div className={style.LuxuryCollection_heading}>
          <h3>
            <Fade>Explore our luxury collection</Fade>
          </h3>
        </div>
        <div className={style.LuxuryCollection_allCards}>
          {LuxuryCollectionData?.map((item, index) => (
            <div
              className={style.LuxuryCollection_card}
              key={index}
              onClick={() => handleNavigate(index)}
              style={{ cursor: "pointer" }}
            >
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sofa Section */}
      <div className={style.sofa_Main_container}>
        <div className={style.sofa_heading}>
          <h2>
            <Fade>Sofas</Fade>
          </h2>
          <p>
            <u onClick={handleViewSofa}>View all</u>
          </p>
        </div>
        <div className={style.sofa_allCards}>
          <div className={style.sofaGridBox}>
            {isSuccess &&
              data?.allProducts?.slice(0, 6)?.map((item: any, index) => (
                <div
                  className={style.sofa_Card}
                  key={index}
                  onClick={() =>
                    handleNavigateSinglePage(item?._id , item?.variants[0]?._id)
                  }
                >
                  <img
                    src={
                      item.variants[0]?.imgObject?.url 
                    }
                    alt={`Variant image`}
                  />
                  <h3>{item?.name}</h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LuxuryCollection;
