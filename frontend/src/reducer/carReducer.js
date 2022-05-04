import {
    ALL_DETAIL_REQUEST,
    ALL_DETAIL_SUCCESS,
    ALL_DETAIL_FAIL,

    CLEAR_ERROR,
    ADD_CAR_REQUEST,
    ADD_CAR_SUCCESS,
    ADD_CAR_FAIL,
    ADD_CAR_RESET,
    UPDATE_CAR_REQUEST,
    UPDATE_CAR_SUCCESS,
    UPDATE_CAR_FAIL,
    UPDATE_CAR_RESET,
    DELETE_CAR_REQUEST,
    DELETE_CAR_FAIL,
    DELETE_CAR_SUCCESS,
    DELETE_CAR_RESET,
    GETSINGLE_CAR_REQUEST,
    GETSINGLE_CAR_SUCCESS,
    GETSINGLE_CAR_FAIL
} from "../constants/carConstants"


export const carReducer = (state = { cars: [] }, action) => {
    switch (action.type) {
        case ALL_DETAIL_REQUEST:
            return {
                loading: true,
                ...state
            }
        case ALL_DETAIL_SUCCESS:
            return {
                loading: false,
                cars: action.payload.cars,
            }
        case ALL_DETAIL_FAIL:
            return {
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

export const carAddReducers = (state = { car: {} }, action) => {
    switch (action.type) {
        case ADD_CAR_REQUEST:
            return {
                loading: true,
                ...state
            }
        case ADD_CAR_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                car: action.payload.car,
            }
        case ADD_CAR_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ADD_CAR_RESET:
            return {
                ...state,
                success: false,
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

export const getSingleReducer = (state = { car: {} }, action) => {
    switch (action.type) {
        case GETSINGLE_CAR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GETSINGLE_CAR_SUCCESS:
            return {
                loading: false,
                car: action.payload
            }
        case GETSINGLE_CAR_FAIL:
            return {
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

export const updateDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CAR_REQUEST:
        case UPDATE_CAR_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_CAR_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_CAR_FAIL:
        case UPDATE_CAR_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_CAR_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_CAR_RESET:
            return {
                ...state,
                isUpdated: false,
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
