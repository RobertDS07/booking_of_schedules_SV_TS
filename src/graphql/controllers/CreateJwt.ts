import jwt from 'jsonwebtoken'
import {user} from '../../models/User'

const token = (user:user) => {
    const token = jwt.sign(user, process.env.SECRET || 'hjasdhf873fb312', {
        expiresIn: '365d'
    })

    return token
}

export default token 