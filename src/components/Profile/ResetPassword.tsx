import React from "react";
import style from "../../Style/Profile/ResetPassword.module.css";

const ResetPassword: React.FC = () => {
  return (
    <div className={style.ResetPassword_main_container}>
      <div className={style.ResetPassword_container}>
        <p>
          <b>Reset Password</b>
        </p>

        <form action="">
          <div className={style.ResetPassword_InputBox}>
            <label htmlFor="">
              <p>
                Enter your Email ID <span>*</span>
              </p>
            </label>
            <input type="email" />
          </div>
          <h3>OR</h3>
          <div className={style.ResetPassword_InputBox}>
            <label htmlFor="">
              <p>
                Enter your Mobile Number <span>*</span>
              </p>
            </label>
            <input type="number" />
          </div>

          <div className={style.ResetPassword_btn}>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
