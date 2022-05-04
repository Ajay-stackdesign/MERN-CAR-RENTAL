import { createStore, combineReducers, applyMiddleware } from "redux"

import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { carAddReducers, carReducer, getSingleReducer, updateDeleteReducer } from "./reducer/carReducer"
import { userReducer } from "./reducer/userReducers"
import { bookingReducer } from "./reducer/bookingReducer"

const reducer = combineReducers({
    cars: carReducer,
    car: carAddReducers,
    user: userReducer,
    update: updateDeleteReducer,
    booking: bookingReducer,
    single: getSingleReducer,
})


let initialStage = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialStage,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store