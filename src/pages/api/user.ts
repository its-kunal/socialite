/*
GET api/user -> 
*/

import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../lib/mongodb";
import { IUser } from "../../../models/userInterface";
import userModel from "../../../models/userModel"

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
    await userModel.findOne({ username: req.body.username })
        .then((v) => {
            if (v) {
                res.status(200).json(v as IUser)
            }
            else {
                res.status(400).json({ "message": "No user found with this credentials" })
            }
        })
        .catch((err) => {
            res.status(500).json({ "message": "Server Error Occured" })
        })
}