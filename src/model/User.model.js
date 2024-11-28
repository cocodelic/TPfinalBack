import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user'
    },
    emailValidate: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    created_in:{
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model('User', userSchema)

export default User