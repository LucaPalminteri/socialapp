import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

    const jwt = request.cookies.get("token");
    
    if (jwt == undefined) return NextResponse.redirect(new URL("/", request.url));
    
    // TODO: validate if the user is already logged in it shouldn't be able  to re log in
    
    try {
        const { payload } = await jwtVerify(jwt,new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_NAME));
        return NextResponse.next();
    } catch (error) {
        return NextResponse.next();
    }
}

// it only compare the code above with the pages below
export const config = {
    matcher: ['/homepage','/profile','/create','/settings']
};

