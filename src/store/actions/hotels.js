import * as actionTypes from './actionTypes'
import axios from 'axios'


export const searchStart = () => {
    return {
        type: actionTypes.SEARCH_HOTELS_START
    }
}


export const searchSuccess = (hotels) => {
    return {
        type: actionTypes.SEARCH_HOTELS_SUCCESS,
        hotels
    }
}

export const searchFail = (error) => {
    return {
        type: actionTypes.SEARCH_HOTELS_FAIL,
        error
    }
}

export const setSearchDetailStart = () => {
    return {
        type: actionTypes.SET_SEARCH_DETAILS_START
    }
}


export const setSearchDetailSuccess = (details) => {
    return {
        type: actionTypes.SET_SEARCH_DETAILS_SUCCESS,
        ...details
    }
}

export const setSearchDetailsFail = (error) => {
    return {
        type: actionTypes.SET_SEARCH_DETAILS_FAIL,
        error
    }
}



export const searchHotels = (details) => {
    return dispatch => {
        dispatch(searchStart())
        const searchData = {
            dateIn: details.dateIn,
            stayDay: details.stayDay
        }

        let url = `http://localhost:8000/hotels/${details.city}`
        axios.post(url, searchData)
            .then(response => {
                console.log("kill")
                console.log(response.data)
                dispatch(setSearchDetailSuccess(details))
                dispatch(searchSuccess(response.data))
            })
            .catch(error => {
                dispatch(searchFail(error.response.data.error))
            })
    }
}


// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token')
//         if (!token) {
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