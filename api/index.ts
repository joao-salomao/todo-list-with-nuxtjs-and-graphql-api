import express from 'express';
import database from './database';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/todo', async (_, res) => {
  const items = await database.all();
  res.send(items);
});

app.post('/todo', (req, res) => {
  const { title, description } = req.body;

  const item = database.add({ title, description });

  res.send(item);
});

app.put('/todo/:id', (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const item = database.update(id, { title, description });

  if (!item) {
    return res.sendStatus(404);
  }

  res.send({ item });
});

app.get('/todo', (_, res) => {
  const items = database.all();

  res.send(items);
});

app.get('/todo/:id', (req, res) => {
  const item = database.findById(req.params.id);

  if (!item) {
    res.sendStatus(404)
  }

  res.send({ item })
})


export default {
  path: '/api',
  handler: app
}
