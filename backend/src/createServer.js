import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';

import './env';
import resolvers from './resolvers';

const createServer = () =>
  new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    context: req => ({
      ...req,
      db: new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: process.env.PRISMA_ENDPOINT,
      }),
    }),
  });

export default createServer;
