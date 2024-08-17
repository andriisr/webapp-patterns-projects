import { Command, CommandExecutor, COMMANDS } from "./webapp/command.js";
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

  todoList.addObserver(renderList);
});
