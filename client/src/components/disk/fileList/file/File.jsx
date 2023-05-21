import React from 'react';
import dirLogo from '../../../../assets/img/folder_icon.png'
import fileLogo from '../../../../assets/img/file_icon.png'
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";
import { AiOutlineDownload, AiFillDelete } from 'react-icons/ai';
import sizeFormat from "../../../../utils/sizeFormat";
import './file.scss'

const File = ({ file }) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)

    function openDirHandler(file) {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    const hadleImgType = (file) => {
        let imgSrc;
        switch (file.type) {
            case 'dir':
                imgSrc = dirLogo;
                break;
            default:
                imgSrc = fileLogo;
                break;
        }
        return (
            <img src={imgSrc} alt="" className="file__img" />
        )
    }

    if (fileView === 'list') {
        return (
            <div className='file' onClick={() => openDirHandler(file)}>
                {hadleImgType(file)}
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                <div className="file__btns">
                    {file.type !== 'dir' &&
                        <button onClick={(e) => downloadClickHandler(e)} className="file__btn file__download btn"><AiOutlineDownload /></button>}
                    <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete btn"><AiFillDelete /></button>
                </div>
            </div>
        );
    }
    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img" />
                <div className="file-plate__name">{file.name}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                        <button onClick={(e) => downloadClickHandler(e)} className="file-plate__btn file__download btn"><AiOutlineDownload /></button>}
                    <button onClick={(e) => deleteClickHandler(e)} className="file-plate__btn file__delete btn"><AiFillDelete /></button>
                </div>
            </div>
        );
    }

};

export default File;
