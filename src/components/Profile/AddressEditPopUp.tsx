import React, { useState, useEffect } from "react";
import styles from "../../Style/Profile/AddressEditPopUp.module.css";
import { RxCrossCircled } from "react-icons/rx";

interface AddressEditPopUpProps {
  close: () => void;
  handleSave: (data: any) => void;
  address: any;
}

const AddressEditPopUp: React.FC<AddressEditPopUpProps> = ({
  close,
  handleSave,
  address,
}) => {
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    addressLine: "",
    apartment: "",
    city: "",
    address: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  // Populate form fields if address data is provided
  useEffect(() => {
    if (address) {
      setFormData({
        country: address.country || "",
        firstName: address.firstName || "",
        lastName: address.lastName || "",
        addressLine: address.addressLine || "",
        apartment: address.apartment || "",
        address: address.address || "",
        city: address.city || "",
        state: address.state || "",
        pinCode: address.pinCode || "",
        phone: address.phone || "",
      });
    }
  }, [address]);

  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSave(formData);

    close();
  };

  // Handle change for form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.AddressPopUp_container}>
      <RxCrossCircled className={styles.cross_icon} onClick={close} />

      <form className={styles.AddressForm} onSubmit={handleFormSubmit}>
        <div className={styles.country_div}>
          <input
            type="text"
            name="country"
            placeholder="Enter your Country Name"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div className={styles.name_grp_div}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className={styles.Address_div}>
          <input
            type="text"
            name="addressLine"
            placeholder="Address"
            value={formData.addressLine}
            onChange={handleChange}
          />
        </div>
        <div className={styles.Apartment_div}>
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, Land Mark"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.City_grp_div}>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={formData.pinCode}
            onChange={handleChange}
          />
        </div>
        <div className={styles.Phone_div}>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={styles.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default AddressEditPopUp;
