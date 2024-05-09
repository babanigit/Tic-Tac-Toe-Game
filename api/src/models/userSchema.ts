import mongoose, { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique:true,
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select:false
    },

}, {
    timestamps: true,
})

type user = InferSchemaType<typeof userSchema>;


const User = mongoose.model<user>("UserData", userSchema)
export default User;