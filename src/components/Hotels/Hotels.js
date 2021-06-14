import React from 'react'
import classes from './Hotels.module.css'

import Hotel from './Hotel/Hotel'

const hotels = (props) => {
    let hotels = null
    console.log(props)
    if (props.hotels != null) {
        hotels = props.hotels.map(hotel => (
            <Hotel hotelName={props.hotels.hotelName}
                Address={hotel.Address}
                city={hotel.city}
                state={hotel.state}
                pinCode={hotel.pinCode}
                available={hotel.available}
                rent={hotel.rentPerRoomPerDay}
                key={hotel.id}
                id={hotel.id}
                link={`?id=${hotel.id}&stayDay=${props.stayDay}&dateIn=${props.boardingDate}`}
            />
        ))
    }


    return (
        <div className={classes.CoverHotels}>
            <div className={classes.Cover}>
                {hotels}
            </div>
        </div>
    )
}

export default hotels