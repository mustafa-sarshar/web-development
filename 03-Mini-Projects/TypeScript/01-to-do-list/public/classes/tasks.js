class Task {
    constructor(taskName, taskDeadline, taskCategory) {
        this.taskName = taskName;
        this.taskDeadline = new Date(taskDeadline);
        this.taskCategory = taskCategory;
    }
    getSummary() {
        return `The task '${this.taskName}' is ${this.taskCategory}, so must be completed till ${this.taskDeadline
            .toISOString()
            .slice(0, 10)}!'`;
    }
}
export default Task;
