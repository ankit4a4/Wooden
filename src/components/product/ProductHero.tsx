import React, { useCallback, useEffect, useState } from "react";
import style from "../../Style/Product/ProductHero.module.css";
import { CiFilter } from "react-icons/ci";
import { LuIndianRupee } from "react-icons/lu";
import { Bounce } from "react-awesome-reveal";
import {
  AllProducts,
  useGetAllCategoryQuery,
} from "../../store/Features/ProductReducer/ProductReducer";
import { FaHeart } from "react-icons/fa";
import { useAddWishListMutation } from "../../store/Features/WishlistReducer/WishlistReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { addToWishlist } from "../../store/Features/WishlistReducer/WishlistStore";
import { useLocation, useNavigate } from "react-router-dom";

import { useGetCategoryQuery } from "../../store/Features/ProductReducer/ProductReducer";
import CategoryShimmer from "../../utils/Shimmer/CategoryShimmer";
import Loader from "../../utils/Loader";
import { RootState, useAppDispatch, useAppSelector } from "../../store/Store";
import {
  clearFilterData,
  getFilterData,
} from "../../store/Features/ProductReducer/Filter";

interface ImageObject {
  url: string;
}
interface FilterState {
  main: string;
  subCategories: string[];
  colors: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

interface Variant {
  imgObject: ImageObject[];
  mrp: string;
  _id: string;
}

interface Category {
  categoryId: string;
  id: string;
  mainCategory: string;
  categoryName: string;
  variants: Variant[];
}

interface Category {
  selectedCategory: string;
}

// sub component
const FilterSideBar: React.FC<{
  filters: FilterState;
  categories: Category[];
  colors: Category[];
  onFilterChange: (type: string, value: any) => void;
  onClear: () => void;
  onApply: () => void;
  isFilterApplied: boolean;
}> = ({
  filters,
  categories,
  colors,
  onFilterChange,
  onClear,
  onApply,
  isFilterApplied,
}) => (
  <div className={style.ProductHero_details_left}>
    <div className={style.ProductHero_flexBox}>
      <h2>Filters</h2>
      <span>
        <CiFilter />
      </span>
    </div>

    {/* Sub Category Section */}
    <h1 className={style.filterHeading}>
      <Bounce>Sub Category</Bounce>
    </h1>

    <div className={style.categoryData}>
      {categories?.map((category) => (
        <div className={style.ProductHero_flexBox} key={category?.categoryName}>
          <p>{category.categoryName}</p>
          <span>
            <input
              type="checkbox"
              checked={filters.subCategories.includes(category?.categoryName)}
              onChange={() =>
                onFilterChange("subCategories", category?.categoryName)
              }
              style={{cursor:"pointer"}}

            />
          </span>
        </div>
      ))}
    </div>

    {/*///////////////////////// Colors Section ////////////////////////////*/}

    <h1 className={style.filterHeading}>
      <Bounce>Colors</Bounce>
    </h1>
    <div className={style.categoryData}>
      {colors?.map((color) => (
        <div className={style.ProductHero_flexBox} key={color.categoryName}>
          <p>{color?.categoryName}</p>
          <div className={style.colorSelector}>
            <input
              type="checkbox"
              checked={filters.colors.includes(color?.categoryName)}
              onChange={() => onFilterChange("colors", color?.categoryName)}
              style={{cursor:"pointer"}}
            />
          </div>
        </div>
      ))}
    </div>

    {/* Price Range Section */}
    <h1 className={style.filterHeading}>
      <Bounce>Price</Bounce>
    </h1>
    <div className={style.ProductHero_line} />
    <div className={style.ProductHero_inputBox}>
      <input
        type="range"
        min="0"
        max="100000"
        value={filters.priceRange.min}
        onChange={(e) => onFilterChange("priceRange", Number(e.target.value))}
      />
    </div>
    <div className={style.ProductHero_flexBox}>
      <div className={style.ProductHero_Price_box}>
        <p>
          <span>
            <LuIndianRupee />
          </span>
          {filters.priceRange.min}
        </p>
      </div>
      <div className={style.ProductHero_Price_box}>
        <p>
          <span>
            <LuIndianRupee />
          </span>
          {/* {filters.priceRange.max} */}
          100000
        </p>
      </div>
    </div>

    {/* Filter Actions */}
    <div className={style.productHeroBtn}>
      <button
        onClick={onClear}
        disabled={!isFilterApplied}
        className={style.clearButton}
      >
        <Bounce>Clear</Bounce>
      </button>
      <button
        onClick={onApply}
        disabled={!isFilterApplied}
        className={style.applyButton}
      >
        <Bounce>Apply</Bounce>
      </button>
    </div>
  </div>
);

const ProductHero: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("catName") || "";
  // access the data
  const { data, loading } = useAppSelector((state: RootState) => state.filter);

