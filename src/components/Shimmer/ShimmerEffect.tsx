import React from 'react'
import style from '../../Style/Shimmer/ShimmerEffect.module.css'

const ShimmerEffect: React.FC = () => {
  const data = [1, 2, 3, 4]
  return (
    <>
      <div className={style.shimmer_menu}>
        {
          data.map((i) => (
            <div className={style.shimmer} key={i}>
              <div className={style.innerBox}></div>
              <div className={style.text}></div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default ShimmerEffect
