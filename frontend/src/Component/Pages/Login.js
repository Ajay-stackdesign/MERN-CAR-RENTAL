import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearError, login } from '../../actions/loginActions'

const Login = () => {
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()
    const { isAuthenticated, error, loading } = useSelector((state) => state.user)
    console.log(isAuthenticated)

    const [email, setEmail] = useState("")
    const [password, setPassord] = useState("")
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isAuthenticated) {
            history.push("/")
            alert.success("Login SucccessFully!")
        }
    }, [alert, dispatch, error, history, isAuthenticated])

    const handdleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <Fragment>
            {loading ? ("Invalid email or password") : (<Fragment>
                <form onSubmit={handdleSubmit}>
                    <div className='email'>
                        <input className='text' type="email" required placeholder="enter the email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='password'>
                        <input className='text' type="password" required placeholder='enter password' value={password} onChange={(e) => setPassord(e.target.value)} />
                    </div>

                    <input className='submit' type="submit" value="submit" />
                </form>
            </Fragment>)}
        </Fragment>
    )
}

export default Login