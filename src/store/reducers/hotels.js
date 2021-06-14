import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'


const initialState = {
    hotels: null,
    loading: false
}

const searchHotelStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const searchHotelSuccess = (state, action) => {
    return updateObject(state, {
        hotels: action.hotels,
        error: null,
        loading: false,
    })
}

const searchHotelFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_HOTELS_START: return searchHotelStart(state, action)
        case actionTypes.SEARCH_HOTELS_SUCCESS: return searchHotelSuccess(state, action)
        case actionTypes.SEARCH_HOTELS_FAIL: return searchHotelFail(state, action)
        default: return state
    }
}

export default reducer