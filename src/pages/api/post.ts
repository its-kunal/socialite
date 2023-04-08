/*
CRD
api/post
GET api/post?interests=""?user="" -> returns all the post with given interest and users.
POST api/post (body)postFields -> creates a new post
DELETE api/post?postId -> delete given post
*/

import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../lib/mongodb";
import postModel from "../../../models/postModel";
import { postInterface } from "../../../models/postInterface"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    switch (req.method) {
        case "GET":
            console.log("req hitted")
            const { interests, userId } = req.query
            let results: postInterface[]
            results = await postModel.find({}).limit(100)
            res.status(200).json(results)
            break
        case "POST":
            let postData = JSON.parse(req.body) as postInterface
            await postModel.create(postData).then((v) => {
                res.status(200).json(v)
            })
                .catch((er) => {
                    res.status(400).json({ "message": "Couldn't create post, try again" })
                })
            // res.status(400).json({ "message": "Couldn't create post, try again" })
            break
        case "DELETE":
            const { postId } = req.query
            await postModel.findByIdAndDelete(postId)
            res.status(200).json({})
            break
        default:

    }
}