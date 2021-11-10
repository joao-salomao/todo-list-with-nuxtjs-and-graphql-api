import { Application, json, urlencoded } from 'express';
import Database from './database';

export default function (app: Application) {
  app.use(json());
  app.use(urlencoded({ extended: false }));

  app.get('/todo', async (_, res) => {
    const items = await Database.all();
    res.send(items);
  });

  app.post('/todo', (req, res) => {
    const { title, description } = req.body;

    const item = Database.add({ title, description });

    res.send(item);
  });

  app.put('/todo/:id', (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const item = Database.update(id, { title, description });

    if (!item) {
      return res.sendStatus(404);
    }

    res.send({ item });
  });

  app.get('/todo', (_, res) => {
    const items = Database.all();

    res.send(items);
  });

  app.get('/todo/:id', (req, res) => {
    const item = Database.findById(req.params.id);

    if (!item) {
      return res.sendStatus(404)
    }

    res.send({ item })
  });

  app.delete('/todo/:id', (req, res) => {
    Database.remove(req.params.id);

    res.send();
  });
}
