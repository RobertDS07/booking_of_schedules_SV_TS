import { buildSchema } from 'graphql'

import { Iregister, registerController } from './controllers/register'
import { Tlogin, loginController } from './controllers/login'
import { TcheckTimes, checkTimesController } from './controllers/checkTimes'
import { IMarkHour, markHourController } from './controllers/markHourController'

export const schema = buildSchema(`
    type Query {
        register(nome:String!, whatsapp:Int!, casa:Int!, senha:String!): String
    }

    type Mutation {
        login(whatsapp:Int!, senha:String!): String
        checkTimes(produto:String!, dia:String!): [String]
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
    checkTimes: async (args: TcheckTimes) => {
        const response = await checkTimesController(args)

        return response
    },
    markHour: async (args: IMarkHour) => {
        const response = await markHourController(args)

        return response
    }
}