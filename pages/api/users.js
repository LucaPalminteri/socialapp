import { supabase } from "../../utils/supabaseClient";


export default function handleUsers(req, res) { 

    const getUsers = async () => {
        const { data } = await supabase.from("user").select(`fullname, username`);
        return res.status(200).json(data)
    }
    getUsers()
}
