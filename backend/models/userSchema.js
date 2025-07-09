import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is empty"] },
    email: { type: String, required: [true, "email is empty"], unique: [true, "Email is already in use"] },
    password: { type: String, required: [true, "password is empty"] },
    dob: { type: Date, required: [true, "dob is empty"] },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;