import React, { useEffect, useState } from "react";
import style from "../../Style/SingleProduct/SingleProductHero.module.css";
import { LuIndianRupee } from "react-icons/lu";
import AddCardPopUp from "./AddCardPopUp";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, Fade, JackInTheBox } from "react-awesome-reveal";
import {
  useGetCategoryQuery,
  useGetSingleProductQuery,
} from "../../store/Features/ProductReducer/ProductReducer";
import { addToCart } from "../../store/Features/Cart/CartSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { RootState, useAppDispatch } from "../../store/Store";
import { setCheckoutItem, setIsLogin } from "../../store/Features/Shared/Utils";
import Loader from "../../utils/Loader";
import img from "../../assets/Home/fullDetailsImage.webp";
import CustomerReviews from "../Home/CustomerReviews";
import { useGetReviewQuery } from "../../store/Features/ReviewReducer/ReviewReducer";
import banner from "../../assets/SingleProduct/banner.webp";
import banner1 from "../../assets/SingleProduct/banner1.gif";
import Card from "./Card";
import { VscStarFull } from "react-icons/vsc";
import ProductImage from "./ProductImage";
import { useSelector } from "react-redux";

interface ProductVariants {
  imgObject: { url: string }[];
  mrp: number;
  quantity: number;
  _id: string;
}

interface Product {
  name: string;
  description: string;
  _id: string;
}

interface Data {
  product: Product;
  productVariants: ProductVariants[];
  AboutThisItem: string;
}
interface AboutThisItem {
  aboutThisItem: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  aboutThisItem: AboutThisItem[];
}

