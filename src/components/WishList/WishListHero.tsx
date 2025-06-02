import React, { useEffect } from "react";
import style from "../../Style/WishList/WishListHero.module.css";
import { LuIndianRupee } from "react-icons/lu";
import { Bounce } from "react-awesome-reveal";
import {
  useAddWishListMutation,
  useGetWishlistQuery,
  useRemoveWishListMutation,
} from "../../store/Features/WishlistReducer/WishlistReducer";
import { toast } from "react-toastify";
import { CiCircleRemove } from "react-icons/ci";
import Cookies from "js-cookie";
import WishListShimmer from "../../utils/Shimmer/WishListShimmer";
import { useNavigate } from "react-router-dom";
import wishlistEmpty from "../../assets/WishList/empty_Wishlist.png"
interface LocalStoreData {
  _id: string;
  name: string;
  variants: {
    imgObject: {
      url: string;
    };
    mrp: number;
    _id: string;
  }[];
}

interface Product {
  name: string;
}

interface ProductVariant {
  imgObject: {
    url: string;
  }[];
  mrp: number;
  maxPrice: number;
}

interface WishlistItem {
  _id: string;
  data: number;
  productVariants: ProductVariant;
  product: Product;
  isLoading: boolean;
}

type WishlistResponse = {
  items: Array<{
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  }>;

  data: any;
  isLoading: boolean;
};

const WishListHero: React.FC = () => {
  const navigate = useNavigate();
  const { data: wishlistData, isLoading } =
    useGetWishlistQuery<WishlistResponse>();
  const [removeWishList] = useRemoveWishListMutation();
  const [addWishList] = useAddWishListMutation();
  const token = Cookies.get("token");

  const localStoreData: { items: LocalStoreData[] } = JSON.parse(
    localStorage.getItem("wishlist") || '{"items": []}'
  );

  useEffect(() => {
    if (token && localStoreData.items.length > 0) {
      const productData = localStoreData.items.map((item) => ({
        productId: item._id,
        variantId: item?.variants?.[0]?._id,
      }));

      productData.forEach(async ({ productId, variantId }) => {
        if (productId && variantId) {
          try {
            await addWishList({ productId, variantId });
          } catch (error) {
            console.error("Error adding item to wishlist:", error);
          }
        }
      });

      localStorage.removeItem("wishlist");
    }
  }, [token, localStoreData.items, addWishList]);

  if (isLoading) {
    return <WishListShimmer />;
  }

  const handleClick = async (id: string) => {
    if (token) {
      try {
        await removeWishList(id).unwrap();
        toast.success("Removed from wishlist");
      } catch (error) {
        console.error("Error removing item:", error);
        toast.error("Error removing item");
      }
    } else {
      console.log("User not authenticated");
    }
  };

  return (
    <>
      <h2 className={style.WishListHero_heading}>
        <Bounce>Wishlist</Bounce>
      </h2>
      <div className={style.WishListHero_containers}>
        <div className={style.WishListHero_AllCards}>
          {!token ? (
            <>
              {localStoreData?.items.length === 0 ? (
                <>
                  <div className={style.WishListHero_card_empty_box}>
                    <h2>No items in wishlist</h2>
                    <img src={wishlistEmpty} alt="" />
                    <button onClick={() => navigate("/")}>Continue Shopping </button>
                  </div>
                </>
              ) : (
                localStoreData.items.map((res:any) => (
                  <div key={res._id} className={style.WishListHero_card}>
                    <div className={style.WishListHero_card_Delete}>
                      <span onClick={() => handleClick(res._id)}>
                        <CiCircleRemove />
                      </span>
                    </div>
                    <img
                      src={res?.variants[0]?.imgObject.url || ""}
                      alt={res?.name}
                    />
                    <p>
                      <Bounce>{res?.name}</Bounce>
                    </p>
                    <div style={{display:"flex",justifyContent:"space-between"}}>

                    <h3>
                      <span>
                        <LuIndianRupee />
                      </span>{" "}
                      {res?.variants?.[0]?.mrp || "N/A"}
                    </h3>

                    <h3 style={{textDecoration:"line-through", color:"var(--baseBlack"}}>
                      <span>
                        <LuIndianRupee />
                      </span>{" "}
                      {res?.variants?.[0]?.maxPrice || "N/A"}
                    </h3>
                    </div>

                  </div>
                ))
              )}
            </>
          ) : (

            wishlistData?.data?.length > 0 ? (
              wishlistData?.data?.map((item: WishlistItem) => (
                <div key={item?._id} className={style.WishListHero_card}>
                  <div className={style.WishListHero_card_Delete}>
                    <span onClick={() => handleClick(item?._id)}>
                      <CiCircleRemove />
                    </span>
                  </div>
                  <img
                    src={item?.productVariants?.imgObject[0]?.url}
                    alt={item?.product?.name || "Unknown"}
                  />
                  <p>
                    <Bounce>{item?.product?.name}</Bounce>
                  </p>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                  <h3>
                    <span>
                      <LuIndianRupee />
                    </span>{" "}
                    {item?.productVariants?.mrp || "N/A"}
                  </h3>

                  <h3 style={{textDecoration:"line-through", color:"var(--baseBlack"}}>

                    <span>
                      <LuIndianRupee />
                    </span>{" "}
                    {item?.productVariants?.maxPrice || "N/A"}
                  </h3>
                  </div>
                  
                </div>
              ))
            ) : (
              <>
                <div className={style.WishListHero_card_empty_box}>
                  <h2>No items in wishlist</h2>

                  <img src={wishlistEmpty} alt="" />

                  <button onClick={() => navigate("/")}>Continue Shopping </button>
                </div>
              </>
            )

          )}
        </div>
      </div>
    </>
  );
};

export default WishListHero;
