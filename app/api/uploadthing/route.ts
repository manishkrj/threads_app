import { createNextRouteHandler } from "uploadthing/next";
import { NextApiRequest, NextApiResponse } from "next";
import { ourFileRouter } from "./core";

// Create Next.js route handler
const handler = createNextRouteHandler({
  router: ourFileRouter,
});

export default handler;

// Optional: You can export other variables or functions if needed
export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';
