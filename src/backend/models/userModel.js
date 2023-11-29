import mongoose from "mongoose";

const bcrypt = require("bcryptjs");
const validator = require("validator");

import * as utils from "../utils/auth"; 

const UserSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: false,
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dyo0ezwgs/image/upload/v1701015303/defaults/user-avatar_fjqn4g.png",
    },
    email: {
      type: String,
      required: [true, "Email field is mandatory!"],
      validate: [validator.isEmail, "Please provide a valid email"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "User must have a name!"],
    },
    password: {
      type: String,
      required: [true, "Password field is mandatory!"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match!",
      },
    },
    phone: {
      type: String,
      required: [true, "Phone field is mandatory!"],
      unique: true,
    },

    twoFA: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    // roles
    role: {
      type: String,
      enum: {
        values: ["main", "admin", "user", "writer"],
        message: "Role not allowed",
      },
      default: "user",
    },

    // tokens & password changes
    activationToken: String,
    activationExpires: Date,

    code: String, // for Two FA
    codeCreatedAt: Date, 

    passwordResetToken: String,
    passwordChangedAt: Date,
    passwordResetExpires: Date,

    // for authors
    posts: Number
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// hashing password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// updating password changed At date
UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// getting only activated users
UserSchema.pre(/^find/, function (next) {
  this.find({
    active: {
      $ne: false,
    },
  });
  next();
});

// instance method available across all documents

// check if entered password is correct
UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await utils.correctPassword(candidatePassword, userPassword)
}; 
 

// check timeline when password was changed
UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  return utils.changedPasswordAfter(JWTTimestamp, this)
}; 

// creating a password reset token
UserSchema.methods.createPasswordResetToken = function () {
  return utils.createPasswordResetToken(this)
}; 

//   create activation token
UserSchema.methods.createActivationToken = function () {return utils.createActivationToken(this)}


// TODO - check code entered - 2FA
UserSchema.methods.correctCode = async function (candidateCode, userCode) {
  return await bcrypt.compare(candidateCode, userCode);
};

// module.exports 

export default mongoose.models.User || mongoose.model("User", UserSchema);
