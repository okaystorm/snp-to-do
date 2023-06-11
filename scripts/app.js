import "./filters.js";
import { taskEditing } from "./editTask.js";

const taskList = document.querySelector(".todo-list");
const items = taskList.children;

const newTaskForm = document.querySelector(".add-form");
const newTaskTitle = newTaskForm.querySelector(".add-form__input");

const template = document.querySelector("#new-task-template").content;

const formExpandButton = newTaskForm.querySelector(".form__expand-button");
const counterDiv = document.querySelector(".todo-counter");

const filtersFooter = document.querySelector(".todo-footer");

const clearAllButton = filtersFooter.querySelector(".todo-delete-completed");

let counter = items.length;

// Отображение Clear Completed

const checkEmptyList = () => {
  if (items.length !== 0) {
    filtersFooter.classList.remove("hidden");
  } else {
    filtersFooter.classList.add("hidden");
  }
};

// Удаление задачи

const checkListener = (task) => {
  const deleteButton = task.querySelector(".fa-xmark");
  deleteButton.addEventListener("click", () => {
    task.remove();
    checkEmptyList();
    counter -= 1;
    counterDiv.textContent = "Items left: " + counter;
  });
};

// Добавление новой задачи

newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  counter += 1;

  const taskText = newTaskTitle.value;
  const task = template.cloneNode(true); // true - глубокое копирование со всеми атрибутами
  const taskDescription = task.querySelector("span");
  taskDescription.textContent = taskText;

  taskList.appendChild(task);
  checkboxHandler(items[items.length - 1]);
  checkListener(items[items.length - 1]);
  taskEditing(items[items.length - 1]);

  newTaskTitle.value = "";
  checkEmptyList();

  counterDiv.textContent = "Items left: " + counter;
});

// Чекбокс

const checkActiveQty = () => {
  const checkboxes = document.querySelectorAll(".todo-list-input");
  let completedCount = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked === true) completedCount += 1;
  }

  if (completedCount > 0) {
    clearAllButton.classList.remove("hidden");
  } else {
    clearAllButton.classList.add("hidden");
  }
};

const checkboxHandler = (task) => {
  const checkbox = task.querySelector(".todo-list-input");
  checkbox.addEventListener("change", () => {
    task.classList.toggle("active");
    task.classList.toggle("completed");

    checkActiveQty();
  });
};

// Кнопка быстрого выбора

formExpandButton.addEventListener("click", (event) => {
  event.preventDefault();

  const checkboxes = document.querySelectorAll(".todo-list-input");
  let count = 0;
  for (let i = 0; i < checkboxes.length; i++) {
    if (
      (checkboxes[i].checked = true && items[i].classList.contains("completed"))
    ) {
      count += 1;
    }
  }

  if (count === items.length) {
    for (let checkbox of checkboxes) {
      checkbox.checked = false;
      checkbox.parentElement.parentElement.classList.remove("completed");
      checkbox.parentElement.parentElement.classList.add("active");
    }
  } else {
    for (let checkbox of checkboxes) {
      checkbox.checked = true;
      checkbox.parentElement.parentElement.classList.remove("active");
      checkbox.parentElement.parentElement.classList.add("completed");
    }
  }
  checkActiveQty();
});

clearAllButton.addEventListener("click", (event) => {
  event.preventDefault;

  const completedTasks = document.querySelectorAll(".completed");
  for (let task of completedTasks) {
    task.remove();
    counter -= 1;
  }
  clearAllButton.classList.add("hidden");
  checkEmptyList();
  counterDiv.textContent = "Items left: " + counter;
});
