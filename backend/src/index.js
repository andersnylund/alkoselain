import express from 'express';
import path from 'path';
import { CronJob } from 'cron';
import https from 'https';

import './env';
import createServer from './createServer';

const server = createServer();

server.start(
  {
    endpoint: '/graphql',
    playground: '/playground',
    subscriptions: '/subscriptions',
    port: process.env.PORT,
  },
  deets => {
    // eslint-disable-next-line no-console
    console.log('Server running: \n', deets);
  },
);

const relativeFrontendBuildPath = '../../frontend/build';

// Serve static files from the React app
server.express.use(
  express.static(path.join(__dirname, relativeFrontendBuildPath)),
);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
server.express.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, relativeFrontendBuildPath, '/index.html'));
});

// eslint-disable-next-line no-new
new CronJob(
  '0 */10 7-23 * * *',
  async () => {
    const url = 'https://alkoselain.herokuapp.com';
    // eslint-disable-next-line no-console
    console.log(`Pinging ${url}`);
    https.get(url, res => {
      console.log(res.statusCode);
    });
  },
  null,
  true,
  'Europe/Helsinki',
);
