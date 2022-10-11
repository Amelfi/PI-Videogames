import React from 'react'
import landingImage from './landingImage.jpg'
import styles from './landing.module.css'


const LandingPage = () => {
  return (
    <div className={styles.contents}>
      {/* <div className={styles.row3}> */}
        <img className={styles.images} src={landingImage} alt="Not found"  />
      {/* </div> */}
        
    </div>
  )
}

export default LandingPage