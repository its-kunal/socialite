/*
Route - api/login
*/


import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../lib/mongodb";
import { IUser } from "../../../models/userInterface";
import userModel from "../../../models/user"
import bcrypt from "bcrypt"

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect()
        .catch(err => {
            console.log("Couldn't connect to DB")
        })
    switch (req.method) {
        case "POST":
            req.body = JSON.parse(req.body) as { username: string, password: string }
            try {
                let primeUsers: any = await userModel.find({ username: req.body.username })
                if (primeUsers.length == 0) {
                    res.status(400).json({ "message": "Sorry no users found with given credentials." })
                }
                primeUsers = primeUsers[0]
                bcrypt.compare(req.body.password, primeUsers.password, function (err, result) {
                    if (result === false) {
                        res.status(400).json({ "message": "Enter Correct Credentials" })
                    }
                })


            }
            catch (err) {
                res.status(400).json({ "message": "Unknown Error Occured" })
            }
            res.status(200)
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