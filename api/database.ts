import { v4 as uuidv4 } from 'uuid';

interface ITodo {
  id: string;
  title: string;
  description: string;
}

interface ITodoList {
  add(data: { title: string, description: string }): ITodo;
  remove(id: string): boolean;
  update(id: string, data: { title: string, description: string }): ITodo | undefined;
  findById(id: string): ITodo | undefined;
  all(): ITodo[];
}

class InMemoryDatabase implements ITodoList {
  private items: ITodo[];

  constructor() {
    this.items = [
      {
        id: "1a0f4ca5-e503-41e4-ad66-e7e9e4626940",
        title: "Item 1",
        description: "Consequat non occaecat non ullamco Lorem in et irure proident"
      },
      {
        id: uuidv4(),
        title: "Laborum velit aliqua sint exercitation quis aliqua amet exercitation consectetur non",
        description: "Consequat non occaecat non ullamco Lorem in et irure proident"
      }
    ];
  }

  add(data: { title: string, description: string }): ITodo {
    const id = uuidv4();
    const { title, description } = data;

    const item: ITodo = { id, title, description }

    this.items.push(item);

    return item;
  }

  remove(id: string): boolean {
    const index = this.items.findIndex(item => {
      return item.id == id
    });

    if (index == -1) {
      return false;
    }

    this.items.splice(index, 1);

    return true
  }

  update(id: string, data: { title: string, description: string }): ITodo | undefined {
    const item = this.findById(id);

    if (item) {
      const { title, description } = data;
      item.title = title;
      item.description = description;
    }

    return item;
  }

  findById(id: string): ITodo | undefined {
    return this.items.find(item => item.id === id);
  }

  all(): ITodo[] {
    return this.items;
  }

}

export default new InMemoryDatabase;
