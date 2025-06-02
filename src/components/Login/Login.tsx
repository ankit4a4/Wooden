import React, { useState } from "react";
import style from "../../Style/Login/Login.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import { IoIosStar } from "react-icons/io";
import SignUpForm from "../SignUp/SignUpForm";
import { useLoginMutation } from "../../store/Features/LoginReducer/LoginReducer";
import { toast } from "react-toastify";
import ProfileLink from "../Profile/ProfileLink";
import Cookies from "js-cookie";
import Loader from "../../utils/Loader";
import ForgotPassword from "../forgotPassword/ForgotPassword";

interface LoginProps {
  onclose: () => void;
}

const Login: React.FC<LoginProps> = ({ onclose }) => {
  const [login, { isLoading }] = useLoginMutation();
  const [show, setShow] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const token = Cookies.get("token");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      toast.success("Login Successful");
      onclose();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Login Failed";
      console.log(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCreateAcc = (): void => {
    setShow(true);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className={style.LoginHero_container}>
        <div className={style.LoginBlack} onClick={onclose}></div>

        {!token ? (
          <div className={style.LoginDetails}>
            <div>
              <div className={style.LoginDetails_header}>
                <h2>Login</h2>
                <p>
                  <TiDeleteOutline onClick={onclose} />
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>
                    Email Address{" "}
                    <sup>
                      <IoIosStar />
                    </sup>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>
                    Password{" "}
                    <sup>
                      <IoIosStar />
                    </sup>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <button type="submit" disabled={isLoading}>
                  Log in
                </button>
                <p onClick={() => setShowForgotPass(true)}>
                  <u>Forgot your Password?</u>
                </p>
                <button type="button" onClick={handleCreateAcc}>
                  Sign Up
                </button>
              </form>
            </div>
            <div className={style.LoginDetails_footer}>
              <p>Need help?</p>
            </div>
          </div>
        ) : (
          <div className={style.LoginDetails}>
            <div>
              <div className={style.LoginDetails_header}>
                {token && <h2>Hello! Welcome</h2>}
                <p>
                  <TiDeleteOutline onClick={onclose} />
                </p>
              </div>

              <ProfileLink onClose={onclose} />
            </div>
            <div className={style.LoginDetails_footer}>
              <p>Need help?Chat with us</p>
            </div>
          </div>
        )}
      </div>
      {showForgotPass && (
        <ForgotPassword HidePopUp={() => setShowForgotPass(false)} />
      )}
      {show && <SignUpForm HidePopUp={() => setShow(false)} />}
    </>
  );
};

export default Login;