  const [filters, setFilters] = useState<FilterState>(() => {
    const params = new URLSearchParams(location.search);
    return {
      main: params.get("catName") || "",
      subCategories: params.get("subCat")?.split(",").filter(Boolean) || [],
      colors: params.get("color")?.split(",").filter(Boolean) || [],
      priceRange: {
        min: Number(params.get("lowPrice")),
        max: Number(params.get("highPrice")) || 0,
      },
    };
  });

  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false);

  const [showData, setShowData] = useState(false)


  // URL handling
  const updateURLParams = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();
      if (newFilters.main) params.set("catName", newFilters.main);
      if (newFilters.subCategories.length) {
        params.set("subCat", newFilters.subCategories.join(","));
      }
      if (newFilters.colors.length)
        params.set("color", newFilters.colors.join(","));
      if (newFilters.priceRange.min > 0) {
        params.set("lowPrice", newFilters.priceRange.min.toString());
      }
      navigate({
        pathname: location.pathname,
        search: params.toString(),
      });
    },
    [navigate, location.pathname]
  );

  // Filter handlers
  const handleFilterChange = (type: string, value: any) => {
    setFilters((prev) => {
      let newFilters = { ...prev };
      switch (type) {
        case "subCategories":
          newFilters.subCategories = prev.subCategories.includes(value)
            ? prev.subCategories.filter((cat) => cat !== value)
            : [...prev.subCategories, value];
          break;
        case "colors":
          newFilters.colors = prev.colors.includes(value)
            ? prev.colors.filter((color) => color !== value)
            : [...prev.colors, value];
          break;
        case "priceRange":
          newFilters.priceRange = {
            ...prev.priceRange,
            min: value,
          };
          break;
      }

      return newFilters;
    });
    // setIsFilterApplied(true);
  };

  const handleApplyFilter = async () => {
    if (
      filters.subCategories.length === 0 &&
      filters.colors.length === 0 &&
      filters.priceRange.min === 0 &&
      filters.priceRange.max === 0
    ) {
      return; // Do not dispatch the filter API
    }
    updateURLParams(filters);

    await dispatch(
      getFilterData({
        subParam: filters.subCategories.join(","),
        colorParam: filters.colors.join(","),
        lowPrice: filters.priceRange.min,
        highPrice: filters.priceRange.max,
      })
    );
    setShowData(true)
    setIsFilterApplied(true);
  };

  const handleClearFilter = () => {
    const defaultFilters: FilterState = {
      main: filters.main,
      subCategories: [],
      colors: [],
      priceRange: {
        min: 0,
        max: 0,
      },
    };
    setShowData(false)
    setIsFilterApplied(false);
    dispatch(clearFilterData());
    setFilters(defaultFilters);
    updateURLParams(defaultFilters);
  };

  // Sync URL params with filter state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasFilters = params.toString().length > 0;
    if (hasFilters) {
      setIsFilterApplied(true);
      handleApplyFilter();
    }
  }, [location.search]);

  const [page, setPage] = useState(1);

  const { data: categorys } = useGetAllCategoryQuery({});
  const { data: categorydata, isLoading } = useGetCategoryQuery({ type, page });
  const [addWishList] = useAddWishListMutation();

  // add to wishlist
  const handleClick = (
    productId: string,
    variantId: string,
    item: Category
  ) => {
    const token = Cookies.get("token");
    if (!token) {
      dispatch(addToWishlist(item as never));
      toast.success("Added to Wishlist (stored in Redux).");
    } else {
      addWishList({ productId, variantId })
        .unwrap()
        .then((response) => {
          toast.success(response.message);
        })
        .catch((error) => {
          const errorMessage = error.data?.message;
          toast.error(errorMessage);
        });
    }
  };

  //////////////////// Single Product Logic //////////////////////
  const handleSingleProduct = (id: string, variantId: string) => {
    navigate(`/singleproduct/${id}?variantId=${variantId}`);
  };

  const allCategoryData: Category[] =
    categorys?.allCategory?.filter(
      (item: Category) => item?.mainCategory !== "color"
    ) || [];

  const allColor: Category[] | undefined = categorys?.allCategory?.filter(
    (item: Category) => item?.mainCategory === "color"
  );


  const [prevData, setPrevData] = useState<AllProducts[]>([]);

  const HandleLoadItems = () => {
    const newProducts = categorydata?.allProducts || [];
    setPrevData(newProducts);
    setPage(page + 1);
  };


  // Load More Functionality end

  return (
    <div className={style.ProductHero_container}>
      <h2>
        <Bounce>Sofa sets</Bounce>
      </h2>

      <div className={style.ProductHero_details}>
        {/* Left Side Box */}
        <FilterSideBar
          filters={filters}
          categories={allCategoryData}
          colors={allColor ?? []}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilter}
          onApply={handleApplyFilter}
          isFilterApplied={isFilterApplied}
        />

        {/* Right Side Box */}
        <div className={style.ProductHero_details_right}>
          <div className={style.ProductHero_AllCards}>
            {/* this map for product categoryType  */}

            {showData === true &&
              prevData?.map((item: any) =>
                item?.variants?.map((res: any, index: number) => (
                  <div className={style.ProductHero_card} key={index}>
                    <div className={style.productWhislistAdd}>
                      <div
                        onClick={() => handleClick(item?._id, res?._id, item)}
                      >
                        <p>Add to Wishlist</p>
                        <span>
                          <FaHeart />
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src={res?.imgObject?.url}
                        alt={item?.categoryId?.categoryName}
                        onClick={() => handleSingleProduct(item?._id, res?._id)}
                      />
                      <p>
                        <Bounce>{item?.name}</Bounce>
                      </p>
                      <h2>
                        <span>
                          <LuIndianRupee />
                        </span>
                        {res?.price}
                      </h2>

                      <h2 style={{ textDecoration: "line-through" , color: "var(--baseBlack)"}}>
                        <span>
                          <LuIndianRupee />
                        </span>
                        {res?.maxPrice}
                      </h2>
                    </div>
                  </div>
                ))
              )}

            {showData === true    ? (
              loading ? (
                <Loader />
              ) : (
                data?.allProduct?.map((item: any, i: number) => (
                  <div className={style.ProductHero_card} key={i}>
                    <div className={style.productWhislistAdd}>
                      <div
                        onClick={() =>
                          handleClick(item?._id, item?.variants[0]?._id, item)
                        }
                      >
                        <p>Add to Wishlist</p>
                        <span>
                          <FaHeart />
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src={item?.variants[0]?.imgObject[0]?.url}
                        alt={item?.name}
                        onClick={() => handleSingleProduct(item?._id, item?.variants[0]?._id)}
                      />
                      <p>
                        <Bounce>{item?.name}</Bounce>
                      </p>
                      <div style={{display: "flex", justifyContent: "space-between"}}>

                      <h2>
                        <span>
                          <LuIndianRupee />
                        </span>
                        {item?.mrp}
                      </h2>

                      <h2 style={{ textDecoration: "line-through" , color: "var(--baseBlack)"}}>
                        <span>
                          <LuIndianRupee />
                        </span>
                        {item?.variants[0]?.maxPrice}
                        
                      </h2>
                      </div>

                    </div>
                  </div>
                ))
              )
            ) : isLoading ? (
              <CategoryShimmer />
            ) : (
              categorydata?.allProducts?.map((item: any) =>
                item.variants?.map((res: any, index: number) => (
                  <div className={style.ProductHero_card} key={index}>
                    <div className={style.productWhislistAdd}>
                      <div
                        onClick={() => handleClick(item?._id, res?._id, item)}
                      >
                        <p>Add to Wishlist</p>
                        <span>
                          <FaHeart />
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src={res?.imgObject?.url}
                        alt={item?.categoryId?.categoryName}
                        onClick={() => handleSingleProduct(item?._id, res?._id)}
                      />
                      <p>
                        <Bounce>{item?.name}</Bounce>
                      </p>
                      <div style={{display: "flex", justifyContent: "space-between"}}>

                      <h2>
                        <span>
                          <LuIndianRupee />
                        </span>
                        {res?.price}
                      </h2>

                      <h2 style={{ textDecoration: "line-through" , color: "var(--baseBlack)"}}>
                        <span>
                          <LuIndianRupee />
                        </span>
                        {res?.maxPrice}
                      </h2>
                      </div>

                    </div>
                  </div>
                ))
              )
            )}

            {/* this map for filter product get from filter api  */}
            {/* {loading ? (
              <Loader />
            ) : ( isFilterApplied &&
              data?.allProduct?.map((item: any, i: number) => (
                <div className={style.ProductHero_card} key={i}>
                  <div className={style.productWhislistAdd}>
                    <div
                      onClick={() =>
                        handleClick(item?._id, item?.variants[0]?._id, item)
                      }
                    >
                      <p>Add to Wishlist</p>
                      <span>
                        <FaHeart />
                      </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={item?.variants[0]?.imgObject[0]?.url}
                      alt="hello"
                      onClick={() => handleSingleProduct(item?._id)}
                    />
                    <p>
                      <Bounce>{item?.name}</Bounce>
                    </p>
                    <h2>
                      <span>
                        <LuIndianRupee />
                      </span>
                      {item?.mrp}
                    </h2>
                  </div>
                </div>
              ))
            )} */}
          </div>

          {/* pagination */}
          <div className={style.btnLoadContainer}>
            {categorydata?.pagination?.totalPages > 1 &&
              categorydata?.pagination?.totalPages !== page && ( // yahan currentPage ko apne state se replace karein
                <button
                  onClick={HandleLoadItems}
                  className={style.loadMoreButton}
                >
                  Load More
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
