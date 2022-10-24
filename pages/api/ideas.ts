import { supabase } from "../../utils/supabaseClient";
import jwt from "jsonwebtoken"; 
import { NextApiRequest, NextApiResponse } from 'next';


// [GET]
export default function handleUsers(req:NextApiRequest, res:NextApiResponse) {
    const {token} = req.cookies 

    const currentUsername = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

    const getUsers = async () => {
        const { data,error } = await supabase
        .from("ideas")
        .select()
        .neq('user_id',currentUsername.user_id)
        .order('created_at');
        return res.status(200).json(data)
    }
    getUsers()
}
