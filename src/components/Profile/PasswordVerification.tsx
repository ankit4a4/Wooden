import React, { useState } from "react";
import { useVerifyPasswordMutation } from "../../store/Features/user/UserReducer";
import style from "../../Style/Profile/PasswordVerification.module.css";
import { toast } from "react-toastify";


interface Props {
    onPasswordVerified: () => void; // Callback for successful password verification
  }


const PasswordVerification: React.FC<Props> = ({  onPasswordVerified }) => {
  const [password, setPassword] = useState<string>("");

  const [verifyPassword, { isLoading }] = useVerifyPasswordMutation();

  const handleVerify = async () => {
    try {
      const response = await verifyPassword({ password }).unwrap();
      if (response?.status === "success") {
        toast.success("Password verified successfully");
        onPasswordVerified(); // Trigger the email update
      } else {
        toast.error("Password verification failed, please check your password");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error("Password verification failed, please check your password");
    }
  };
  return (
    <div className={style.password_container}>
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button onClick={handleVerify}>
        {isLoading ? "Loading..." : "Verify"}
      </button>
    </div>
  );
}

export default PasswordVerification;
