import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
export const maxDuration = 5; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';

// This is the correct definition for the GET function
export function handleGET(request: Request) {
  return new Response('Vercel', {
    status: 200,
  });
}
