import { useEffect, useState } from "react";
import style from "../../Style/searchData/Search.module.css";
import { useSearchProductQuery } from "../../store/Features/ProductReducer/ProductReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import {
  clearStoreProduct,
  setStoreProduct,
} from "../../store/Features/SerachProductStore/StoreProductSeachData";
import SearchShimmer from "../../utils/Shimmer/SearchShimmer";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearStoreProduct());
  }, []);
  const [page, setPage] = useState(1);

  const status = useSelector(
    (state: RootState) => state.searchProduct.searchProduct
  );

  const { data, isLoading } = useSearchProductQuery({ page: page, status });

  useEffect(() => {
    dispatch(setStoreProduct(data?.allProduct));
  }, [data]);

  const handleClick = () => {
    setPage(page + 1);
  };
  const StoreData = useSelector(
    (state: RootState) => state?.storeProduct?.StoreProductSlice
  );
  if (isLoading) {
    return <SearchShimmer />;
  }

  //////////////////// Single Product Logic //////////////////////
  const handleSingleProduct = (id: string, variantId: string) => {
    navigate(`/singleproduct/${id}?variantId=${variantId}`);
  };

  return (
    <div className={style.search_main_container}>
      <div className={style.search_AllCard}>
        {Array?.isArray(StoreData) && StoreData?.length > 0
          ? StoreData?.map((item: any, i) => (
              <div className={style.search_AllCard} key={i}>
                <div
                  className={style.search_card}
                  onClick={() => handleSingleProduct(item?._id, item?.variants[0]?._id)}
                >
                  <img
                    src={item?.variants[0]?.imgObject?.url}
                    alt={item?.name}
                  />
                  <h2>{item?.name}</h2>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span style={{
                      display: "flex",
                      alignItems: "center",
                    }}>
                      <FaRupeeSign />
                      {item?.variants[0]?.price}/-
                    </span>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "var(--baseBlack)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaRupeeSign />
                      {item?.variants[0]?.maxPrice}/-
                    </span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      {page >= 2 && <button onClick={handleClick}>View More</button>}
    </div>
  );
};

export default Search;
