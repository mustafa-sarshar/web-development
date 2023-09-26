import Task from "./classes/tasks.js";
import { HasGetSummary } from "./interfaces/required-methods.js";
import {
  HasTaskCategory,
  HasTaskDeadline,
  HasTaskName,
} from "./interfaces/required-properties.js";
import ListTemplate from "./classes/list-template.js";

const inputTaskNameEl = document.getElementById(
  "input-task-name"
) as HTMLInputElement;
const inputTaskDeadlineEl = document.getElementById(
  "input-task-deadline"
) as HTMLInputElement;
const inputTaskCategoryEl = document.getElementById(
  "input-task-category"
) as HTMLSelectElement;
const btnAddTaskEl = document.getElementById(
  "btn-add-task"
) as HTMLButtonElement;
const btnResetTasksEl = document.getElementById(
  "btn-reset-tasks"
) as HTMLButtonElement;

// List Template Instance
const olTasksEl = document.getElementById("list-tasks") as HTMLOListElement;
const liTaskEl = new ListTemplate(olTasksEl);

btnAddTaskEl.addEventListener("click", (evt: Event) => {
  evt.preventDefault();
  let newTask: HasGetSummary & HasTaskName & HasTaskDeadline & HasTaskCategory;
  newTask = new Task(
    inputTaskNameEl.value,
    inputTaskDeadlineEl.value,
    inputTaskCategoryEl.value
  );
  console.log(newTask);
  if (
    newTask.taskName !== "" &&
    newTask.taskDeadline.toString() !== "Invalid Date"
  ) {
    liTaskEl.render(newTask);
  }
});

btnResetTasksEl.addEventListener("click", (evt) => {
  evt.preventDefault();
  olTasksEl.textContent = "";
});
