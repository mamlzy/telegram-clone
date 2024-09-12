import { env } from './config/env.js';
import app from './server.js';

async function main() {
  try {
    app.listen({ port: env.PORT });
    console.log(`Server ready at http://localhost:${env.PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
