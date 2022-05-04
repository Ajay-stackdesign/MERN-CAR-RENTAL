import React from "react"
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Component/Home"
import Header from "./Component/Header.js"
import AddCar from "./Component/Pages/AddCar.js"
import Login from "./Component/Pages/Login.js"
import SignUp from "./Component/Pages/SignUp.js"
import UpdateCar from "./Component/Pages/UpdateCar.js"
import GetAll from "./Component/Pages/GetAll.js"
import BookingCar from "./Component/Pages/BookingCar.js"
import UserBookings from "./Component/Pages/UserBooking.js"
import 'antd/dist/antd.min.css'
import BookingList from "./Component/Pages/BookingList.js"
import ProtectedRoutes from "./Component/Component/ProtectedRoutes";
import Contact from "./Component/Component/Contact.js"


function App() {

  return (
    <Router>
      <Header />
      {/* {isAuthenticated && <UserOptions user={user} />} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoutes exact path="/addcar" component={AddCar} />
        <ProtectedRoutes exact path="/update/:id" component={UpdateCar} />
        <ProtectedRoutes exact path="/getallbooking" component={BookingList} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/getall" component={GetAll} />
        <Route exact path="/contact" component={Contact} />
        <ProtectedRoutes exact path='/booking/:carid' component={BookingCar} />
        <ProtectedRoutes exact path="/userbookings" component={UserBookings} />
      </Switch>
    </Router>
  );
}

export default App;
