import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create Next.js route handler
const { GET: originalGET } = createNextRouteHandler({
  router: ourFileRouter,
});

export const runtime = 'edge'; // 'nodejs' is the default

// Combine logic from both GET implementations
export async function GET(request: NextRequest) {
  // Original logic from createNextRouteHandler
  const originalResponse = await originalGET(request);

  // Your additional logic from the second implementation
  const customResponse = NextResponse.json(
    {
      body: request.body,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );

  // Merge or prioritize the responses as needed
  const mergedResponse = {
    ...originalResponse,
    ...customResponse,
    // Add any additional merging logic if needed
  };

  return mergedResponse;
}
