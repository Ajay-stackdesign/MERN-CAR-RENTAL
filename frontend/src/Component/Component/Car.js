import React, { Fragment } from 'react'

const Car = ({ car }) => {
    return (
        <Fragment>
            <div className='car'>
                {/* <Link to={`/update/${car._id}`} className="update"> */}
                {/* <h1>{car.name}</h1> */}
                {/* <h1>{car.capacity}</h1> */}
                <img src={car.images[0].url} alt={car.name} />
                {/* </Link> */}
            </div>
        </Fragment>
    )
}

export default Car
