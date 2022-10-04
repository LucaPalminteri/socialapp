import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { supabase } from "../../../utils/supabaseClient";
import { compare } from "../../../helpers/handleBcrypt"

const loginHandler = (req,res) => {
    const { username, password } = req.body;

    async function fetchUsers() {
      let isUser = false
      let currentUser = {}
      const { data } = await supabase.from("user").select();
      isUser = data.some(user => {
        if(user.username == username && compare(user.password,password)) {
          currentUser = user
          return true
        }
      })
      if(isUser == false) return res.status(401).json({ error: "Invalid credentials" });
      if(isUser == true) {
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            ...currentUser, password:''
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
      }
    }
    fetchUsers()
}

export default loginHandler