import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide password"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please provie email"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please provie password"],
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User;