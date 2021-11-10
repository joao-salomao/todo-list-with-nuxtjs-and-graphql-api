import { Application } from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
// import Database from './database';

export default function (app: Application) {
  const schema = buildSchema(`
    type Query {
      hello: String
    }
  `);

  const rootValue = {
    hello: () => "Hello world",
  };

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue,
      graphiql: true,
    }),
  );
}
