import User from "../models/User.js";

export const registerUser = async(req, res, next) =>{
    try {
        const newUser = await User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        await newUser.save();

        res.status(200).json("User created successfully");
    } catch (error) {
        next(error);
    }
}