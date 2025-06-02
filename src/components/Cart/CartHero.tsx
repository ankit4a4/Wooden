import React, { useEffect } from "react";
import style from "../../Style/Cart/CartHero.module.css";
import { LuIndianRupee } from "react-icons/lu";
import { TiDeleteOutline } from "react-icons/ti";
import { Bounce, Fade, JackInTheBox } from "react-awesome-reveal";
import {
  getCart,
  updateQuantity,
  removeFromCart,
} from "../../store/Features/Cart/CartSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../store/Store";
import { setCheckoutItem, setIsLogin } from "../../store/Features/Shared/Utils";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import img from "../../assets/Cart/empty.png";

const CartHero: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const token = Cookies.get("token");

  useEffect(() => {
    dispatch(getCart() as any);
  }, [dispatch]);

  const handleQuantityChange = (
    itemId: string,
    action: "increase" | "decrease"
  ) => {
    dispatch(updateQuantity({ itemId, action }) as any);
  };

  const handleCheckOut = () => {
    if (token) {
      dispatch(setCheckoutItem(cartItems as any));
      navigate("/checkout");
     
    } else {
      dispatch(setIsLogin(true));
    }
  };

  return (
    <div className={style.CartHero_container}>

      <div className={style.CartHero_Warning}>

        <p>
          <Fade>Shopping Cart</Fade>
        </p>
      </div>
      {cartItems?.length !== 0 ? (
        <div className={style.cartHeroDetails}>
          <div className={style.cartHeroDetails_Table}>
            <table>
              <thead>
                <tr>
                  <th>
                    <Bounce>Product</Bounce>
                  </th>
                  <th>
                    <Bounce>Price</Bounce>
                  </th>
                  <th>
                    <Bounce>Quantity</Bounce>
                  </th>
                  <th>
                    <Bounce>Total</Bounce>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.length > 0 ? (
                  cartItems?.map((item: any) => (
                    <tr key={item._id}>
                      <td className={style.CartTable_fristTd}>
                        <div className={style.CartTable_design}>
                          <div className={style.CartTable_design_image}>
                            <img
                              src={
                                token
                                  ? item?.productVariants?.imgObject[0]?.url
                                  : item?.image
                              }
                              alt={token ? item?.product?.name : item?.name}
                            />
                          </div>
                          <div className={style.CartTable_design_details}>
                            <h4>{token ? item?.product?.name : item?.name}</h4>
                            <p>{item?.product?.detail}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>
                          <LuIndianRupee className={style.CartTable_design_price} />{" "}
                          {token ? item?.productVariants?.mrp : item?.price}/-
                        </p>
                      </td>
                      <td>
                        <div className={style.CartTable_design_quantity}>
                          <button
                          style={{borderRight : "2px solid black"}}
                            onClick={() =>
                              handleQuantityChange(
                                token ? item?._id : item?.productVariantId,
                                "decrease"
                              )
                            }
                          >
                            -
                          </button>
                          <p>{item?.quantity}</p>
                          <button
                          style={{borderLeft : "2px solid black"}}
                            className={style.CartTable_design_quantity_plus}
                            onClick={() =>
                              handleQuantityChange(
                                token ? item?._id : item?.productVariantId,
                                "increase"
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <p>
                          <LuIndianRupee  className={style.CartTable_design_price}  />{" "}
                          {/* {Array.isArray(item) &&
                          item?.length > 0 &&
                          (token
                            ? item?.reduce(
                                (total, item, index) =>
                                  total +
                                  parseFloat(item?.productVariants?.mrp) *
                                    item?.quantity,
                                0
                              )
                            : item?.productVariants?.mrp * item?.quantity)} */}
                          {token
                            ? item?.productVariants?.mrp * item?.quantity
                            : item?.price * item?.quantity}
                          /-
                        </p>
                      </td>
                      <td>
                        <p
                          onClick={() =>
                            dispatch(removeFromCart(item?._id) as any)
                          }
                        >
                          <TiDeleteOutline className={style.CartTable_design_price_2} />
                        </p>
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <td colSpan={5}>0 cart items!</td>

                    <div>
                      <img src={img} alt="empty cart" />
                    </div>

                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Continue shopping
                    </button>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className={style.cartHeroDetails_Summary}>
            <h2>
              <Bounce>Order Summary</Bounce>
            </h2>
            <div className={style.CartTable_flexBox2}>
              <p>
                <Bounce>Total</Bounce>
              </p>
              <h4>
                {" "}
                <LuIndianRupee />{" "}
                {Array.isArray(cartItems) &&
                  cartItems?.length > 0 &&
                  (token
                    ? cartItems?.reduce(
                      (total: any, item: any) =>
                        total +
                        parseFloat(item?.productVariants?.mrp) *
                        item?.quantity,
                      0
                    )
                    : cartItems?.reduce(
                      (total: any, item: any) =>
                        total + parseFloat(item?.price) * item?.quantity,
                      0
                    ))}
                /-{" "}
              </h4>
            </div>
            <div className={style.cartHeroDetails_SummaryBtn}>
              <button onClick={handleCheckOut}>
                <JackInTheBox>Proceed to checkout</JackInTheBox>
              </button>
              <button onClick={() => navigate("/")}>
                <JackInTheBox>Continue shopping</JackInTheBox>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={style.cartHeroEmptyCartBox}>
            <h1>Cart it empty</h1>
            <div>
              <img src={img} alt="empty cart" />
            </div>

            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Continue shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartHero;
