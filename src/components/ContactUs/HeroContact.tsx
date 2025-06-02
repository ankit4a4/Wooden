import React, { useState } from "react";
import style from "../../Style/ContactUs/HeroContact.module.css";
import { Bounce, Fade, JackInTheBox } from "react-awesome-reveal";
import { toast } from "react-toastify";
import { useAddContactUsMutation } from "../../store/Features/LoginReducer/LoginReducer";

const HeroContact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [addContactUs] = useAddContactUsMutation();

  const handleChangeInpData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Filter out numbers for first name and last name
    if (name === "firstName" || name === "lastName") {
      const filteredValue = value.replace(/[0-9]/g, ""); // Remove numbers
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
    } else if (name === "phone") {
      const onlyDigits = value.replace(/\D/g, ""); // Replace all non-digit characters
      setFormData((prev) => ({
        ...prev,
        [name]: onlyDigits,
      }));

      if (onlyDigits.length > 10) {
        setError("Phone number must be exactly 10 digits.");
      } else {
        setError("");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate first name
    if (!/^[a-zA-Z]{3,16}$/.test(formData.firstName)) {
      setError("First name must be 3-16 letters with no spaces or numbers.");
      return;
    }

    // Validate last name
    if (!/^[a-zA-Z]{3,16}$/.test(formData.lastName)) {
      setError("Last name must be 3-16 letters with no spaces or numbers.");
      return;
    }

    // Validate email (only lowercase letters allowed)
    const emailPattern = /^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(formData.email)) {
      setError("Email must be a valid Gmail or Yahoo address in lowercase.");
      return;
    }

    // Validate phone number
    if (formData.phone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setError(""); // Clear error if all validations pass

    try {
      await addContactUs(formData).unwrap();
      toast.success("Your message has been sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("There was an error sending your message. Please try again.");
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className={style.HeroContact_container}>
      <div className={style.HeroContact_header}></div>
      <h2>
        <Bounce>Contact us</Bounce>
      </h2>
      <p>
        <Fade>
          Get In Touch With Us Need assistance or have a question? We're here to
          help! Reach out to us using any of the options below, and our team
          will get back to you as soon as possible.
        </Fade>
      </p>

      <div className={style.HeroContact_ContactFromMainBox}>
        {/* left data */}
        <div className={style.HeroContact_ContactFromMainBox_left}>
          <div className={style.HeroContact_innerBox}>
            <h3>
              <JackInTheBox>Email</JackInTheBox>
            </h3>
            <p>
              <Fade>
                For general inquiries, feel free to send us an email. Our
                support team is ready to assist you with any questions or
                concerns regarding our products, services, or your orders.
              </Fade>
            </p>
            <h3>support@craftcity.com</h3>
          </div>
          <div className={style.HeroContact_innerBox}>
            <h3>
              <JackInTheBox>Phone</JackInTheBox>
            </h3>
            <p>
              <Fade>
                Prefer to speak with someone? Give us a call! Our customer
                service representatives are available during regular business
                hours to help you with any immediate concerns or support.
              </Fade>
            </p>
            <h3>(+91) 8881444848</h3>
          </div>
          <div className={style.HeroContact_innerBox}>
            <h3>
              <JackInTheBox>Address</JackInTheBox>
            </h3>
            <p>
              <Fade>
                We welcome you to visit our store or showroom to experience our
                beautiful furniture collection in person. Find us at the
                following location:
              </Fade>
            </p>
            <h3>Craft city, choudhary vihar, behat road, saharanpur, 247001</h3>
          </div>
        </div>

        {/* right Data */}
        <div className={style.HeroContact_ContactFromMainBox_right}>
          <h3>
            <Bounce>Our Best Service</Bounce>
          </h3>
          <h4>
            <JackInTheBox>
              Have a question or need more information? Fill out the form below,
              and we&apos;ll get back to you shortly. We value your inquiries and are
              committed to providing you with the best service possible.
            </JackInTheBox>
          </h4>
          <form onSubmit={handleSubmit}>
            <div className={style.contactFlexBox_form}>
              <input
                type="text"
                placeholder="Enter First Name"
                name="firstName"
                value={formData.firstName}
                required
                onChange={handleChangeInpData}
                className={style.inpForm}
                title="First name must be 3-16 letters with no spaces or numbers."
              />
              <input
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                value={formData.lastName}
                required
                onChange={handleChangeInpData}
                className={style.inpForm}
                title="Last name must be 3-16 letters with no spaces or numbers."
              />
            </div>
            <input
              type="email"
              placeholder="Enter Email Address"
              name="email"
              value={formData.email}
              required
              onChange={handleChangeInpData}
              className={style.inpForm}
              title="Email must be a valid Gmail or Yahoo address in lowercase."
            />
            <input
              type="text"
              placeholder="Your Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChangeInpData}
              maxLength={10}
              required
              className={style.inpForm}
              title={error ? error : ""}
            />
            <textarea
              placeholder="Enter Your Message"
              name="message"
              value={formData.message}
              onChange={handleChangeInpData}
              required
              className={style.inpFormText}
            />
            {error && <p className={style.error}>{error}</p>}
            <button type="submit" className={style.btn}>
              <JackInTheBox>Contact Us</JackInTheBox>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroContact;
