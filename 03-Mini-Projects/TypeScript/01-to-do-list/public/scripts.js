import Task from "./classes/tasks.js";
import ListTemplate from "./classes/list-template.js";
const inputTaskNameEl = document.getElementById("input-task-name");
const inputTaskDeadlineEl = document.getElementById("input-task-deadline");
const inputTaskCategoryEl = document.getElementById("input-task-category");
const btnAddTaskEl = document.getElementById("btn-add-task");
const btnResetTasksEl = document.getElementById("btn-reset-tasks");
// List Template Instance
const olTasksEl = document.getElementById("list-tasks");
const liTaskEl = new ListTemplate(olTasksEl);
btnAddTaskEl.addEventListener("click", (evt) => {
    evt.preventDefault();
    let newTask;
    newTask = new Task(inputTaskNameEl.value, inputTaskDeadlineEl.value, inputTaskCategoryEl.value);
    console.log(newTask);
    if (newTask.taskName !== "" &&
        newTask.taskDeadline.toString() !== "Invalid Date") {
        liTaskEl.render(newTask);
    }
});
btnResetTasksEl.addEventListener("click", (evt) => {
    evt.preventDefault();
    olTasksEl.textContent = "";
});
