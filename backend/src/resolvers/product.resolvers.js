import { forwardTo } from 'prisma-binding';

export default {
  Query: {
    productsConnection: forwardTo('db'),
  },
};
