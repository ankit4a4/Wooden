import React, { useEffect, useState } from "react";
import ConfirmContact from "./ConfirmContact";
import style from "../../Style/Home/HomeContactUs.module.css";
import { useSubmitContactMutation } from "../../store/Features/ContactUs/ContactUs";
import HcontactShimmer from "../../utils/Shimmer/HcontactShimmer";

const HomeContactUs: React.FC = () => {
  const [confirm, setConfirm] = useState(false);
  const [submitContact, { isLoading }] = useSubmitContactMutation();
  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate first name
    if (!/^[a-zA-Z]{3,16}$/.test(formFields.firstName)) {
      setError("First name must be 3-16 letters with no spaces or numbers.");
      return;
    }

    // Validate last name
    if (!/^[a-zA-Z]{3,16}$/.test(formFields.lastName)) {
      setError("Last name must be 3-16 letters with no spaces or numbers.");
      return;
    }

    // Validate email (only lowercase letters allowed)
    const emailPattern = /^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(formFields.email)) {
      setError("Email must be a valid Gmail or Yahoo address in lowercase.");
      return;
    }

    // Validate phone number
    if (formFields.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setError(""); // Clear error if all validations pass

    try {
      await submitContact(formFields).unwrap();
      setFormFields({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setConfirm(true);
    } catch (err) {
      console.error("Error occurs", err);
    }
  };

  useEffect(() => {
    if (confirm) {
      const timer = setTimeout(() => {
        setConfirm(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [confirm]);

  const handleChangeInpData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Filter out numbers for first name and last name
    if (name === "firstName" || name === "lastName") {
      const filteredValue = value.replace(/[0-9]/g, ""); // Remove numbers
      setFormFields((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
    } else if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, ""); // Replace all non-digit characters
      setFormFields((prev) => ({
        ...prev,
        [name]: onlyDigits,
      }));

      if (onlyDigits.length > 10) {
        setError("Phone number must be exactly 10 digits.");
      } else {
        setError("");
      }
    } else {
      setFormFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (isLoading) {
    return <HcontactShimmer />;
  }

  return (
    <>
      <div className={style.HomeContactUs_container}>
        {/* Left section */}
        <div className={style.HomeContactUs_details_left}>
          <div className={style.HomeContactUs_cricle}></div>
        </div>
        {/* Right section */}
        <div className={style.HomeContactUs_details_right}>
          <p>Contact us -</p>
          <form onSubmit={handleSubmitContact}>
            <div className={style.NameFieldDiv}>
              <input
                type="text"
                name="firstName"
                value={formFields.firstName}
                required
                onChange={handleChangeInpData}
                placeholder="Enter Your First Name"
                className={style.inpForm}
                title="First name must be 3-16 letters with no spaces or numbers."
              />
              <input
                type="text"
                name="lastName"
                value={formFields.lastName}
                required
                onChange={handleChangeInpData}
                placeholder="Enter Your Last Name"
                className={style.inpForm}
                title="Last name must be 3-16 letters with no spaces or numbers."
              />
            </div>

            <input
              type="email"
              name="email"
              value={formFields.email}
              required
              onChange={handleChangeInpData}
              placeholder="Enter Your Email Id"
              className={style.inpForm}
              title="Email must be a valid Gmail or Yahoo address in lowercase."
            />
            <input
              type="text"
              name="phone"
              value={formFields.phone}
              onChange={handleChangeInpData}
              placeholder="Enter Your Phone Number"
              className={style.inpForm}
              maxLength={10}
              required
              title={error ? error : ""}
            />
            <textarea
              name="message"
              onChange={handleChangeInpData}
              value={formFields.message}
              required
              placeholder="Write Your Message Here"
              className={style.inpFormText}
            ></textarea>
            {error && <p className={style.error}>{error}</p>}
            <button className={style.btn}>Submit</button>
          </form>
        </div>
      </div>
      {confirm && <ConfirmContact />}
    </>
  );
};

export default HomeContactUs;
