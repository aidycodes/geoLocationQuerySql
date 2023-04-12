import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";

const UserId = z.object({
    userId: z.string()
})
type UserId = z.infer<typeof UserId>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const typedUserId = UserId.safeParse(req.body)
    if(!typedUserId.success){
        res.status(400).json({message:'TypeError',error: typedUserId.error}) //return the input/type error
        console.log('error', typedUserId.error)
    }
    if(typedUserId.success){
        try{
        const {userId} = typedUserId.data
        const posts = await prisma.geoUser.findMany({
            where:{
                id: userId
            }
    })
    res.status(200).json(posts)
        }catch(err){
            console.log(err)
            res.status(500).json({message:'Error',error: err}) //return the server related error
        }
    }
}