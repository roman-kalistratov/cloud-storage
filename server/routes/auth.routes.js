import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator"

import { verifyToken } from '../middleware/auth.middleware.js'
import fileService from '../services/fileService.js'
import File from '../models/File.js'

const router = express.Router();
router.post('/registration', async (req, res, next) => {

    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const userEmail = await User.find({ email: req.body.email });

        if (userEmail && userEmail.length > 0) {
            res.status(400).send("A user with the same email already exists.")
        }
        else {
            const newUser = new User({
                ...req.body,
                password: hash,
            })

            await newUser.save();
            await fileService.createDir(req, new File({ user: newUser.id, name: '' }))
            res.status(200).send("User has been created.")
        }

    } catch (err) {
        next(err)
    }
})


router.post('/login',
    async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }

            const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"));


            const token = jwt.sign({ id: user.id }, process.env.secretKey);
            return res.cookie("access_token", token, {
                httpOnly: true,
            }).json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })

router.get('/auth', verifyToken,
    async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id })
            const token = jwt.sign({ id: user.id }, process.env.secretKey, { expiresIn: "1h" })

            return res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


export default router
