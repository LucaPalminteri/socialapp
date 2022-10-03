import { supabase } from "./supabaseClient";

async function fetchUsers() {
    const { data } = await supabase.from("account").select();
    return data;
}

export default fetchUsers