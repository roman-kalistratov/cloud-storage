import React, { useEffect, useState } from 'react';
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import Uploader from "./uploader/Uploader";
import { setCurrentDir, setFileView, setPopupDisplay } from "../../reducers/fileReducer";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import sizeFormat from "../../utils/sizeFormat";
import { RxHamburgerMenu } from 'react-icons/rx';
import './disk.scss'

const Disk = () => {
    const dispatch = useDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')
    const [isActive, setIsActive] = useState(false)
    const currentDir = useSelector(state => state.files.currentDir)
    const loader = useSelector(state => state.app.loader)
    const dirStack = useSelector(state => state.files.dirStack)
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
        setIsActive(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDir, sort])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
        setIsActive(!isActive);
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
        setIsActive(!isActive);
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setIsActive(!isActive);
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
        setIsActive(!isActive);
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
        setIsActive(!isActive);
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
        setIsActive(!isActive);
    }

    if (loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return (!dragEnter ?
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className="disk__user-info">
                <h3>Hello {user && user.currentUser.name}</h3>
                <p className='disk__user-info-diskSpace'>Disk space : {sizeFormat(user.currentUser.diskSpace)}</p>
                <p className='disk__user-info-usedSpace'>Used space : {sizeFormat(user.currentUser.usedSpace)}</p>
            </div>
            <div className="disk__wrapper">
                <div className="disk__hamburger" onClick={() => setIsActive(!isActive)}><RxHamburgerMenu /></div>

                <div className={`disk__btns ${isActive && "mobile__btns"}`}>
                    <button className="disk__back btn" onClick={() => backClickHandler()}>Back</button>
                    <button className="disk__create btn" onClick={() => showPopupHandler()}>New folder</button>
                    <div className="disk__upload btn">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">File upload</label>
                        <input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input" />
                    </div>
                    <select value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className='disk__select'>
                        <option value="name">by name</option>
                        <option value="type">by type</option>
                        <option value="date">by date</option>
                    </select>
                </div>

                <div className="disk__view">
                    <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))} />
                    <button className="disk__list" onClick={() => dispatch(setFileView('list'))} />
                </div>
            </div>

            <FileList />
            <Popup />
            <Uploader />
        </div>
        :
        <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            Drag and drop files here
        </div>
    );
};

export default Disk;
