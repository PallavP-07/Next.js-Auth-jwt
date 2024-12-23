import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const checkPublicPath = path === '/Login' || path === '/SignUp';
        const getCookies = await cookies();
          const token =   getCookies.get("token")?.value || "";

          if( checkPublicPath && token !== ""){
            return NextResponse.redirect(new URL('/users', request.nextUrl))
          }
      
          if( !checkPublicPath && token === ""){
            return NextResponse.redirect(new URL('/Login', request.nextUrl))
          }
          return NextResponse.next();
  }

  export const config = {
    matcher: ['/Login', '/SignUp', '/users'], 
};