import bcrypt from 'bcryptjs' 

const encrypt = async (textPlain:any) => { 
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

const compare = async (passwordPlain:any, hashPassword:any) => {
    return await bcrypt.compare(passwordPlain, hashPassword)
}

export { encrypt, compare }