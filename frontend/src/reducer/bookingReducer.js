import {
    GETALL_BOOKING_REQUEST,
    GETALL_BOOKING_SUCCESS,
    GETALL_BOOKING_FAIL,

    CLEAR_ERROR
} from "../constants/bookingConstants"


export const bookingReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {
        case GETALL_BOOKING_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GETALL_BOOKING_SUCCESS:
            return {
                loading: false,
                bookings: action.payload.bookings
            }
        case GETALL_BOOKING_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}