import React from 'react'
import classes from './Hotel.module.css'

import { Link } from "react-router-dom"

const hotel = (props) => {
    return (
        <Link to={"/hotel" + props.link}>
            <div className={classes.Hotel}>
                <img className={classes.Image} ></img>
                <div>
                    <p>{props.hotelName}</p>
                    <p>{props.Address}</p>
                    <p>{props.city}</p>
                    <p>{props.state}</p>
                    <p>{props.pinCode}</p>
                </div>
            </div >
        </Link>
    )
}

export default hotel
