import { useEffect, useState } from "react";
import Modal from "react-modal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import style from "../../Style/SingleProduct/ProductImage.module.css";
import { RxCross2 } from "react-icons/rx";
import { TfiAngleRight, TfiAngleLeft } from "react-icons/tfi";
interface Image {
  url: string;
}

interface ProductImageProps {
  images: Image[];
  open: boolean;
  close: () => void;
}

const ProductImage = ({ images, open ,close}: ProductImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
    }
  },[open]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImageIndex(0);
    close();
  };

  // navigate to image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className={style.container}>
      <div style={{ display: "flex", gap: "10px" }}>
        {images &&
          images?.map((image, index) => (
            <img
              key={index}
              src={image?.url}
              alt={`Thumbnail ${index}`}
              onClick={() => openModal(index)}
              style={{ width: "100px", cursor: "pointer" }}
            />
          ))}
      </div>

      {/* Modal for Image Viewer */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Viewer"
        style={{
          overlay: { zIndex: 1000 },
          content: { inset: "0", padding: 0 },
        }}
        className={style.modal}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Close Button */}
          <button onClick={closeModal} className={style.closeButton}>
            <RxCross2 size={24} />
          </button>

          {/* Previous Button */}
          <button onClick={prevImage} className={style.prevButton}>
            <TfiAngleLeft size={24} />
          </button>

          {/* Zoomable Image */}
          <Zoom>
            <img
              src={images[currentImageIndex]?.url}
              alt={`Image ${currentImageIndex}`}
              className={style.zoomableImage}
            />
          </Zoom>

          {/* Next Button */}
          <button onClick={nextImage} className={style.nextButton}>
            <TfiAngleRight size={24} />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductImage;
