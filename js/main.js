const form = document.querySelector("form");
const input = document.querySelector("input");
const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const addButton = document.querySelector(".site-nav__form-btn");
const editButton = document.querySelector(".site-nav__form-edit-btn");
const searchButton = document.querySelector(".site-nav__form-search-btn");
const clearButton = document.querySelector(".hero__item-clear");
const todoList = document.querySelector(".todo__list");
const heroContent = document.querySelector(".hero__content");

let editButtonClick = false;
let editId = "";

form.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();
  const selected_value = select.value;
  const option_value_search = options[1].value;
  const inputValue = input.value;

  switch (selected_value) {
    case option_value_search:
      break;

    default:
      const id = Date.now();
      const task = inputValue;
      // const completed = 0;

      if (task.trim() && !editButtonClick) {
        createTask(id, task);
        addToLocalStorage(id, task);
        setBackToDefault();
      } else if (task.trim() && editButtonClick) {
        editLocalStorage(editId, task);
        setBackToDefault();
        addButton.classList.remove("hidden");
        todoList.innerHTML = "";
        setupItems();
      }

      break;
  }
}

function createTask(id, task) {
  const todoItem = document.createElement("li");
  todoItem.className = "todo__item";

  let attr = document.createAttribute("data-id");
  attr.value = id;
  todoItem.setAttributeNode(attr);

  todoItem.innerHTML = `<div class="todo__item-block">
<div class="todo__item-selection">
  <input type="checkbox" />
  <label></label>
</div>
<p class="todo__item-text">${task}</p>
</div>
<div class="todo__item-btns">
<div class="todo__item-edit">
  <img
    src="./images/edit-icon.svg"
    alt="edit button icon!" />
</div>
<div class="todo__item-delete">
  <img
    src="./images/delete-icon.svg"
    alt="delete button icon!" />
</div>
</div>`;
  todoList.appendChild(todoItem);

  const deleteBtn = todoItem.querySelector(".todo__item-delete");
  deleteBtn.addEventListener("click", deleteItem);

  const editBtn = todoItem.querySelector(".todo__item-edit");
  editBtn.addEventListener("click", editItem);
}

function addToLocalStorage(id, task) {
  const todoData = { id, task };

  let items = getLocalStorage();
  items.push(todoData);

  localStorage.setItem("data", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];
}

function setBackToDefault() {
  input.value = "";
  addButton.classList.remove("show");
  editButton.classList.remove("show");
  heroContent.style.display = "none";
  editButtonClick = false;
  editId = "";
}

window.addEventListener("DOMContentLoaded", setupItems);

function setupItems() {
  let items = getLocalStorage();
  heroContent.style.display = "flex";

  if (items.length > 0) {
    heroContent.style.display = "none";

    items.forEach((item) => {
      createTask(item.id, item.task);
    });
  }
}

function deleteItem(e) {
  const todoItem = e.target.closest(".todo__item");
  const id = Number(todoItem.dataset.id);

  todoList.removeChild(todoItem);
  removeFromLocalStorage(id);
}

function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("data", JSON.stringify(items));
}

function editItem(e) {
  const todoItem = e.currentTarget.closest(".todo__item");
  const id = Number(todoItem.dataset.id);

  let items = getLocalStorage();

  items = items.find((item) => {
    if (item.id === id) {
      return item;
    }
  });

  input.value = items.task;
  addButton.classList.add("hidden");
  editButton.classList.add("show");
  editButtonClick = true;
  editId = id;
}

function editLocalStorage(id, task) {
  let items = getLocalStorage();

  items = items.map((item) => {
    if (item.id === id) {
      item.task = task;
    }

    return item;
  });

  localStorage.setItem("data", JSON.stringify(items));
}

const buttons = {
  clear: clearButton,
  add: addButton,
  edit: editButton,
  search: searchButton,

  click: function () {
    this.clear.onclick = () => {
      this.clear.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.clear.style.transform = "scale(1)";
      }, 55);
    };

    this.add.onclick = () => {
      this.add.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.add.style.transform = "scale(1)";
      }, 55);
    };

    this.edit.onclick = () => {
      this.edit.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.edit.style.transform = "scale(1)";
      }, 55);
    };

    this.search.onclick = () => {
      this.search.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.search.style.transform = "scale(1)";
      }, 55);
    };
  },
};

buttons.click();

select.onchange = () => {
  const selected_value = select.value;
  const option_value_search = options[1].value;

  switch (selected_value) {
    case option_value_search:
      input.value = "";
      input.placeholder = "Search for a task";
      addButton.classList.add("hidden");
      editButton.classList.remove("show");
      searchButton.classList.add("show");
      editId = "";

      break;

    default:
      input.placeholder = "Add a new task";
      searchButton.classList.remove("show");
      addButton.classList.remove("hidden");

      break;
  }
};
