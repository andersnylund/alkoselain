import express from 'express';
import path from 'path';
import { CronJob } from 'cron';
import axios from 'axios';

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

setTimeout(() => {
  // eslint-disable-next-line no-new
  new CronJob(
    '0 */10 0,7-23 * * *',
    () => {
      const frontend = 'https://alkoselain.herokuapp.com';
      const backend = 'https://alkoselain.herokuapp.com/graphql';
      axios
        .get(frontend)
        // eslint-disable-next-line no-console
        .then(res => console.log('frontend status ping: ', res.status));

      axios
        .post(backend, {
          operationName: null,
          variables: {},
          query: '{ categories(orderBy: tyyppi_ASC) { id tyyppi __typename } }',
        })
        // eslint-disable-next-line no-console
        .then(res => console.log('backend status ping: ', res.status));
    },
    null,
    true,
    'Europe/Helsinki',
  );
}, 300000);
