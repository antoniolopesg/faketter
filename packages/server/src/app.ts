import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'

const app = new Koa()

app.use(bodyParser())
app.use(cors())

export { app }