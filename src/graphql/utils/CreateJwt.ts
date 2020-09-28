import jwt from 'jsonwebtoken'

const token = <T>(user:T, expiresIn:string) => {
    const token = jwt.sign({user}, process.env.SECRET || 'hjasdhf873fb312', {
        expiresIn
    })

    return token
}

export default token 