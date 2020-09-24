import bcrypt from 'bcryptjs'

import {User} from '../../models/User'
import {Iregister} from './register'

export type Tlogin = Pick<Iregister, 'senha' | 'whatsapp'>

export const loginController = async({whatsapp, senha}: Tlogin) => {
    const user = await User.findOne({whatsapp}).select('+senha')

    if (!user || ! await bcrypt.compare(senha, user.senha)) return new Error('Credenciais invalidas')

    const token = '123456'

    return token
}