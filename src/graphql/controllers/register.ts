import {User} from '../../models/User'

export interface Iregister {
    nome:string
    whatsapp:number
    senha:string
    casa:number
}

export const registerController = async ({senha, nome, casa, whatsapp}:Iregister) => {
    if (senha.length < 5) return new Error('Senha deve conter 5 caracteres ou mais')
    if (casa > 625) return new Error('Casa inválida...')

    const alredyInUse = await User.findOne({whatsapp})

    if (!!alredyInUse) return new Error('Whatsapp já cadastrado')
    
    const user = await User.create({senha, nome, casa, whatsapp})

    // usar jwt
    const token = '123456'

    return token
}