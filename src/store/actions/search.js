import * as actionTypes from './actionTypes'


export const setSearchDetailStart = () => {
    return {
        type: actionTypes.SET_SEARCH_DETAILS_START
    }
}


export const setSearchDetailSuccess = (details) => {
    return {
        type: actionTypes.USER_AUTH_SUCCESS,
        ...details
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.USER_AUTH_FAIL,
        error
    }
}
