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
            .select('user_id')

            console.log('---------------------------------------------');
            console.log('---------------------------------------------');
            console.log('---------------------------------------------');
            console.log('---------------------------------------------');
            console.log('---------------------------------------------');
            console.log('---------------------------------------------');

            console.log(data[0].user_id);

            try {
                const insert = await supabase
                .from('account_data')
                .insert([{
                  user_id: data[0].user_id,
                  followers:0,
                  following:0,
                  ideas:0
                }],{upsert: false})

                console.log(insert);
              } catch (error) {
                alert(error)
              }
    }
    createUser()


    return res.status(200).json({message: "for now everything is ok", username})
}



export default signupHandler
