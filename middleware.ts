import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/report";
    return NextResponse.rewrite(url);
  }

  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: ["/", "/safety", "/company", "/careers"],
};
