import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

    const jwt = request.cookies.get("token");
    
    if (jwt == undefined) return NextResponse.redirect(new URL("/", request.url));
    
    // TODO: validate if the user is already logged in it shouldn't be able  to re log in

    // if (jwt != undefined) {
    //     console.log("undefindef bro");
    //     if (request.nextUrl.pathname.includes("/login")) {
    //         try {
    //             await jwtVerify(jwt, new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_NAME));
    //             return NextResponse.redirect(new URL("/homepage", request.url));
    //         } catch (error) {
    //             return NextResponse.next();
    //         }
    //     }
    // }

    console.log(request.nextUrl.pathname);
    try {
        const { payload } = await jwtVerify(jwt,new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_NAME));
        console.log(payload);
        return NextResponse.next();
    } catch (error) {
        console.log('e:' + error);
        return NextResponse.next();
    }
}

// it only compare the code above with the pages below
export const config = {
    matcher: ['/homepage','/profile','/create','/settings']
};

