import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import styles from "../../Style/SingleProduct/ReviewPopUpForm.module.css";
import { useAddReviewMutation } from "../../store/Features/ProfileOrderHistory/OrderHistory";
import { toast } from "react-toastify";

interface AddReviewPopUpProps {
  productId: string | null;

  closepopup: () => void;
}

const AddReviewPopUp: React.FC<AddReviewPopUpProps> = ({
  productId,
  closepopup,
}) => {
  const [addData, { isSuccess, isLoading, isError }] = useAddReviewMutation();
  const [formData, setFormData] = useState({
    star: "0",
    comment: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, star: event.target.value });
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, comment: event.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) {
      console.error("Product ID is null, cannot submit review.");
      return;
    }
    const reviewData = {
      star: formData.star,
      comment: formData.comment,
    };
    try {
      await addData({ id: productId, review: reviewData }).unwrap();
      toast.success("review added");
      closepopup();
    } catch (err) {
      toast.error("failed to add review");
      console.error("Error adding review:", err);
    }
  };

  return (
    <div className={styles.customerReview_main_container}>
      <div className={styles.customerReview_container}>
        <RxCross2
          onClick={closepopup}
          className={styles.customerReview_close}
          size={24}
        />
        <form onSubmit={handleSubmit}>
          <div>
            <fieldset className={styles.starability_slot}>
              <input
                type="radio"
                id="no-rate"
                className={styles.input_no_rate}
                name="rating"
                value="0"
                checked={formData.star === "0"}
                onChange={handleChange}
              />
              <input
                type="radio"
                id="first-rate1"
                name="rating"
                value="1"
                checked={formData.star === "1"}
                onChange={handleChange}
              />
              <label htmlFor="first-rate1" title="Terrible">
                1 star
              </label>
              <input
                type="radio"
                id="first-rate2"
                name="rating"
                value="2"
                checked={formData.star === "2"}
                onChange={handleChange}
              />
              <label htmlFor="first-rate2" title="Not good">
                2 stars
              </label>
              <input
                type="radio"
                id="first-rate3"
                name="rating"
                value="3"
                checked={formData.star === "3"}
                onChange={handleChange}
              />
              <label htmlFor="first-rate3" title="Average">
                3 stars
              </label>
              <input
                type="radio"
                id="first-rate4"
                name="rating"
                value="4"
                checked={formData.star === "4"}
                onChange={handleChange}
              />
              <label htmlFor="first-rate4" title="Very good">
                4 stars
              </label>
              <input
                type="radio"
                id="first-rate5"
                name="rating"
                value="5"
                checked={formData.star === "5"}
                onChange={handleChange}
              />
              <label htmlFor="first-rate5" title="Amazing">
                5 stars
              </label>
            </fieldset>
            <p>Your rating: {formData.star} star(s)</p>
          </div>
          <div className={styles.customerReview_textarea}>
            <label>
              Comment:
              <textarea
                value={formData.comment}
                onChange={handleCommentChange}
              />
            </label>
          </div>
          <div className={styles.ButtonBox}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Review"}
            </button>
            {isSuccess && <p>Review added successfully!</p>}
            {isError && <p>Failed to add review.</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewPopUp;
