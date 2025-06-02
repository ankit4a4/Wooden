import React from "react";
import style from "../../Style/Profile/Profile.module.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePoweroff } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../store/Features/LoginReducer/LoginReducer";

interface hidepopUp {
  onClose: () => void;
}

const ProfileLink: React.FC<hidepopUp> = ({ onClose }) => {
  // Log out functioanality

  const [LogOutD] = useLogoutMutation();
  const HandleLogOut = async () => {
    try {
      await LogOutD();
      toast.success("Logged out Successfully!");
      navigate("/");
      onClose();
    } catch (err) {
      console.error("error occure...", err);
      toast.error("Log Out Failed");
      onClose();
    }
  };

  const navigate = useNavigate();

  const handleChangeRoute = () => {
    navigate("/profile-router");
    onClose()
  };

  return (
    <>
      <div className={style.profile_Container}>
        <div className={style.profile_link} onClick={handleChangeRoute}>
          <p> Your Profile</p>
          <span>
            <MdOutlineKeyboardArrowRight />
          </span>
        </div>

        <div className={style.profile_link} onClick={HandleLogOut}>
          <p>Log Out</p>
          <span style={{ color: "var(--baseRed)" }}>
            <AiOutlinePoweroff />
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileLink;
