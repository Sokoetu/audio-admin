// auth utils
import bcrypt from "bcryptjs"; 
import crypto from "crypto"; 
import jwt from "jsonwebtoken"; 
import { promisify } from 'util';

import User from "../models/userModel"; 
// create and sign jwt token using users id
const signToken = (id) => {
    return jwt.sign(
        {id}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_COOKIE_EXPIRES}
    )
}

// generate & hashed token
const generateToken = () => {
    let token = crypto.randomBytes(32).toString("hex");
    let hashed = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

    return {token, hashed}
}
// compare passwords
const correctPassword = async function(sentPassword, currentPassword) {
    return await bcrypt.compare(sentPassword, currentPassword); 
}

// changed password changed timelines
let changedPasswordAfter = function (timeStamp, currentThis) {
    //JWTTimestamp
    if (currentThis.passwordChangedAt) {
    const changedTimestamp = parseInt(
        currentThis.passwordChangedAt.getTime() / 1000,
        10
    );

    return timeStamp < changedTimestamp;
    }
    return false;
}

// updated password changed date 
let passwordChange = function (next, currentThis) {
    currentThis.passwordChangedAt = Date.now() - 1000;
    next();
}; 

// hash password and save to db 
let hashPassword = async function (next, currentThis) {
    if (!currentThis.isModified("password")) return next();
    currentThis.password = await bcrypt.hash(currentThis.password, 12);
    currentThis.passwordConfirm = undefined;
    
    next();
}; 
// create reset token
let createPasswordResetToken = function (currentThis) {
    let {token, hashed} = generateToken(); 
    currentThis.passwordResetToken = hashed; 
    currentThis.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return token;
}

// create activation token
let createActivationToken = function (currentThis) {
    let {token, hashed} = generateToken(); 
    currentThis.activationToken = hashed; 
    currentThis.activationExpires = Date.now() + 10 * 60 * 1000;
    return token; 
}

// protect routes 
const protect = async (request) => {
    // get token from headers or cookie
    let token = request.headers.get("authorization")?.split(' ')[1]; 
    if (!token && request.cookies.get("_auth")) token = request.cookies.get("_auth").value; 

    // message to send if not authorized
    let response = {
        status: "failed",
        code: 401, 
        message: "Kindly login again"
    }

    if (!token) return response; 

    // decode token to get id
    // verify the id
    // handle errors such as invalid token, & recent password change 
    let decoded = await promisify(jwt.verify) (token, process.env.JWT_SECRET); 
    if (!decoded.id) return response; 
    
    let user = await User.findById(decoded.id).select("+password");
    if (!user) return response; 

    if (user.changedPasswordAfter (decoded.iat)) {
        response.code = 403; 
        response.message = "Password was recently changed. Kindly login again!";
        return response; 
    }

    return {status: "authorized", user}; 
}

// restrict resources to certain roles
const restrictTo = async (roles, user) => {
    if (!roles.includes (user.role)) {
        return {
            status: "failed",
            code: 401, 
            message: "You are not authorized to access the resource!"
        }
    }
    return {status: "authorized"} 
}

export {
    signToken, 
    generateToken, 
    correctPassword, 
    changedPasswordAfter, 
    passwordChange, 
    hashPassword, 
    createPasswordResetToken, 
    createActivationToken,

    protect, restrictTo
}

// export default utils; 