import * as actionTypes from './actionTypes'
import axios from 'axios'
import SignUp from '../../containers/Hotels/Auth/SignUp/SignUp'


export const authStart = () => {
    return {
        type: actionTypes.USER_AUTH_START
    }
}


export const authSuccess = (userId) => {
    return {
        type: actionTypes.USER_AUTH_SUCCESS,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.USER_AUTH_FAIL,
        error
    }
}

export const userLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    return {
        type: actionTypes.USER_AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(userLogout())
        }, expirationTime * 1000)
    }
}


export const userAuth = (details, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            emailId: details.email,
            password: details.password,
        }

        let url = "http://localhost:8000/user/login"

        if (isSignUp) {
            url = "http://localhost:8000/user/signup"
            authData.phoneNumber = details.phone
            authData.name = details.name
        }

        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('userId', response.data.id)
                localStorage.setItem('userName', response.data.name)
                console.log("SignUP successfully")
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

// export const authCheckState = () => {
//     return dispatch => {
//         const userName = localStorage.getItem('userName')
//         if (!userName) {
//             dispatch(logout())
//         } else {
//             const expirationDate = new Date(localStorage.getItem('expirationDate'))
//             if (expirationDate < new Date()) {
//                 dispatch(logout())
//             } else {
//                 const userId = localStorage.getItem('userId')
//                 dispatch(authSuccess(token, userId))
//                 dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
//             }
//         }
//     }
// }