interface AddToCartItem {
  productId: string;
  productVariantId: string;
  quantity: number;
  image: string;
  price: number;
  name: string;
}
const SingleProductHero: React.FC = () => {
  const getToken = Cookies.get("token");

  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { id } = useParams<{ id: any }>();
  const params = new URLSearchParams(window.location.search);
  const variantId = params.get("variantId");
  const [subTotal, setSubTotal] = useState(1);
  const [showImage, setShowImage] = useState(0);
  const [leftImageShow, setLeftImageShow] = useState("");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectType, setSelectType] = useState<string>("");
  const [open, setIsOpen] = useState(false);

  const isLogin = useSelector((state: RootState) => state?.util?.login);

  const whatsAppLink = `https://wa.me/${+918881444848}`;
  const redirectToChat = () => window.open(whatsAppLink, "_blank");

  const { data, isLoading } = useGetSingleProductQuery(id) as {
    data: any;
    isLoading: boolean;
  };

  useEffect(() => {
    
    if(getToken){
      setToken(getToken)
    }
  
},[getToken])

  useEffect(() => {
    setSelectType(data?.product?.categoryId?.mainCategory);
  }, [data]);

  const { data: categorydata, isLoading: categoryLoading } =
    useGetCategoryQuery({ type: selectType, page: 1 });

  useEffect(() => {
    if (showPopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopUp]);

  const productId = data?.productVariants[0]._id;

  const {
    data: reviewData,
    isLoading: reviewDataLoading,
    error: reviewError,
  } = useGetReviewQuery({
    id: productId,
  });

  const CustomerReviewData = [
    {
      img: img,
      description: "Great quality and well-made. Its exactly what I needed!",
    },
    {
      img: img,
      description:
        "Beautiful design and very durable. Highly satisfied with my purchase.",
    },
    {
      img: img,
      description:
        "Simple yet elegant. It works perfectly and exceeded my expectations!",
    },
    {
      img: img,
      description:
        "Excellent craftsmanship and attention to detail. Definitely recommend it!",
    },
  ];

  const onClose = () => {
    setShowPopUp(false);
  };

  if (!id) {
    return null;
  }

  const handleVariantSelect = (index: number) => {
    setSelectedVariantIndex(index);
    setSubTotal(1);
  };

  const handleAddCart = (data: Data | any) => {
    if (!token) {
      const selectedVariant = data.productVariants[selectedVariantIndex];
      const item: AddToCartItem = {
        productId: data?.product?._id,
        productVariantId: selectedVariant?._id,
        quantity: subTotal,
        image: selectedVariant.imgObject[0].url,
        price: data?.productVariants[0]?.mrp,
        name: data?.product?.name,
      };
      setShowPopUp(true);
      dispatch(addToCart(item));
      toast.success("Item added to cart");
    } else {
      const selectedVariant = data.productVariants[selectedVariantIndex];

      const item: AddToCartItem = {
        productId: data?.product?._id,
        productVariantId: selectedVariant?._id,
        quantity: subTotal,
        image: selectedVariant.imgObject[0].url,
        price: data?.product?.price,
        name: data?.product?.name,
      };
      setShowPopUp(true);
      dispatch(addToCart(item));
      toast.success("Item added to cart");
    }
  };

  const handleCheckout = (data: Data | undefined) => {
    const selectedVariant = data?.productVariants[selectedVariantIndex];

    const payload = {
      product: data?.product,
      productVariants: [selectedVariant],
      quantity: subTotal,
    };

    dispatch(setCheckoutItem(payload as any));
    if (!token && !isLogin) {
      dispatch(setIsLogin(true));
    }else{
      dispatch(setIsLogin(false));
      navigate("/checkout");
    }
  };


  const handleIncrease = () => {
    setSubTotal((prev) =>
      prev < data?.productVariants[showImage]?.quantity ? prev + 1 : prev
    );
  };

  const handleDecrease = () => {
    setSubTotal((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const averageRating =
    reviewData?.reviews?.reduce(
      (sum: number, item: any) => sum + (parseInt(item.star) || 0),
      0
    ) / reviewData?.reviews?.length;

  // find the variant and select the variant
  useEffect(() => {
    if (data?.productVariants) {
      const index = data?.productVariants?.findIndex(
        (item: any) => item?._id === variantId
      );
      if (index !== -1) {
        setSelectedVariantIndex(index);
        setShowImage(index);
      }
    }
  }, [variantId, data]);

  if (isLoading || reviewDataLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={style.SingleProductHero_conatiner}>
        {/* Left side box */}
        <div className={style.SingleProductHero_left}>
          {leftImageShow ? (
            <img
              src={leftImageShow}
              alt="product image"
              onClick={() => setIsOpen(true)}
            />
          ) : (
            <img
              src={data?.productVariants[showImage]?.imgObject[0]?.url}
              alt="here is image"
              onClick={() => setIsOpen(true)}
            />
          )}

          <div className={style.SingleProductHero_leftImage}>
            <ProductImage
              images={data?.productVariants[showImage]?.imgObject}
              open={open}
              close={() => setIsOpen(false)}
            />
          </div>

          <div className={style.product_highlights}>
            <h1>Product Highlights</h1>
            <p>
              <span>Brand : </span> CRAFTCITY
            </p>
            <p>
              <span>Item Shape</span> : {data?.product?.itemShape}
            </p>
            <p>
              <span>Material</span> : {data?.product?.material}{" "}
            </p>
            <p>
              <span>Item Capacity</span> : {data?.product?.itemCapacity}
            </p>
            <p>
              <span>Assemble Instructions</span> :{" "}
              {data?.product?.assemblyInstruction}
            </p>
            <p>
              <span>Availability :</span>{" "}
              {data?.productVariants[showImage]?.quantity}
            </p>
          </div>
        </div>

        {/* Right side box */}
        <div className={style.SingleProductHero_right}>
          <h2>
            <Bounce>{data?.product?.name}</Bounce>
          </h2>

          {reviewError ? (
            <p className={style.SingleProductHero_right_rating}>
              <span style={{ fontSize: "1rem", fontWeight: "600" }}>
                4.0&nbsp;
              </span>
              <span>
                <VscStarFull
                  className={style.SingleProductHero_right_rating_star}
                />
                <VscStarFull
                  className={style.SingleProductHero_right_rating_star}
                />
                <VscStarFull
                  className={style.SingleProductHero_right_rating_star}
                />
                <VscStarFull
                  className={style.SingleProductHero_right_rating_star}
                />
              </span>
              <span
                style={{
                  color: "#1e5799",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                &nbsp; &nbsp;4 Ratings
              </span>
            </p>
          ) : (
            <p className={style.SingleProductHero_right_rating}>
              <span style={{ fontSize: "1rem" }}>
                {`${Math.round(averageRating)}.0`}
              </span>

              <span className={style.stars}>
                {Array.from({ length: Math.round(averageRating) }).map(
                  (_, starIndex) => (
                    <VscStarFull key={starIndex} />
                  )
                )}
              </span>

              <span
                style={{
                  color: "#1e5799",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                &nbsp; &nbsp;{`${reviewData?.reviews?.length + 4} `} Ratings
              </span>
            </p>
          )}

          <div className={style.SingleProductHero_right_price}>
            <h4 style={{ color: "var(--baseBlack)" }}>
              <span style={{ fontSize: "1.4rem ", color: "var(--baseRed)" }}>
                {Math.round(
                  (data?.productVariants[showImage]?.mrp /
                    data?.productVariants[showImage]?.maxPrice) *
                    100
                ) - 100}
                %&nbsp;
              </span>
              <span>
                <LuIndianRupee />
              </span>
              {data?.productVariants[showImage]?.mrp}/-
            </h4>
            <h4 style={{ color: "gray" }}>
              <span>M.R.P&nbsp;</span>
              <span>
                <LuIndianRupee />
              </span>{" "}
              <span style={{ textDecoration: "line-through" }}>
                {data?.productVariants[showImage]?.maxPrice}/-
              </span>
            </h4>
          </div>

          <p className={style.SingleProductHero_right_tax}>
            Inclusive of all taxes
          </p>
          {data?.productVariants[showImage]?.size && (
            <p>
              <span> Size : </span> {data?.productVariants[showImage]?.size}
            </p>
          )}

          <p>
            <span> Color : </span>
            {data?.productVariants[showImage]?.color?.categoryName}
          </p>

          {/* ////////////////////////   product all variants single Image show ////////////////////// */}

          <div className={style.SingleProductHero_right_allImage}>
            {data?.productVariants?.map((item: any, index: number) => (
              <div
                className={style.SingleProductHero_right_allImage_image}
                key={index}
                style={{
                  border:
                    selectedVariantIndex === index ? "1px solid black" : "none",
                }}
                onClick={() => {
                  handleVariantSelect(index);
                  setShowImage(index);
                  setLeftImageShow("");
                }}
              >
                <img src={item?.imgObject[0]?.url} alt="here is image" />
                <div className={style.image_content}>
                  <p>{item?.color?.categoryName}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ////////////////////////// */}
          <div className={style.ShowCapecity}>
            <p>
              <span>Material : </span> {data?.product?.material}{" "}
            </p>
            <p>
              <span>capacity : </span> {data?.product?.itemCapacity}{" "}
            </p>
            <p>
              <span>Availability :</span>{" "}
              {data?.productVariants[showImage]?.quantity}
            </p>
          </div>
          <h2>
            <Bounce>Quantity</Bounce>
          </h2>

          <div className={style.SingleProductHero_right_quantity}>
            <button
              style={{ borderRight: "2px solid black" }}
              onClick={handleDecrease}
            >
              -
            </button>

            <p>{subTotal}</p>

            <button
              style={{ borderLeft: "2px solid black" }}
              onClick={handleIncrease}
            >
              +
            </button>
          </div>

          <div className={style.SingleProductHero_right_subtotal}>
            <p>Subtotal : </p>
            <h4>
              <span>
                <LuIndianRupee />
              </span>
              {data && data?.productVariants && data?.productVariants[0]
                ? `${(data?.productVariants[showImage]?.mrp * subTotal).toFixed(
                    2
                  )} /-`
                : "N/A"}
            </h4>
          </div>

          <div className={style.SingleProductHero_right_Btn}>
            <button onClick={() => handleAddCart(data)}>
              <JackInTheBox>Add to cart</JackInTheBox>
            </button>
            <button onClick={() => handleCheckout(data)}>
              <JackInTheBox>Buy it now</JackInTheBox>
            </button>
          </div>

          <div className={style.banner}>
            <div className={style.banner_div} onClick={redirectToChat}>
              <img src={banner} alt="" />
            </div>
            <div className={style.banner_div} onClick={redirectToChat}>
              <img src={banner1} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className={style.product_highlights2}>
        <h1>Product Highlights</h1>
        <p>
          <span>Brand : </span> CRAFTCITY
        </p>
        <p>
          <span>Item Shape</span> : {data?.product?.itemShape}
        </p>
        <p>
          <span>Material</span> : {data?.product?.material}{" "}
        </p>
        <p>
          <span>Item Capacity</span> : {data?.product?.itemCapacity}
        </p>
        <p>
          <span>Assemble Instructions</span> :{" "}
          {data?.product?.assemblyInstruction}
        </p>
        <p>
          <span>Availability :</span>{" "}
          {data?.productVariants[showImage]?.quantity}
        </p>
      </div>

      <div className={style.bottomDescription}>
        <h2>Product Description</h2>
        <p style={{ color: "rgba(37, 37, 37, 0.8)" }}>
          <Fade>{data?.product?.description}</Fade>
        </p>
      </div>

      <div className={style.bottomDescription}>
        <h2>Product Details</h2>
        {data?.product?.aboutThisItem?.map((item: any, index: number) =>
          item ? (
            <ol key={index}>
              <li style={{ color: "rgba(37, 37, 37, 0.8)" }}>
                <span>*</span> {item}
              </li>
            </ol>
          ) : null
        )}
      </div>

      {
        <CustomerReviews
          CustomerReview={CustomerReviewData}
          Data={reviewData}
        />
      }

      <div className={style.customArea}>
        <div>
          <h2>You may also like</h2>
        </div>

        {!categoryLoading && (
          <div className={style.customArea_card}>
            {categorydata &&
              categorydata?.allProducts[0] &&
              categorydata?.allProducts[0]?.variants[0] &&
              categorydata?.allProducts[0]?.variants
                ?.slice(0, 8)
                .map((item: any) => (
                  <Card data={item} name={categorydata?.allProducts[0]?.name} />
                ))}
          </div>
        )}
      </div>
      {showPopUp && <AddCardPopUp onClose={onClose} />}
    </>
  );
};

export default SingleProductHero;
