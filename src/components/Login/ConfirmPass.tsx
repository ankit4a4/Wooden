import React, { useState } from "react";
import style from "../../Style/Login/ConfirmPass.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { useForgotPasswordChangePasswordMutation } from "../../store/Features/ForgotPassword/ForgotPass";
import Loader from "../../utils/Loader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  hidePopUp: () => void;
  number: string;
}

const ConfirmPass: React.FC<Props> = ({ hidePopUp, number }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [changePassword, { isLoading }] =
    useForgotPasswordChangePasswordMutation();

  // Handle password change logic
  const handleSetNewPass = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      changePassword({ phone: number, newPassword: confirmPassword });
      toast.success("Password changed successfully");
      hidePopUp();
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={style.main_container}>
      <div className={style.LoginBlack} onClick={hidePopUp}></div>
      <div className={style.container}>
        <div className={style.LoginDetails_header}>
          <h2>Change Password</h2>
          <p>
            <TiDeleteOutline onClick={hidePopUp} />
          </p>
        </div>

        <div className={style.changePass_form}>
          <div className={style.inputBox}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span>
              {showPass ? (
                <AiFillEye onClick={() => setShowPass(!showPass)} />
              ) : (
                <AiFillEyeInvisible onClick={() => setShowPass(!showPass)} />
              )}
              {/* <AiFillEye  /> */}
            </span>
          </div>
          <div className={style.inputBox}>
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />

            <span>
              {showConfirmPass ? (
                <AiFillEye
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                />
              )}
            </span>
          </div>

          <button onClick={handleSetNewPass}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPass;
