import React, { useEffect } from 'react';
import Navbar from "./navbar/Navbar";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";
import Footer from "./Footer/Footer";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import './app.scss'

const App = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar />
                <div className="wrapper container">
                    <main className="main">
                        {!isAuth ?
                            <Switch>
                                <Route path="/registration" component={Registration} />
                                <Route path="/login" component={Login} />
                                <Redirect to='/login' />
                            </Switch>
                            :
                            <Switch>
                                <Route exact path="/" component={Disk} />                               
                                <Redirect to="/" />
                            </Switch>
                        }
                    </main>                   
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
