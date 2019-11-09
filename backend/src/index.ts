import express from 'express';
import { Model } from 'objection';
import Knex from 'knex';

const knexConfig = require('./knexfile');
import categories from './categories/categories';

const knex = Knex(knexConfig);

Model.knex(knex);

const app = express();

app.use('/categories', categories);

const port = 3000;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
