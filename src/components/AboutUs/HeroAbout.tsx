import React from 'react'
import style from '../../Style/AboutUs/HeroAbout.module.css'
import { Bounce, Fade, JackInTheBox } from 'react-awesome-reveal'
const HeroAbout: React.FC = () => {
  return (
    <>
      <div className={style.HeroAbout_main_container}>
        <div className={style.HeroAbout_container}>
          <div className={style.HeroAbout_leftBox}>
            <p><Fade>CraftCity: Where Craftsmanship Meets Timeless Design At CraftCity, we specialize in creating premium-quality handcrafted wooden furniture that balances aesthetics, durability, and comfort. Our furniture is designed to fit seamlessly into any home, whether you're looking for modern, minimalist styles or classic, rustic pieces. With a commitment to sustainability and expert craftsmanship, we ensure that each piece is built to last and brings beauty to your home.</Fade> </p>
            <button><JackInTheBox>About Us</JackInTheBox></button>
          </div>
          <div className={style.HeroAbout_rightBox}>
            <h1><i><Bounce>"It's always been about family yours and ours."</Bounce></i></h1>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default HeroAbout
