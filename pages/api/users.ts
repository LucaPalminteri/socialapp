import { supabase } from "../../utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from 'next';



export default function handleUsers(req:NextApiRequest, res:NextApiResponse) { 

    const getUsers = async () => {
        const { data } = await supabase.from("users").select(`fullname, username`);
        return res.status(200).json(data)
    }
    getUsers()
}
