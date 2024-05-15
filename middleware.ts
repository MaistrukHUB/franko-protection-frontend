import { NextResponse } from "next/server";
import * as Api from "./api";
import { parseCookies } from "nookies";

export async function middleware(request: any) {
  let token = request.cookies.get("_token");
  console.log("token", token.value);

  const admin = await Api.auth.checkRole(token.value);
  console.log("admin", admin);
  if (!admin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};
