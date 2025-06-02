import { LuIndianRupee } from "react-icons/lu";
import style from "../../Style/SingleProduct/card.module.css";
import demo from "../../assets/Gallery/gallery1.png";
// import { useNavigate } from "react-router-dom";

const Card = ({ data, name }: any) => {
    // const navigate = useNavigate();

    const handleNavigateSinglePage = () => {
        // Use replace instead of navigate to replace the current route
        // navigate(`/singleproduct/${data?._id}`, { replace: true });
        window.scrollTo(0, 0);
    };


  return (
    <div className={style.cardBody} onClick={() => handleNavigateSinglePage()} key={name}>
      {/* Product Main Image */}
      <div className={style.cardImage}>
        <img src={data?.imgObject?.url || demo} alt={name || "Product Image"} />
      </div>

      {/* Product Details */}
      <div className={style.cardText}>
        <div className={style.cardTextDetails}>
          <h3>{name}</h3>
        </div>

        {/* Product Variants (Price and Image for each variant) */}
        <div className={style.cardTextPrice}>
          <div className={style.variant}>
            <p>
              <LuIndianRupee />
              {data?.price}
            </p>

            <p style={{textDecoration: "line-through"}}>
              <LuIndianRupee />
              {data?.maxPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
