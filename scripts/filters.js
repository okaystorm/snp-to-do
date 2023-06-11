const filtersFooter = document.querySelector(".todo-footer");

const filtersCollection = filtersFooter.querySelector(".todo-filter");
const filterAll = filtersFooter.querySelector(".todo-filters__all");
const filterActive = filtersFooter.querySelector(".todo-filters__active");
const filterCompleted = filtersFooter.querySelector(".todo-filters__completed");

filterAll.addEventListener("click", () => {
  filterAll.classList.add("active");
  filterActive.classList.remove("active");
  filterCompleted.classList.remove("active");

  const tasks = document.querySelectorAll(".todo-list-item");

  for (let task of tasks) {
    task.classList.remove("hidden");
  }
});

filterActive.addEventListener("click", () => {
  filterAll.classList.remove("active");
  filterActive.classList.add("active");
  filterCompleted.classList.remove("active");

  const tasks = document.querySelectorAll(".todo-list-item");
  const completedTasks = document.querySelectorAll(".completed");

  for (let task of tasks) {
    if (task.classList.contains("completed")) {
      task.classList.add("hidden");
    }

    if (task.classList.contains("active")) {
      task.classList.remove("hidden");
    }
  }
});

filterCompleted.addEventListener("click", () => {
  filterAll.classList.remove("active");
  filterActive.classList.remove("active");
  filterCompleted.classList.add("active");

  const tasks = document.querySelectorAll(".todo-list-item");

  for (let task of tasks) {
    if (task.classList.contains("completed")) {
      task.classList.remove("hidden");
    }

    if (task.classList.contains("active")) {
      task.classList.add("hidden");
    }
  }
});
