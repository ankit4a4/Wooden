import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import styles from "../../Style/Profile/EmailEditPop.module.css";
import {
  useUpdateEmailMutation,
} from "../../store/Features/user/UserReducer";
import Loader from "../../utils/Loader";
import PasswordVerification from "./PasswordVerification";

interface Props {
  closePopUp: () => void;
  initialEmail: string;
}

const EmailEdit: React.FC<Props> = ({ closePopUp, initialEmail }) => {
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);

  const [email, setEmailState] = useState(initialEmail);
  const [updateEmail, { isLoading: isEmailUpdating }] =
    useUpdateEmailMutation();

  useEffect(() => {
    setEmailState(initialEmail);
  }, [initialEmail]);

  const handleEmailUpdate = async () => {
    try {
      await updateEmail({ email }).unwrap(); // Use unwrap for better error handling
      closePopUp();
    } catch (error) {
      console.error("Email update failed:", error);
    }
  };

  if (isEmailUpdating) {
    return <Loader />;
  }

  return (
    <div className={styles.EmailEditPop_container}>
      <RxCrossCircled
        className={styles.RxCrossCircled_icon}
        onClick={closePopUp}
      />
      <div>
        {!showPasswordField && (
          <>
            <div className={styles.inp_pop_field}>
              <label htmlFor="">Email : </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmailState(e.target.value)}
                className={styles.inputName}
              />
            </div>
            <button
              onClick={() => setShowPasswordField(true)}
              className={styles.inp_pop_field_btn}
            >
              Submit
            </button>
          </>
        )}

        {showPasswordField && (
          <PasswordVerification onPasswordVerified={handleEmailUpdate} />
        )}
      </div>
    </div>
  );
};

export default EmailEdit;
