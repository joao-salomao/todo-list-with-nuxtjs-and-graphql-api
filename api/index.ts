import express from 'express';
import setupRestApi from './rest';
import setupGraphqlApi from './graphql';

const app = express();

setupRestApi(app);
setupGraphqlApi(app);

export default {
  path: '/api',
  handler: app
}
