import React, { useEffect, useState } from "react";
import style from "../../Style/CheckOut/CheckOutForm.module.css";
import { Bounce, JackInTheBox } from "react-awesome-reveal";
import AddressOfUser from "./AddressOfUser";
import { useGetAddressesQuery } from "../../store/Features/profile/AllAddressSlice";
import { setIsOpen, clearAddress } from "../../store/Features/Shared/Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { useLocation, useNavigate } from "react-router-dom";
import { useBuyProductMutation } from "../../store/Features/BuyNow/BuynowSlice";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";
import axios from "axios";
import pkg from "../../../package.json";
import Cookies from "js-cookie";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckOutForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookies.get("token");
  const option = useSelector((state: RootState) => state.util.open);
  const addressData = useSelector((state: RootState) => state.util.address);
  const checkOutItems = useSelector((state: RootState) => state.util.checkout);
  const [showButton, setShowButton] = useState(false);
  const { data, isSuccess } = useGetAddressesQuery({ page: 1, perPage: 15 });
  const [buyProduct, { isLoading }] = useBuyProductMutation();

  if (isLoading) {
    <Loader />;
  }

  // payment gateway set-up
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Ensure checkOutItems is an array
  const items = Array.isArray(checkOutItems) ? checkOutItems : [checkOutItems];

  // for address handle state
  const [formData, setFormData] = useState({
    addressId: "",
    firstName: "",
    lastName: "",
    address: "",
    addressLine: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    paymentMethod: "",
  });

  useEffect(() => {
    if (location.pathname === "/checkout") {
      if (data?.data?.length !== 0) {
        setShowButton(true);
        dispatch(setIsOpen(false));
        dispatch(clearAddress());
      } else {
        dispatch(setIsOpen(true));
        setShowButton(false);
        setFormData({
          addressId: "",
          firstName: "",
          lastName: "",
          address: "",
          addressLine: "",
          city: "",
          state: "",
          pinCode: "",
          phone: "",
          paymentMethod: "",
        });
      }
    }
  }, [location.pathname, data]);

  // state for address form open
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleClick = () => {
    setIsModelOpen(!isModelOpen);
  };

  useEffect(() => {
    if (isSuccess && data?.data?.length > 0) {
      setFormData({
        addressId: addressData?._id || "",
        firstName: addressData?.firstName || "",
        lastName: addressData?.lastName || "",
        address: addressData?.address || "",
        addressLine: addressData?.addressLine || "",
        city: addressData?.city || "",
        state: addressData?.state || "",
        pinCode: addressData?.pinCode || "",
        phone: addressData?.phone || "",
        paymentMethod: "",
      });
    }
  }, [data, isSuccess, addressData]);

  // Conditionally render buttons or form based on address data
  const noAddressData = !addressData || data?.data?.length === 0;

  // form validation....
  const validateFormData = () => {
    const errors: Record<string, string> = {};
    // Required fields
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.pinCode.trim()) errors.pinCode = "Pin code is required";
    if (!formData.paymentMethod)
      errors.paymentMethod = "Please select a payment method";

    // Additional validation: Phone number format and pin code length
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (formData.pinCode && formData.pinCode.length !== 6) {
      errors.pinCode = "Pin code must be 6 digits";
    }
    return errors;
  };

  const advancePercentage = 0.1;
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    setTotalAmount(
      items.reduce((total, item) => {
        const mrp =
          Array.isArray(item.productVariants) && item.productVariants.length > 0
            ? parseFloat(item.productVariants[0]?.mrp)
            : parseFloat(item.productVariants?.mrp);
        return total + mrp * item.quantity;
      }, 0)
    );

    if (formData?.paymentMethod === "cod") {
      const advance = totalAmount * advancePercentage;
      setAdvanceAmount(advance);
    } else {
      setAdvanceAmount(totalAmount);
    }
  }, [items, formData, items]);

  // handle form  for buy product
  const handleSubmit = async () => {
    // validate the form data
    const errors = validateFormData();

    /// if there are validation errors, show them and prevent form submission
    if (Object.keys(errors).length > 0) {
      toast.error(
        errors.firstName ||
          errors.lastName ||
          errors.phone ||
          errors.address ||
          errors.city ||
          errors.state ||
          errors.pinCode ||
          errors.paymentMethod
      );
      return;
    }

    // Prepare the data to send to the buyProduct API
    const productsToSend = items.map((checkOutItem) => {
      const { product, productVariants, quantity } = checkOutItem;

      const variantsArray = Array.isArray(productVariants)
        ? productVariants
        : [productVariants];
      const variant = variantsArray[0];

      return {
        productId: product?._id,
        productVariantId: variant?._id,
        quantity,
      };
    });

    const payload = {
      products: productsToSend,
      totalPrice: totalAmount,
      shippingCharge: 0,
      paymentMode: formData.paymentMethod,
      fullPayment: formData.paymentMethod === "online",
      amountPaid:
        formData.paymentMethod === "online" ? totalAmount : advanceAmount,
      gstAmount: 0,
      advanceAmount:
        formData.paymentMethod === "online" ? totalAmount : advanceAmount,
      amountRemaining:
        formData.paymentMethod === "online" ? 0 : totalAmount - advanceAmount,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString(),
      address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        country: "India",
      },
    };
    try {
      const data = await buyProduct(payload);
      const options = {
        key: import.meta.env.VITE_PAYMENT_ID,
        amount: data?.data?.amount,
        currency: "INR",
        order_id: data?.data?.orderId,
        name: "CraftCity",
        description: "Buy Now Transaction",
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          contact: formData?.phone,
        },
        handler: async (response: any) => {
          try {
            const verifyResponse = await axios.post(
              `${pkg.baseUrl}/user/verify-order`,
              {
                ...response,
                transactionId: data?.data?.transactionId,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (verifyResponse?.data?.success) {
              toast.success("Order placed successfully!");
              navigate("/successfully");
            } else {
              toast.error("Failed to place order");
            }
          } catch (error) {
            console.error("Order placement error:", error);
            toast.error("An error occurred while placing the order");
          }
        },
        modal: {
          onDismiss: () => {
            toast.error("Payment cancelled");
          },
        },
      };

      // Open Razorpay payment gateway for both payment methods
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log("Error while placing order:", error);
      toast.error("Failed to place order!, Please try again");
    }
  };

  return (
    <>
      {isModelOpen && <AddressOfUser onClose={handleClick} />}
      <div className={style.CheckOutForm_container}>
        {/* Checkout form */}
        <div className={style.CheckOutForm_heading}>
          <h3
            onClick={() => {
              dispatch(clearAddress());
              dispatch(setIsOpen(false));
              setShowButton(true);
            }}
          >
            <Bounce>CraftCity</Bounce>
          </h3>
        </div>

        <div className={style.CheckOutForm_details}>
          {noAddressData && showButton && (
            <div className={style.CheckOutForm_selectAddress_btn}>
              <button onClick={handleClick}>Select Address</button>
              <button
                onClick={() => {
                  dispatch(setIsOpen(true));
                  setShowButton(false);
                }}
              >
                Fill address manually
              </button>
            </div>
          )}

          {option && (
            <div className={style.CheckOutForm_formdetails}>
              <form>
                <div className={style.CheckOutForm_formdetails_flexBox}>
                  <h2>
                    <Bounce>Contact</Bounce>
                  </h2>
                </div>

                <div className={style.CheckOutForm_formdetails_singleInput}>
                  <input
                    type="text"
                    placeholder="India"
                    disabled
                    value="India"
                  />
                </div>

                <div className={style.CheckOutForm_formdetails_flexBox}>
                  {/* {validationErrors.firstName && (
                    <p className="error">{validationErrors.firstName}</p>
                  )} */}
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    disabled={!!addressData} // Convert address to boolean
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    disabled={!!addressData} // Convert address to boolean
                  />
                </div>

                <div className={style.CheckOutForm_formdetails_singleInput}>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!!addressData} // Convert address to boolean
                  />
                </div>
                <div className={style.CheckOutForm_formdetails_singleInput}>
                  <input
                    type="text"
                    placeholder="Apartment, land mark"
                    onChange={handleChange}
                    name="addressLine"
                    value={formData.addressLine}
                    disabled={!!addressData} // Convert address to boolean
                  />
                </div>

                <div className={style.CheckOutForm_formdetails_tripleInput}>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={handleChange}
                    value={formData.city}
                    disabled={!!addressData} // Convert address to boolean
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={handleChange}
                    value={formData.state}
                    disabled={!!addressData} // Convert address to boolean
                  />
                  <input
                    type="text"
                    placeholder="Pin Code"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    disabled={!!addressData} // Convert address to boolean
                  />
                </div>

                <div className={style.CheckOutForm_formdetails_singleInput}>
                  <input
                    type="number"
                    placeholder="Phone number"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    disabled={!!addressData} // Convert address to boolean
                  />
                </div>

                <div className={style.checkOut_inputRadioBtn}>
                  <div
                    className={style.checkout_check_inputCheckBox}
                    style={{
                      border:
                        formData.paymentMethod === "cod"
                          ? "2px solid blue"
                          : "1px solid transparent",
                    }}
                  >
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      onChange={handleChange}
                      checked={formData.paymentMethod === "cod"}
                    />
                    Cash on Delivery &#40; COD &#41;
                  </div>
                  <div
                    className={style.checkout_check_inputCheckBox}
                    style={{
                      border:
                        formData.paymentMethod === "online"
                          ? "2px solid blue"
                          : "1px solid transparent",
                    }}
                  >
                    <input
                      type="radio"
                      id="online"
                      name="paymentMethod"
                      value="online"
                      onChange={handleChange}
                      checked={formData.paymentMethod === "online"}
                    />
                    Online Payment
                  </div>
                </div>
              </form>

              {showButton && (
                <button
                  onClick={() => {
                    dispatch(clearAddress());
                    setShowButton(false);
                  }}
                  className={style.checkout_btn}
                >
                  Fill address
                </button>
              )}
            </div>
          )}

          {/* Product Details */}
          <div className={style.CheckOutForm_PROductDetails}>
            {items?.map((checkOutItem) => {
              const { product, productVariants, quantity } = checkOutItem;
              const variantsArray = Array.isArray(productVariants)
                ? productVariants
                : [productVariants];
              const variant = variantsArray[0]; // assuming one variant to display

              return (
                <div className={style.CheckOutForm_PROduct} key={product?._id}>
                  {/* Product Image */}
                  <div className={style.CheckOutForm_PROduct_img}>
                    <img
                      src={
                        variant?.imgObject[0]?.url || "placeholder-image-url"
                      }
                      alt={product?.name}
                    />
                  </div>

                  {/* Product Title */}
                  <div className={style.CheckOutForm_PROduct_Title}>
                    <p>{product?.name}</p>
                    <small>Quantity: {quantity}</small>
                  </div>

                  {/* Product Price */}
                  <div className={style.CheckOutForm_PROduct_price}>
                    <p>Price</p>
                    <p>
                      <u>{variant?.mrp}</u>
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Subtotal Calculation */}
            <div className={style.CheckOutForm_formdetails_flexBox3}>
              <p>Subtotal</p>
              <p>
                {items.reduce((total, item) => {
                  const mrp =
                    Array.isArray(item.productVariants) &&
                    item.productVariants.length > 0
                      ? parseFloat(item.productVariants[0]?.mrp)
                      : parseFloat(item.productVariants?.mrp);
                  return total + mrp * item.quantity;
                }, 0)}
              </p>
            </div>

            {/* Total Calculation */}
            <div className={style.CheckOutForm_formdetails_flexBox3}>
              <p>Total</p>
              <p>
                <span>
                  <u>
                    {items.reduce((total, item) => {
                      const mrp =
                        Array.isArray(item.productVariants) &&
                        item.productVariants.length > 0
                          ? parseFloat(item.productVariants[0]?.mrp)
                          : parseFloat(item.productVariants?.mrp);
                      return total + mrp * item.quantity;
                    }, 0)}
                  </u>
                </span>
              </p>
            </div>

            {/* Pay Now Button */}
            <div className={style.CheckOutForm_formdetails_flexBox3}>
              <button onClick={() => handleSubmit()}>
                <JackInTheBox>Pay Now</JackInTheBox>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutForm;
