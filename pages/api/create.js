import { supabase } from "../../utils/supabaseClient";
import jwt from "jsonwebtoken"; 

const createHandler = (req,res) => {
    const { token } = req.cookies
    const { title, body } = req.body

    const dataUser = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_NAME);
    console.log(dataUser.user_id);
    console.log('title: '+title);
    console.log('body: ' + body);

    const insertPost = async () => {
        const { data } = await supabase.from("ideas").insert(
            {
                user_id: dataUser.user_id,
                title,
                body
            }
        );
        return res.status(200).json({message: "idea created succesfully!"})
    }
    insertPost()
}

export default createHandler