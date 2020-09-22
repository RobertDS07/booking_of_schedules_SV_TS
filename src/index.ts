import app from './server'
import {connectDB} from './database'

connectDB()

app.listen(process.env.PORT || 8081, () => console.log('8081'))