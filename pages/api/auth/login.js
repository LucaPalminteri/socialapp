import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

const loginHandler = (req,res) => {
    const { username, password } = req.body;

    // TODO: validate entry data (user inputs)

    console.log(username);
    console.log(password);

    
    const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
        },
        process.env.NEXT_PUBLIC_TOKEN_NAME
      );

    const serialized = serialize("myTokenName", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
        path: "/",
    });

    res.setHeader("Set-Cookie", serialized);

    return res.status(200).json({
      message: "Login successful",
    });

    // TODO: if something is wrong validate HTTP status errors
    return res.status(401).json({ error: "Invalid credentials" });
}

export default loginHandler