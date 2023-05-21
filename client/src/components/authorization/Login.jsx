import React, { useState } from 'react';
import Input from "../../utils/input/Input";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import './authorization.scss'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const hundleAutoFill = () => {
        setEmail('admin@gmail.com');
        setPassword('123');
    }

    return (
        <div className='authorization'>
            <div className="authorization__header">LOGIN</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Your email..." />
            <Input value={password} setValue={setPassword} type="password" placeholder="Your password..." />
            <div className="authorization__btns">
                <button className="authorization__quick-btn btn" onClick={hundleAutoFill}>AutoFill</button>
                <button className="authorization__btn btn" onClick={() => dispatch(login(email, password))}>Log in</button>
            </div>
        </div>
    );
};

export default Login;
