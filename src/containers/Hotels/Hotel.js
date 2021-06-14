import React, { Component } from 'react'
import classes from './Hotel.module.css'

import { Redirect, Link } from 'react-router-dom';

class hotel extends Component {
    render() {
        console.log("help")
        return (
            <div className={classes.MainCover}>
                HOTEL OWNER
                <div className={classes.Cover}>
                    <Link to="/owner/auth/signup">SIGN UP</Link>
                    <Link to="/owner/auth/login" >LOGIN</Link>
                </div>
            </div >
        )
    }
}

export default hotel