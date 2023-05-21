import express from "express";
import {verifyToken} from '../middleware/auth.middleware.js'
import fileController from '../controllers/fileController.js'

const router = express.Router();
router.post('', verifyToken, fileController.createDir)
router.post('/upload', verifyToken, fileController.uploadFile)
router.post('/avatar', verifyToken, fileController.uploadAvatar)
router.get('', verifyToken, fileController.getFiles)
router.get('/download', verifyToken, fileController.downloadFile)
router.get('/search', verifyToken, fileController.searchFile)
router.delete('/', verifyToken, fileController.deleteFile)
router.delete('/avatar', verifyToken, fileController.deleteAvatar)

export default router
