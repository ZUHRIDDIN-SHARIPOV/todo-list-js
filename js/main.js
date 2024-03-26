const form = document.querySelector("form");
const input = document.querySelector("input");
const select = document.querySelector("select");
const options = document.querySelectorAll("option");
const clearButton = document.querySelector(".hero__item-clear");
const addButton = document.querySelector(".site-nav__form-btn");
const editButton = document.querySelector(".site-nav__form-edit-btn");
const searchButton = document.querySelector(".site-nav__form-search-btn");

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
  const selectedValue = select.value;
  const defaultValue = options[0].value;
  const searchValue = options[1].value;

  if (selectedValue === searchValue) {
    input.placeholder = "Search for a task";
    addButton.classList.add("hidden");
    searchButton.classList.add("show");
  } else {
    input.placeholder = "Add a new task";
    searchButton.classList.remove("show");
    addButton.classList.remove("hidden");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value;
  const selectedValue = select.value;
  const defaultValue = options[0].value;
  const searchValue = options[1].value;

  if (selectedValue === defaultValue) {
    console.log(inputValue);
  }
});
