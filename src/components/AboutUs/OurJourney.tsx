import React from 'react'
import style from '../../Style/AboutUs/OurJourney.module.css'
import { Bounce, Fade, JackInTheBox } from 'react-awesome-reveal'

const OurJourney: React.FC = () => {
    return (
        <>


            <div className={style.OurJourney_container}>
                <div className={style.OurJourney_leftData}>
                    <h3><Bounce>Our Journey: Crafting Beautiful Spaces Since 2015</Bounce></h3>
                    <p><Fade>Established in 2015, CraftCity has become a trusted name in the wooden furniture industry. Our story began with a passion for creating furniture that combines traditional craftsmanship with contemporary design. Over the years, we have stayed true to our roots while innovating and expanding our collection to meet the needs of modern homes. 2015 - Present: Crafting Excellence, One Piece at a Time Since our inception, we&apos;ve been committed to excellence in both craftsmanship and customer satisfaction. Today, we continue to push the boundaries of design, offering a versatile collection that speaks to the heart of every home. Bring CraftCity Home Today!</Fade></p>
                    <button><JackInTheBox>Find  a store</JackInTheBox></button>
                </div>
                
            </div>


            <div className={style.commitment_container}>

                <div className={style.commitment_box}>
                    <h3><Bounce>Expert Craftsmanship</Bounce></h3>
                    <p><Fade> Every piece is handcrafted by our skilled artisans using only the finest materials.</Fade> </p>
                </div>

                <div className={style.commitment_box}>
                    <h3><Bounce>Customer-Focused Approach</Bounce></h3>
                    <p><Fade> We listen to our customers and tailor solutions to meet their unique needs.</Fade> </p>
                </div>


                <div className={style.commitment_box}>
                    <h3><Bounce>Versatility in Design</Bounce></h3>
                    <p><Fade>Our wide range of furniture styles ensures a perfect fit for any space and décor.</Fade> </p>
                </div>
            </div>
        </>
    )
}

export default OurJourney
