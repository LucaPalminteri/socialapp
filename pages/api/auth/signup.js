import { supabase } from "../../../utils/supabaseClient";

const signupHandler = (req,res) => {

    const {name, email, username, password, dateOfBirth} = req.body;

    const createUser = async () => {
        const { data, error } = await supabase
            .from('user')
            .insert([{
                fullname: name,
                email,
                username,
                password,
                date_of_birth: dateOfBirth
            }],{upsert: false})
    }
    createUser()


    return res.status(200).json({message: "for now everything is ok", username})
}



export default signupHandler
