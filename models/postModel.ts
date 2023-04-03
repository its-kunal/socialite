import mongoose, { Schema, model } from "mongoose"
import { postInterface } from "./postInterface"
import { Timestamp } from "firebase/firestore"

export const postSchema = new Schema<postInterface>({
    caption: String,
    comment: [{ value: String, owner: String }],
    image: String,
    like: [{ value: Boolean, owner: String }],
    owner: String,
    interest: [String],
    timestamp: Timestamp
})

export default mongoose.models.Post || mongoose.model("Post", postSchema)