import style from "../../Style/Product/SelectedSubCategory.module.css";
import { Bounce } from "react-awesome-reveal";
import { LuIndianRupee } from "react-icons/lu";
import img from "../../assets/Product/chair6.webp";
import { useGetFilterSubCategoryQuery } from "../../store/Features/ProductReducer/ProductReducer";
import Loader from "../../utils/Loader";
import { useLocation, useNavigate } from "react-router-dom";

const SelectedSubCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const sub = queryParams.get("subCat") || "";

  const { data, isLoading } = useGetFilterSubCategoryQuery({ sub });

  if (isLoading) {
    return <Loader />;
  }

  const handleSingleProduct = (id: string, variantId: string) => {
    navigate(`/singleproduct/${id}?variantId=${variantId}`);
  };

  return (
    <>
      <div className={style.selected_sub_category_allCart}>
        {data?.allProduct.length > 0 ? (
          data?.allProduct?.map((item: any, i: number) => (
            <div className={style.selected_sub_category} key={i}>
              <div className={style.productWhislistAdd}></div>
              <div>
                <img
                  src={item?.variants[0]?.imgObject[0]?.url || img}
                  alt="hello"
                  onClick={() => handleSingleProduct(item?._id, item?.variants[0]?._id)}
                />
                <p>
                  <Bounce>{item?.name}</Bounce>
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2>
                    <span>
                      <LuIndianRupee />
                    </span>
                    {item?.mrp}
                  </h2>

                  <h2
                    style={{
                      textDecoration: "line-through",
                      color: "var(--baseBlack",
                    }}
                  >
                    <span>
                      <LuIndianRupee />
                    </span>
                    {item?.variants[0]?.maxPrice}
                  </h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Products Available</p>
        )}
      </div>
    </>
  );
};

export default SelectedSubCategory;
