import mongoose, { mongo } from "mongoose";

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', usersSchema);

export default userModel;