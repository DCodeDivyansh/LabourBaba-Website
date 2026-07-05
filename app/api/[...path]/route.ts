import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "http://127.0.0.1:5000";

async function proxyRequest(req: NextRequest) {
  const targetUrl = new URL(`${req.nextUrl.pathname}${req.nextUrl.search}`, BACKEND_URL);

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.delete("content-length");

  const body = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method)
    ? await req.text()
    : undefined;

  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
    redirect: "manual",
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("access-control-allow-origin", "*");
  responseHeaders.set("access-control-allow-credentials", "true");
  responseHeaders.set("access-control-allow-methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  responseHeaders.set("access-control-allow-headers", "Content-Type, Authorization");

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export async function GET(req: NextRequest) {
  return proxyRequest(req);
}

export async function POST(req: NextRequest) {
  return proxyRequest(req);
}

export async function PUT(req: NextRequest) {
  return proxyRequest(req);
}

export async function PATCH(req: NextRequest) {
  return proxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return proxyRequest(req);
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("access-control-allow-origin", "*");
  response.headers.set("access-control-allow-methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  response.headers.set("access-control-allow-headers", "Content-Type, Authorization");
  return response;
}
