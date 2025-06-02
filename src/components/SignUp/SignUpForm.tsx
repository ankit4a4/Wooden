import React, { useState, useRef, useEffect } from "react";
import style from "../../Style/SignUp/SignUpForm.module.css";
import { Bounce } from "react-awesome-reveal";
import { TiDeleteOutline } from "react-icons/ti";
// import img from '../../assets/SignUp/Google.png';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSignUpMutation } from "../../store/Features/LoginReducer/LoginReducer";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";
import { useForgotPasswordSendOTpMutation } from "../../store/Features/ForgotPassword/ForgotPass";

interface SignUpFormProps {
  HidePopUp: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ HidePopUp }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [signUp, { isLoading }] = useSignUpMutation();
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiOtpResponse, setApiOtpResponse] = useState("");

  // OTP handling states
  const [otp, setOtpState] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [OtpPopUp, setOtpPopUp] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [forgotPassword, { isLoading: isForgotPassLoading }] =
    useForgotPasswordSendOTpMutation();
    
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  if (isLoading || isForgotPassLoading) {
    return <Loader />;
  }

  // Common onChange handler for all inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      // Validation for phone number
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
        setPhoneError("");
      } else {
        setPhoneError("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleOtpChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtpState(newOtp);
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === otp.length) {
      console.log(combinedOtp);
    }
    if (value && index < otp.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);
  };
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // //////////////////// userCreate /////////////////////////////
  const handleCreateUSer = async () => {
    if (apiOtpResponse === otp.join("")) {
      try {
        await signUp({
          firstName: formData?.firstName,
          lastName: formData?.lastName,
          email: formData?.email,
          phone: formData?.phoneNumber,
          password: formData?.password,
        }).unwrap();
        toast.success("Sign Up Successful");
        HidePopUp();
      } catch (error: any) {
        toast.error(error?.data?.message || "Login failed!");
        console.error("Sign Up Error:", error?.data?.message);
      }
    } else {
      toast.error("Invalid OTP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      try {
        const response = await forgotPassword({
          phone: formData?.phoneNumber,
        }).unwrap();
        setApiOtpResponse(response?.otpDetails);
        toast.success("OTP sent successfully");
        setOtpPopUp(true);
        setPasswordError("");
      } catch (error: any) {
        console.error("Error occurred:", error);
        toast.error(error?.error);
      }
    }
  };
  return (
    <>
      <div className={style.SignUpForm_container}>
        <div className={style.SignUpFormLeft} onClick={HidePopUp}></div>
        <div className={style.SignUpFormRightForm}>
          <h3>
            <Bounce>Sign Up</Bounce>
            <span>
              <TiDeleteOutline onClick={HidePopUp} />
            </span>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className={style.SignUpForm_input}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={style.SignUpForm_input}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={style.SignUpForm_input}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={style.SignUpForm_input}>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            {phoneError && (
              <p style={{ color: "var(--baseRed)" }}>{phoneError}</p>
            )}
            <div className={style.SignUpForm_input}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <span>
                {showPassword ? (
                  <AiFillEyeInvisible
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <AiFillEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </span>
            </div>
            <div className={style.SignUpForm_input}>
              <input
                type={confirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <span>
                {confirmPassword ? (
                  <AiFillEyeInvisible
                    onClick={() => setConfirmPassword(!confirmPassword)}
                  />
                ) : (
                  <AiFillEye
                    onClick={() => setConfirmPassword(!confirmPassword)}
                  />
                )}
              </span>
            </div>
            {passwordError && (
              <p style={{ color: "var(--baseRed)" }}>{passwordError}</p>
            )}
            <button type="submit">Submit</button>
          </form>
          <div className={style.SignUpFormRightForm_img}>
            {/* <img src={img} alt="" /> */}
          </div>
          {/* OTP POPUP */}
        </div>
      </div>

      {OtpPopUp && (
        <div className={style.otpContainer}>
          <div className={style.input_phone_otp}>
            <h3>Enter OTP</h3>
            <div className={style.otp_input}>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  ref={(input) => (inputRefs.current[index] = input!)}
                  value={value}
                  onChange={(e) => handleOtpChange(index, e)}
                  onClick={() => handleClick(index)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                />
              ))}
            </div>
            <button onClick={handleCreateUSer}>Send OTP</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
