import React, { Fragment } from 'react'
import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/loginActions'
import "./Header.scss"

const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { isAuthenticated } = useSelector((state) => state.user)
    // const { isAuthenticated } = useSelector((state) => state.user)

    const guestLinks = (
        <Fragment >
            <Link style={{ margin: "10px" }} to="/login" className='link'>Login</Link>
            <Link style={{ margin: "10px" }} to="/register" className='link'>register</Link>
        </Fragment>
    )

    const handleClick = () => {
        dispatch(logoutUser())
        alert.success("Logout SuccessFully!")
    }

    return (
        <div className='header'>
            <div className='header__left'>
                <Link to="/" className='link'><img src='https://img.freepik.com/free-vector/car-rental-logo-template-design_316488-1614.jpg' alt="header_logo" /></Link>
            </div>
            <div className="header__middle">
                <ul>
                    <li><Link to="/" className='link'>Home</Link></li>
                    <li><Link to="/contact" className='link'>Contact</Link></li>
                    <li><Link to="/addcar" className='link'>Add car</Link></li>
                    <li><Link to="/getall" className='link'>Getall</Link></li>
                </ul>
            </div>
            <div className='header__right'>
                {/* <li>{isAuthenticated ? (<UserOptions user={user} />) : guestLinks}</li> */}
                <li>{isAuthenticated ? (<button style={{
                    border: "none", background: "white", borderRadius: "5px", padding: "10px", cursor: "pointer"
                }} onClick={handleClick}>Logout</button>) : guestLinks}</li>
                {/* <li>{isAuthenticated ? <Link to="/register" className='link'>SIGN Up</Link> : "LOGOUT"}</li> */}
            </div>
        </div>
    )
}

export default Header