import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/userReducer";
import { getFiles, searchFiles } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import { API_URL } from "../../config";
import { BsSearch } from 'react-icons/bs';
import avatarLogo from '../../assets/img/avatar.png'
import Logo from '../../assets/img/navbar-logo.png'
import './navbar.scss'

const Navbar = () => {
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [isSearchMobile, setIsSearchMobile] = useState(false)
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
                            
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
            setIsSearchMobile(!isSearchMobile); 
        }
       
    }

    return (
        <div className="navbar">
            <div className="navbar__wrapper container">
                <img src={Logo} alt="" className="navbar__logo" />
                <h2 className="navbar__title">Cloud Storage</h2>

                {isAuth &&  <div className="navbar__search-icon" onClick={() => {setIsSearchMobile(!isSearchMobile)}}><BsSearch /></div>}
              
                <div className={`navbar__search ${isSearchMobile && "navbar__search-mobile"}`}>
                    {isAuth && (<>
                        <BsSearch />
                        <input
                            value={searchName}
                            onChange={e => searchChangeHandler(e)}
                            type="search"
                            placeholder="Search in storage..." />
                    </>)}
                </div>

                {!isAuth && <div className="navbar__login"><NavLink to="/login">Log In</NavLink></div>}
                {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Sign Up</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Sign Out</div>}
                {isAuth && <NavLink to='/profile'>
                    <img className="navbar__avatar" src={avatar} alt="navbar avatar" />
                </NavLink>}
            </div>
        </div >
    );
};

export default Navbar;
