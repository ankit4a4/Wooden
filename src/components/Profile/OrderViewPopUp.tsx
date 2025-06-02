import { useEffect, useState } from "react";
import style from "../../Style/Profile/OrderViewPopUp.module.css";
import { useGetSingleOrderQuery } from "../../store/Features/ProfileOrderHistory/OrderHistory";
import { RxCross2 } from "react-icons/rx";
import AddReviewPopUp from "./AddReviewPopUp";
import Loader from "../../utils/Loader";

interface OrderProp {
  onClose(): void;
  id: string;
  status: string;
}
const OrderViewPopUp = ({ onClose, id, status }: OrderProp) => {
  const [openAddReview, setOpenAddReview] = useState(false);
  const [variantId, setVariantId] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const { data, isSuccess, isLoading } = useGetSingleOrderQuery(id);
  if (isLoading) {
    return <Loader />;
  }

  const handleAddReview = (id: string) => {
    setOpenAddReview(true);
    setVariantId(id);
  };

  return (
    <div className={style.OrderPopUp_Main_container}>
      <div className={style.OrderPopUp_container}>
        {isSuccess && (
          <>
            <p onClick={onClose} className={style.crossIcon}>
              <RxCross2 />
            </p>

            <div className={style.OrderPopUp_orderDetails}>
              <div>
                <p>
                  <b>Order Detail</b>
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <p>{data?.order?.orderDate}</p>
                <p>{data?.order?.orderTime}</p>
              </div>
            </div>
            <div className={style.OrderPopUp_scrollBox}>
              {data?.order?.products?.map((item: any, i: number) => (
                <div className={style.OrderPopUp_imageBox} key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <div className={style.OrderPopUp_imageBox_imgbox}>
                      <img
                        src={
                          item?.productVariant?.image &&
                          item?.productVariant?.image[0]
                        }
                        alt=""
                      />
                    </div>

                    {status === "review" && (
                    
                        <button
                          onClick={() =>
                            handleAddReview(
                              item?.productVariant?.variantId
                            )
                          }
                          className={style.OrderPopUp_imageBox_btn}
                        >
                          Add review
                        </button>
                    )}
                  </div>

                  <div className={style.OrderPopUp_imageBox_textbox}>
                    <div style={{ display: "flex", gap: "0.1rem" }}>
                      <p>
                        <b>{item?.productName}</b>
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <p>Selling Price :</p>
                      <p>
                        <b>{item?.productVariant?.mrp}/-</b>
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <p>Quantity :</p>
                      <p>
                        <b>{item?.quantity}</b>
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <p>Color :</p>
                      <p>
                        <b>{item?.productVariant?.color?.categoryName}</b>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className={style.OrderPopUp_orderDetails}>
              <p>Total Price</p>
              <p>{data?.order?.totalPrice}/-</p>
            </div>

            <div className={style.OrderPopUp_orderDetails}>
              <p>Amount paid</p>
              <p>{data?.order?.amountPaid.toFixed(2)}/-</p>
            </div>

            <hr />

            <div className={style.OrderPopUp_orderDetails}>
              <p>
                <b>Amount Remaining</b>
              </p>
              <p>{data?.order?.amountRemaining.toFixed(2)}/-</p>
            </div>
            <hr />

            <div className={style.OrderPopUp_flexEndBox}>
              <p>
                <b>Payment received: {data?.order?.amountPaid.toFixed(2)}/-</b>
              </p>
            </div>

            <div className={style.OrderPopUp_orderDetails}>
              <p>Order Status</p>
              <b>{data?.order?.orderStatus}</b>
            </div>
          </>
        )}
      </div>

      {openAddReview && (
        <AddReviewPopUp
          productId={variantId}
          closepopup={() => setOpenAddReview(false)}
        />
      )}
    </div>
  );
};

export default OrderViewPopUp;
