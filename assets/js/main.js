let todoItems = [];

// Add a todo into array

function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now()
  };

  todoItems.push(todo);

  // Render the todo item in HTML

  const list = document.querySelector(".todo-list");
  list.insertAdjacentHTML(
    "beforeend",
    `
        <li class="todo-item" data-key="${todo.id}">
            <input id="${todo.id}" class="tick" type="checkbox"/>
            <span class="checkmark"></span>
            <span>${todo.text}</span>
            <button class="delete-todo">
                <i class="fas fa-trash"></i>
            </button>
        </li>
    `
  );
}

// Listen for an item to be submitted

const form = document.querySelector(".form");
form.addEventListener("submit", event => {
  event.preventDefault();
  const input = document.querySelector(".todo-input");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

// Interaction with todo items

const list = document.querySelector(".todo-list");
list.addEventListener("click", event => {
  if (event.target.classList.contains("checkmark")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains("delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

// Mark item as done

function toggleDone(key) {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;

  const item = document.querySelector(`[data-key='${key}']`);
  todoItems[index].checked
    ? item.classList.add("done")
    : item.classList.remove("done");
}

// Remove item

function deleteTodo(key) {
  todoItems = todoItems.filter(item => item.id !== Number(key));
  const item = document.querySelector(`[data-key='${key}']`);
  item.remove();

  // remove any whitespaces
  const list = document.querySelector(".todo-list");
  if (todoItems.length === 0) list.innerHTML = "";
}

// Show todays day

document.querySelector("#showDay").innerHTML = moment().format("dddd");
document.querySelector("#showDate").innerHTML = moment().format("MMM Do YY");
