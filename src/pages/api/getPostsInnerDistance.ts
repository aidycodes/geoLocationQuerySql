import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";
import z from "zod";
import { Post, Prisma } from "@prisma/client";

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
           Prisma.sql`SELECT "GeoUser"."id", "GeoUser"."id", "GeoPost"."created_at", username, content, "GeoPost"."coords"::text 
                FROM "GeoPost" 
            RIGHT JOIN "GeoUser" ON "GeoPost"."userid" = "GeoUser"."id" 
            WHERE ST_DWithin("GeoPost"."coords"
            , ST_MakePoint(${lng}, ${lat})::geography, ${r} * 1)
            ORDER BY created_at desc`)  //distance in meters
  
  console.log({query})
     
        res.status(200).json({query})
    } else {
        res.status(400).json({error: "Invalid input"})
    }
}