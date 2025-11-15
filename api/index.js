// api/index.js
import serverless from 'serverless-http';
import app from '../src/server.js'; // path to exported express app

export default serverless(app);
