import { Application } from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import Database from './database';

interface Todo {
  id: string;
  title: string;
  description: string;
}

export default function (app: Application) {
  const schema = buildSchema(`
    type Todo {
      id: ID
      title: String
      description: String
    }

    input InTodo {
      title: String
      description: String
    }

    type Query {
      all: [Todo]
      find(id: ID!): Todo
    }

    type Mutation {
      create(input: InTodo): Todo
      update(id: ID!, input: InTodo): Todo
      delete(id: ID!): Boolean
    }
  `);

  const rootValue = {
    all(): Todo[] {
      return Database.all();
    },

    find(input: { id: string }) {
      return Database.findById(input.id);
    },

    create(input: { title: string, description: string }): Todo {
      return Database.add(input);
    },

    update(input: { id: string, title: string, description: string }): Todo | undefined {
      return Database.update(input.id, input);
    },

    delete(input: { id: string }): boolean {
      return Database.remove(input.id);
    }
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
