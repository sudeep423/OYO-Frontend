import React, { Component } from 'react'
import classes from './Front.module.css'

import { Redirect, Link } from 'react-router-dom';

class front extends Component {
    render() {
        console.log("help")
        return (
            <div className={classes.MainCover}>
                Enter As
                <div className={classes.Cover}>
                    <Link to="/owner">Hotel Owner</Link>
                    <Link to="/user" >User</Link>
                </div>
            </div >
        )
    }
}

export default front