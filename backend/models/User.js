import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    interest: {
        type: String,
    },
    bio: {
        type: String,
    },
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    profession: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
    },
    coverPic: {
        type: String
    },
    resetToken: {
        type: String,
        default: null
    }
});

mongoose.model("User", userSchema);
export const User = mongoose.model("User", userSchema);

