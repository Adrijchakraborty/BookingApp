import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../utils/error.js";

export const registerUser = async(req, res, next) =>{
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("B4c0/\/", salt);

        const newUser = await User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save();

        res.status(200).json("User created successfully");
    } catch (error) {
        next(error);
    }
}

export const login = async(req, res, next) =>{
    try {
        const user = await User.findOne({username: req.body.username});

        if(!user) return next(createError(404, "User not found"));

        const ispass = bcrypt.compare(req.body.password, user.password);

        if(!ispass) return next(createError(400,"wrong credentials"));

        const {password,admin,...other} = user._doc;

        const token = jwt.sign({id: user._id,admin:admin},process.env.JWT);

        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json({...other});
    } catch (error) {
        next(error);
    }
}