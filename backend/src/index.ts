import express from 'express';
import { Model } from 'objection';
import Knex from 'knex';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import knexConfig from '../knexfile';
import api from './api';

const knex = Knex(knexConfig);
Model.knex(knex);

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());

app.use('/api', api);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
