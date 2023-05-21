import React from 'react';
import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";
import { Link } from "react-router-dom";
import './profile.scss'

const Profile = () => {
    const dispatch = useDispatch()

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className='profile'>
            <div className="profile__btns">

                <Link to='/' className='profile__back btn'>Back</Link>
                <div className="profile__upload btn">
                    <label htmlFor="profile__upload-input" className="disk__upload-label">Upload Avatar</label>
                    <input accept="image/*" onChange={e => changeHandler(e)} type="file" id="profile__upload-input" placeholder="Upload avatar" className="profile__upload-input" />
                </div>
                <button className='btn' onClick={() => dispatch(deleteAvatar())}>Delete avatar</button>              
            </div>
        </div>
    );
};

export default Profile;
