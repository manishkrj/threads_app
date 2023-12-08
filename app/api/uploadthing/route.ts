import { createNextRouteHandler } from "uploadthing/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
export const maxDuration = 5; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

// Implement the GET route handler
export default async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'Vercel' });
}
