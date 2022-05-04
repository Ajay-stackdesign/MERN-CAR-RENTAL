import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert"
import { getAllBooking } from '../../actions/bookingAction.js'
import Booking from "../Component/Booking.js"
import { clearError } from '../../actions/bookingAction.js'
import { Col, Row } from 'antd'
import moment from 'moment'


const BookingList = () => {
    const dispatch = useDispatch();
    const { loading, error, bookings } = useSelector((state) => state.booking);

    // const user = JSON.parse(localStorage.getItem("user"));
    const { user } = useSelector((state) => state.user)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getAllBooking())
    }, [dispatch, error])
    return (
        <Fragment>
            {loading && ("something went Wrong")}
            <h3 className="text-center mt-2">My Bookings</h3>

            <Row justify="center" gutter={16}>
                <Col lg={16} sm={24}>

                    {bookings.filter(o => o.user === user._id).map((booking) => {
                        return <Row gutter={16} className="bs1 mt-3 text-left">
                            <Col lg={6} sm={24}>
                                <p><b>{booking.car.name}</b></p>
                                <p>Total hours : <b>{booking.totalHours}</b></p>
                                <p>Rent per hour : <b>{booking.car.rentPerHour}</b></p>
                                <p>Total amount : <b>{booking.totalAmount}</b></p>
                            </Col>

                            <Col lg={12} sm={24}>
                                <p>Transaction Id : <b>{booking.transactionId}</b></p>
                                <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                                <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                                <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                            </Col>

                            <Col lg={6} sm={24} className='text-right'>
                                <img style={{ borderRadius: 5 }} src={booking.car.image} alt={booking.name} height="140" className="p-2" />
                            </Col>
                        </Row>;
                    })}

                </Col>
            </Row>
        </Fragment>
    )
}

export default BookingList