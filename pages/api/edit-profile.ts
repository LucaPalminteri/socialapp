import { supabase } from "../../utils/supabaseClient";
import jwt from "jsonwebtoken"; 
import { NextApiRequest, NextApiResponse } from 'next';


// [PUT]
export default function handleUsers(req:NextApiRequest, res:NextApiResponse) {
    const {token} = req.cookies 

    const currentUsername = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

    const updateUser = async () => {
        const { data,error } = await supabase
        .from("users")
        .update(req.body)
        .eq('user_id',currentUsername.user_id)
        return res.status(200).json(data)
    }
    updateUser()
    //return res.status(200).json({ok:"ok"})
}
