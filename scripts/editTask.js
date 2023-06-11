const taskEditing = (task) => {
  const taskSpan = task.querySelector("span");

  taskSpan.addEventListener("dblclick", (evt) => {
    const taskValue = task.textContent.trim();

    let checkbox = task.querySelector("span");
    checkbox.classList.add("hidden");

    let editForm = document.createElement("form");
    editForm.classList.add("edit-task-form");
    editForm.setAttribute("method", "post");

    let editFormInput = document.createElement("input");
    editFormInput.setAttribute("type", "text");
    editFormInput.setAttribute("aria-label", "edit description");
    editFormInput.classList.add("edit-task-input");
    editFormInput.value = task.textContent.trim();

    editForm.appendChild(editFormInput);

    editForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const taskSpan = task.querySelector("span");
      taskSpan.textContent = editFormInput.value;
      checkbox.classList.remove("hidden");
      editForm.remove();
    });

    editForm.addEventListener("keydown", (event) => {
      if (event.code.toLowerCase() === "escape") {
        task.querySelector("span").textContent = taskValue;
        editForm.remove();
        checkbox.classList.remove("hidden");
      }
    });

    editForm.addEventListener("mouseout", (event) => {
      task.querySelector("span").textContent = taskValue;
      editForm.remove();
      checkbox.classList.remove("hidden");
    });

    task.appendChild(editForm);
  });
};

export { taskEditing };
