import { Command, CommandExecutor, COMMANDS } from "./webapp/command.js";
import { LocalStorage } from "./webapp/storage.js";
import { todoList } from "./webapp/TodoList.js";

globalThis.DOM = {};
const DOM = globalThis.DOM;

const renderList = () => {
  DOM.todoList.innerHTML = "";
  for (const item of todoList.items) {
    const todo = document.createElement("li");
    todo.classList.add("todo-item");
    todo.dataset.text = item.text;
    todo.innerHTML = `
      ${item.text} <button class="delete-btn">Delete</button>
    `;
    DOM.todoList.appendChild(todo);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  DOM.addBtn.addEventListener("click", () => {
    CommandExecutor.execute(new Command(COMMANDS.ADD));
  });
  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const todoText = event.target.parentNode.dataset.text;
      CommandExecutor.execute(new Command(COMMANDS.DELETE, [todoText]));
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // order matters here
  // 1. Add listener to re-render the list every time it changes
  // 2. Load the list from the local storage. List change will trigger a render due to step #1
  // 3. Add subscriber to save list to local storage every time it is changes.
  //    We want to subscribe only after list was already loaded from the localStorage to avoid unnecessary re-renders
  todoList.addObserver(renderList);
  LocalStorage.load();
  todoList.addObserver(LocalStorage.save);
});
