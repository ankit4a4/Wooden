import React from "react";
import style from "../../Style/Home/CustomerReviews.module.css";
import { useState, useEffect } from "react";
import { VscStarFull } from "react-icons/vsc";
import { SiSpringsecurity } from "react-icons/si";
import { Bounce } from "react-awesome-reveal";
import CustomeShimmer from "../../utils/Shimmer/CustomeShimmer";
import { useLocation, useParams } from "react-router-dom";
import ReviewPopUpForm from "../SingleProduct/ReviewPopUpForm";

interface CardData {
  img: string;
  description: string;
}

interface Review {
  id: number;
  content: string;
  star: string; // rating stored as string, could be number
  comment: string;
  photos: string[]; // Array of image URLs for the review
}

interface CustomerReviewsProps {
  CustomerReview: CardData[];
  Data: {
    reviews: Review[];
  };
}
const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  CustomerReview,
  Data
}) => {
  const [loading, setLoading] = useState(true);
  const [showReviewPopUp, setShowReviewPopUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);
  const location = useLocation();
  const { id } = useParams<{ id: any }>();
  if (loading) {
    return (
      <>
        <CustomeShimmer />
      </>
    );
  }


  // const handleShowMoreReview = () => {
  //   console.log("handleShowMoreReview", Data);
  // };
  
  return (
    <>
      <div className={style.CustomerReviews_container}>
        {/*  ///////////////// top header button show or not ///////////////// */}
        <p>
          <Bounce>Customer Reviews</Bounce>
        </p>

        <div className={style.CustomerReviews_CardsmainBox}>
          {CustomerReview?.map((item, index) => (
            <div className={style.CustomerReviews_Card} key={index}>
              <div className={style.CustomerReviews_Line}>
                <div className={style.CustomerReviews_stars}>
                  <VscStarFull />
                  <VscStarFull />
                  <VscStarFull />
                  <VscStarFull />
                  <VscStarFull />
                </div>
              </div>
              <div className={style.CustomerReviews_text}>
                <p>
                  <span>
                    <SiSpringsecurity />
                  </span>
                </p>
                <p>{item.description}</p>
              </div>

            </div>
          ))}

          {/* ///////////////////// If route is single product then show ///////////////////// */}
          {location.pathname === `/singleproduct/${id}` &&
            Data?.reviews?.map((item: any, index: number) => (
              <div className={style.CustomerReviews_Card} key={index}>
                <div className={style.CustomerReviews_Line}>
                  <div className={style.CustomerReviews_stars}>
                    {item?.star &&
                      Array.from({ length: parseInt(item.star, 10) }).map((_, starIndex) => (
                        <VscStarFull key={starIndex} />
                      ))
                    }
                  </div>
                </div>


                <div className={style.CustomerReviews_text}>
                  <p>
                    {/* <Bounce>{item.title}</Bounce> */}
                    <span>
                      <SiSpringsecurity />
                    </span>
                  </p>
                  <p>{item?.comment}</p>
                </div>
              </div>
            ))
          }
        </div>
        {/* ///////////////////// button show condition for single product    //////////////////// */}
        {/* {(location.pathname === `/singleproduct/${id}` && Data !== undefined) && (
          <div className={style.CustomerReviews_btnBox}>
            <button onClick={handleShowMoreReview}>View More</button>
          </div>
        )} */}
      </div>

      {showReviewPopUp && (
        <ReviewPopUpForm onClose={() => setShowReviewPopUp(false)} />
      )}
    </>
  );
};

export default CustomerReviews;
