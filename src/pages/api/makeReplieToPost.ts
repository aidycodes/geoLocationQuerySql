import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "~/server/db";

const Reply = z.object({
    postId: z.string(),
    userId: z.string(),
    content: z.string()
})

type Reply = z.infer<typeof Reply>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const typedReply = Reply.safeParse(req.body)
    if(!typedReply.success){
        res.status(400).json({message:'TypeError',error: typedReply.error}) //return the input/type error
        console.log('error', typedReply.error)
    }
    if(typedReply.success){
        try{
        const {userId, content, postId} = typedReply.data
    const posts = await prisma.geoReply.create({
        data:{
            content,
            userid:userId,
            postid:postId
        }
    })
    res.status(200).json(posts)
        }catch(err){
            console.log(err)
            res.status(500).json({message:'Error',error: err}) //return the server related error
        }
    }
}