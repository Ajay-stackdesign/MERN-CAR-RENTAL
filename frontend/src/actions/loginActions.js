import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    CLEAR_ERROR,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL
} from "../constants/loginConstants"
import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_USER_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/v1/login", {
            email, password
        }, config)

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post(`/api/v1/register`, { name, email, password }, config)

        console.log(data)
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/logout")

        dispatch({ type: LOGOUT_USER_SUCCESS, })
    } catch (error) {

        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}



export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}