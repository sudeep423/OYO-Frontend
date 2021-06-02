import React from 'react'

import classes from './Logo.module.css'
import Pic from '../../assets/image/logo.PNG'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={Pic} alt="logo" />
    </div>
)

export default logo