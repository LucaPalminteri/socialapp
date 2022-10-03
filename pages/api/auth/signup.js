import { supabase } from "../../../utils/supabaseClient";

const signupHandler = (req,res) => {

    const reqe = req.body;

    const insertUser = async () => {
        const { data,error } = await supabase
            .from('user')
            .insert([{
                email: "example2"
            }],{upsert: false})
            console.log(data);
    }
    insertUser()

    console.log(reqe);

    return res.status(200).json({message: "for now everything is ok", reqe})
}



export default signupHandler
