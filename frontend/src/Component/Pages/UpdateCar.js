import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import "./UpdateCar.scss"
import { useAlert } from "react-alert";
import { clearError, getSingleCar, updateCar } from "../../actions/carActions"
import { UPDATE_CAR_RESET } from "../../constants/carConstants";

const UpdateCar = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, car } = useSelector((state) => state.single);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.update);

    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [rentPerHour, setRentPerHour] = useState(0)
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const carId = match.params.id;

    useEffect(() => {
        if (car && car._id !== carId) {
            dispatch(getSingleCar(carId));
        } else {
            setName(car.name);
            setCapacity(car.capacity);
            setFuelType(car.fuelType);
            setRentPerHour(car.rentPerHour);
            setOldImages(car.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully");
            history.push("/");
            dispatch({ type: UPDATE_CAR_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, updateError, car, carId]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("capacity", capacity);
        myForm.set("fuelType", fuelType);
        myForm.set("rentPerHour", rentPerHour);


        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateCar(carId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <div className="dashboard">
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateProductSubmitHandler}
                >
                    <h3>Create Product</h3>

                    <div>
                        <label><center>Name</center></label>
                        <input
                            className="text"
                            type="text"
                            placeholder="enter name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label><center>Capacity</center></label>
                        <input className="text" type="text" placeholder="enter number"
                            required value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                    </div>
                    <div>
                        <label><center>FuelType</center></label>
                        <input
                            className="text"
                            type="text"
                            placeholder="fuelType"
                            required
                            onChange={(e) => setFuelType(e.target.value)}
                            value={fuelType}
                        />
                    </div>
                    <div>
                        <label><center>RentPerHour</center></label>
                        <input
                            className="text"
                            type="number"
                            placeholder="rentperHour"
                            required
                            onChange={(e) => setRentPerHour(e.target.value)}
                            value={rentPerHour}
                        />
                    </div>

                    <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={updateProductImagesChange}
                            multiple
                        />
                    </div>

                    <div id="createProductFormImage">
                        {oldImages &&
                            oldImages.map((image, index) => (
                                <img className="img" key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                    </div>

                    <div id="createProductFormImage">
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={loading ? true : false}
                    >
                        <center>Create</center>
                    </Button>
                </form>
            </div>
        </Fragment >
    );
};

export default UpdateCar;