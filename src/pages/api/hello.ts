// Next.js API route support: https://nextjs.org/docs/api-routes/introduction 
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import userModel from "../../../models/userModel"
import { dbConnect } from '../../../lib/mongodb'
import { v4 } from "uuid"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect()
  // sampleRestaurants.find({}).then((v) => {
  //   console.log(v)
  // })
  // mongoose.connection.collection('User').drop()
  userModel.create({ name: "kunal12244", password: "kunal123", username: v4(), interests: ["tech", "food"] })
  res.status(200).json({ name: 'John Doe' })

}
