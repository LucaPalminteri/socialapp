

const signupHandler = (req,res) => {

    const reqe = req.body;

    console.log(reqe);

    return res.status(200).json({message: "for now everything is ok", reqe})
}

export default signupHandler
