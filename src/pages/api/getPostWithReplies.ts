import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";

const getUserPostBody = z.object({
    postId: z.string()
})


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const typedBody = getUserPostBody.safeParse(req.body)
    if(!typedBody.success){
        res.status(400).json({message:'TypeError',error: typedBody.error}) //return the input/type error
        console.log('error', typedBody.error)
    }
    if(typedBody.success){
        try{
        const {postId} = typedBody.data
    const posts = await prisma.geoPost.findMany({
        where:{
            id: postId
        },
        include:{
            replies: {
                orderBy:{
                    createdAt: 'asc'
                },
                include:{
                    user: true
            }
        },  
        }
    })
    res.status(200).json(posts)
        }catch(err){
            console.log(err)
            res.status(500).json({message:'Error',error: err}) //return the server related error
        }
    }
}