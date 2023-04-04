import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

interface Body extends NextApiRequest {
    body:{input: string,
        data:{
    lat: number,
    lng: number
        }
    }
}

export default async function handler(req: Body, res: NextApiResponse) {

 console.log(req.body)
  const post = await prisma.post.create({
        data: {
            content: req.body.input,
            lat: req.body.data.lat,
            lng: req.body.data.lng,
        }
    })
 res.status(200).json(post)
}