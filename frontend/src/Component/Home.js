// import React, { Fragment, useEffect, useState } from 'react'
// import "./Home.scss"
// import { Col, Row , Divider , DatePicker, Checkbox} from 'antd'
// import { useSelector, useDispatch } from "react-redux";
// import Car from "./Component/Car.js"
// import { useAlert } from "react-alert"
// import { getAllDetail, clearError } from '../actions/carActions'
// import Loader from "./Component/Loader.js"

// import moment from 'moment'
// const {RangePicker} = DatePicker
// const Home = () => {
//     const alert = useAlert()
//     const dispatch = useDispatch()
//     const { cars, loading, error } = useSelector((state) => state.cars)

//     const [totalCars, setTotalCars] = useState([])
//     console.log(cars)
//     // console.log(error)
//     // console.log(loading)
//     useEffect(() => {
//         if (error) {
//             alert.error(error)
//             dispatch(clearError())
//         }
//         dispatch(getAllDetail())
//     }, [alert, dispatch, error])

//     useEffect(() => {
//         setTotalCars(cars)
//     },[cars])

//     function setFilter(values){

//         var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
//         var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')

//         var temp=[]

//         for(var car of cars){

//               if(car.bookedTimeSlots.length == 0){
//                   temp.push(car)
//               }
//               else{

//                    for(var booking of car.bookedTimeSlots) {

//                        if(selectedFrom.isBetween(booking.from , booking.to) ||
//                        selectedTo.isBetween(booking.from , booking.to) || 
//                        moment(booking.from).isBetween(selectedFrom , selectedTo) ||
//                        moment(booking.to).isBetween(selectedFrom , selectedTo)
//                        )
//                        {
//                        }
//                        else{
//                            temp.push(car)
//                        }
//                    }
//               }
//         }
//         setTotalCars(temp)
//     }
//     return (
//         <Fragment>
//             {loading ? (<Loader />) : (
//                 <Fragment>
//                 <Row className='mt-3' justify='center'>

//                 <Col lg={20} sm={24} className='d-flex justify-content-left'>

//                     <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>

//                 </Col>

//                 </Row> 
//                     <div className='home'>
//                         <h1 className='home__header'>CAR RENTAL</h1>
//                     </div>
//                     <div className='home__car'>
//                         {cars &&
//                             cars.map((car) => (
//                                 <Car key={car._id} car={car} />
//                             ))}
//                     </div>
//                 </Fragment>
//             )}
//         </Fragment>
//     )
// }

// export default Home

import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import DefaultLayout from '../components/DefaultLayout'
import { getAllDetail } from '../actions/carActions'
import { Col, Row, DatePicker, } from 'antd'
import { Link } from 'react-router-dom'
import "./Home.scss"
// import Spinner from '../components/Spinner';
import moment from 'moment'
const { RangePicker } = DatePicker
function Home() {
    const { loading, cars } = useSelector(state => state.cars)
    // const { loading } = useSelector(state => state.alertsReducer)
    const [totalCars, setTotalcars] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllDetail())
    }, [dispatch])

    useEffect(() => {

        setTotalcars(cars)

    }, [cars])


    function setFilter(values) {

        var selectedFrom = moment(values[0], 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1], 'MMM DD yyyy HH:mm')

        var temp = []

        for (var car of cars) {

            if (car.bookedTimeSlots.length === 0) {
                temp.push(car)
            }
            else {

                for (var booking of car.bookedTimeSlots) {

                    if (selectedFrom.isBetween(booking.from, booking.to) ||
                        selectedTo.isBetween(booking.from, booking.to) ||
                        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
                        moment(booking.to).isBetween(selectedFrom, selectedTo)
                    ) {

                    }
                    else {
                        temp.push(car)
                    }

                }

            }

        }


        setTotalcars(temp)


    }

    return (
        <Fragment>

            <Row className='mt-3' justify='center'>

                <Col lg={20} sm={24} className='d-flex justify-content-left'>

                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD yyyy HH:mm' onChange={setFilter} />

                </Col>

            </Row>

            {loading === true && ("Somthing went wrong")}



            <Row justify='center' gutter={16}>

                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className="car p-2 bs1">
                            <img src={car.images[0].url} alt={car.name} className="carimg" />

                            <div className="car-content d-flex align-items-center justify-content-between">

                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                                </div>

                                <div>
                                    <button className="btn1 mr-2"><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                                </div>

                            </div>
                        </div>
                    </Col>
                })}

            </Row>

        </Fragment>
    )
}

export default Home