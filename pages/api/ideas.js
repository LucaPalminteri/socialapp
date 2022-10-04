import { supabase } from "../../utils/supabaseClient";

// [GET]
export default function handleUsers(req, res) { 

    const getUsers = async () => {
        const { data } = await supabase.from("ideas").select();
        return res.status(200).json(data)
    }
    getUsers()
}
