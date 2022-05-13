import { NextResponse } from 'next/server'
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // const session = await getSession({ req });
  const session = await getToken({ req, secret: process.env.SECRET });
  // console.log("session is", session);
  const url = req.nextUrl.clone();
  if (session) {
    url.pathname = session.isAdmin ? "/admin" : "/";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}