import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import z from "zod";
import { Prisma } from "@prisma/client";


const Body = z.object({
    lat: z.number(),
    lng: z.number(),
    r: z.number()
})

type Body = z.infer<typeof Body>


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        const result = Body.safeParse(req.body)
        if(result.success){ 
            const {lng, lat, r} = result.data          
    const query = await prisma.$queryRaw<{ id: string }[]>(
            Prisma.sql`SELECT id, content, coords::text 
            FROM "GeoPost" 
            WHERE ST_DWithin(coords, ST_SetSRID(ST_Point(${lng}, ${lat}),4326), 50) 
                and ST_Distance(coords, ST_SetSRID(ST_Point(${lng}, ${lat}),4326)) > 1` )  //distance in meters
  
  console.log({query})
     
        res.status(200).json({query})
    } else {
        res.status(400).json({error: "Invalid input"})
    }
}