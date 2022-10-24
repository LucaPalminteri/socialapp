import { supabase } from "../../../utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from 'next';

const followHandler = (req:NextApiRequest,res:NextApiResponse) => {

    const {user_id, follow_user_id} = req.body;

    const followUser = async () => {
        const {data} = await supabase
        .from('user_follows')
        .insert({
            user_id,
            follow_user_id 
        })
        return res.status(200).json({message: 'Follow testing OK', user_id, follow_user_id})
    }

    followUser()    
}

export default followHandler