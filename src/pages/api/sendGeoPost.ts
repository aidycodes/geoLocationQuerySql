import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { createId } from '@paralleldrive/cuid2';
import { prisma } from "~/server/db";

const GeoPostBody = z.object({
    content: z.string(), 
    lat: z.number(),
    lng: z.number(),
    userId: z.string()
})

type GeoPostBody = z.infer<typeof GeoPostBody>

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const typedBody = GeoPostBody.safeParse(req.body)

        if(!typedBody.success){
            res.status(400).json({message:'TypeError',error: typedBody.error}) //return the input/type error
            console.log('error', typedBody.error)   
        }
        if(typedBody.success){        
            try{
                const newId = createId()  //new cuid
                const {content, lat, lng, userId} = typedBody.data 
            //sql query to insert a geopost into the database
            const query = await prisma.$queryRaw<{ id: string }[]>(
            Prisma.sql`INSERT INTO "GeoPost" (id, content, coords, "userid")
                VALUES (${newId}, ${content}, ST_SetSRID(ST_Point(${lng}, ${lat}),4326),${userId})
                RETURNING id`)

            res.status(200).json({message:'Success',query}) //return the id of the new geopost

            }catch(err){
                console.log(err)
                res.status(500).json({message:'Error',error: err}) //return the server related error
            }
        }

}


/*
      const query = await prisma.$queryRawUnsafe<{ id: string }[]>(
            `INSERT INTO "GeoPost" (id, content, coords, "userId")
             VALUES ('${createId()}', '${content}', ST_SetSRID(ST_Point(${lng}, ${lat}),4326),'${userId}')
              RETURNING id`)
              */