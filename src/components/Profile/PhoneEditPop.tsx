import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import styles from "../../Style/Profile/PhoneEditPop.module.css";
import { useUpdateNumberMutation } from "../../store/Features/user/UserReducer";
import Loader from "../../utils/Loader";
import OtpInput from "react-otp-input";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { useForgotPasswordSendOTpMutation } from "../../store/Features/ForgotPassword/ForgotPass";

interface Type {
  closePopUp: () => void;
  phone: string;
}

const PhoneEditPop = ({ closePopUp, phone }: Type) => {
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ph, setPh] = useState(phone);
  const [updatePhone, { isLoading }] = useUpdateNumberMutation();
  const [apiOtp, setApiOtp] = useState();
  // for otp
  const [forgotPasswordSendOTp] = useForgotPasswordSendOTpMutation();

  // Function to handle sending OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      const response = await forgotPasswordSendOTp({ phone: ph });
      setApiOtp(response?.data?.otpDetails);
      toast.success("OTP sent successfully");
      setLoading(false);
      setShowOtp(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (apiOtp === otp) {
      toast.success("OTP verified successfully");
      await verifyUser();
      closePopUp();
    } else {
      toast.error("OTP verification failed");
    }
  };

  // Function to handle OTP verification
  const verifyUser = async () => {
    setLoading(true);
    try {
      // Here, you would verify the OTP with your backend
      toast.success("Phone number verified");
      await updatePhone({ phone: ph });
      closePopUp();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        toast.error(`OTP verification failed: ${error.message}`);
      } else {
        toast.error("OTP verification failed");
      }
    }
  };

  // Loading state handling
  if (isLoading || loading) {
    return <Loader />;
  }

  // Main component render
  return (
    <div className={styles.PhoneEditPop_container}>
      <RxCrossCircled
        className={styles.RxCrossCircled_icon}
        onClick={closePopUp}
      />
      {!showOtp && (
        <div className={styles.inp_pop_field}>
          <label htmlFor="phone-input">Mobile: </label>
          <input
            value={ph}
            placeholder="Enter your mobile number"
            id="phone-input"
            type="number"
            onChange={(e) => setPh(e.target.value)}
          />
        </div>
      )}
      {!showOtp && (
        <button
          type="button"
          onClick={sendOtp}
          className={styles.inp_pop_field_btn}
        >
          Send OTP
        </button>
      )}
      {showOtp && (
        <>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderInput={(props) => <input {...props} />}
            containerStyle={styles.otp_container}
            inputStyle={styles.otp_input}
          />
          <button
            type="button"
            onClick={verifyOtp}
            className={styles.inp_pop_field_btn}
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default PhoneEditPop;
