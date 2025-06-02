import React, { useState, useEffect } from "react";
import style from "../../Style/Layout/Footer.module.css";
import { Link, useLocation } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import logo from "../../image/Home/logo2.svg";

const Footer: React.FC = () => {
  const { pathname } = useLocation();

  // States for each section to toggle
  const [isCustomerServiceVisible, setCustomerServiceVisible] = useState(false);
  const [isApplicationsVisible, setApplicationsVisible] = useState(false);
  const [isContactUsVisible, setContactUsVisible] = useState(false);

  // State for screen width detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCustomerService = () =>
    setCustomerServiceVisible(!isCustomerServiceVisible);
  const toggleApplications = () =>
    setApplicationsVisible(!isApplicationsVisible);
  const toggleContactUs = () => setContactUsVisible(!isContactUsVisible);

  return (
    <>
      <div className={style.footer_container}>
        {/* Further information */}
        <div className={style.footer_box}>
          <div className={style.footer_logo}>
            <img src={logo} alt="" />
            <div className={style.FooterLine2}></div>
          </div>

        
        </div>

        {/* Customer service */}
        <div className={style.footer_box} onClick={toggleCustomerService}>
          <h3>
            Main Links
            {isMobile && (
              <p className={style.toggle_button}>
                {isCustomerServiceVisible ? <FaCaretUp /> : <FaCaretDown />}
              </p>
            )}
          </h3>
          <div className={style.FooterLine}></div>
          {(isCustomerServiceVisible || !isMobile) && (
            <ul>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li>
                <Link to="gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/wishlist">Wishlist</Link>
              </li>
            </ul>
          )}
        </div>

        {/* Applications */}
        <div className={style.footer_box} onClick={toggleApplications}>
          <h3>
            Quick Links
            {isMobile && (
              <p className={style.toggle_button}>
                {isApplicationsVisible ? <FaCaretUp /> : <FaCaretDown />}
              </p>
            )}
          </h3>
          <div className={style.FooterLine}></div>
          {(isApplicationsVisible || !isMobile) && (
            <ul>
              <li>
                <Link to="/termsandcondition">Term And Condition</Link>
              </li>
              <li>
                <Link to="/privacypolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/returnpolicy">Return Policy</Link>
              </li>
            </ul>
          )}
        </div>

        {/* Contact us */}
        <div className={style.footer_box} onClick={toggleContactUs}>
          <h3>
            Contact us
            {isMobile && (
              <p className={style.toggle_button}>
                {isContactUsVisible ? <FaCaretUp /> : <FaCaretDown />}
              </p>
            )}
          </h3>
          <div className={style.FooterLine}></div>
          {(isContactUsVisible || !isMobile) && (
            <ul>
              <li>
                CraftCity, choudhary vihar, behat road, saharanpur, 247001
              </li>
              <li>+91 8881444848</li>
              <li>support@thecraftcity.in</li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Footer;
