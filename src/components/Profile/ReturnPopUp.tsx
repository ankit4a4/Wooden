import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../Style/Profile/ReturnPopUp.module.css";
import { useReturnOrderMutation } from "../../store/Features/ProfileOrderHistory/OrderHistory";
import { RxCross2 } from "react-icons/rx";
import { MdAddPhotoAlternate } from "react-icons/md";

interface ReturnPopUpProps {
  orderId: string; 
  close: () => void;
}

const ReturnPopUp: React.FC<ReturnPopUpProps> = ({ orderId, close }) => {
  const [returnMessage, setReturnMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [returnOrder, { isLoading, error }] = useReturnOrderMutation();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages((prevImages) => {
        const newImages = Array.from(files);
        return [...prevImages, ...newImages].slice(0, 5);
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("returnMessage", returnMessage);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await returnOrder({ orderId, formData }).unwrap();
      toast.success("Return Request Submitted");
      close(); 
    } catch (err) {
      console.error("Failed to create return request", err);
      toast.error("Return Request Failed");
    }
  };

  const getErrorMessage = () => {
    if (error) {
      if ("status" in error) {
        return `Error: ${error.status}`;
      } else if ("data" in error) {
        return `Error: ${JSON.stringify(error.data)}`;
      }
    }
    return "An unexpected error occurred.";
  };

  return (
    <>
      <div className={styles.backgroundDiv}>
        <div className={styles.ReturnPopUp_container}>
          <RxCross2 onClick={close} className={styles.crossbtn} size={24} />
          <h2>Return Order</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.ReasonBox}>
              <label htmlFor="returnMessage">Reason :</label>
              <textarea
                id="returnMessage"
                value={returnMessage}
                onChange={(e) => setReturnMessage(e.target.value)}
                required
              />
            </div>
            <div className={styles.ReturnPopUp_image_section}>
              <div className={styles.ReturnPopUp_image_upload}>
                <label htmlFor="images" className={styles.UploadTxt}>
                  <MdAddPhotoAlternate className={styles.imagesIcon} />
                  <span>Upload Images (max 5):</span>
                </label>
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {images.length > 0 && (
                <div className={styles.ReturnPopUp_image_display}>
                  {images?.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded Image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Return Request"}
            </button>
          </form>
          {error && <p>{getErrorMessage()}</p>}
          <button onClick={close} className={styles.CancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ReturnPopUp;
