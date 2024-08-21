import { todoList } from "./TodoList.js";

const KEY = "todos";

export const LocalStorage = {
  load() {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      todoList.replaceList(JSON.parse(saved));
    }
  },
  save() {
    localStorage.setItem(KEY, JSON.stringify(Array.from(todoList.items)));
  },
};
