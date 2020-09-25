import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'

import {schema, resolvers} from './graphql'

const app = express()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

export default app