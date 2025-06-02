import React, { useRef, useState } from 'react'
import style from "../../Style/forgotPassword/ForgotPassword.module.css"
import { TiDeleteOutline } from 'react-icons/ti'
import { useForgotPasswordSendOTpMutation } from '../../store/Features/ForgotPassword/ForgotPass'
import Loader from '../../utils/Loader'
import { toast } from 'react-toastify'
import ConfirmPass from '../Login/ConfirmPass'

interface Props {
    HidePopUp: () => void
}
const ForgotPassword: React.FC<Props> = ({ HidePopUp }) => {
    const [phone, setPhone] = useState<string>("")
    const [showOtp, setShowOtp] = useState(false)
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const [apiOtpResponse, setApiOtpResponse] = useState("")
    const [forgotPassword, { isLoading: isForgotPassLoading }] = useForgotPasswordSendOTpMutation()


    /////////////////// send OTP ////////////////////////

    const HandleClicksendOtp = async () => {
        try {
            const response = await forgotPassword({ phone }).unwrap();
            setApiOtpResponse(response?.otpDetails)
            toast.success("OTP sent successfully");
            setShowOtp(true)
            return response
        } catch (error: any) {
            console.error("Error occurred:", error);
            toast.error(error?.error);
        }
    };


    ///////////////////////// OTP ////////////////////////////////

    const [otp, setOtpState] = useState<string[]>(Array(4).fill(""));
    const inputRefs = useRef<HTMLInputElement[]>([])

    const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        // Allow only one input per field
        newOtp[index] = value.substring(value.length - 1);
        setOtpState(newOtp);
        // Submit trigger
        const combinedOtp = newOtp.join('');
        if (combinedOtp.length === otp.length) {
            console.log(combinedOtp)
        }
        // Move to next input if the current field is filled
        if (value && index < otp.length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };


    ///////////////////// OTP input handel key down ////////////////////////////////

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (
            e.key === 'Backspace' &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
    };

    const HandleSendOtp = () => {

        if (apiOtpResponse === otp.join('')) {
            toast.success("OTP verified successfully");
            setShowPasswordChange(true)
        } else {
            toast.error("Invalid OTP");
        }
    }

    if (isForgotPassLoading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            <div className={style.forgotPass_main_container}>
                <div className={style.LoginBlack} onClick={HidePopUp}></div>
                <div className={style.forgotPass_container}>
                    <div className={style.LoginDetails_header}>
                        <h2>Forgot Password</h2>
                        <p>
                            <TiDeleteOutline onClick={HidePopUp} />
                        </p>
                    </div>
                    <div className={style.ForgotPassword_Box}>
                        <input type="text"
                            placeholder='Enter Your Phone Number'
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                        />
                        <button onClick={HandleClicksendOtp}>Submit</button>
                    </div>
                </div>


                {showOtp && (
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
                            <button onClick={HandleSendOtp}>Save</button>
                        </div>
                    </div>
                )
                }
            </div>

            {showPasswordChange && (
                <ConfirmPass hidePopUp={() => { setShowPasswordChange(false); HidePopUp() }} number={phone} />
            )}
        </>
    )
}

export default ForgotPassword
