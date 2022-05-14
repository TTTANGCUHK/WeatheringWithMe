// CSCI2720 Spring 2022 Group 34

// Group Members: 

// Chan King Kai (1155143995)
// Liu Man Kai (1155144128)
// Tang Tsz Tsun (1155125182) 
// Ho Ka Yu (1155142984)
// Chan Sui Cheung (1155142564)

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