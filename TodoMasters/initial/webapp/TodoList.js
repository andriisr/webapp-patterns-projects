import { observerMixin } from "./observerMixin.js";
import { TodoItem } from "./TodoItem.js";

export class TodoList {
  #data = new Set();

  get items() {
    return this.#data;
  }

  // Singleton
  static instance = null;
  static {
    this.instance = new TodoList();
  }
  constructor() {
    if (TodoList.instance) {
      throw new Error("Use TodoList.getInstance to access the list");
    }
  }
  static getInstance() {
    return this.instance;
  }

  // List behavior
  add(text) {
    if (!this.find(text)) {
      this.#data.add(new TodoItem(text));
      this.notify();
    }
  }

  delete(text) {
    const itemToDelete = this.find(text);
    if (itemToDelete) {
      this.#data.delete(itemToDelete);
      this.notify();
    }
  }

  find(text) {
    const itemToFind = new TodoItem(text);
    return Array.from(this.#data).find((item) => item.equals(itemToFind));
  }

  replaceList(list) {
    const newList = new Set();
    for (const item of list) {
      newList.add(new TodoItem(item.text));
    }
    this.#data = newList;
    this.notify();
  }
}

Object.assign(TodoList.prototype, observerMixin);

export const todoList = TodoList.getInstance();
