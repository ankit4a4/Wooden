import React from 'react'
import { Bounce, Fade } from 'react-awesome-reveal'
import style from "../../Style/returnPolicy/ReturnPolicy.module.css"

const ReturnPolicy: React.FC = () => {
    return (
        <>
            <div className={style.ReturnPolicy_main_container}>
                {/* <h3>about this Return Policy</h3> */}
                <h3><Bounce>RETURN POLICY</Bounce></h3>
                <h1><Bounce>OVERVIEW</Bounce></h1>

                <p><Fade>At CraftCity, we take pride in the quality of our handcrafted wooden furniture and strive to ensure that every product meets your expectations. If for any reason you are not satisfied with your purchase, we offer a comprehensive return policy. Please review the guidelines below for returning an item.Conditions for Returns We accept returns in the following circumstances: </Fade></p>

                <h1><Bounce>SECTION 1 - ONLINE STORE TERMS</Bounce></h1>
                <ol>
                    <li><Fade>Damaged Item Upon Delivery: If your furniture arrives damaged, please contact us immediately. We require that you notify us within 48 hours of receiving the product, along with photographic evidence of the damage, to qualify for a return or exchange. </Fade></li>
                    <li><Fade>Incorrect Product: If you receive a product that is different from what you ordered, we will arrange for a return and send you the correct item at no extra charge. Ensure that you report this within 7 days of delivery. </Fade></li>
                    <li><Fade>Different Size or Color: If the product you receive is in a different size or color than what was specified in your order, you may return it for an exchange or refund. The item must be unused and in its original packaging. Please inform us within 7 days of receipt.</Fade></li>
                </ol>

                <h1><Bounce>SECTION 2 - Non-Returnable Items</Bounce></h1>
                <p><Fade>Unfortunately, we cannot accept returns in the following cases:</Fade></p>
                <ol>
                    <li><Fade>Water Damage: Products that have been damaged due to water exposure will not be eligible for return or refund. Wooden furniture is sensitive to moisture, and it's important to protect it accordingly. </Fade></li>
                    <li><Fade>Exceeding Weight Limits: If the furniture has been damaged due to exceeding the recommended weight limit as specified in the product guidelines, the item will not qualify for return or replacement. </Fade></li>
                    <li><Fade>Normal Wear and Tear: We do not accept returns for products that have suffered normal wear and tear, minor scratches, or cosmetic imperfections that may occur during normal use. </Fade></li>
                    <li><Fade>Contact Us: Email us at returns@craftcity.com or call (684) 555-0102 within the return window specified above (48 hours for damaged items, 7 days for incorrect items, sizes, or colors).</Fade></li>
                    <li><Fade>Provide Information: Include your order number, photographs of the issue (if applicable), and a brief description of the problem.Return Authorization: Upon approval, we will provide you with a return authorization and instructions on how to return your item.Shipping the Item: Pack the item securely in its original packaging and ship it back using the method provided in the return instructions. </Fade></li>
                </ol>
            </div>  
        </>
    )
}

export default ReturnPolicy
