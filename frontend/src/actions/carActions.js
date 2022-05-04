import {
    ALL_DETAIL_REQUEST,
    ALL_DETAIL_SUCCESS,
    ALL_DETAIL_FAIL,
    CLEAR_ERROR,
    ADD_CAR_REQUEST,
    ADD_CAR_SUCCESS,
    ADD_CAR_FAIL,
    GETSINGLE_CAR_FAIL,
    GETSINGLE_CAR_REQUEST,
    GETSINGLE_CAR_SUCCESS,
    UPDATE_CAR_REQUEST,
    UPDATE_CAR_FAIL,
    UPDATE_CAR_SUCCESS,
    DELETE_CAR_FAIL,
    DELETE_CAR_REQUEST,
    DELETE_CAR_SUCCESS,
} from "../constants/carConstants"
import axios from "axios"


export const getAllDetail = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_DETAIL_REQUEST })
        const { data } = await axios.get(`/api/v1/get`)

        console.log(data)

        dispatch({
            type: ALL_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_DETAIL_FAIL,
            payload: error.response.data.message,
        })
    }
}

// export const addCar = (carData) => async (dispatch) => {
//     try {
//         dispatch({ type: ADD_CAR_REQUEST })

//         const config = {
//             headers: {
//                 "Content-type": "application/json"
//             }
//         }

//         const { data } = await axios.post(`/api/v1/addcar`, carData, config)

//         console.log(data)
//         dispatch({
//             type: ADD_CAR_SUCCESS,
//             payload: data
//         })
//     } catch (error) {
//         dispatch({
//             type: ADD_CAR_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

export const addCar = (catData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_CAR_REQUEST })

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post(`/api/v1/addcar`, catData, config)
        console.log(data)
        dispatch({
            type: ADD_CAR_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ADD_CAR_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const getSingleCar = (id) => async (dispatch) => {
    try {
        dispatch({ type: GETSINGLE_CAR_REQUEST })

        const { data } = await axios.get(`/api/v1/single/${id}`)

        dispatch({
            type: GETSINGLE_CAR_SUCCESS,
            payload: data.car
        })
    } catch (error) {
        dispatch({
            type: GETSINGLE_CAR_FAIL,
            payload: error.response.data.message,
        })
    }
}

// export const updateCar = (id, carData) => async (dispatch) => {
//     try {
//         dispatch({ type: UPDATE_CAR_REQUEST })

//         const config = {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }

//         const { data } = await axios.put(`/api/v1/update/${id}`, carData, config)

//         dispatch({
//             type: UPDATE_CAR_SUCCESS,
//             payload: data.success,
//         })
//     } catch (error) {
//         dispatch({
//             type: UPDATE_CAR_FAIL,
//             payload: error.response.data.message,
//         })
//     }
// }

export const updateCar = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CAR_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.put(
            `/api/v1/update/${id}`,
            productData,
            config
        );

        dispatch({
            type: UPDATE_CAR_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CAR_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteCar = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_CAR_REQUEST,
        })

        const { data } = await axios.delete(`/api/v1/delete/${id}`)

        dispatch({
            type: DELETE_CAR_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: DELETE_CAR_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}
