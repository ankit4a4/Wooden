import React from 'react'
import HeroAbout from '../components/AboutUs/HeroAbout'
import AboutGalary from '../components/AboutUs/AboutGalary'
import ChooseUs from '../components/AboutUs/ChooseUs'
import OurJourney from '../components/AboutUs/OurJourney'


const AboutUs: React.FC = () => {
  return (
    <div>
      <HeroAbout />
      <AboutGalary />
      <ChooseUs />
      <OurJourney />
    </div>
  )
}

export default AboutUs
