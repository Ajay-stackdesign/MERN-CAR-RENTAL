import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import { bookCar } from "../../actions/bookingAction";
import StripeCheckout from "react-stripe-checkout";


import 'aos/dist/aos.css'; // You can also use <link> for styles
import { getAllDetail } from "../../actions/carActions";
import Car from "../Component/Car";
const { RangePicker } = DatePicker;
function BookingCar({ match }) {
    const { loading, cars } = useSelector((state) => state.cars);
    //   const { loading } = useSelector((state) => state.alertsReducer);
    const { user } = useSelector((state) => state.user)
    const [car, setcar] = useState({});
    const dispatch = useDispatch();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalHours, setTotalHours] = useState(0);
    const [driver, setdriver] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (cars.length === 0) {
            dispatch(getAllDetail());
        } else {
            setcar(cars.find((o) => o._id === match.params.carid));
        }
    }, [cars, dispatch, match.params.carid]);

    useEffect(() => {
        setTotalAmount(totalHours * car.rentPerHour);
        if (driver) {
            setTotalAmount(totalAmount + 30 * totalHours);
        }
    }, [car.rentPerHour, driver, totalAmount, totalHours]);



    function selectTimeSlots(values) {
        setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"));
        setTo(moment(values[1]).format("MMM DD yyyy HH:mm"));

        setTotalHours(values[1].diff(values[0], "hours"));
    }



    function onToken(token) {
        const reqObj = {
            token,
            // user: JSON.parse(localStorage.getItem("user"))._id,
            user: user._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: {
                from,
                to,
            },
        };

        dispatch(bookCar(reqObj));
    }

    return (
        <Fragment>
            {loading && "Something went wrong"}
            <Row
                justify="center"
                className="d-flex align-items-center"
                style={{ minHeight: "90vh" }}
            >
                <Col lg={10} sm={24} xs={24} className='p-3'>
                    <img src={cars.image} alt={cars.name} className="carimg" />
                    {cars &&
                        cars.map((car) => (
                            <Car key={car._id} car={car} />
                        ))}
                </Col>

                <Col lg={10} sm={24} xs={24} className="text-right">
                    <Divider type="horizontal" dashed>
                        Car Info
                    </Divider>
                    <div style={{ textAlign: "right" }}>
                        <p>{car.name}</p>
                        <p>{car.rentPerHour} Rent Per hour /-</p>
                        <p>Fuel Type : {car.fuelType}</p>
                        <p>Max Persons : {car.capacity}</p>
                    </div>

                    <Divider type="horizontal" dashed>
                        Select Time Slots
                    </Divider>
                    {/* <Space direction="vertical" size={12}> */}
                    {/* <DatePicker showTime onChange={onChange} onOk={onOk} /> */}
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={selectTimeSlots}
                    />
                    {/* <DatePicker.RangePicker /> */}
                    {/* </Space> */}
                    <br />
                    <button
                        className="btn1 mt-2"
                        onClick={() => {
                            setShowModal(true);
                        }}
                    >
                        See Booked Slots
                    </button>
                    {from && to && (
                        <div>
                            <p>
                                Total Hours : <b>{totalHours}</b>
                            </p>
                            <p>
                                Rent Per Hour : <b>{car.rentPerHour}</b>
                            </p>
                            <Checkbox
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setdriver(true);
                                    } else {
                                        setdriver(false);
                                    }
                                }}
                            >
                                Driver Required
                            </Checkbox>

                            <h3>Total Amount : {totalAmount}</h3>

                            <StripeCheckout
                                shippingAddress
                                token={onToken}
                                currency='inr'
                                amount={totalAmount * 100}
                                stripeKey="pk_test_51KEqWUSA8DUXqy38iur5qzJ6E4SjgtKgZxMR3iEs54oeM3sJyhfDe17OrU5nmAItSrMSY2Lzk0uTid4IQcXuwkoY00H9ARHNNi"
                            >
                                <button className="btn1">
                                    Book Now
                                </button>
                            </StripeCheckout>


                        </div>
                    )}
                </Col>

                {car.name && (
                    <Modal
                        visible={showModal}
                        closable={false}
                        footer={false}
                        title="Booked time slots"
                    >
                        <div className="p-2">
                            {car.bookedTimeSlots.map((slot) => {
                                return (
                                    <button className="btn1 mt-2">
                                        {slot.from} - {slot.to}
                                    </button>
                                );
                            })}

                            <div className="text-right mt-5">
                                <button
                                    className="btn1"
                                    onClick={() => {
                                        setShowModal(false);
                                    }}
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </Row>
        </Fragment>
    );
}

export default BookingCar;
