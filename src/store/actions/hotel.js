import * as actionTypes from './actionTypes'
import axios from 'axios'


export const searchStart = () => {
    return {
        type: actionTypes.SEARCH_HOTEL_START
    }
}


export const searchSuccess = (details) => {
    console.log(details)
    return {
        type: actionTypes.SEARCH_HOTEL_SUCCESS,
        ...details
    }
}

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_HOTEL_FAIL,
        error
    }
}

export const setSearchDetailStart = () => {
    return {
        type: actionTypes.SEARCH_HOTEL_START
    }
}


export const setSearchDetailSuccess = (details) => {
    return {
        type: actionTypes.SEARCH_HOTEL_SUCCESS,
        ...details
    }
}

export const setSearchDetailsFail = (error) => {
    return {
        type: actionTypes.SEARCH_HOTEL_FAIL,
        error
    }
}
export const addRooms = (details) => {
    console.log("kpion")
    console.log(details)
    return {
        type: actionTypes.ADD_ROOMS,
        ...details
    }
}



export const searchHotel = (details) => {
    return dispatch => {
        dispatch(searchStart())
        const searchData = {
            dateIn: details.dateIn,
            stayDay: details.stayDay,
        }

        console.log(details)
        let url = `http://localhost:8000/hotel/${details.hotelId}`
        axios.post(url, searchData)
            .then(response => {
                console.log("kill")
                console.log(response.data)
                dispatch(searchSuccess(response.data))
            })
            .catch(error => {
                dispatch(searchFail(error.response.data.error))
            })
    }
}

const bookingSuccess = (details) => {
    return {
        type: actionTypes.BOOKING_SUCCESS
    }
}


export const book = (details) => {
    return dispatch => {
        console.log(details)
        dispatch(searchStart())
        let url = `http://localhost:8000/booking`
        axios.post(url, details)
            .then(response => {
                console.log("kill")
                console.log(response.data)
                dispatch(bookingSuccess(response.data))
            })
            .catch(error => {
                dispatch(searchFail(error.response.data.error))
            })
    }
}







