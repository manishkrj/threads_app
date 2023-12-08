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
export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Execute both original and custom logic concurrently
    const [originalResponse, customResponse] = await Promise.all([
      originalGET(request),
      getNextResponse(request),
    ]);

    // Merge or prioritize the responses as needed
    const mergedResponse = {
      ...originalResponse,
      ...customResponse,
      // Add any additional merging logic if needed
    };

    return mergedResponse;
  } catch (error) {
    // Handle errors and return an appropriate response
    console.error("Error:", error);

    // Return a valid error response conforming to Response type
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Function to perform custom logic and return NextResponse
async function getNextResponse(request: NextRequest): Promise<Response> {
  return NextResponse.json(
    {
      body: request.body,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}
