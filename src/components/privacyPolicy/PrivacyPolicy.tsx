import React from 'react'
import { Bounce, Fade } from 'react-awesome-reveal'
import style from "../../Style/privacyPolicy/PrivacyPolicy.module.css"

const PrivacyPolicy: React.FC = () => {
    return (
        <>
            <div className={style.PrivacyPolicy_main_container}>
                {/* <h3>about this Privacy Policy</h3> */}
                <h3><Bounce>PRIVACY POLICY</Bounce></h3>

                <h1><Bounce>OVERVIEW</Bounce></h1>

                <p><Fade>At CraftCity, your privacy is a priority. We are committed to protecting your personal information and ensuring your experience with us is safe and secure. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our website and services. By accessing or using our website, you agree to the terms of this Privacy Policy.</Fade></p>

                <h1><Bounce>SECTION 1 - ONLINE STORE TERMS</Bounce></h1>
                <ol>
                    <li><Fade>Personal Information
When you create an account, make a purchase, or contact us through the website, we collect personal information, including but not limited to:
Full Name, Email Address, Shipping and Billing Address, Phone Number, Payment Information (credit card details, etc.)</Fade></li>
                    <li><Fade>To Process Orders
                        To fulfill your orders and deliver purchased products to your address
                        To send order confirmations, shipping details, and updates related to your purchase </Fade></li>
                    <li><Fade>To Improve Our Services
                        Analyze user behavior and preferences to enhance your shopping experience
                        Improve website functionality, product offerings, and customer service </Fade></li>
                    <li><Fade>To Communicate With You
                        Respond to your inquiries, customer service requests, and feedback
                        Send promotional emails, offers, or newsletters (you can opt-out at any time) </Fade></li>
                    <li><Fade>For Security Purposes
                        Detect and prevent fraudulent activities, unauthorized transactions, or any misuse of our website
                        Protect the security of your personal data and our platform</Fade></li>
                </ol>

                <h1><Bounce>SECTION 2 - GENERAL CONDITIONS</Bounce></h1>
                <ol>
                    <li><Fade>How We Protect Your Information
                        At CraftCity, we take reasonable precautions to safeguard your personal information against unauthorized access, use, or disclosure. We implement various security measures including:
                        Secure Socket Layer (SSL) encryption for data transmission
                        Regular monitoring of our systems for vulnerabilities
                        Restricted access to personal information, available only to authorized personnel
                        However, please note that no method of online transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.</Fade></li>
                    <li><Fade>Cookies and Tracking Technologies
                        We use cookies and similar tracking technologies to collect information and enhance your browsing experience. Cookies are small data files stored on your device. They help us remember your preferences, keep track of items in your shopping cart, and analyze site traffic.
                    </Fade></li>
                    <li><Fade>Children's Privacy
                        Our website is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected information from a child, we will take immediate steps to delete the data from our systems.</Fade></li>
                    <li><Fade>You have the right to: Access: Request a copy of the personal data we hold about you.
                        Correction: Request corrections or updates to your personal information.
                        Deletion: Request the deletion of your personal data, subject to legal requirements.
                        Opt-Out: Unsubscribe from promotional emails by clicking the "unsubscribe" link in any email.
                        To exercise any of these rights, please contact us using the details provided below. </Fade></li>
                    <li><Fade>Changes to This Privacy Policy
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly. We encourage you to review this policy periodically to stay informed about how we are protecting your information.</Fade></li>
                </ol>
            </div>
        </>
    )
}

export default PrivacyPolicy
