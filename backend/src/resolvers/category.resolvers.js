import { forwardTo } from 'prisma-binding';

export default {
  Query: {
    categories: forwardTo('db'),
  },
};
