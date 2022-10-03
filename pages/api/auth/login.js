import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { supabase } from "../../../utils/supabaseClient";

const loginHandler = (req,res) => {
    const { username, password } = req.body;

    // TODO: validate entry data (user inputs)
    
    const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          username,
          password
        },
        process.env.NEXT_PUBLIC_TOKEN_NAME
      );

    const serialized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    return res.status(200).json({message: "Login successful", token, username, password});

    // TODO: if something is wrong validate HTTP status errors
    return res.status(401).json({ error: "Invalid credentials" });
}

export default loginHandler