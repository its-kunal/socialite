import mongoose, { Schema, model } from "mongoose"
import { postInterface } from "./postInterface"
import { Timestamp } from "firebase/firestore"

export const postSchema = new Schema<postInterface>({
    caption: String,
    comment: Array,
    image: String,
    like: Array,
    owner: String,
    interests: [String],
    timestamp: String
})

export default mongoose.models.Post || mongoose.model("Post", postSchema)