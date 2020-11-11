const todoBox = document.getElementById("root");
const STORAGE_TODO = "STORAGE_TODO";
let todos = {};

if ((todoFromLocal = localStorage.getItem(STORAGE_TODO))) {
  todos = JSON.parse(todoFromLocal);

  for (let key in todos) {
    createList(key, todos[key]);
  }
}

function syncLocalStorage(activity, item, status = false) {
  switch (activity) {
    case "ADD":
    case "UPDATE":
      todos[item] = status;
      break;
    case "DELETE":
      delete todos[item];
      break;
    default:
      break;
  }

  localStorage.setItem(STORAGE_TODO, JSON.stringify(todos));

  return;
}

function add() {
  let input = document.getElementById("input-text");
  if(input.value !== '') {
    createList(input.value);
    syncLocalStorage("ADD", input.value);
  }

  input.value = "";
}

function createList(todo, status = false) {
  let isDone = status ? "done" : "";

  let newTodo = `<li class="list-group-item d-flex justify-content-between">
                        <span class="${isDone}" onclick="toggle(this)">${todo}</span>
                        <span>
                            <i class="fas fa-times fa-lg" onclick="deleteTodo(this)">
                            </i>
                        </span>
                </li>`;

  todoBox.insertAdjacentHTML("afterbegin", newTodo);
}

function toggle(el) {
  let status = el.classList.toggle("done");
  syncLocalStorage("UPDATE", el.innerText, status);
}

function deleteTodo(el) {
  el.parentElement.parentElement.remove();
  syncLocalStorage("DELETE", el.parentElement.parentElement.innerText.trim());
}
