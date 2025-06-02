import React, { useState } from 'react';
import style from "../../Style/SingleProduct/ReviewPopUpForm.module.css";
import { TiDeleteOutline } from 'react-icons/ti';

interface Props {
    onClose: any
}
const ReviewPopUpForm: React.FC<Props> = ({ onClose }) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setSelectedImages(prevImages => [...prevImages, ...files]);
    };

    const handleImageRemove = (index: number) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const [formData, setFormData] = useState({
        rating: "0",
        comment: ""
    });

    const handleChange = (event: any) => {
        setFormData({ ...formData, rating: event.target.value });
    };

    const handleSubmit = () => {
        console.log(formData, selectedImages)
    }
    return (
        <div className={style.customerReview_main_container}>
            <div className={style.customerReview_container}>

                <span className={style.customerReview_close} onClick={() => onClose()}>
                    <TiDeleteOutline />
                </span>
                <div className={style.AddVariant_AllData_image}>
                    <div className={style.AddVariant_AllData_image_selected_img}>
                        {selectedImages.map((image, index) => (
                            <div key={index} className={style.AddVariant_AllData_image_selected_img_imgBox}>
                                <span onClick={() => handleImageRemove(index)}>
                                    <TiDeleteOutline />
                                </span>
                                <img src={URL.createObjectURL(image)} alt={`selected ${index}`} />
                            </div>
                        ))}
                    </div>

                    <div className={style.AddVariant_AllData_image_AddImage_video}>
                        <img src="" alt="" />
                        <p>Add photo</p>
                        <input
                            type="file"
                            accept="image/*, video/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className={style.customerReview_textarea}>
                    <textarea name="" id="" onChange={(e) => setFormData({ ...formData, comment: e.target.value })} value={formData.comment}></textarea>
                </div>
                {/*//////// stars  /////////*/}
                <div>
                    <fieldset className={style.starability_slot}>
                        <input
                            type="radio"
                            id="no-rate"
                            className={style.input_no_rate}
                            name="rating"
                            value="0"
                            checked={formData.rating === "0"}
                            onChange={handleChange}
                        />
                        <input
                            type="radio"
                            id="first-rate1"
                            name="rating"
                            value="1"
                            checked={formData.rating === "1"}
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
                            checked={formData.rating === "2"}
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
                            checked={formData.rating === "3"}
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
                            checked={formData.rating === "4"}
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
                            checked={formData.rating === "5"}
                            onChange={handleChange}
                        />
                        <label htmlFor="first-rate5" title="Amazing">
                            5 stars
                        </label>
                    </fieldset>
                    <p>Your rating: {formData.rating} star(s)</p>
                </div>


                <div className={style.ButtonBox}>
                    <button onClick={handleSubmit}>Save</button>
                </div>

            </div>
        </div>
    );
};

export default ReviewPopUpForm;
