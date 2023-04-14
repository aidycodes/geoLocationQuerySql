import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { createId } from '@paralleldrive/cuid2';
import { prisma } from "~/server/db";

const NewUser = z.object({
    username: z.string(), 
    lat: z.number(),
    lng: z.number(),
})

type NewUser = z.infer<typeof NewUser>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const typedBody = NewUser.safeParse(req.body)

        if(!typedBody.success){
            res.status(400).json({message:'TypeError',error: typedBody.error}) //return the input/type error
            console.log('error', typedBody.error)   
        }
        if(typedBody.success){        
            try{
                const newId = createId()  //new cuid
                const {username, lat, lng } = typedBody.data 
            //sql query to insert a user into the database
            const query = await prisma.$queryRaw<{ id: string }[]>(
            Prisma.sql`INSERT INTO "GeoUser" (id, username, coords )
                VALUES (${newId}, ${username}, ST_SetSRID(ST_Point(${lng}, ${lat}),4326))
                RETURNING id`)

            res.status(200).json({message:'Success',query}) //return the id of the new geopost

            }catch(err){
                console.log(err)
                res.status(500).json({message:'Error',error: err}) //return the server related error
            }
        }

}