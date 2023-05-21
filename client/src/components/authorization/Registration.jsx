import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { API_URL } from "../../config";
import { hideLoader, showLoader } from "../../reducers/appReducer";
import { useDispatch } from "react-redux";
import Input from "../../utils/input/Input";
import axios from 'axios';
import './authorization.scss'

const Registration = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()

    const hundleSubmit = async () => {
        try {
            dispatch(showLoader())
            if (!name) setError('User name is required');
            else if (!email) setError('Email is required');
            else if (!password) setError('Password name is required');

            else {
                const res = await axios.post(`${API_URL}api/auth/registration`, {
                    name,
                    email,
                    password
                })
                res.status === 200 ? history.push("/login") : setError("Something went wrong");
            }
        } catch (err) {
            setError(err.response.data);
            setEmail('');
        } finally {
            dispatch(hideLoader())
        }
    }

    return (
        <div className='authorization'>
            <div className="authorization__header">Register</div>
            <Input value={name} setValue={setName} type="text" placeholder="Name" />
            <Input value={email} setValue={setEmail} type="email" placeholder="Email Address" />
            <Input value={password} setValue={setPassword} type="password" placeholder="Passsword" />
            {error && <h3 className='authorization__error'>{error}</h3>}
            <button className="authorization__btn btn" onClick={hundleSubmit}>Sign Up</button>
        </div>
    );
};

export default Registration;
