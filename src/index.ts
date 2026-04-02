import { createServer } from 'node:http';
import { handleRequest } from './presentation/http/router.js';

const port = process.env.PORT || 3000;

createServer(handleRequest).listen(port, () => {
  console.log(`[Dev-Nexus: System Awaken] Operating on port ${port}`);
});
