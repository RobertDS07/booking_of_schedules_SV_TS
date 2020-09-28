import { buildSchema } from 'graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { FlaFlu } from '../models/products/FlaFlu'
import { PingPong } from '../models/products/PingPong'
import { User } from '../models/User'

import createToken from './utils/CreateJwt'
import { Iregister, Tlogin, TcheckTimes, IMarkHour } from './types/types'

export const schema = buildSchema(`
    type Query {
        login(whatsapp:Int!, senha:String!): String
        checkToken(token: String): Boolean
        checkTimes(produto:String!, dia:String!): [Hours]
        forgetPassword(whatsapp:String!): User
    }

    type Mutation {
        register(nome:String!, whatsapp:Int!, casa:Int!, senha:String!): String
        markHour(produto:String!, horario:String!, token:String!, dia:String!): String
    }

    type Hours{
        hora: String
    }

    type User {
        key: String
    }

`)

export const resolvers = {
    register: async ({ whatsapp, casa, nome, senha }: Iregister) => {
        if (senha.length < 5) return new Error('Senha deve conter 5 caracteres ou mais')
        if (casa > 625) return new Error('Casa inválida...')

        const alredyInUse = await User.findOne({ whatsapp })

        if (!!alredyInUse) return new Error('Whatsapp já cadastrado')

        const user = await User.create({ senha, nome, casa, whatsapp })

        user.senha = 'undefined'

        const token = createToken(user)

        return token
    },
    login: async ({ senha, whatsapp }: Tlogin) => {
        const user = await User.findOne({ whatsapp }).select('+senha')

        if (!user || ! await bcrypt.compare(senha, user.senha)) return new Error('Credenciais invalidas')

        user.senha = 'undefined'

        const token = createToken(user)

        return token
    },
    forgetPassword: async ({ whatsapp }: forgetPassword) => {

    },
    checkToken: ({ token }: { token: string }) => {
        const response = jwt.verify(token, process.env.SECRET || 'hjasdhf873fb312', (err) => {
            if (err) return false

            return true
        })

        return response
    },
    checkTimes: async ({ dia, produto }: TcheckTimes) => {
        let product = FlaFlu

        if (produto === 'PingPong') product = PingPong

        const alredyDate = await product.findOne({ dia })

        const res = !!alredyDate ? alredyDate.quemQuando?.filter(e => { if (e.disponivel) return e }) : (await product.create({ dia })).quemQuando?.filter(e => { if (e.disponivel) return e })

        return res
    },
    markHour: async ({ dia, token, horario, produto }: IMarkHour) => {
        let product = FlaFlu

        if (produto === 'PingPong') product = PingPong

        const user: any = jwt.verify(token, process.env.SECRET || 'hjasdhf873fb312', (err, decoded) => {
            if (err) return false

            return decoded
        })

        if (!user) return new Error('Houve algo errado... Tente fazer login novamente.')

        await product.findOneAndUpdate({ dia, quemQuando: { '$elemMatch': { 'hora': horario } } }, { 'quemQuando.$.disponivel': false, 'quemQuando.$.whatsapp': user.user.whatsapp }, { new: true })

        return 'Succes: Horário marcado com sucesso, qualquer dúvida contatar no whatsapp.'
    }
}