import mongoose from "mongoose"

export async function dbConnect() {
    const r = await mongoose.connect(`mongodb+srv://kunal-admin:${process.env.DB_PASS}@cluster0.lpazz1r.mongodb.net/?retryWrites=true&w=majority`).then((v) => {
        return v
    })
    return r
}