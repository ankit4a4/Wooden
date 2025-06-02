import React, { useEffect, useState } from "react";
import style from "../../Style/SingleProduct/AddCardPopUp.module.css";
import { LuIndianRupee } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { getCart, updateQuantity } from "../../store/Features/Cart/CartSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../store/Store";
import {
  setCheckoutItem,
  setIsCart,
  setIsLogin,
} from "../../store/Features/Shared/Utils";
import Cookies from "js-cookie";
import img from "../../assets/Cart/empty.png"


interface AddCardPopUpProps {
  onClose: () => void;
}


const AddCardPopUp: React.FC<AddCardPopUpProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = Cookies.get("token");

  const [quantities, setQuantities] = useState<number[]>([]);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);


  const handleViewCart = () => {
    navigate("/cart");
    onClose();
  };

  const handleCheckOut = () => {
    if (token) {
      dispatch(setCheckoutItem(cartItems as any));
      navigate("/checkout");

      onClose();
    } else {
      dispatch(setIsCart(false));
      dispatch(setIsLogin(true));
    }
  };


  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(cartItems) && cartItems?.length > 0) {
      setQuantities(cartItems?.map((item) => item?.quantity));
    }
  }, [cartItems]);




  const handleQuantityChange = (
    itemId: string,
    action: "increase" | "decrease"
  ) => {
    dispatch(updateQuantity({ itemId, action }) as any);
  };

  return (
    <div className={style.AddCardPopUp_main_conatainer}>
      <div className={style.AddCardPopUp_blankBox} onClick={onClose}></div>
      <div className={style.AddCardPopUp_details}>
        <h2>Shopping cart</h2>

        {Array.isArray(cartItems as any) && cartItems?.length > 0 ? (
          <>
            {cartItems?.map((item: any, i) => (
              <div className={style.AddCardPopUp_design} key={i}>
                <div className={style.AddCardPopUp_LeftData}>
                  <img
                    src={token ?
                      item?.productVariants?.imgObject[0]?.url : item?.image
                    }
                    alt=""
                  />
                </div>
                <div className={style.AddCardPopUp_RightData}>
                  <div className={style.AddCardPopUp_HeaderDetails}>
                    <p>{token ? item?.product?.name : item?.name}</p>
                  </div>
                  <div className={style.AddCardPopUp_MiddleDetails}>
                    <p>
                      <small>
                        {item?.productVariants?.color?.categoryName}
                      </small>
                    </p>
                  </div>

                  <div className={style.SingleProductHero_right_subtotal}>
                    <p>Subtotal : </p>
                    <h4>
                      <span>
                        <LuIndianRupee />
                      </span>
                      {token
                        ? item?.productVariants?.mrp * quantities[i]
                        : item?.price * item?.quantity}
                    </h4>
                  </div>

                  <div className={style.SingleProductHero_right_quantity}>
                    <button
                      style={{borderRight : "2px solid black"}}
                     onClick={() => handleQuantityChange(token ? item?._id : item?.productVariantId, "decrease")}>
                      -
                    </button>
                    <p>{quantities[i]}</p>
                    <button
                    style={{borderLeft : "2px solid black"}}
                     onClick={() => handleQuantityChange(token ? item?._id : item?.productVariantId, "increase")}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className={style.AddCardPopUp_subtotal}>
              <p>Subtotal : </p>
              <h4>
                <span>
                  <LuIndianRupee />
                </span>
                {Array.isArray(cartItems) &&
                  cartItems?.length > 0 &&
                  (token
                    ? cartItems?.reduce(
                      (total, item: any, index) =>
                        total +
                        parseFloat(item?.productVariants?.mrp) *
                        quantities[index],
                      0
                    )
                    : cartItems?.reduce(
                      (total, item: any) =>
                        total + parseFloat(item?.price) * item?.quantity,
                      0
                    ))}
              </h4>
            </div>
            <div className={style.AddCardPopUp_subtotal2}>
              <p>Total : </p>
              <h4>
                <span>
                  <LuIndianRupee />
                </span>
                {Array.isArray(cartItems) &&
                  cartItems?.length > 0 &&
                  (token
                    ? cartItems?.reduce(
                      (total, item: any, index) =>
                        total +
                        parseFloat(item?.productVariants?.mrp) *
                        quantities[index],
                      0
                    )
                    : cartItems?.reduce(
                      (total, item: any) =>
                        total + parseFloat(item?.price) * item?.quantity,
                      0
                    ))}
              </h4>
            </div>
            <p style={{ textAlign: "start" }}>
              Tax included and shipping calculated at checkout
            </p>

            <div className={style.AddCardPopUp_btn}>
              <button onClick={handleCheckOut}>CheckOut</button>
              <button onClick={handleViewCart}>View A Cart</button>
            </div>
          </>
        ) : (
          <>
            <div className={style.AddCardPopUp_emptyCart}>
              <h1> 0 Cart item!</h1>
              <div>
                <img src={img} alt="empty cart image" />
              </div>
              <button onClick={() => { navigate("/"); onClose() }}>Continue shopping</button>
            </div>
          </>

        )}
      </div>
    </div>
  );
};

export default AddCardPopUp;
