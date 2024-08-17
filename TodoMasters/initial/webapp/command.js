import { TodoList } from "./TodoList.js";

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const COMMANDS = Object.freeze({
  ADD: "add",
  DELETE: "delete",
});

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();

    switch (command.name) {
      case COMMANDS.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoInputValue = todoInput.value.trim();
        todoList.add(todoInputValue);
        todoInput.value = "";
        break;
      case COMMANDS.DELETE:
        const [itemTextToDelete] = command.args;
        todoList.delete(itemTextToDelete);
        break;
      default:
        break;
    }
  },
};
