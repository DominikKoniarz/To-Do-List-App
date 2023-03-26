const addTaskInput = document.querySelector("#add-task-input");
const addTaskButton = document.querySelector("#add-task-button");
const list = document.querySelector("#list");
const noTasksPlaceholder = document.querySelector(".no-tasks-placeholder");

//localStorage.clear();

const renderList = () => {
	const allTasks = JSON.parse(localStorage.getItem("toDoListData"));

	//removing all tasks from list
	list.querySelectorAll(".list-field").forEach((e) => {
		e.remove();
	});

	if (!allTasks || allTasks.length === 0) {
		//Removing class which disables placeholder | turning on placeholder
		noTasksPlaceholder.classList.remove("no-tasks-placeholder-off");
	} else {
		//Adding class which adds placeholder when there is no tasks
		noTasksPlaceholder.classList.add("no-tasks-placeholder-off");

		for (key in allTasks) {
			//Create li in list (in ul)
			const field = document.createElement("li");
			field.className = "list-field";

			//Create input stoing task
			const task = document.createElement("input");
			task.className = "list-field-task";
			task.setAttribute("disabled", true);
			task.value = allTasks[key].taskContent;
			allTasks[key].ifDone
				? task.classList.add("list-field-task-done")
				: task.classList.remove("list-field-task-done");
			field.append(task);

			//Create done button
			const doneButton = document.createElement("button");
			doneButton.className = "list-field-done test";
			field.append(doneButton);

			//Create del button
			const delButton = document.createElement("button");
			delButton.className = "list-field-del";
			field.append(delButton);

			//append new field
			list.appendChild(field);
		}
	}
};

const setTaskDone = (doneTask) => {
	list.querySelectorAll(".list-field").forEach((el, index) => {
		if (doneTask.parentElement == el) {
			const allTasks = JSON.parse(localStorage.getItem("toDoListData"));

			//change task ifDone state
			allTasks[index].ifDone = !allTasks[index].ifDone;

			localStorage.setItem("toDoListData", JSON.stringify(allTasks));

			//rendering whole list
			renderList();
		}
	});
};

const deleteTask = (taskToRemove) => {
	list.querySelectorAll(".list-field").forEach((el, index) => {
		if (taskToRemove.parentElement === el) {
			const allTasks = JSON.parse(localStorage.getItem("toDoListData"));

			//removing one item with index position
			allTasks.splice(index, 1);

			// if (allTasks.length === 0) {
			// 	localStorage.removeItem("toDoListData");
			// } else {
			// 	//saving tasks in local storage
			// 	localStorage.setItem("toDoListData", JSON.stringify(allTasks));
			// }
			localStorage.setItem("toDoListData", JSON.stringify(allTasks));

			//rendering whole list
			renderList();
		}
	});
};

const addTaskToLocalStorage = (taskText) => {
	if (taskText.length == 0) {
		//Adding class with animation
		addTaskInput.classList.add("task-input-error");

		//Remove class with animation after specified interval
		setTimeout(() => {
			addTaskInput.classList.remove("task-input-error");
		}, 402);
	} else {
		const newTask = {
			taskContent: taskText,
			ifDone: false,
		};

		if (!localStorage.getItem("toDoListData")) {
			const tasksArray = [newTask];
			localStorage.setItem("toDoListData", JSON.stringify(tasksArray));
		} else {
			const existingTasks = JSON.parse(localStorage.getItem("toDoListData"));
			//existingTasks.push(newTask);
			//localStorage.setItem("toDoListData", JSON.stringify(existingTasks));
			localStorage.setItem(
				"toDoListData",
				JSON.stringify([...existingTasks, newTask])
			);
		}
		renderList();
		addTaskInput.value = "";
	}
};

const handleFieldButtons = (selectedTask) => {
	if (selectedTask.className.includes("list-field-del")) {
		deleteTask(selectedTask);
	} else if (selectedTask.className.includes("list-field-done")) {
		setTaskDone(selectedTask);
	}
};

addTaskButton.addEventListener("click", () => {
	addTaskToLocalStorage(addTaskInput.value);
});

list.addEventListener("click", (e) => {
	handleFieldButtons(e.target);
});

document.addEventListener("DOMContentLoaded", () => {
	renderList();
});
