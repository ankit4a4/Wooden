import React, { useEffect, useRef, useState } from "react";
import style from "../../Style/Layout/Header.module.css";
import logo from "../../image/Home/logo1.svg";
import { IoSearch } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { IoIosContact } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import Login from "../Login/Login";
import AddCardPopUp from "../SingleProduct/AddCardPopUp";
import ReviewHero from "../Review/ReviewHero";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "../../store/Store";
import { setIsLogin, setIsCart } from "../../store/Features/Shared/Utils";
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import {
  clearSearchProduct,
  setSearchProduct,
} from "../../store/Features/SerachProductStore/SearchProductStore";
import subCatData from "../searchData/SubCat.json";
import { clearFilterData } from "../../store/Features/ProductReducer/Filter";

// Define types for the item and data mapping
interface DataItem {
  title: string;
}

// Define the allowed keys for dataMapping
type DataMappingKeys =
  | "Chair"
  | "Table"
  | "Sofa"
  | "Dining Room"
  | "Bedroom"
  | "Outdoor furniture"
  | "Study and office"
  | "Home decor"
  | "Cabinets";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.util.login);
  const isOpenCart = useAppSelector((state: RootState) => state.util.cart);
  const [isMobile, setIsMobile] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const headerCategory = [
    {
      name: "Chair",
    },
    {
      name: "Table",
    },
    {
      name: "Sofa",
    },
    {
      name: "Dining Room",
    },
    {
      name: "Bedroom",
    },
    {
      name: "Outdoor furniture",
    },
    {
      name: "Study and office",
    },
    {
      name: "Home decor",
    },
    {
      name: "Cabinets",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setShowSideBar(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [showPopUp] = useState<boolean>(false);
  const [reviewPopUp, setReviewPopUp] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredSubCats, setFilteredSubCats] = useState<string[]>([]);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    if (showPopUp || reviewPopUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showPopUp, reviewPopUp]);

  //////////////////// HANDLE CATEGORY /////////////////////////

  const HandleCategory = (item: string) => {
    if (item === "Cabinets") {
      navigate(`/product/?catName=Cabinets`);
      setShowSideBar(false);
      dispatch(clearFilterData());
    } else {
      const name = item.toLocaleLowerCase();

      dispatch(clearFilterData());
      navigate(`/product/?catName=${name}`);
      setShowSideBar(false);
    }
  };

  const handleClickSearch = () => {
    dispatch(clearSearchProduct());
    const text = searchInput.toLowerCase()
    dispatch(setSearchProduct(text));
    if(searchInput){
      navigate("/search");
    }
    setFilteredSubCats([]);
  };

  // filter the sub categories based on user input
  useEffect(() => {
    if (searchInput.length > 0) {
      const filtered = subCatData.subCat.filter((subCat) =>
        subCat.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredSubCats(filtered);
    } else {
      setFilteredSubCats([]);
    }
  }, [searchInput]);

  // Handle click on the dropdown subcategory item
  const handleSubCatClick = (subCat: string) => {
    setShowDropDown(false);
    setFilteredSubCats([]);
    setSearchInput(subCat);
    handleClickSearch();
  };

  // adding functionality of dropdown

  const chairData: DataItem[] = [
    { title: "Arm Chair" },
    { title: "Rocking Chair" },
    { title: "Dining Chair" },
    { title: "Barrel Chair" },
    { title: "Wing Chair" },
    { title: "Wooden Chair" },
    { title: "Rattan Chair" },
  ];

  const tableData: DataItem[] = [
    { title: "Coffee Table" },
    { title: "Nest Of Table" },
    { title: "Console Table" },
    { title: "Laptop Table" },
    { title: "Study Table" },
    { title: "Dressing Table" },
    { title: "Side & End Tables" },
  ];

  const sofaData: DataItem[] = [
    { title: "1 Seater Sofas" },
    { title: "2 Seater Sofas" },
    { title: "3 Seater Sofas" },
    { title: "Sofa Set" },
    { title: "Wooden Sofa" },
    { title: "Wedding Sofa" },
    { title: "Chaise Lounges" },
    { title: "Luxury Sofa Sets" },
  ];

  const diningRoomData: DataItem[] = [
    { title: "Dining Chairs" },
    { title: "Dining Tables Sets" },
    { title: "Dining Tables" },
    { title: "Bar Stools" },
    { title: "Kitchen Trolley Cart" },
    { title: "Luxury Dining Sets" },
    { title: "4 Seater Dining Set" },
    { title: "6 Seater Dining Set" },
    { title: "8 Seater Dining Set" },
    { title: "10 Seater Dining Set" },
  ];

  const bedRoomData: DataItem[] = [
    { title: "BedSide Table" },
    { title: "King Size Beds" },
    { title: "Queen Size Beds" },
    { title: "Upholstered Beds" },
    { title: "Luxury Beds" },
    { title: "Pouffes & Ottomans" },
    { title: "Ottoman Storage" },
    { title: "Mattresses" },
  ];

  const outDoorFurnitureData: DataItem[] = [
    { title: "Swing Chair" },
    { title: "Outdoor Chair" },
    { title: "Outdoor Sofa" },
    { title: "Outdoor Furniture" },
    { title: "Outdoor Table" },
  ];

  const studyAndOfficeData: DataItem[] = [
    { title: "Office Chair" },
    { title: "Office Table" },
    { title: "Gaming Tables" },
    { title: "Ergonomic Chairs" },
    { title: "Office Cabinets" },
    { title: "Office Sofa" },
  ];

  const homeDecorData: DataItem[] = [
    { title: "Wall Art" },
    { title: "Decorative Mirrors" },
    { title: "Vases" },
    { title: "Candles" },
    { title: "Throw Pillows" },
    { title: "Rugs" },
    { title: "Curtains" },
    { title: "Table Lamps" },
  ];

  const cabinetsData: DataItem[] = [
    { title: "Storage Cabinets" },
    { title: "Display Cabinets" },
    { title: "Kitchen Cabinets" },
  ];

  const dataMapping: Record<DataMappingKeys, DataItem[]> = {
    Chair: chairData,
    Table: tableData,
    Sofa: sofaData,
    "Dining Room": diningRoomData,
    Bedroom: bedRoomData,
    "Outdoor furniture": outDoorFurnitureData,
    "Study and office": studyAndOfficeData,
    "Home decor": homeDecorData,
    Cabinets: cabinetsData,
  };

  const handleClickSub = (res: string, event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`/subCategory/?subCat=${res}`);
    setShowSideBar(false);
  };
  // const HandleSinglePageProduct = () => {};
  const [hoveredList, setHoveredList] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false); // Close dropdown
      }
    };

    // Attach the click event listener
    window.addEventListener("click", handleClick);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className={style.Header_container}>
        {!isMobile ? (
          <div className={style.HeaderLogo}>
            <img src={logo} alt="logo" onClick={handleClick} />
          </div>
        ) : (
          <>
            <p className={style.mobile_bar}>
              {showSideBar ? (
                <IoClose onClick={() => setShowSideBar(false)} />
              ) : (
                <HiOutlineBars3 onClick={() => setShowSideBar(true)} />
              )}
            </p>
          </>
        )}
        {!isMobile ? (
          <div className={style.HeaderSearch}>
            <input
              type="text"
              placeholder="Search the store"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClickSearch();
                }
              }}
              onChange={(e) => {
                {
                  setSearchInput(e.target.value);
                  setShowDropDown(true);
                }
              }}
              value={searchInput}
            />
            {/* Dropdown: show only if there are filtered subcategories */}
            {showDropDown === true && (
              <ul className={style.dropdown} ref={dropdownRef}>
                {filteredSubCats?.map((subCat, index) => (
                  <li key={index} onClick={() => handleSubCatClick(subCat)}>
                    {subCat}
                  </li>
                ))}
              </ul>
            )}
            <div
              className={style.HeaderSearch_icon}
              onClick={()=>handleClickSearch()}
            >
              <span>
                <IoSearch />
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className={style.HeaderLogo}>
              <img src={logo} alt="logo" onClick={handleClick} />
            </div>
          </>
        )}

        <div className={style.HeaderRightLogo}>
          <p>
            <FcLike onClick={() => navigate("/wishlist")} />
          </p>
          <p>
            {" "}
            <IoIosContact onClick={() => dispatch(setIsLogin(true))} />
          </p>
          <p>
            <FiShoppingCart onClick={() => dispatch(setIsCart(true))} />
          </p>
        </div>
      </div>
      {!isMobile ? null : (
        <div className={style.HeaderSearch}>
          <input
            type="text"
            placeholder="Search the store"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClickSearch();
              }
            }}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            value={searchInput}
          />
          {/* Dropdown: show only if there are filtered subcategories */}
          {filteredSubCats?.length > 0 && (
            <ul className={style.dropdown}>
              {filteredSubCats?.map((subCat, index) => (
                <li key={index} onClick={() => handleSubCatClick(subCat)}>
                  {subCat}
                </li>
              ))}
            </ul>
          )}
          <div className={style.HeaderSearch_icon} onClick={()=>handleClickSearch()}>
            <span>
              <IoSearch />
            </span>
          </div>
        </div>
      )}

      <div
        className={`${
          !isMobile
            ? style.header_bottom_container
            : style.mobileResponsive_container
        } ${
          showSideBar
            ? style.mobileResponsive_container
            : style.header_bottom_container
        }`}
      >
        <ul>
          {headerCategory?.map((item, i) => (
            <li
              key={i}
              onClick={() => HandleCategory(item?.name)}
              onMouseEnter={() => setHoveredList(item?.name)}
              onMouseLeave={() => setHoveredList(null)}
            >
              {item?.name}
              <div
                className={style.hoveredDivParent}
                style={{ display: !isMobile ? "block" : "none" }}
              >
                {hoveredList === item?.name && (
                  <ul className={style.hoverDiv}>
                    {dataMapping[item.name as DataMappingKeys]?.map(
                      (dataItem, index) => (
                        <li
                          onClick={(e) => handleClickSub(dataItem?.title, e)}
                          key={index}
                        >
                          {dataItem.title}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && <Login onclose={() => dispatch(setIsLogin(false))} />}
      {isOpenCart && (
        <AddCardPopUp onClose={() => dispatch(setIsCart(false))} />
      )}
      {reviewPopUp && <ReviewHero onclose2={() => setReviewPopUp(false)} />}
    </>
  );
};

export default Header;
