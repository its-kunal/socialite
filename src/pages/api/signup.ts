/*
Route - api/signup
*/


import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../lib/mongodb";
import { IUser } from "../../../models/userInterface";
import userModel from "../../../models/userModel"

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
        .catch(err => {
            console.log("Couldn't connect to DB")
        })
    switch (req.method) {
        case "POST":
            req.body = JSON.parse(req.body) as IUser
            console.log(req.body)
            try {
                await userModel.create(req.body)
            }
            catch (err) {
                res.status(400).json({ "message": "Cannot create User with given credential, try selecting different username / mailid." })
            }
            const { username, password } = req.body
            res.status(200).json({ username, password })
            break
        default:
            res.status(404).json({ "message": "Not Found" })
    }
}


/*
Handler->  path, method, function
/api/signin(POST) -> try creating new user with given data, if true then forward user to home page, else return error with resp. status code.
/api/login(POST) -> match credentials, if true navigate user to home page, else return error with resp. status code

*/