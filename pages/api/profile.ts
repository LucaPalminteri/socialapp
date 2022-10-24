import jwt from "jsonwebtoken"; 
import { NextApiRequest, NextApiResponse } from 'next';


export default function profileHandler(req:NextApiRequest, res:NextApiResponse) {
  const {token} = req.cookies
  
  if (token == "null") return res.status(401).json({ error: "Not logged in" });
  else {
     const data = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);
     return res.status(200).json(data);
  }
  
}