import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { clearError, register } from '../../actions/loginActions'
import Loader from '../Component/Loader'
import "./SignUp.scss"

const SignUp = () => {
    const alert = useAlert()
    const history = useHistory()
    const dispatch = useDispatch()
    const { loading, error, isAuthenticated } = useSelector((state) => state.user)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(register(name, email, password))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isAuthenticated) {
            alert.success("Login suceesfull")
            history.push("/")
        }
    }, [alert, dispatch, error, history, isAuthenticated])
    return (
        <Fragment>
            {loading ? (<Loader />) : (
                <Fragment>
                    <form onSubmit={handleSubmit}>
                        <div className='name'>
                            <input className="text" type="text" placeholder="enter name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='email'>
                            <input className='text' type="email" placeholder='Enter email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='password'>
                            <input type="password" className='text' placeholder='enter password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <input className='submit' type="submit" value="submit" />
                    </form>
                </Fragment>
            )}
        </Fragment>
    )
}

export default SignUp