import React from 'react'
import style from '../../Style/TermsAndCondition/TermsandconditionHero.module.css'
import { Bounce, Fade } from 'react-awesome-reveal'

const TermsandconditionHero: React.FC = () => {
    return (
        <>
            <div className={style.TermsandconditionHero_main_container}>
                {/* <h3>about this terms and condition</h3> */}
                <h3><Bounce>Terms and condition</Bounce></h3>

                <h1><Bounce>OVERVIEW</Bounce></h1>

                <p><Fade>Welcome to CraftCity, a premier provider of handcrafted wooden furniture. By using our website and purchasing products from us, you agree to the following terms and conditions. Please read these terms carefully before accessing or using our website. If you do not agree to these terms, you may not access or use our services. </Fade></p>
    
                <h1><Bounce>SECTION 1 - ONLINE STORE TERMS</Bounce></h1>
                <ol>
                    <li><Fade>Products and Pricing Product Descriptions: We make every effort to display accurate product descriptions, images, and pricing. However, slight variations in color, size, or finish may occur due to the natural materials used in crafting wooden furniture. </Fade></li>
                    <li><Fade>Orders and Payments Order Acceptance: Once an order is placed, you will receive an email confirmation. However, order acceptance and the completion of the contract between you and CraftCity occur only when we ship the items. We reserve the right to cancel or refuse an order for any reason. Payment Methods: We accept various payment methods, including credit/debit cards and online payment systems. Payment must be made in full at the time of purchase. Order Cancellations: You may cancel an order within 24 hours of placing it. After this window, orders cannot be canceled, and you may need to refer to our Return Policy if you wish to return the product. </Fade></li>
                    <li><Fade>Shipping and DeliveryShipping Areas: We currently offer shipping within the United States. For international shipping inquiries, please contact our customer support.Shipping Fees: Shipping charges may vary depending on the size, weight, and destination of the product. Any applicable shipping fees will be displayed at checkout.Delivery Times: Estimated delivery times will be provided during checkout. However, these are estimates, and we cannot guarantee exact delivery dates.Delays: CraftCity is not responsible for any delays caused by external factors, such as customs clearance, weather conditions, or shipping carrier delays. </Fade></li>
                    <li><Fade>User AccountsAccount Creation: You may be required to create an account to place orders on our website. You are responsible for maintaining the confidentiality of your account information and password. CraftCity is not liable for any unauthorized access or use of your account.Account Termination: We reserve the right to terminate accounts that violate these terms or engage in fraudulent activities. </Fade></li>
                    <li><Fade>Intellectual Property
                    All content on the website, including product designs, images, text, logos, and graphics, are the intellectual property of CraftCity or our licensors. You may not reproduce, distribute, or use any content from this website without written permission from CraftCity.</Fade></li>
                </ol>

                <h1><Bounce>SECTION 2 - GENERAL CONDITIONS</Bounce></h1>
                
                <ol>
                    <li><Fade>General InformationOwnership: This website is owned and operated by CraftCity. All products and services featured on the website are subject to availability and these terms and conditions. Updates: We reserve the right to modify or update these terms at any time. Any changes will be effective immediately upon posting to our website. Continued use of the website following any modifications constitutes acceptance of the new terms.</Fade></li>
                    <li><Fade>Limitation of LiabilityNo Warranty: We strive to provide high-quality wooden products, but we do not guarantee that the products will meet your specific expectations. All products are sold “as is.”Limitation: In no event shall CraftCity, its directors, employees, or affiliates be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the website or our products.</Fade></li>
                    <li><Fade>Product Usage: CraftCity is not responsible for damage caused by misuse, exceeding recommended weight limits, or failure to follow care instructions. Water damage and damage caused by placing excessive weight on the furniture will not be covered by any warranty or return policy. </Fade></li>
                </ol>
            </div>
        </>
    )
}

export default TermsandconditionHero
