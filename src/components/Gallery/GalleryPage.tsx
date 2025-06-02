import React, { useState } from "react";
import style from "../../Style/Gallery/GalleryPage.module.css";
import { useGetGalleryQuery } from "../../store/Features/gallery/GalleryReducer";
import Loader from "../../utils/Loader";

const GalleryPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [prevData, setPrevData] = useState([]);

  const { data, isLoading } = useGetGalleryQuery({ page });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={style.GalleryPage_Main_container}>
        <div className={style.GalleryPage_container}>
          <p>
            <b>Gallery</b>
          </p>
          <div className={style.GalleryPage_Image_Container}>
            <div className={style.rightImage_box}>
              {/* ////////////////////////////  PREV DATA  //////////////////////////// */}

              {prevData?.map((item: any, index: number) => (
                <div key={index} className={style.rightImage_showBox}>
                  <div className={style.showDescription_box}>
                    <p>{item?.description}</p>
                  </div>
                  <img key={index} src={item?.imageObj[0]?.url} alt="image" />
                </div>
              ))}

              {/* ////////////////////////////  API DATA  //////////////////////////// */}

              {data?.galleryDetails?.map((item: any, index: number) => (
                <div key={index} className={style.rightImage_showBox}>
                  <div className={style.showDescription_box}>
                    <p>{item?.description}</p>
                  </div>
                  <img key={index} src={item?.imageObj[0]?.url} alt="image" />
                </div>
              ))}
            </div>
          </div>


          {data?.pagination?.totalPages > 1 &&
            data?.pagination?.totalCount > page && (
              <div className={style.GalleryPage_btn}>
                <button
                  onClick={() => {
                    setPrevData(data?.galleryDetails || []);
                    setPage((prevPage) => prevPage + 1);
                  }}
                >
                  View More
                </button>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
