import { v4 as uuidv4 } from 'uuid';


interface ItemInterface {
  id: string;
  title: string;
  description: string;
}

interface TodoListInterface {
  add(data: { title: string, description: string }): ItemInterface;
  remove(id: string): void;
  update(id: string, data: { title: string, description: string }): ItemInterface | undefined;
  findById(id: string): ItemInterface | undefined;
  all(): ItemInterface[];
}

class Item implements ItemInterface {
  id: string;
  title: string;
  description: string;

  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}


class InMemoryDatabase implements TodoListInterface {
  private items: Item[];

  constructor() {
    this.items = [
      {
        id: uuidv4(),
        title: "Laborum velit aliqua sint exercitation quis aliqua amet exercitation consectetur non",
        description: "Consequat non occaecat non ullamco Lorem in et irure proident"
      },
      {
        id: uuidv4(),
        title: "Laborum velit aliqua sint exercitation quis aliqua amet exercitation consectetur non",
        description: "Consequat non occaecat non ullamco Lorem in et irure proident"
      }
    ];
  }

  add(data: { title: string, description: string }): Item {
    const id = uuidv4();
    const { title, description } = data;

    const item: Item = { id, title, description }

    this.items.push(item);

    return item;
  }


  remove(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }
  update(id: string, data: { title: string, description: string }): Item | undefined {
    const item = this.findById(id);

    if (item) {
      const { title, description } = data;
      item.title = title;
      item.description = description;
    }

    return item;
  }
  findById(id: string): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  all(): Item[] {
    return this.items;
  }
}

export default new InMemoryDatabase;
