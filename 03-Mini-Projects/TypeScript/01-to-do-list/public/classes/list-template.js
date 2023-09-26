class ListTemplate {
    constructor(container) {
        this.container = container;
    }
    render(task) {
        const liTaskEl = document.createElement("li");
        const divTaskWrapperEl = document.createElement("div");
        const divTaskNameEl = document.createElement("div");
        const spanTaskCategoryEl = document.createElement("span");
        liTaskEl.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");
        divTaskWrapperEl.classList.add("ms-2", "me-auto");
        divTaskNameEl.classList.add("fw-bold");
        const taskCategoryStyle = task.taskCategory === "normal"
            ? "bg-primary"
            : task.taskCategory === "urgent"
                ? "bg-warning"
                : "bg-danger";
        spanTaskCategoryEl.classList.add("badge", taskCategoryStyle, "rounded-pill");
        divTaskWrapperEl.textContent = task.taskName;
        divTaskNameEl.textContent = `deadline: ${task.taskDeadline.toISOString().slice(0, 10)}`;
        spanTaskCategoryEl.textContent = task.taskCategory;
        divTaskWrapperEl.append(divTaskNameEl);
        liTaskEl.append(divTaskWrapperEl, spanTaskCategoryEl);
        this.container.append(liTaskEl);
    }
}
export default ListTemplate;
