import crypto from "crypto"; 

import User from "../models/userModel"; 

// utils 
import response, {responseWrapper} from "../utils/server-utils"; 
import {signToken, generateToken} from "../utils/auth"; 

import Mail from "../utils/emailing"; 

// TODO - add sign up with socials and SSO for both login and signup 

// register user 
const createUser = async (request) => {
    return await responseWrapper(request, 
        async () => {
            let data = await request.json();
            let url = new URL(request.url); 

            // get role 
            // by default only one main role can exist
            // the main role creates the admins and writers
            // a user can create an account - but for this admin template, it is disabled

            let role = url.searchParams.get("role") || "main"; 
            if (role !== "main") {
                return response(401, "error", null, "You are not authorized to create an account")
            } else {
                let mains = await User.find({role: "main"}).countDocuments(); 
                if (mains > 0) return response(401, "error", null, "You are not authorized to create an account")

                data.role = "main"; 
                const user = await User.create(data);

                // send user activation token to email if not sso
                const activationToken = user.createActivationToken(); 

                // initiate the email class and call the welcome method
                let email = new Mail(user.email); 
                await email.welcome({name: user.name, token: activationToken})

                await user.save({
                    validateBeforeSave: false,
                });

                return response(201, "success", {doc: user.id}, "User created!")
            }
    })
}

// login user 
const loginUser = async (request) => {
    return await responseWrapper (request, 
        async () => {
            let data = await request.json(); 
            let {email, password} = data; 
            if (!email || !password) return response(400, "error", null, "Email and password must be provided!"); 

            const user = await User.findOne({email}).select("+password"); 
            if (!user) return response(404, "error", null, "User does not exist or is not activated!");
            
            // compare passwords 
            if (!await user.correctPassword(password, user.password)) return response(400, "error", null, "Incorrect password or email!"); 
            
            const token = signToken(user.id);

            return response(200, "success", {
                user: {
                    avatar: user.avatar, 
                    email: user.email, 
                    id: user.id, 
                    name: user.name, 
                    phone: user.phone, 
                    role: user.role
                },
                token
            }, "Login successful!")
        }
    )
}

// activate user 
const activateUser = async (request) => {
    return await responseWrapper(request, 
        async () => {
            let url = new URL(request.url); 
            let token = url.searchParams.get("token"); 

            if (!token) return response(400, "error", null, "No token provided!"); 

            // hash token
            const hashedToken = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex"); 

            // get user with token
            const user = await User.aggregate([
                {
                    $match: {
                        activationToken: hashedToken
                    }
                }
            ]);

            if (user.length === 0) return response(404, "error", null, "Token is invalid or has already been used"); 
            if (new Date(Date.now()) > new Date(user[0].activationExpires)) return response(400, "error", null, "Token has already expired!"); 

            await User.updateOne ({_id: user[0]._id}, {
                active: true,
                activationToken: null,
                activationExpires: null,
              });
            
            return response(200, "success", null, "User has been activated. Login to proceed!")
        }
    )
}

// request another activation token to your email 
const requestActivationToken = async (request) => {
    return await responseWrapper (request, 
        async () => {
            let data = await request.json(); 
            let {email} = data; 

            // get user from db using aggregate pipeline
            // if not activated, using find will not work because of the model pre middleware attached
            const userByEmail = await User.aggregate([
                {
                  $match: {email}
                }
            ]); 
            // if user not present, return error
            if (userByEmail.length === 0) return response(404, "error", null, "User with that email does not exist!"); 
            
            let user = userByEmail[0]; 
            // hand if user is active and if the activation token is active
            if (user.active) return response(400, "error", null, "User is already activated!"); 
            if (user.activationExpires > new Date(Date.now())) {
                return response(400, "error", null, "An active token has already been sent to your email!"); 
            }

            // generate token and hased token and save it to db
            const {token, hashed} = generateToken(); 
            await User.updateOne({_id: user._id}, {
              activationToken: hashed, 
              activationExpires: Date.now() + (10 * 60 * 1000)
            }); 

            // send the token to user's email
            
            await user.save({
                validateBeforeSave: false,
            });

            // initiate the email class and call welcome method
            let mail = new Mail(email); 
            await mail.welcome({name: user.name, token})

            return response(400, "error", null, "Token has been generated and sent to your email. Valid for 10 minutes!")
        }
    )
}

// forgot password 
const forgotPassword = async (request) => {
    return await responseWrapper (request, 
        async () => {
            let data = await request.json(); 
            let {email} = data; 
            if (!email) return response(400, "error", null, "Email is required!"); 

            const user = await User.findOne({email}); 
            if (!user) return response(404, "error", null, "No such user exists in our records!"); 

            if (user.passwordResetExpires > new Date(Date.now())) {
                return response(400, "error", null, "An active reset token is already in your email!"); 
            }

            let resetToken = user.createPasswordResetToken(); 
            await user.save({
                validateBeforeSave: false
            }); 

            // initiate email class and call resetPassword
            let mail = new Mail(email); 
            await mail.resetPassword({name: user.name, token: resetToken})

            return response(200, "success", null, "A reset token has been sent to your email. Valid for 10 minutes!"); 

        }
    )
}

// reset password 
const resetPassword = async (request) => {
    return await responseWrapper (request, 
        async () => {
            let data = await request.json(); 
            let {password, passwordConfirm} = data; 

            if (password !== passwordConfirm) return response(400, "error", null, "Passwords do not match!"); 

            let url = new URL(request.url); 
            let token = url.searchParams.get("token");
            
            if (!token || token === "null") return response(400, "error", null, "Invalid reset token!"); 
            
            // hash token
            const hashedToken = crypto
                .createHash("sha256")
                .update(token)
                .digest("hex")

            // get user using hashed token
            const user = await User.findOne({
                passwordResetToken: hashedToken, 
                passwordResetExpires: {
                    $gt: Date.now()
                }
            }).select("+password"); 
            if (!user) return response(400, "error", null, "Token is invalid or has expired!");
            
            // assess the password to see if they match with saved
            if (await user.correctPassword(password, user.password)) {
                return response(400, "error", null, "New Password matched the current one!")
            }

            user.password = password; 
            user.passwordConfirm = passwordConfirm; 

            user.passwordResetToken = undefined; 
            user.passwordResetExpires = undefined; 

            await user.save(); 

            return response(200, "success", null, "Password reset successfully. Kindly login again!")

        }
    )
}

// handler to route to specific controller; 
export const handler = async (request, params) => {
    return await responseWrapper (request, 
        async () => {
            let action = params.action; 
            let url = new URL(request.url); 
            let type = url.searchParams.get("type"); 
            
            if (action === "register") return await createUser(request); 
            if (action === "activate") return await activateUser(request); 
            if (action === "login") return await loginUser(request); 
            if (action === "request-token") return await requestActivationToken(request); 
            if (action === "password" && type === "forgot") return await forgotPassword(request); 
            if (action === "password" && type === "reset") return await resetPassword(request); 

            return response(404, "error", null, "Route was not found!")
        }
    )
}
