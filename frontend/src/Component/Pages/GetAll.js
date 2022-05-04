import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { clearError, deleteCar } from '../../actions/carActions'
import { DELETE_CAR_RESET } from '../../constants/carConstants'
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const GetAll = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()

    const { error, cars } = useSelector((state) => state.cars)


    const { error: deleteError, isDeleted } = useSelector((state) => state.update)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (deleteError) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isDeleted) {
            alert.success("Book delete SuccessFully")
            history.push("/getall")
            dispatch({ type: DELETE_CAR_RESET })
        }
    }, [alert, deleteError, dispatch, error, history, isDeleted])


    const deleteCarHandler = (id) => {
        dispatch(deleteCar(id))
    }

    let columns = [
        { field: "id", headerName: "CarId", minWidth: 200, flex: 0.5 },
        {
            field: "name", headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "capacity",
            headerName: "Capacity",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "fuelType",
            headerName: "FuelType",
            minWidth: 150,
            flex: 1
        },
        {
            field: "rentPerHour",
            headerName: "RentPerHour",
            type: "number",
            minWidth: 150,
            flex: 1
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/update/${params.getValue(params.id, "id")}`}>
                            button
                        </Link>

                        <Button
                            onClick={() =>
                                deleteCarHandler(params.getValue(params.id, "id"))
                            }
                        >
                            delete
                        </Button>
                    </Fragment>
                );
            },
        },
    ]


    const rows = []
    cars &&
        cars.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                capacity: item.capacity,
                fuelType: item.fuelType,
                rentPerHour: item.rentPerHour,
            })
        })

    return (
        <Fragment>
            <Fragment>
                <div className='get' style={{ marginTop: "100px" }}>
                    <center style={{ marginBottom: "20px", fontSize: "30px" }}>Car Detail</center>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="bookList"
                        autoHeight
                    />
                </div>
            </Fragment>
        </Fragment>
    )
}

export default GetAll