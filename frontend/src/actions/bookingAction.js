import {
    GETALL_BOOKING_REQUEST,
    GETALL_BOOKING_SUCCESS,
    GETALL_BOOKING_FAIL,

    CLEAR_ERROR
} from "../constants/bookingConstants"
import axios from "axios"
import { message } from "antd";

export const bookCar = (reqObj) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        await axios.post("/api/v1/bookings/bookcar", reqObj);

        dispatch({ type: "LOADING", payload: false });
        message.success("Your car booked successfully");
        setTimeout(() => {
            window.location.href = '/userbookings'
        }, 500);


    } catch (error) {
        console.log(error);
        dispatch({ type: "LOADING", payload: false });
        message.error("Something went wrong , please try later");
    }
};


export const getAllBooking = () => async (dispatch) => {
    try {
        dispatch({ type: GETALL_BOOKING_REQUEST })

        const { data } = await axios.get("/api/v1/getallbooking")

        dispatch({
            type: GETALL_BOOKING_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GETALL_BOOKING_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}
