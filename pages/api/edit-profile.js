import { supabase } from "../../utils/supabaseClient";
import jwt from "jsonwebtoken"; 

// [PUT]
export default function handleUsers(req, res) {
    const {token} = req.cookies 

    console.log(req.body);

    const currentUsername = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

    const updateUser = async () => {
        const { data,error } = await supabase
        .from("user")
        .update(req.body)
        .eq('user_id',currentUsername.user_id)
        return res.status(200).json(data)
    }
    updateUser()
    //return res.status(200).json({ok:"ok"})
}
