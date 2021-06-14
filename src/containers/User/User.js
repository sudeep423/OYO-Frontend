import React, { Component } from 'react'
import classes from './User.module.css'

import { Redirect, Link } from 'react-router-dom';

class user extends Component {
    render() {
        console.log("help")
        return (
            <div className={classes.MainCover}>
                User
                <div className={classes.Cover}>
                    <Link to="/user/auth/signup">SIGN UP</Link>
                    <Link to="/user/auth/login" >LOGIN</Link>
                </div>
            </div >
        )
    }
}

export default user