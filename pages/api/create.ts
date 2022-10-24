import { supabase } from "../../utils/supabaseClient";
import jwt from "jsonwebtoken"; 
import { NextApiRequest, NextApiResponse } from 'next';

const createHandler = (req:NextApiRequest,res:NextApiResponse) => {
    const { token } = req.cookies
    const { title, body } = req.body

    const dataUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);

    const insertPost = async () => {
        const { data, error } = await supabase.from("ideas").insert(
            {
                user_id: dataUser.user_id,
                title,
                body
            }
        );

        if(error != undefined) return res.status(400).json({message: "bad request"})
        return res.status(200).json({message: "idea created succesfully!"})
    }
    insertPost()
}

export default createHandler