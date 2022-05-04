import React, { Fragment, useState } from 'react';
// import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Profile from "../../images/Profile.png"
// import Backdrop from "@material-ui/core/Backdrop";
// import PersonIcon from "@material-ui/icons/Person";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useDispatch, } from "react-redux"
import { useHistory } from 'react-router-dom';
import { logoutUser } from "../../actions/loginActions"
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Backdrop } from '@mui/material';
import { useAlert } from 'react-alert';

const UserOptions = ({ user }) => {
    // const { cartItems } = useSelector(state => state.cart)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()
    const options = [
        // { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        // { icon: <ShoppingCartIcon />, name: `cart(${cartItems.length > 0 ? "tomato" : "unset"})` },
        // {
        //     icon: (
        //         <ShoppingCartIcon
        //             style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        //         />
        //     ),
        //     name: `Cart(${cartItems.length})`,
        //     func: cart,
        // },
        { icon: <ExitToAppIcon />, name: "Logout", func: logout }
    ]

    // if (user.role === "admin") {
    //     options.unshift({
    //         icon: <DashboardIcon />,
    //         name: "Dashboard",
    //         func: dashboard,
    //     });
    // }

    // function dashboard() {
    //     history.push("/");
    // }

    // function orders() {
    //     history.push("/orders");
    // }
    function account() {
        history.push("/getallbooking");
    }
    // function cart() {
    //     history.push("/cart");
    // }
    function logout() {
        dispatch(logoutUser());
        alert.success("Logout Successfully");
    }
    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel='SpeedDial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className="speedDial"
                icon={
                    <img className='speedDialIcon'
                        src={Profile}
                        alt="Profile" style={{ objectFit: "contain", height: "50px" }}
                    />}
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
};

export default UserOptions;