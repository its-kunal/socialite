import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"
import { IUser } from "./userInterface"



export const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    interests: { type: [String] }
})

userSchema.pre(["save"], async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export default mongoose.models.User || mongoose.model('User', userSchema)