const addTaskInput = document.querySelector("#add-task-input");
const addTaskButton = document.querySelector("#add-task-button");
const list = document.querySelector("#list");

const checkIfEmpty = () => {
  //Adding a placeholder when there is no tasks
  const noTasksPlaceholder = document.querySelector(".no-tasks-placeholder");
  if (document.querySelectorAll(".list-field").length > 0) {
    noTasksPlaceholder.classList.add("no-tasks-placeholder-off");
  } else {
    noTasksPlaceholder.classList.remove("no-tasks-placeholder-off");
  }
};

const addTask = (taskText) => {
  //Create li in list (in ul)
  const field = document.createElement("li");
  field.className = "list-field";

  //Create input stoing task
  const task = document.createElement("input");
  task.className = "list-field-task";
  task.setAttribute("disabled", true);
  task.value = taskText;
  field.append(task);

  //Create done button
  const doneButton = document.createElement("button");
  doneButton.className = "list-field-done";
  field.append(doneButton);

  //Create del button
  const delButton = document.createElement("button");
  delButton.className = "list-field-del";
  field.append(delButton);

  //Append created field
  list.append(field);
};

addTaskButton.addEventListener("click", () => {
  if (addTaskInput.value.length == 0) {
    //Adding class with animation
    addTaskInput.classList.add("task-input-error");

    //Remove class with animation after specified interval
    setTimeout(() => {
      addTaskInput.classList.remove("task-input-error");
    }, 402);
  } else {
    //Add task and clear input value
    addTask(addTaskInput.value);

    //Check if list is empty
    checkIfEmpty();

    addTaskInput.value = "";
  }
});

list.addEventListener("click", (e) => {
  const parentFiled = e.target.parentElement;
  if (e.target.className === "list-field-del") {
    parentFiled.remove();

    //Check if list is empty
    checkIfEmpty();
  } else if (e.target.className === "list-field-done") {
    parentFiled.children[0].classList.toggle("list-field-task-done");
  }
});
