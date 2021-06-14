import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'


const initialState = {
    dateIn: "",
    stayDay: 1,
    city: "",
    error: null,
    loading: false,
}

const searchStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const searchSuccess = (state, action) => {
    return updateObject(state, {
        dateIn: action.dateIn,
        stayDays: action.stayDays,
        city: action.city,
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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_DETAILS_START: return searchStart(state, action)
        case actionTypes.SET_SEARCH_DETAILS_SUCCESS: return searchSuccess(state, action)
        case actionTypes.SET_SEARCH_DETAILS_FAIL: return searchFail(state, action)
        default: return state
    }
}

export default reducer