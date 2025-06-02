import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import EmailEdit from "./EmailEdit";
import PhoneEditPop from "./PhoneEditPop";
import styles from "../../Style/Profile/ProfileCard.module.css";
import {
  useGetUserQuery,
  useUpdatePassWordMutation,
  useUpdateUserNameMutation,
} from "../../store/Features/user/UserReducer";
import Loader from "../../utils/Loader";

const ProfileCard: React.FC = () => {
  // States for name
  const [nameInp, setNameInp] = useState(false);
  const [name, setName] = useState("");

  // States for email
  const [showEmailEdit, setShowEmailEdit] = useState(false);
  const [email, setEmail] = useState("");

  // States for phone
  const [showPhonePop, setShowPhonePop] = useState(false);
  const [phone, setPhone] = useState("");

  // States for password
  const [passwordInp, setPasswordInp] = useState(false);
  const [password, setPassword] = useState("");

  const [updateName, { isLoading: isUpdating }] = useUpdateUserNameMutation();
  const [updatePassword, { isLoading: isPasswordUpdating }] =
    useUpdatePassWordMutation();
  const { data, isLoading } = useGetUserQuery({});

  useEffect(() => {
    setName(data?.admin?.firstName + " " + data?.admin?.lastName || " ");
    setEmail(data?.admin?.email || " ");
    setPhone(data?.admin?.phone || " ");
  }, [data]);

  ////////////////////////// user Name Edit  /////////////////////////////////
  const handleEditNameInput = () => {
    setNameInp((prev) => !prev);
  };

  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[1] : "";

  ///////////////////////// update user Name  /////////////////////////////////
  const handleUpdateUser = async () => {
    await updateName({ firstName, lastName });
  };

  ///////////////////////// Show edit PopUp  /////////////////////////////////
  const handleEditEmailInput = () => {
    setShowEmailEdit(true);
  };

  //////////////////// Show edit PopUp  /////////////////////////////////-
  const handleEditPhoneInput = () => {
    setShowPhonePop(true);
  };

  const handleEditPassword = () => {
    setPasswordInp((prev) => !prev);
  };

  ///////////////////////// update user Password  /////////////////////////////////
  const handleUpdatePassword = () => {
    updatePassword({ password });
  };

  if (isLoading || isUpdating || isPasswordUpdating) {
    return <Loader />;
  }

  return (
    <div className={styles.globle_container}>
      <div className={styles.Profile_Card_Text}>
        <span>We Are Happy To Serve You!</span>
      </div>
      <div className={styles.card}>
        <div className={styles.details}>
          {/* Name Section */}
          <div className={styles.ProfileNameInp}>
            <div className={styles.NameDivProfileCard}>
              <label>
                <span>Name : </span>
              </label>
              {nameInp ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  className={styles.inputName}
                />
              ) : (
                <p>{data?.admin?.firstName + " " + data?.admin?.lastName}</p>
              )}
            </div>
            {nameInp ? (
              <div style={{ display: "flex", gap: "0.1rem" }}>
                <button
                  className={styles.profile_edit_button}
                  onClick={handleUpdateUser}
                >
                  Save
                </button>
                <button
                  className={styles.profile_edit_button}
                  onClick={handleEditNameInput}>Cancel</button>
              </div>

            ) : (
              <span>
                <MdEdit
                  onClick={handleEditNameInput}
                  style={{ cursor: "pointer" }}
                />
              </span>
            )}
          </div>

          {/* Email Section */}
          <div className={styles.ProfileNameInp}>
            <div className={styles.EmailDivProfileCard}>
              <label>
                <span>Email :</span>
              </label>
              <p>{data?.admin?.email}</p>
            </div>
            <span>
              <MdEdit
                onClick={handleEditEmailInput}
                style={{ cursor: "pointer" }}
              />
            </span>
          </div>
          {showEmailEdit && (
            <EmailEdit
              closePopUp={() => setShowEmailEdit(false)}
              initialEmail={email}
            />
          )}

          {/* Phone Number */}
          <div className={styles.ProfileNameInp}>
            <div className={styles.MobileDivProfileCard}>
              <label>
                <span>Mobile :</span>
              </label>
              <p>{data?.admin?.phone}</p>
            </div>
            <span>
              <MdEdit
                onClick={handleEditPhoneInput}
                style={{ cursor: "pointer" }}
              />
            </span>
          </div>
          {showPhonePop && (
            <PhoneEditPop
              phone={phone}
              closePopUp={() => setShowPhonePop(false)}
            />
          )}

          {/* Password Section */}
          <div className={styles.ProfileNameInp}>
            <div className={styles.PasswordDivProfileCard}>
              <label>
                <span>Password :</span>
              </label>
              {passwordInp ? (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className={styles.inputName}
                />
              ) : (
                <p>*********</p>
              )}
            </div>
            {passwordInp ? (
              <button
                className={styles.profile_edit_button}
                onClick={handleUpdatePassword}
              >
                Save
              </button>
            ) : (
              <span> <MdEdit
                onClick={handleEditPassword}
                style={{ cursor: "pointer" }}
              /></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
