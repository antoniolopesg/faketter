import 'dotenv/config';
import { createServer } from 'http';
import { app } from './app';
import { config } from './config';

(async () => {
  const server = createServer(app.callback());

  server.listen(config.PORT, () => {
    console.log(`Server listening on http://localhost:${config.PORT}`);
  });
})();
