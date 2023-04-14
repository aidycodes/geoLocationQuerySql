import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import Pusher from "pusher";
import { z } from 'zod';
import { env } from '~/env.mjs';
import pg from 'pg'


type PusherFunction = (channel: string, event: string, data: any) => Promise<any>

const PusherResponse = z.object({
  message: z.string(),
  sender: z.string(),
})

type PusherResponse = z.infer<typeof PusherResponse>


// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


 export const pusher = new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.PUSHER_KEY,
  secret: env.PUSHER_SECRET,
  cluster: env.PUSHER_CLUSTER,
  useTLS: true,
 });


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  
     const pool = new pg.Pool({

      connectionString: env.DATABASE_URL,

    });
   res.json({ message: "completed" });
  }

}