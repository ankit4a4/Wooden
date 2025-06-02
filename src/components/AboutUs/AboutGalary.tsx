import React from 'react'
import style from '../../Style/AboutUs/AboutGalary.module.css'
import img from "../../assets/AboutUs/aboutHeroImage.webp"
import { Bounce, JackInTheBox } from 'react-awesome-reveal'

const AboutGalary: React.FC = () => {
    return (
        <>
            <div className={style.Aboutgalary_container}>
                <div className={style.Aboutgalary_leftBox}>
                    <p><JackInTheBox>Let there be living</JackInTheBox></p>
                    <h1><Bounce>Hello & welcome to The Furniture Gallery</Bounce></h1>
                    <p>Discover the beauty and durability of our wooden furniture collections. Whether you're looking for modern dining room furniture, stylish bedroom sets, or functional office furniture, our range offers something for every taste and need. Visit one of our stores to experience the quality and comfort of CraftCity furniture firsthand.</p>
                    <button><JackInTheBox>Find A Store</JackInTheBox></button>
                </div>
                <div className={style.Aboutgalary_RightBox}>
                    <img src={img} alt="" />
                </div>
            </div>
        </>
    )
}

export default AboutGalary
