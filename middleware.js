import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {

        const jwt = request.cookies.get("token");
        if (jwt == undefined) return NextResponse.redirect(new URL("/", request.url));

        try {
            const { payload } = await jwtVerify(jwt,new TextEncoder().encode(process.env.NEXT_PUBLIC_TOKEN_NAME));
            console.log(payload);
            return NextResponse.next();
        } catch (error) {
            console.log('e:' + error);
            return NextResponse.next();
        }
}

export const config = {
    matcher: ['/homepage','/profile','/create','/settings']
};

