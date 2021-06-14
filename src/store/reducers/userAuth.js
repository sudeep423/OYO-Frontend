import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'


const initialState = {
    userId: null,
    userName: null,
    error: null,
    loading: false,
    authRedirectPath: '/search'
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        error: null,
        loading: false,
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        userId: null,
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_AUTH_START: return authStart(state, action)
        case actionTypes.USER_AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.USER_AUTH_FAIL: return authFail(state, action)
        case actionTypes.USER_AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default: return state
    }
}

export default reducer