import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'


const initialState = {
    hotel: null,
    loading: false,
    rooms: 0,
    rent: 0,
    error: null,
    available: 0,
    currentRent: 0,
    booked: false
}

const searchStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const bookingSuccess = (state, action) => {
    return updateObject(state, { booked: true })
}

const searchSuccess = (state, action) => {
    console.log(action)
    return updateObject(state, {
        available: action.available,
        hotel: action.hotel,
        rent: action.rent,
        error: null,
        loading: false,
    })
}

const searchFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const addRooms = (state, action) => {
    let currentRent = action.rooms * action.rent
    console.log(action)
    return updateObject(
        state, {
        rooms: action.rooms,
        rent: action.rent,
        currentRent: currentRent
    }
    )
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_HOTEL_START: return searchStart(state, action)
        case actionTypes.SEARCH_HOTEL_SUCCESS: return searchSuccess(state, action)
        case actionTypes.SEARCH_HOTEL_FAIL: return searchFail(state, action)
        case actionTypes.ADD_ROOMS: return addRooms(state, action)
        case actionTypes.BOOKING_SUCCESS: return bookingSuccess(state, action)
        default: return state
    }
}

export default reducer