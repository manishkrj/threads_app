import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextApiRequest, NextApiResponse } from "next";

// Function to create a timeout handler
const createTimeoutHandler = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>,
  maxDuration: number
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const timeoutPromise = new Promise<void>((_, reject) => {
      setTimeout(() => reject(new Error(`Request timed out after ${maxDuration} seconds`)), maxDuration * 1000);
    });

    try {
      await Promise.race([handler(req, res), timeoutPromise]);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

// Create Next.js route handlers
const { GET: originalGET, POST: originalPOST } = createNextRouteHandler({
  router: ourFileRouter,
});

// Configure number of seconds for the timeout
const maxDuration = 10;

// Wrap the entire GET handler with the timeout function
export const GET = createTimeoutHandler(async (request: NextApiRequest, response: NextApiResponse) => {
  // Your Vercel-specific logic here
  // For example, responding with 'Vercel'
  response.status(200).json({ message: 'Vercel' });
}, maxDuration);

// Wrap the entire POST handler with the timeout function
export const POST = createTimeoutHandler(async (request: NextApiRequest, response: NextApiResponse) => {
  // Your Vercel-specific logic here for POST
  // For example, responding with 'Vercel POST'
  response.status(200).json({ message: 'Vercel POST' });
}, maxDuration);
