import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import { getGraphQLParameters, processRequest, renderGraphiQL, sendResult, shouldRenderGraphiQL } from 'graphql-helix'

import { schema } from './graphql/schema'

const app = new Koa()

app.use(bodyParser())
app.use(cors())

app.use(async ctx => {
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query
  }

  if(shouldRenderGraphiQL(request)) {
    ctx.response.body = renderGraphiQL()
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request)

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema
    })

    ctx.respond = false
    sendResult(result, ctx.res)
  }
})

export { app }