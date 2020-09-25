import { buildSchema } from 'graphql'
import jwt from 'jsonwebtoken'

import { Iregister, registerController } from './controllers/register'
import { Tlogin, loginController } from './controllers/login'
import { TcheckTimes, checkTimesController } from './controllers/checkTimes'
import { IMarkHour, markHourController } from './controllers/markHourController'

export const schema = buildSchema(`
    type Query {
        login(whatsapp:Int!, senha:String!): String
        checkToken(token: String): Boolean
    }

    type Mutation {
        register(nome:String!, whatsapp:Int!, casa:Int!, senha:String!): String
        checkTimes(produto:String!, dia:String!): [String]
        markHour(produto:String!, horario:String!, token:String!, dia:String!): String
    }
`)

export const resolvers = {
    register: async (args: Iregister) => {
        const response = await registerController(args)

        return response
    },
    login: async (args: Tlogin) => {
        const response = await loginController(args)

        return response
    },
    checkToken: ({token}: {token:string}) => {
        const response = jwt.verify(token, process.env.SECRET || 'hjasdhf873fb312', (err) => {
            if (err) return false

            return true
        })

        return response
    },
    checkTimes: async (args: TcheckTimes) => {
        const response = await checkTimesController(args)

        return response
    },
    markHour: async (args: IMarkHour) => {
        const response = await markHourController(args)

        return response
    }
}