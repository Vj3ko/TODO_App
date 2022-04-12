//theme switcher
const themeSwitcher = document.querySelector("[data-theme-toggler]");
const body = document.querySelector("body");

let theme = JSON.parse(localStorage.getItem("theme")) || "dark-theme";
body.classList.add(theme);

themeSwitcher.addEventListener("click", () => {
  themeToggler();
});

//toggle between dark and light themes and save it to local storage
function themeToggler() {
  let activeTheme = body.className;

  activeTheme == "light-theme"
    ? (body.className = "dark-theme") &&
      localStorage.setItem("theme", JSON.stringify("dark-theme"))
    : (body.className = "light-theme") &&
      localStorage.setItem("theme", JSON.stringify("light-theme"));
}

//selectors
const form = document.querySelector("[data-form]");
const input = document.querySelector("[data-input]");
const todoList = document.querySelector("[data-list]");
const counterElement = document.querySelector("[data-counter]");
const tabs = document.querySelectorAll("[data-tabs]");
const clearBtn = document.querySelector("[data-clear]");
//

let todoItems = JSON.parse(localStorage.getItem("todos")) || [];

//addtodo adds a new todo to the list
function addTodo() {
  let text = input.value.trim();
  if (text == "") return;

  let todo = {
    id: Math.floor(Math.random() * Date.now()),
    name: input.value,
    checked: false,
  };

  todoItems.push(todo);
  localStorage.setItem("todos", JSON.stringify(todoItems));

  input.value = "";
  input.focus();
  showActiveTab(tabs[0]);
  updateTodos();
}

//searches for local storage if it exits and updates the list
function updateTodos() {
  todoItems = JSON.parse(localStorage.getItem("todos")) || [];
  removeAllTodos(todoList);
  countActiveTodos();

  todoItems.forEach((todo, index) => {
    renderTodo(todo, index);
  });
}

// when addind new todo to the list, removes all todos to make sure we dont get double values
function removeAllTodos(todos) {
  while (todos.firstChild) {
    todos.removeChild(todos.firstChild);
  }
}

//render todo component
function renderTodo(todo, index) {
  let fragment = document.createDocumentFragment();

  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");
  listItem.setAttribute("id", `${todo.id}`);
  todo.checked ? listItem.classList.add("completed") : null;

  const checkboxElement = document.createElement("input");
  checkboxElement.classList.add("todo-item-input");
  checkboxElement.setAttribute("type", "checkbox");
  checkboxElement.setAttribute("data-index", `${index}`);
  checkboxElement.setAttribute("id", `item_${todo.id}`);
  todo.checked
    ? (checkboxElement.checked = true)
    : (checkboxElement.checked = false);

  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", `item_${todo.id}`);
  labelElement.classList.add("todo-label");
  labelElement.innerHTML = `<p class="todo-text">${todo.name}</p>`;

  const spanElement = document.createElement("span");
  spanElement.classList.add("todo-check");

  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("data-index", `${index}`);
  deleteButton.setAttribute("data-delete-button", ``);
  deleteButton.setAttribute("aria-label", `Remove todo`);
  deleteButton.classList.add("todo-delete-button");
  deleteButton.innerHTML = `<img
    class="todo-delete-button-image"
    src="./images/icon-cross.svg"
  />`;

  labelElement.appendChild(spanElement);
  listItem.append(checkboxElement, labelElement, deleteButton);
  fragment.appendChild(listItem);
  todoList.appendChild(fragment);

  checkboxElement.addEventListener("click", () => checkHandler(listItem));
  deleteButton.addEventListener("click", (e) => deleteHandler(e));
}

// checks a selected todo item to complete
function checkHandler(listItem) {
  let checkbox = listItem.querySelector("input[type=checkbox]");
  let index = checkbox.dataset.index;

  todoItems[index].checked = !todoItems[index].checked;
  todoItems[index].checked
    ? listItem.classList.add("completed")
    : listItem.classList.remove("completed");

  countActiveTodos();
  localStorage.setItem("todos", JSON.stringify(todoItems));
}

//deletes selected todo item
function deleteHandler(e) {
  let index = e.target.dataset.index;

  todoItems.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todoItems));
  updateTodos();
}

// clear only completed todos
function clearCompletedTodos() {
  let filtered = [];
  todoItems.filter((todo) => {
    if (!todo.checked) filtered.push(todo);
    return filtered;
  });

  localStorage.setItem("todos", JSON.stringify(filtered));
  updateTodos();
}

//count how many todos are left uncompleted
function countActiveTodos() {
  let counter = 0;
  counter = todoItems.filter((todo) => !todo.checked).length;
  counter == 1
    ? (counterElement.innerHTML = `${counter} item left`)
    : (counterElement.innerHTML = `${counter} items left`);
}

// adds bluish color style to filtering button
function showActiveTab(filter) {
  tabs.forEach((tab) => tab.classList.remove("active"));
  filter ? filter.classList.add("active") : null;
}

// filter todo list depending on filter button pressed
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    showActiveTab(tab);

    const todos = todoList.children;
    const filterBtn = e.target.value;

    for (let todo of todos) {
      switch (filterBtn) {
        case "all":
          if (todo) todo.classList.remove("disappear");
          break;
        case "active":
          todo.classList.contains("completed")
            ? todo.classList.add("disappear")
            : todo.classList.remove("disappear");
          break;
        case "completed":
          !todo.classList.contains("completed")
            ? todo.classList.add("disappear")
            : todo.classList.remove("disappear");
          break;
      }
    }
  });
});

updateTodos();

//event listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo();
});

clearBtn.addEventListener("click", clearCompletedTodos);

//sorting todo items with dragndrop
new Sortable(todoList, {
  swap: true,
  ghostClass: "selected",
  swapClass: "highlight",
  animation: 500,
  // save sorted list to local storage
  onSort: () => {
    let listChildren = todoList.childNodes;
    let storageCurrent = JSON.parse(localStorage.getItem("todos"));
    let storageSorted = [];
    let results = [];

    listChildren.forEach((child) => {
      const itemKey = child.id;
      results.push(itemKey);
    });

    results.forEach((result) => {
      let isFound = false;
      storageCurrent.forEach((item, index) => {
        if (isFound) return;
        if (item.id == result) {
          storageSorted.push(item);
          storageCurrent.splice(index, 1);
          isFound = true;
        }
      });
    });

    localStorage.setItem("todos", JSON.stringify(storageSorted));
  },
});
