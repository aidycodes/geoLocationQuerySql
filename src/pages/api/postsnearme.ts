import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import z from "zod";
import { Post, PrismaClient } from "@prisma/client";

const Body = z.object({
    lat: z.number(),
    lng: z.number(),
    r: z.number()
})

type Body = z.infer<typeof Body>

//const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        const result = Body.safeParse(req.body)
        if(result.success){ 
            const {lng, lat, r} = result.data          
    const query = await prisma.$queryRawUnsafe<{ id: string }[]>(
  `SELECT id, content FROM "Post" WHERE ST_DWithin(ST_MakePoint(lng, lat)
  , ST_MakePoint(${lng}, ${lat})::geography, ${r} * 1)`)
    
  const posts = await prisma.post.findMany({
        where: {
            id: {
            in: query.map(({ id }) => id)
            }
        }
        })
     
        res.status(200).json(posts)
    } else {
        res.status(400).json({error: "Invalid input"})
    }
}