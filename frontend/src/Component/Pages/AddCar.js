import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addCar, clearError } from '../../actions/carActions'
import { ADD_CAR_RESET } from '../../constants/carConstants'
import Loader from '../Component/Loader'
import "./Addcar.scss"

const AddCar = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const history = useHistory()
    const { success, error, loading } = useSelector((state) => state.car)
    console.log(success)
    console.log(success)
    const [name, setName] = useState("")
    // const [image, setImage] = useState("")
    const [capacity, setCapacity] = useState("")
    const [fuelType, setFuelType] = useState("")
    const [rentPerHour, setRentPerHour] = useState()
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("addd")

        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("capacity", capacity)
        myForm.set("fuelType", fuelType)
        myForm.set("rentPerHour", rentPerHour)
        images.forEach((image) => {
            myForm.append("images", image)
        })
        dispatch(addCar(myForm))
    }

    const createImagesChange = (e) => {
        const files = Array.from(e.target.files);//Array from creates a copy of an array

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(reader.readyState)
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (success) {
            alert.success("car added SuccessFully!")
            history.push("/")
            dispatch({ type: ADD_CAR_RESET })
        }
    }, [alert, dispatch, error, history, success])

    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <div className='add'>

                        <form className='form' encType='multipart/form-data' onSubmit={handleSubmit} >
                            <h1 style={{ fontSize: "20px" }}>Add Car</h1>
                            <div className='name'>
                                <label className='label'><center>Name:</center></label>
                                <input className='text' type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='capacity'>
                                <label className='label'><center>capacity:</center></label>
                                <input className='text' type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
                            </div>
                            <div className='fuel'>
                                <label className='label'><center>FuelType:</center></label>
                                <input className='text' type="text" value={fuelType} onChange={(e) => setFuelType(e.target.value)} />
                            </div>
                            <div className='rentper'>
                                <label className='label'><center>RentPerHour:</center></label>
                                <input className='text' type="number" value={rentPerHour} onChange={(e) => setRentPerHour(e.target.value)} />
                            </div>

                            <div id="createProductFormFile">
                                <input
                                    className='file'
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={createImagesChange}
                                    multiple
                                />
                            </div>

                            <div id="createProductFormImage">
                                {imagesPreview.map((image, index) => (
                                    <img key={index} src={image} alt="Product Preview" />
                                ))}
                            </div>
                            <input className='text1' type="submit" value="Create" />
                        </form>
                    </div>

                </Fragment>
            )}
            {/* hello */}
        </Fragment>
    )
}

export default AddCar