import { supabase } from "../../../utils/supabaseClient";

const followHandler = (req,res) => {

    const {user_id, follow_user_id} = req.body;

    const followUser = async () => {
        const {data} = await supabase
        .from('user_follows')
        .insert([{
            user_id,
            follow_user_id 
        }],{upsert: false})
        return res.status(200).json({message: 'Follow testing OK', user_id, follow_user_id})
    }

    followUser()    
}

export default followHandler