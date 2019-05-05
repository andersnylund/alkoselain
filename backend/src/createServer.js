import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';

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
        endpoint: 'http://localhost:4466',
      }),
    }),
  });

export default createServer;
