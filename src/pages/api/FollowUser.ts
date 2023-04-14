import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";


const Body = z.object({
    userId: z.string(),
    followingId: z.string()
})

type Body = z.infer<typeof Body>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const result = Body.safeParse(req.body)
    if(result.success){

    const updated = await prisma.geoUser.update({
        where: {
            id: result.data.userId
        },
        data: {
            following: {
                connect: {
                    id: result.data.followingId
                }
            }
        }
    })
    console.log(updated)
        res.status(200).json({msg:'success',updated})
} else {
    res.status(400).json({error: "Invalid input"})
}

  
}