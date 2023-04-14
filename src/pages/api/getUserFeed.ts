import { Prisma } from "@prisma/client";
import type { Post} from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const user = '2'
    const page = 0
    const postID = '333'

    const posts = await prisma.$queryRaw<{posts: Post[]}>(
        Prisma.sql`
            SELECT  "_UserFollows"."B", "_UserFollows"."A", content, "Post"."id", "Post"."userId", username
            FROM "_UserFollows"
            JOIN "Post" ON "Post"."userId" = "_UserFollows"."A"
            JOIN "GeoUser" ON "GeoUser"."id" = "Post"."userId"
            WHERE "_UserFollows"."B" = ${user} 
            AND  ${postID} != "Post"."id"
            ORDER BY "Post"."createdAt" DESC
            OFFSET ${page} * 10
            LIMIT 10
            `
        )

    res.status(200).json(posts)
}
/*
       Prisma.sql`
            SELECT  "_UserFollows"."B", "_UserFollows"."A", content, "Post"."id", "Post"."userId"
            FROM "_UserFollows"
            JOIN "Post" ON "Post"."userId" = "_UserFollows"."A"
            WHERE "_UserFollows"."B" = ${user}
            ORDER BY "Post"."createdAt" DESC
            LIMIT 10
            `
        )
        */