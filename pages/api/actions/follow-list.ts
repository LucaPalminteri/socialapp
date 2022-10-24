import { supabase } from "../../../utils/supabaseClient";
import jwt from "jsonwebtoken"; 
import { NextApiRequest, NextApiResponse } from 'next';

export default function handleUsers(req:NextApiRequest, res:NextApiResponse) { 
    
    const {token} = req.cookies
  
    if (token == "null") return res.status(401).json({ error: "Not logged in" });
    const currentUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);
  
    let followListArr = []
    const getFollowList = async () => {
        try {
            const { data } = await supabase.from("user_follows").select().eq('user_id',currentUser.user_id);
            data.map(user => followListArr.push(user.follow_user_id))
            return res.status(200).json(followListArr)
        }
        catch (error) {
            return res.status(401).json({message:"Error"})
        }
    }
    getFollowList()
}
