import { createServer } from 'http'
import { app } from './app'

(async () => {
  const server = createServer(app.callback())

  server.listen(8080, () => {
    console.log('Server listening on http://localhost:8080')
  })
})()