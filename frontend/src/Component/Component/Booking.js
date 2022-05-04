import React, { Fragment } from 'react'

const Booking = ({ booking }) => {
    return (
        <Fragment>
            <h1>{booking.totalHours}</h1>
        </Fragment>
    )
}

export default Booking